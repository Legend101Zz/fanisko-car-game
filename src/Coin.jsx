// Coin.js
import { useBox } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCollision } from "@react-three/cannon";

export function Coin({ position, onCollect }) {
  const [ref] = useBox(() => ({
    type: "Kinematic",
    args: [0.1, 0.1, 0.1],
    position,
  }));

  //   useEffect(() => {
  //     const cleanup = ref.current.addEventListener("collide", (e) => {
  //       const contact = e.contact;
  //       const body = contact.target;
  //       if (body.userData.tag === "car") {
  //         onCollect();
  //         // Move the coin away from the scene on collection
  //         ref.current.position.set(100, 100, 100);
  //       }
  //     });

  //     return () => cleanup();s
  //   }, [onCollect]);

  useFrame((state, delta) => {
    const mesh = ref.current;

    // Rotate the mesh
    mesh.rotation.x += 1;

    mesh.rotation.z += 1;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
}
