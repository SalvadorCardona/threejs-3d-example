import { Color, Scene } from "three"

export default function createScene(): Scene {
  const scene = new Scene()
  scene.background = new Color(0xbfe3dd)

  return scene
}
