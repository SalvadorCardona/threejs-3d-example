import { Canvas, useFrame } from "@react-three/fiber"
import { EnvironementComponent } from "@/Module/Application/Page/FiberTest/Component/EnvironementComponent.tsx"
import { OrbitControls, PivotControls, useGLTF } from "@react-three/drei"
import { useRef } from "react"

import {
  CylinderCollider,
  Physics,
  RigidBody,
  CuboidCollider,
  Collider,
} from "@react-three/rapier"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"

export function FiberTestPage() {
  const csg = useRef()

  const cubeJump = (e) => {
    const cube = e.object
    const mass = cube.current.mass()

    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    })
  }

  const tractor = useGLTF(Model.TRACTOR)

  return (
    <>
      <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <color attach="background" args={["skyblue"]} />
        <EnvironementComponent></EnvironementComponent>
        <OrbitControls makeDefault />
        <Physics gravity={[0, -9.08, 0]} debug>
          <RigidBody type="fixed">
            <mesh receiveShadow position-y={-1.25}>
              <boxGeometry args={[10, 0.5, 10]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>
          <RigidBody colliders={false} position={[0, 4, 0]}>
            <primitive
              object={tractor.scene}
              scale={0.5}
              translate={[0.2, 0.2, 0.2]}
            />
            <CuboidCollider args={[0.5, 0.5, 1]} position={[0, 0.5, 0]} />
          </RigidBody>
          <RigidBody>
            <mesh
              receiveShadow
              castShadow
              position={[3, 2, 1]}
              onClick={(e) => cubeJump(e)}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={"greenyellow"} />
            </mesh>
          </RigidBody>
        </Physics>

        <PivotControls
          activeAxes={[false, true, true]}
          scale={1}
          anchor={[-0.5, 0, 0]}
        >
          <mesh receiveShadow castShadow position={[1, 1, 1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>
        </PivotControls>
      </Canvas>
    </>
  )
}
