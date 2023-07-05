import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three"

export default function createGround(): Mesh {
  const ground = new Mesh(
    new PlaneGeometry(1000, 1000),
    new MeshPhongMaterial({ color: "#F0EC80", depthWrite: false })
  )

  ground.name = "ground"
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ground.position.set(0, 0, 0)

  ground.receiveShadow = true

  return ground
}
