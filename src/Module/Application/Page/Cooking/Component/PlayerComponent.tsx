import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { useEffect, useRef, useState } from "react"
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useSplineGameStore } from "@/Module/Application/Page/ImportFiber/Store/SplineGameStore.ts"
import { useCookingGameStore } from "@/Module/Application/Page/Cooking/Store/cookingStore.ts"
import { Mesh, Object3D, Vector3 } from "three"

const SPEED = 200
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export function PlayerComponent() {
  const store = useSplineGameStore()
  const cookingStore = useCookingGameStore()
  const { scene } = useThree()
  const character = useGLTF(Model.CHARACTER)
  const tablePosition = cookingStore.selectors.getAbsolutePosition(
    "#table"
  ) as Vector3
  character.scene.traverse((mesh) => {
    mesh.castShadow = true
    mesh.receiveShadow = true
  })
  const { actions } = useAnimations(character.animations, scene)
  const ref = useRef<RapierRigidBody>(null)
  const [, get] = useKeyboardControls()
  const [drink, setDrink] = useState<null | Object3D>(null)
  useEffect(() => {
    if (!ref.current) return
    store.player = ref.current
  }, [])
  useFrame((state) => {
    const { forward, backward, left, right } = get()
    const rigidPlayer = ref.current as RapierRigidBody
    const velocity = rigidPlayer.linvel()
    const rotation = new THREE.Quaternion()
    const translation = rigidPlayer.translation()

    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation)

    rigidPlayer.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true)

    if ([forward, backward, left, right].includes(true)) {
      let piRotation = Math.PI
      if (forward) piRotation *= 0.5
      if (left) piRotation *= 1
      if (backward) piRotation *= 1.5
      if (right) piRotation *= 2

      rotation.setFromEuler(new THREE.Euler(0, piRotation, 0))

      store.move()
      rigidPlayer.setRotation(rotation, true)
      Object.values(actions).forEach((action) => {
        action?.play()
      })
      if (drink && tablePosition.distanceTo(translation as Vector3) < 50) {
        store.foodGiven(drink)
        setDrink(null)
      }
      cookingStore.selectors.getAll("#drink")?.forEach((object3d) => {
        const position = new Vector3()
        position.setFromMatrixPosition(object3d.matrixWorld)

        if (position.distanceTo(translation as Vector3) < 50) {
          const clone = object3d.clone()
          const vector = new Vector3(0, translation.y, 0)
          clone.position.copy(vector)
          setDrink(clone)
        }
      })
    } else {
      Object.values(actions).forEach((action) => {
        action?.stop()
      })
    }
  })
  return (
    <>
      <RigidBody
        ref={ref}
        position={[0, 10, 0]}
        enabledRotations={[false, false, false]}
        canSleep={false}
        colliders={false}
        mass={100000}
      >
        <CapsuleCollider args={[1, 20]}>
          {drink && <primitive castShadow object={drink} />}
          <primitive castShadow object={character.scene} scale={10} />
        </CapsuleCollider>
      </RigidBody>
    </>
  )
}
