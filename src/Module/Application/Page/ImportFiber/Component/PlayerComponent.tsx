import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { useEffect, useRef } from "react"
import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useSplineGameStore } from "@/Module/Application/Page/ImportFiber/Store/SplineGameStore.ts"

const SPEED = 1500
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export function PlayerComponent() {
  const store = useSplineGameStore()
  const { scene, camera } = useThree()

  const character = useGLTF(Model.CHARACTER)
  character.scene.traverse((mesh) => {
    mesh.castShadow = true
    mesh.receiveShadow = true
  })

  const { refObj, actions } = useAnimations(character.animations, scene)

  const ref = useRef<RapierRigidBody>(null)
  // const rapier = useRapier()
  const [, get] = useKeyboardControls()
  useEffect(() => {
    if (!ref.current) return
    store.player = ref.current
  }, [])
  useFrame((state) => {
    const { forward, backward, left, right, jump } = get()
    const rigidPlayer = ref.current as RapierRigidBody
    const velocity = rigidPlayer.linvel()
    const rotation = new THREE.Quaternion()
    const translation = rigidPlayer.translation()
    rigidPlayer.setNextKinematicRotation(rotation)
    // movement
    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation)

    rigidPlayer.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

    if (forward) rotation.setFromEuler(new THREE.Euler(0, Math.PI, 0))
    if (left) rotation.setFromEuler(new THREE.Euler(0, Math.PI * 1.5, 0))
    if (backward) rotation.setFromEuler(new THREE.Euler(0, Math.PI * 2, 0))
    if (right) rotation.setFromEuler(new THREE.Euler(0, Math.PI * 0.5, 0))

    if ([forward, backward, left, right].includes(true)) {
      store.move()
      rigidPlayer.setRotation(rotation, true)
      Object.values(actions).forEach((action) => {
        action?.play()
      })
      camera.position.set(translation.x, camera.position.y, translation.z + 1500)
    } else {
      Object.values(actions).forEach((action) => {
        action?.stop()
      })
    }
    // jumping
    // const world = rapier.world.raw()
    // const ray = world.castRay(
    //   new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 })
    // )
    // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
    // if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 })
  })
  return (
    <>
      <RigidBody
        friction={0}
        density={1000}
        restitution={0}
        ref={ref}
        colliders={"cuboid"}
        mass={100000}
        type="dynamic"
        position={[400, 300, 400]}
        enabledRotations={[false, false, false]}
        canSleep={false}
      >
        <primitive ref={refObj} castShadow object={character.scene} scale={50} />
      </RigidBody>
    </>
  )
}
