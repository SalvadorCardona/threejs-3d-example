import { DirectionalLight } from "three"

export default function createDirectionalLight(): DirectionalLight {
  const directionalLight = new DirectionalLight("white")
  directionalLight.position.set(-3, 15, 10)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 6000
  directionalLight.shadow.mapSize.height = 6000
  directionalLight.shadow.radius = 30
  return directionalLight
}
