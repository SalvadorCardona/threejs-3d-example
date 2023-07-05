import { GameStateInterface } from "@/Module/Game/Application/GameStore.ts"
import getModel, { Model } from "@/Module/Shared/Application/Model/getModel.ts"

export default function createPlayer(gameStore: GameStateInterface): void {
  getModel(Model.TRACTOR).then((gltf) => {
    const model = gltf.scene
    model.position.set(0, 0, 10)
    model.rotation.y = Math.PI
    model.castShadow = true
    model.name = "player"
    gameStore.addToRigidBody(model)

    model.traverse((child) => {
      child.castShadow = true
      if (child.name.indexOf("Wheel") !== -1) {
        gameStore.addAction(() => {
          child.rotation.x += 0.1
        })
      }
    })
  })
}
