import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    padding: "12px 24px",
    backgroundColor: disabled ? "#999" : "#007BFF",
    color: "white",
    border: "none",
    borderRadius:"100px",
    fontSize: "16px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: "#0056b3",
    transform: "scale(1.02)",
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...(isHovered && !disabled ? hoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
