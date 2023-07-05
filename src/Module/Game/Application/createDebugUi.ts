import { GameStateInterface } from "@/Module/Game/Application/GameStore.ts"
import { OrbitControls } from "three-stdlib"
import createAxeHelper from "@/Module/Game/Object3d/createAxeHelper.ts"
import Stats from "stats.js"
import CannonDebugRenderer from "@/Module/Shared/Application/Physic/CannonDebugRenderer.ts"
import GUI from "lil-gui"

export default function createDebugUi(gameStore: GameStateInterface): void {
  const gui = new GUI()
  gameStore.gui = new GUI()
  const { light, camera } = gameStore
  const cameraFolder = gui.addFolder("Camera")
  const control = new OrbitControls(gameStore.camera, gameStore.renderer.domElement)
  control.screenSpacePanning = true
  control.enabled = true
  cameraFolder.add(control, "enabled").name("Control")
  cameraFolder.add(gameStore.camera.position, "x", -100, 100).name("Pos X")
  cameraFolder.add(gameStore.camera.position, "z", -100, 100).name("Pos Z")
  cameraFolder.add(gameStore.camera.position, "y", -100, 100).name("Pos Y")
  cameraFolder.add(gameStore.camera.rotation, "y", -100, 100).name("Rot Y").step(0.1)
  cameraFolder.add(gameStore.camera.rotation, "x", -100, 100).name("Rot X").step(0.1)
  cameraFolder.add(gameStore.camera.rotation, "z", -100, 100).name("Rot Z").step(0.1)

  const parameters = {
    color: gameStore.light.color,
  }

  const lightFolder = gui.addFolder("Light")
  lightFolder.addColor({ color: gameStore.light.color }, "color").onChange(() => {
    gameStore.light.color.set(parameters.color)
  })

  gameStore.add(createAxeHelper())

  const stats = new Stats()
  document.body.appendChild(stats.dom)

  const cannonDebugRenderer = new CannonDebugRenderer(
    gameStore.scene,
    gameStore.world
  )

  gameStore.addAction(() => {
    cannonDebugRenderer.update()
  })
}
