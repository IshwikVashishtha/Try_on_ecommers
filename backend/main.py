from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool  
from gradio_client import Client, handle_file
from PIL import Image
import tempfile ,logging , os ,io
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Virtual Try-On API")


FRONTEND_URL = os.getenv("FRONTEND_URL") 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

hf_token = os.getenv("HUGGINGFACE_TOKEN")
if not hf_token:
    raise ValueError("HUGGINGFACE_TOKEN environment variable not set.")
# Initialize Hugging Face connection
try:
    logger.info("Connecting to IDM-VTON AI Model...")
    client = Client("yisol/IDM-VTON" , token=hf_token)
    logger.info("AI Model connection established!")
except Exception as e:
    logger.error(f"Failed to connect to AI: {e}")
    client = None

def process_and_resize_image(img_data: bytes, max_size: tuple = (1024, 1024)) -> Image.Image:
    """Helper function to resize giant images to prevent server RAM crashes."""
    img = Image.open(io.BytesIO(img_data)).convert("RGB")
    img.thumbnail(max_size, Image.Resampling.LANCZOS)
    return img

@app.post("/tryon")
async def try_on(
    user_image: UploadFile = File(..., description="Photo of the user"),
    product_image: UploadFile = File(..., description="Photo of the clothing item")
):
    if client is None:
        raise HTTPException(status_code=500, detail="AI Model client failed to initialize.")

    output_image_path = None # Track this for cleanup

    try:
        # 1. Read and instantly resize images to prevent Out-Of-Memory (OOM) crashes
        user_img_data = await user_image.read()
        product_img_data = await product_image.read()
        
        user_img = process_and_resize_image(user_img_data)
        product_img = process_and_resize_image(product_img_data)
        
        # 2. Save them to temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_user:
            user_img.save(temp_user.name, format="JPEG", quality=85)
            user_path = temp_user.name
            
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_product:
            product_img.save(temp_product.name, format="JPEG", quality=85)
            product_path = temp_product.name

        logger.info("Sending images to IDM-VTON AI (processing in background thread)...")

        # 3. Call the IDM-VTON model IN A THREADPOOL to prevent freezing the server
        result = await run_in_threadpool(
            client.predict,
            dict={"background": handle_file(user_path), "layers": [], "composite": None},
            garm_img=handle_file(product_path),
            garment_des="Clothing item",
            is_checked=True,
            is_checked_crop=False,
            denoise_steps=30,
            seed=42,
            api_name="/tryon"
        )
        
        logger.info("AI Try-on generation successful!")

        # 4. Read the generated image
        output_image_path = result[0]
        generated_img = Image.open(output_image_path)
        img_byte_arr = io.BytesIO()
        generated_img.save(img_byte_arr, format='JPEG', quality=90)
        img_byte_arr.seek(0)
        
        # 5. Cleanup ALL files (Input AND Output)
        os.remove(user_path)
        os.remove(product_path)
        if output_image_path and os.path.exists(output_image_path):
            os.remove(output_image_path)
        
        return StreamingResponse(img_byte_arr, media_type="image/jpeg")
    
    except Exception as e:
        logger.error(f"Error in try-on endpoint: {str(e)}")
        # Clean up files if a failure occurs mid-process
        if 'user_path' in locals() and os.path.exists(user_path):
            os.remove(user_path)
        if 'product_path' in locals() and os.path.exists(product_path):
            os.remove(product_path)
        if output_image_path and os.path.exists(output_image_path):
            os.remove(output_image_path)
            
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

        
@app.get("/health")
async def health_check():
    """
    Health check endpoint for Render to monitor server uptime.
    """
    return {
        "status": "healthy",
        "ai_client_connected": client is not None
    }
if __name__ == "__main__":
    import uvicorn
    import os
    
    # Grab the port assigned by Render, or default to 8000 locally
    port = int(os.environ.get("PORT", 8000))
    
    uvicorn.run("main:app", host="0.0.0.0", port=port)