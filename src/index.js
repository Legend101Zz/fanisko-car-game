import "./index.css";
import { Suspense, useEffect, useState, useRef, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";

const App = () => {
  const [placementMode, setPlacementMode] = useState(true);
  const [controls, setControls] = useState({});

  const handleControlDown = (control) => {
    setControls((prev) => ({ ...prev, [control]: true }));
  };

  const handleControlUp = (control) => {
    setControls((prev) => ({ ...prev, [control]: false }));
  };

  return (
    <>
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
      <div>
        <button
          onMouseDown={() => handleControlDown("w")}
          onMouseUp={() => handleControlUp("w")}
        >
          Up
        </button>
        <button
          onMouseDown={() => handleControlDown("a")}
          onMouseUp={() => handleControlUp("a")}
        >
          Left
        </button>
        <button
          onMouseDown={() => handleControlDown("d")}
          onMouseUp={() => handleControlUp("d")}
        >
          Right
        </button>
        <button
          onMouseDown={() => handleControlDown("s")}
          onMouseUp={() => handleControlUp("s")}
        >
          Down
        </button>
      </div>

      <Canvas colorManagement={false}>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
          <Scene placementMode={placementMode} controls={controls} />
        </Physics>
      </Canvas>
    </>
  );
};

createRoot(document.getElementById("root")).render(<App />);
