import "./index.css";
import { Suspense, useEffect, useState, useRef, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";

const App = () => {
  const [placementMode, setPlacementMode] = useState(true);
  const [controls, setControls] = useState({});
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const collectCoins = () => {
    setCollectedCoins((prevTimer) => prevTimer + 1);
  };

  const handleControlDown = (control) => {
    setControls((prev) => ({ ...prev, [control]: true }));
  };

  const handleControlUp = (control) => {
    setControls((prev) => ({ ...prev, [control]: false }));
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          color: "white",
          zIndex: 1000,
        }}
      >
        <p>Time: {timer}s</p>
        <p>Score: {collectedCoins}</p>
      </div>
      <div
        id="zappar-placement-ui"
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        onKeyDown={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        role="button"
        tabIndex={0}
      >
        Tap here to {placementMode ? "place " : "pick up "}the object
      </div>

      {/* Render buttons outside the canvas */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateAreas: `
          ' . up . '
          'left . right'
          ' . down . '
        `,
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <button
          style={{ gridArea: "up" }}
          onMouseDown={() => handleControlDown("w")}
          onMouseUp={() => handleControlUp("w")}
        >
          Up
        </button>
        <button
          style={{ gridArea: "left" }}
          onMouseDown={() => handleControlDown("a")}
          onMouseUp={() => handleControlUp("a")}
        >
          Left
        </button>
        <button
          style={{ gridArea: "right" }}
          onMouseDown={() => handleControlDown("d")}
          onMouseUp={() => handleControlUp("d")}
        >
          Right
        </button>
        <button
          style={{ gridArea: "down" }}
          onMouseDown={() => handleControlDown("s")}
          onMouseUp={() => handleControlUp("s")}
        >
          Down
        </button>
      </div>

      <Canvas colorManagement={false}>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
          <Scene
            placementMode={placementMode}
            controls={controls}
            coins={collectCoins}
          />
        </Physics>
      </Canvas>
    </>
  );
};

createRoot(document.getElementById("root")).render(<App />);
