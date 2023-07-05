import { GameStateInterface } from "@/Module/Game/Application/GameStore.ts"

export default function cameraBehavior(gameState: GameStateInterface): void {
  const mesh = gameState.player?.mesh
  if (!mesh) return

  gameState.camera.position.set(
    mesh.position.x,
    mesh.position.y + 20,
    mesh.position.z + 15
  )
}
