import { HemisphereLight, Light } from "three"

export default function createHemisphereLight(): Light {
  const hemiLight = new HemisphereLight(0xffffff, 0x444444)
  hemiLight.position.set(0, 20, 0)

  return hemiLight
}
