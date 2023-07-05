import { Canvas } from "@react-three/fiber"
import { EnvironementComponent } from "@/Module/Application/Page/FiberTest/Component/EnvironementComponent.tsx"
import { OrbitControls } from "@react-three/drei"

import { Physics, RigidBody } from "@react-three/rapier"
import { Character3dComponent } from "@/Module/Application/Page/Shoes/Component/Character3dComponent.tsx"

import { BowlingGameComponent } from "@/Module/Application/Page/Booling/Component/BowlingGameComponent.tsx"
import { BoxGeometry, PlaneGeometry } from "three"

export function BoolingPage() {
  const geometry = new BoxGeometry(20, 0.5, 10, 100)
  return (
    <>
      <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <color attach="background" args={["skyblue"]} />
        <EnvironementComponent></EnvironementComponent>
        <OrbitControls makeDefault />
        <Character3dComponent></Character3dComponent>
        <Physics gravity={[0, -9.08, 0]}>
          <BowlingGameComponent></BowlingGameComponent>
          <RigidBody type="fixed">
            <mesh receiveShadow castShadow position-y={0} geometry={geometry}>
              <meshStandardMaterial color="blue" />
            </mesh>
          </RigidBody>
        </Physics>
      </Canvas>
    </>
  )
}
