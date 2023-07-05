import { World, Material, ContactMaterial, SAPBroadphase } from "cannon-es"

const defaultMaterial = new Material("default")
const defaultContactMaterial = new ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
)

export default function createWorld(): World {
  const world = new World()
  world.broadphase = new SAPBroadphase(world)
  world.allowSleep = true
  world.gravity.set(0, -9.82, 0)
  world.defaultContactMaterial = defaultContactMaterial
  return world
}
