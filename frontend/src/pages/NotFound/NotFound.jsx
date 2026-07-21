import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(80px, 15vw, 160px)",
            fontWeight: 900,
            color: "var(--text-primary)",
            letterSpacing: "-4px",
            lineHeight: 1,
            margin: 0,
          }}
        >
          404
        </h1>

        <div
          style={{
            width: "40px",
            height: "2px",
            background: "var(--text-primary)",
            margin: "24px auto",
          }}
        />

        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          PAGE NOT FOUND
        </p>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            lineHeight: 1.6,
            marginBottom: "40px",
            maxWidth: "400px",
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "var(--btn-bg)",
            color: "var(--btn-text)",
            border: "none",
            borderRadius: 0,
            padding: "14px 48px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "var(--btn-hover)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "var(--btn-bg)";
          }}
        >
          BACK TO HOME
        </button>
      </div>
      <Footer />
    </>
  );
}
