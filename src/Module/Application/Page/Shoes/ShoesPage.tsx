import { Canvas } from "@react-three/fiber"
import { EnvironementComponent } from "@/Module/Application/Page/FiberTest/Component/EnvironementComponent.tsx"
import { OrbitControls } from "@react-three/drei"

import { Physics, RigidBody } from "@react-three/rapier"
import { ShoesPlatformComponent } from "@/Module/Application/Page/Shoes/Component/ShoesPlatformComponent.tsx"
import { Character3dComponent } from "@/Module/Application/Page/Shoes/Component/Character3dComponent.tsx"
import { BoxGeometry, MeshStandardMaterial } from "three"

export function ShoesPage() {
  const boxGeometry = new BoxGeometry(10, 0.5, 10)
  const floor2Material = new MeshStandardMaterial({
    color: "greenyellow",
    metalness: 0,
    roughness: 0,
  })
  return (
    <>
      <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <color attach="background" args={["skyblue"]} />
        <EnvironementComponent></EnvironementComponent>
        <OrbitControls makeDefault />
        <Character3dComponent></Character3dComponent>
        <ShoesPlatformComponent></ShoesPlatformComponent>
        <Physics gravity={[0, -9.08, 0]}>
          <RigidBody type="fixed">
            <mesh
              position-y={0}
              geometry={boxGeometry}
              material={floor2Material}
              receiveShadow
            ></mesh>
          </RigidBody>
        </Physics>
      </Canvas>
    </>
  )
}
