import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useControls } from "leva"
import { Physics, RigidBody } from "@react-three/rapier"
import { Color, DirectionalLight, Layers, Mesh, MeshPhongMaterial } from "three"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { useRef } from "react"

const layers = new Layers()

export function CityPage() {
  const lightRef = useRef<DirectionalLight>()
  const { ambiantIntensity, color, lightIntensity, lightX, lightY, lightZ } =
    useControls({
      lightX: { value: 69, min: -600, max: 600, step: 1 },
      lightY: { value: 234, min: -600, max: 600, step: 1 },
      lightZ: { value: 41, min: -600, max: 600, step: 1 },
      lightIntensity: { value: 0.7, min: 0, max: 3, step: 0.05 },
      ambiantIntensity: { value: 0.75, min: 0, max: 3, step: 0.05 },
      lightColor: {
        value: "#fff",
        onChange: (value) => {
          lightRef.current?.color.set(value)
        },
      },
    })

  const city = useGLTF(Model.CITY_BIG)

  city.scene.traverse((e) => {
    if (e.isMesh) {
      const mesh: Mesh = e
      mesh.castShadow = true
      mesh.receiveShadow = true
    }

    if (e.material) {
      const color: Color = e.material.color
      const materiel = new MeshPhongMaterial({
        color: color,
        // vertexColors: true,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
        colorWrite: true,
        stencilWrite: false,
        stencilWriteMask: 255,
        stencilFunc: 519,
        stencilRef: 0,
        stencilFuncMask: 255,
        stencilFail: 7680,
        stencilZFail: 7680,
        stencilZPass: 7680,
        dithering: true,
      })
      // e.material = materiel
      e.material = materiel
    }
  })

  return (
    <>
      <Canvas shadows flat linear>
        <color attach="background" args={["#defaf9"]} />
        <Perf position="top-left" />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={ambiantIntensity}
          color="#eaeaea"
        />
        <directionalLight
          ref={lightRef}
          color={color}
          layers={layers}
          position={[lightX, lightY, lightZ]}
          intensity={lightIntensity}
          shadow-bias={-0.001}
          shadow-mapSize={[4096, 4096]}
          shadow-camera-left={-150}
          shadow-camera-right={150}
          shadow-camera-top={150}
          shadow-camera-bottom={-150}
          castShadow
        />
        <OrbitControls makeDefault />

        <primitive object={city.scene} />
      </Canvas>
    </>
  )
}
