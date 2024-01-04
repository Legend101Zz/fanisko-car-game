import React from "react";
import { Html } from "@react-three/drei";

export const Button = ({
  label,
  onTouchStart,
  onTouchEnd,
  positionTop,
  positionLeft,
}) => {
  return (
    <Html>
      <div
        style={{
          position: "absolute",
          top: `${positionTop}%`,
          left: `${positionLeft}%`,
          transform: "translate(-50%, -50%)",
          padding: "10px",
          backgroundColor: "#3498db",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {label}
      </div>
    </Html>
  );
};
