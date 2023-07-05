import { BoxGeometry, Mesh, MeshStandardMaterial } from "three"

export default function createCube(): Mesh {
  const geometry = new BoxGeometry(3, 3, 3)
  const material = new MeshStandardMaterial({
    color: 0xffffff,
  })

  const cube = new Mesh(geometry, material)
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(5, 0, 0)

  return cube
}
