import seaTextureUrl from "./../Asset/sea-texture.jpg?url"
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Mesh, RepeatWrapping } from "three"
import { useRef } from "react"

export function SeaComponent() {
  const ref = useRef<Mesh>(null)
  const seaTexture = useTexture(seaTextureUrl)
  seaTexture.repeat.set(10, 10)
  seaTexture.wrapS = RepeatWrapping
  seaTexture.wrapT = RepeatWrapping

  useFrame((state) => {
    if (!ref.current) return
    const cos = Math.cos(state.clock.elapsedTime)
    const move = cos * 0.001
    seaTexture.offset.x += move
    seaTexture.offset.y += move
  })
  return (
    <mesh ref={ref} position={[0, -40, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4000, 4000, 40, 40]} />
      <meshBasicMaterial map={seaTexture} />
    </mesh>
  )
}
