import { Canvas } from "@react-three/fiber"
import { EnvironementComponent } from "@/Module/Application/Page/FiberTest/Component/EnvironementComponent.tsx"
import { OrbitControls } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { CinemaChairComponent } from "@/Module/Application/Page/Cinema/Component/CinemaChairComponent.tsx"

export function CinemaPage() {
  return (
    <>
      <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <color attach="background" args={["skyblue"]} />
        <EnvironementComponent></EnvironementComponent>
        <OrbitControls makeDefault />

        <Physics gravity={[0, -9.08, 0]}>
          <CinemaChairComponent></CinemaChairComponent>
          <RigidBody type="fixed">
            <mesh receiveShadow position-y={0}>
              <boxGeometry args={[15, 0.5, 15]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>
        </Physics>
      </Canvas>
    </>
  )
}
