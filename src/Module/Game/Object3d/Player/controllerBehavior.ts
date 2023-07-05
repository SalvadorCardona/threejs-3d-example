import { GameStateInterface } from "@/Module/Game/Application/GameStore.ts"
import { Vec3 } from "cannon-es"

export default function controllerBehavior(gameState: GameStateInterface): void {
  addEventListener("keydown", (event) => {
    const body = gameState.player?.body
    if (!body) return

    if (event.key === "ArrowLeft") body.applyImpulse(new Vec3(-0.1, 0, 0))
    if (event.key === "ArrowRight") body.applyImpulse(new Vec3(0.1, 0, 0))
    if (event.key === "ArrowUp") body.applyImpulse(new Vec3(0, 0, -0.1))
    if (event.key === "ArrowDown") body.applyImpulse(new Vec3(0, 0, 0.1))

    console.log(body.velocity.z)
  })
}
