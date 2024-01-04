import React, { useEffect, useState } from "react";
import { useBox } from "@react-three/cannon";
import { Html } from "@react-three/drei";
// import { Button } from "./Button"; // Create a Button component with your desired styling

export const CarControls = ({ vehicleApi, chassisApi }) => {
  const [controls, setControls] = useState({});
  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = (e) => {
      setControls((prev) => ({
        ...prev,
        [e.key.toLowerCase()]: false,
      }));
    };

    const handleTouchStart = (control) => {
      setControls((prev) => ({ ...prev, [control]: true }));
    };

    const handleTouchEnd = (control) => {
      setControls((prev) => ({ ...prev, [control]: false }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.arrowdown)
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (controls.arrowleft)
      chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    if (controls.arrowright)
      chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return (
    <Html
      as="div"
      center
      distanceFactor={10}
      zIndexRange={[100, 0]}
      style={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onPointerDown={() => setControls((prev) => ({ ...prev, w: true }))}
          onPointerUp={() => setControls((prev) => ({ ...prev, w: false }))}
        >
          Up
        </button>
      </div>
      <div style={{ margin: "10px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onPointerDown={() => setControls((prev) => ({ ...prev, a: true }))}
          onPointerUp={() => setControls((prev) => ({ ...prev, a: false }))}
        >
          Left
        </button>
        <div style={{ margin: "0 10px" }} />
        <button
          onPointerDown={() => setControls((prev) => ({ ...prev, d: true }))}
          onPointerUp={() => setControls((prev) => ({ ...prev, d: false }))}
        >
          Right
        </button>
      </div>
      <div style={{ margin: "10px 0" }} />
      <button
        onPointerDown={() => setControls((prev) => ({ ...prev, s: true }))}
        onPointerUp={() => setControls((prev) => ({ ...prev, s: false }))}
      >
        Down
      </button>
    </Html>
  );
};
