import { Mesh, MeshStandardMaterial } from "three"
import { RoundedBoxGeometry } from "three-stdlib"

export default function createCubeRounded(): Mesh {
  const geometry = new RoundedBoxGeometry(3, 3, 3, 10, 0.1)
  const material = new MeshStandardMaterial({
    color: 0xffffff,
  })

  const cube = new Mesh(geometry, material)
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(5, 0, 0)

  return cube
}
