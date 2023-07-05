import { useGLTF } from "@react-three/drei"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { Color, Group, Mesh, MeshStandardMaterial } from "three"
import { useFrame } from "@react-three/fiber"
import { useReactGameStore } from "@/Module/Application/ReactGameStore.ts"
import { useRef } from "react"

const autorizedMesh = [
  "counter",
  "logo",
  "redcollar",
  "base_red",
  "uppercap_left",
  "uppercap_right",
  "nikelogo_left",
  "nikelogo_right",
  "nikelogo_left_1",
  "nikelogo_right_1",
]

export function ShoesPlatformComponent(props: JSX.IntrinsicElements["group"]) {
  const shoesPlatform = useGLTF(Model.SHOES_PLATFORM)
  const shoes = useGLTF(Model.SHOES)
  const store = useReactGameStore()
  const refs = [useRef(null), useRef(null), useRef(null)]
  shoesPlatform.scene.traverse((mesh) => {
    mesh.castShadow = true
    mesh.receiveShadow = true
  })
  shoes.scene.traverse((mesh) => {
    mesh.castShadow = true
    mesh.receiveShadow = true
  })
  useFrame(() => {
    shoes.scene.rotation.y += 0.01
    if (!store.player) return
    const player: Group = store.player
    refs.forEach((ref) => {
      if (!ref.current) return
      const mesh: Mesh = ref.current
      if (mesh.position.distanceToSquared(player.position) < 1) {
        const color: Color = mesh.material.color
        changeColor(color.convertLinearToSRGB())
        mesh.position.y = 0
        return
      }
      mesh.position.y = 0.3
    })
  })
  const changeColor = (color: string | Color, mesh: Mesh | null = null) => {
    shoes.scene.traverse((e) => {
      if (e.material && autorizedMesh.includes(e.name)) {
        e.material = new MeshStandardMaterial({
          color: color,
        })
      }
    })
  }

  return (
    <group {...props}>
      <mesh
        ref={refs[0]}
        position={[-2.8, 0.3, 0.9]}
        onClick={() => changeColor("green")}
        castShadow
      >
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh
        ref={refs[1]}
        position={[-1.3, 0.3, 0.9]}
        onClick={() => changeColor("red")}
        castShadow
      >
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh
        ref={refs[2]}
        position={[0.2, 0.3, 0.9]}
        onClick={() => changeColor("yellow")}
        castShadow
      >
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <primitive
        castShadow={true}
        object={shoes.scene}
        position={[-1.1, 4, -2.2]}
        scale={0.7}
        onClick={() => changeColor("blue")}
      />
      <primitive
        receiveShadow={true}
        castShadow={true}
        object={shoesPlatform.scene}
        position={[0, 0, 0]}
      />
    </group>
  )
}
