import "./GamePage.css"
import { useEffect, useRef } from "react"
import {
  GameStateInterface,
  useGameStore,
} from "@/Module/Game/Application/GameStore.ts"
import createMainLevel from "@/Module/Game/Object3d/Level/createMainLevel.ts"

export function GamePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (containerRef.current) {
      useGameStore(containerRef.current)
      createMainLevel(useGameStore() as GameStateInterface)
    }
  })

  return (
    <>
      <div ref={containerRef}></div>
    </>
  )
}
