import { RapierRigidBody, RigidBody, Vect } from "@react-three/rapier"
import { useGLTF } from "@react-three/drei"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useReactGameStore } from "@/Module/Application/ReactGameStore.ts"
import { Mesh } from "three"

const positions: Array<[number, number, number]> = [
  [2, 0.1, 2],
  [3, 0.1, 1],
  [3, 0.1, 3],
  [4, 0.1, 0],
  [4, 0.1, 2],
  [4, 0.1, 4],
]

export function BowlingGameComponent() {
  const spinBowling = useGLTF(Model.SPIN_BOWLING)
  const refBall = useRef<RapierRigidBody>(null)
  const store = useReactGameStore()
  const handlerMesh = useRef<Mesh>()
  useFrame(() => {
    if (!handlerMesh.current || !store.player) return

    if (handlerMesh.current.position.distanceToSquared(store.player.position) < 1) {
      moveBall()
    }
  })

  const moveBall = () => {
    if (!refBall.current) return
    const ball = refBall.current
    ball.applyImpulse({ x: 20, y: 3, z: 0 }, true)
  }

  return (
    <>
      <mesh
        castShadow
        ref={handlerMesh}
        position={[-2.8, 0.3, 0.9]}
        onClick={() => moveBall()}
      >
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <RigidBody
        ref={refBall}
        type="dynamic"
        colliders="hull"
        position={[-5, 0.1, 1]}
      >
        <mesh castShadow>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>
      {positions.map((position) => {
        const mesh = spinBowling.scene.clone()
        return (
          <RigidBody
            key={mesh.uuid}
            type="dynamic"
            colliders="hull"
            position={position}
          >
            <primitive castShadow object={mesh} scale={1} />
          </RigidBody>
        )
      })}
    </>
  )
}
