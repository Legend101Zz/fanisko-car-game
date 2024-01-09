import "./index.css";
import { Suspense, useEffect, useState, useRef, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";

const App = () => {
  const [placementMode, setPlacementMode] = useState(true);

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

      <Canvas colorManagement={false}>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
          <Scene placementMode={placementMode} />
        </Physics>
      </Canvas>
    </>
  );
};

createRoot(document.getElementById("root")).render(<App />);
