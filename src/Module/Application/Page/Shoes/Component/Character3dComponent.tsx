import { useGLTF } from "@react-three/drei"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { useEffect, useRef, useState } from "react"
import { Group } from "three"
import { useFrame } from "@react-three/fiber"
import { useReactGameStore } from "@/Module/Application/ReactGameStore.ts"

export function Character3dComponent(props: JSX.IntrinsicElements["group"]) {
  const character = useGLTF(Model.CHARACTER)
  character.scene.traverse((mesh) => {
    mesh.castShadow = true
    mesh.receiveShadow = true
  })
  const [scale, setScale] = useState(0.4)
  const ref = useRef<Group>(null)
  const store = useReactGameStore()
  useEffect(() => {
    if (!ref.current) return

    store.player = ref.current
  })
  useFrame((scene) => {})

  addEventListener("keydown", (event) => {
    if (!ref.current) return
    const model = ref.current
    const speed = 0.1
    console.log("move")
    if (event.key === "ArrowLeft") {
      model.position.x -= speed
      model.rotation.y = -Math.PI / 2
    }
    if (event.key === "ArrowRight") {
      model.position.x += speed
      model.rotation.y = Math.PI / 2
    }
    if (event.key === "ArrowUp") {
      model.position.z -= speed
      model.rotation.y = Math.PI
    }
    if (event.key === "ArrowDown") {
      model.position.z += speed
      model.rotation.y = Math.PI * 2
    }
  })

  return (
    <>
      <group position={[0, 1.2, 2]} {...props} ref={ref}>
        <primitive castShadow object={character.scene} scale={scale} />
      </group>
    </>
  )
}
