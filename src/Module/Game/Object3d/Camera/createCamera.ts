import { PerspectiveCamera } from "three"

export default function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    100
  )
  camera.position.set(0, 10, -10)
  camera.rotateX(-45)
  return camera
}
