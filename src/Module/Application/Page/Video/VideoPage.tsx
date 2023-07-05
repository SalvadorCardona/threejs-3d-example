import { useEffect, useRef } from "react"
import {
  GameStateInterface,
  useGameStore,
} from "@/Module/Game/Application/GameStore.ts"
import "./VideoPage.css"
import { Mesh, MeshStandardMaterial, PlaneGeometry, SpotLight, Vector3 } from "three"

import generateRandomNumber from "@/Module/Shared/Application/Math/generateRandomNumber.ts"

import createDebugUi from "@/Module/Game/Application/createDebugUi.ts"
import createCubeRounded from "@/Module/Game/Object3d/createCubeRounded.ts"

const colors = ["red", "yellow", "orange", "purple"]

function getRamdonColor(): string {
  return colors[generateRandomNumber(0, colors.length)]
}

export function VideoPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) return
    const gameStore = useGameStore(containerRef.current) as GameStateInterface

    const camera = gameStore.camera
    camera.rotation.x = -Math.PI / 2
    camera.position.y = 32
    camera.position.z = 0
    const ground = new Mesh(
      new PlaneGeometry(1000, 1000),
      new MeshStandardMaterial({ color: "#777", depthWrite: true })
    )
    ground.position.set(0, -5, 0)
    ground.receiveShadow = false
    ground.rotation.x = -Math.PI / 2
    gameStore.add(ground)

    for (let i = 0; i < 10; i++) {
      const spotLight = new SpotLight(getRamdonColor(), 0.5, 0, 3.14 / 2, 0.25)
      spotLight.shadow.blurSamples = 1
      const position = new Vector3(
        generateRandomNumber(-12, 12),
        10,
        generateRandomNumber(-12, 12)
      )
      const cube = createCubeRounded()
      cube.scale.x = generateRandomNumber(0, 3, true)
      cube.position.copy(position)
      spotLight.position.copy(position)
      gameStore.add(spotLight)
      gameStore.add(cube)
      gameStore.addAction(() => {
        const sinus = Math.sin(gameStore.clock.getElapsedTime())

        spotLight.position.x += Math.sin(sinus) * generateRandomNumber(0, 2, true)
        spotLight.position.z += Math.sin(sinus) * generateRandomNumber(0, 2, true)
        spotLight.position.y += Math.sin(sinus) * generateRandomNumber(0, 1, true)
        cube.position.x += Math.sin(sinus) * generateRandomNumber(0, 0.1, true)
        cube.position.z += Math.sin(sinus) * generateRandomNumber(0, 0.01, true)
        cube.rotation.z += Math.sin(sinus) * generateRandomNumber(0, 0.05, true)
        cube.rotation.x += generateRandomNumber(0, 0.01, true)
        cube.rotation.y += generateRandomNumber(0, 0.01, true)
      })
    }

    gameStore.start()
  })

  return (
    <div className={"container"}>
      <div ref={containerRef}></div>
      <iframe
        className={"player"}
        title="vimeo-player"
        src="https://player.vimeo.com/video/783455878?h=46672b3b96"
        width="640"
        height="360"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  )
}
