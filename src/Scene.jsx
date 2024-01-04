import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { InstantTracker, ZapparCamera } from "@zappar/zappar-react-three-fiber";
import { Suspense, useEffect, useState, useRef, useLayoutEffect } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";

export function Scene() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  const set = useThree((state) => state.set);
  const cameraRef = useRef();

  useLayoutEffect(() => {
    set(() => ({ camera: cameraRef.current }));
  }, []);
  useEffect(() => {
    function keydownHandler(e) {
      if (e.key == "k") {
        // random is necessary to trigger a state change
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <ZapparCamera makeDefault={false} ref={cameraRef} />
      <InstantTracker
        placementUI="placement-only"
        placementCameraOffset={[0, 0, -10]}
      >
        {/* <Environment
          files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
          background={"both"}
        /> */}

        <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
        {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

        <Ground />
        <Track />
        <Car thirdPerson={thirdPerson} />
      </InstantTracker>
      <directionalLight position={[2.5, 8, 5]} intensity={0.5} />
    </Suspense>
  );
}
