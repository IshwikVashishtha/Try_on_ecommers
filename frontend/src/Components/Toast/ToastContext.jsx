import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    (message, type = "success", duration = 3000) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [],
  );

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }) => (
  <div
    style={{
      position: "fixed",
      bottom: "24px",
      left: "24px",
      zIndex: 99999,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}
  >
    {toasts.map((toast) => (
      <Toast key={toast.id} toast={toast} onRemove={onRemove} />
    ))}
  </div>
);

const Toast = ({ toast, onRemove }) => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const typeStyles = {
    success: {
      borderLeft: isDark ? "3px solid #ffffff" : "3px solid #000000",
      dot: isDark ? "#ffffff" : "#000000",
    },
    error: { borderLeft: "3px solid #ff4444", dot: "#ff4444" },
    info: {
      borderLeft: isDark ? "3px solid #888888" : "3px solid #575757",
      dot: isDark ? "#888" : "#575757",
    },
    wishlist: {
      borderLeft: isDark ? "3px solid #ffffff" : "3px solid #000000",
      dot: isDark ? "#fff" : "#000",
    },
  };

  const style = typeStyles[toast.type] || typeStyles.success;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 16px",
        background: isDark ? "#141414" : "#ffffff",
        border: isDark ? "1px solid #2a2a2a" : "1px solid #E1E1E1",
        borderLeft: style.borderLeft,
        minWidth: "260px",
        maxWidth: "340px",
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
        letterSpacing: "0.06em",
        color: isDark ? "#ffffff" : "#000000",
        animation: "toastSlideIn 0.3s ease",
        cursor: "pointer",
      }}
      onClick={() => onRemove(toast.id)}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: style.dot,
          flexShrink: 0,
        }}
      />
      <span style={{ flex: 1 }}>{toast.message}</span>
      <span style={{ opacity: 0.4, fontSize: "16px", lineHeight: 1 }}>x</span>
    </div>
  );
};
