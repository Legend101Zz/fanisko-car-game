import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Loader,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { InstantTracker, ZapparCamera } from "@zappar/zappar-react-three-fiber";
import { Suspense, useEffect, useState, useRef, useLayoutEffect } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";

export function Scene({ placementMode, controls, coins }) {
  const [thirdPerson, setThirdPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([-2, 2, -5]);

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
    <>
      <ZapparCamera makeDefault={false} ref={cameraRef} />
      <InstantTracker
        placementMode={placementMode}
        placementCameraOffset={[0, 0, -10]}
      >
        {/* <Environment
          files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
          background={"both"}
        /> */}
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />

          <Ground />
          <Track coins={coins} />
          <Car thirdPerson={thirdPerson} controls={controls} />
        </Suspense>
      </InstantTracker>
      <ambientLight position={[2.5, 8, 5]} intensity={0.2} />
    </>
  );
}
