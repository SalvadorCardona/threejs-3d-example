import "./HomePage.css"
import { useEffect, useRef } from "react"
import {
  GameStateInterface,
  useGameStore,
} from "@/Module/Game/Application/GameStore.ts"
import getModel, { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import createDebugUi from "@/Module/Game/Application/createDebugUi.ts"
import { Sky, Water } from "three-stdlib"
import {
  RepeatWrapping,
  TextureLoader,
  Vector3,
  PlaneGeometry,
  MathUtils,
} from "three"

export function HomePage() {
  const style = {}

  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) return

    const gameStore = useGameStore(containerRef.current) as GameStateInterface
    createDebugUi(gameStore)

    const camera = gameStore.camera
    camera.rotation.set(0, 0, 0)
    camera.position.z = 50

    getModel(Model.BOAT).then((gltf) => {
      const model = gltf.scene
      model.position.set(-10, -1.5, 1)
      model.rotation.y = Math.PI / 2
      model.scale.set(100, 100, 100)

      gameStore.add(model)
      gameStore.addAction(() => {
        const sinus = Math.sin(gameStore.clock.getElapsedTime())
        model.position.y += Math.sin(sinus) * 0.005
        model.rotation.z += Math.sin(sinus) * 0.0005
      })
    })

    const waterGeometry = new PlaneGeometry(10000, 10000)

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new TextureLoader().load(
        "texture/waternormals.jpg",
        function (texture) {
          texture.wrapS = texture.wrapT = RepeatWrapping
        }
      ),
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: undefined,
    })

    water.rotation.x = -Math.PI / 2

    gameStore.add(water)

    const sky = new Sky()
    sky.scale.setScalar(60)
    const skyUniforms = sky.material.uniforms

    skyUniforms["turbidity"].value = 10
    skyUniforms["rayleigh"].value = 1
    skyUniforms["mieCoefficient"].value = 0.001
    skyUniforms["mieDirectionalG"].value = 0.3
    gameStore.add(sky)

    const sun = new Vector3()

    gameStore.addAction(() => {
      const phi = MathUtils.degToRad(90 - 2)
      const theta = MathUtils.degToRad(180)

      sun.setFromSphericalCoords(1, phi, theta)

      sky.material.uniforms["sunPosition"].value.copy(sun)
      water.material.uniforms["sunDirection"].value.copy(sun).normalize()
      water.material.uniforms["time"].value += 1.0 / 120
    })

    gameStore.start()
  }, [containerRef])

  return (
    <div
      style={style}
      className={
        " min-h-screen min-w-full bg-cover flex justify-center items-center flex-col"
      }
    >
      <div className={"fixed left-0 top-0"} ref={containerRef}></div>
      <div className={"wrapper"}>
        <div>
          <button>1</button>
          <button>2</button>
        </div>
        <div className={"second"}>
          <button>1</button>
          <button>2</button>
        </div>
        <div>
          <button>1</button>
          <button>2</button>
        </div>
      </div>
    </div>
  )
}
