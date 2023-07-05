import { Mesh, MeshPhongMaterial, SphereGeometry } from "three"

export default function createSphere(): Mesh {
  const geometry = new SphereGeometry(1, 20, 20)
  const material = new MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
  })
  const sphere = new Mesh(geometry, material)
  sphere.castShadow = true
  sphere.position.set(0, 0, 0)

  return sphere
}
