import { GameStateInterface } from "@/Module/Game/Application/GameStore.ts"
import createGround from "@/Module/Game/Object3d/createGround.ts"
import { createText } from "@/Module/Game/Object3d/createText.ts"
import createDebugUi from "@/Module/Game/Application/createDebugUi.ts"
import {
  addRayMouseObject,
  MouseRayCasterAction,
} from "@/Module/Game/RayCaster/MouseRayCasterAction.ts"
import createPlayer from "@/Module/Game/Object3d/Player/createPlayer.ts"
import createSphere from "@/Module/Game/Object3d/createSphere.ts"
import createCube from "@/Module/Game/Object3d/createCube.ts"
import { Mesh } from "three"
import controllerBehavior from "@/Module/Game/Object3d/Player/controllerBehavior.ts"
import cameraBehavior from "@/Module/Game/Object3d/Camera/cameraBehavior.ts"
import getModel, { Model } from "@/Module/Shared/Application/Model/getModel.ts"

export default function createMainLevel(gameStore: GameStateInterface): void {
  createDebugUi(gameStore)
  const textObject = createText({ data: { text: "Mon texte de test" } }) as Mesh
  gameStore.addToRigidBody(createGround())
  // gameStore.addToRigidBody(textObject)
  gameStore.player = gameStore.addToRigidBody(createSphere())
  gameStore.addToRigidBody(createCube())
  createPlayer(gameStore)
  getModel(Model.WOOD_ISLAND).then((gltf) => {
    const model = gltf.scene
    model.position.set(0, 0, 10)
    model.rotation.y = Math.PI
    model.castShadow = true
    model.traverse((child) => {
      child.castShadow = true
    })
    gameStore.add(gltf.scene)
  })
  // gameStore.addAction(cameraBehavior)
  gameStore.addAction(MouseRayCasterAction)
  addRayMouseObject(textObject)
  controllerBehavior(gameStore)
  gameStore.start()
}
