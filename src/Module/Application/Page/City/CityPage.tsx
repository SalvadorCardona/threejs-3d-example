import { Canvas } from "@react-three/fiber"
import { OrbitControls, OrthographicCamera, useGLTF, Stage } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useControls } from "leva"
import { Color, DirectionalLight, Layers, Mesh, MeshPhongMaterial } from "three"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { useRef } from "react"
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  BrightnessContrast,
} from "@react-three/postprocessing"
const layers = new Layers()

export function CityPage() {
  const lightRef = useRef<DirectionalLight>()
  const control = useControls({
    lightX: { value: 69, min: -600, max: 600, step: 1 },
    lightY: { value: 234, min: -600, max: 600, step: 1 },
    lightZ: { value: 41, min: -600, max: 600, step: 1 },
    lightIntensity: { value: 0.4, min: 0, max: 3, step: 0.05 },
    ambiantIntensity: { value: 1.5, min: 0, max: 3, step: 0.05 },
    lightColor: {
      value: "#fff",
      onChange: (value) => {
        lightRef.current?.color.set(value)
      },
    },
  })

  const depthOfField = useControls("DepthOfField", {
    focusDistance: { value: 1, min: 0, max: 10, step: 1 },
    focalLength: { value: 0.02, min: 0, max: 1, step: 0.01 },
    bokehScale: { value: 2, min: 0, max: 30, step: 1 },
    height: { value: 480, min: 0, max: 600, step: 1 },
    enabled: false,
  })

  const bloom = useControls("Boom", {
    luminanceThreshold: { value: 0.5, min: 0, max: 1, step: 0.01 },
    luminanceSmoothing: { value: 0.025, min: 0, max: 1, step: 0.005 },
    height: { value: 300, min: 0, max: 600, step: 1 },
    intensity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    enabled: false,
  })

  const noise = useControls("Noise", {
    opacity: { value: 0.009, min: 0, max: 1, step: 0.001 },
    enabled: false,
  })

  const vignette = useControls("Vignette", {
    darkness: { value: 0.5, min: 0, max: 2, step: 0.1 },
    offset: { value: 0.5, min: 0, max: 2, step: 0.1 },
    eskil: false,
    enabled: false,
  })

  const brightness = useControls("BrightnessContrast", {
    enabled: false,
    brightness: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.1,
    },
    constrast: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.1,
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
    }
  })

  return (
    <>
      <Canvas shadows flat linear>
        <EffectComposer>
          {depthOfField.enabled && (
            <DepthOfField
              focusDistance={depthOfField.focusDistance}
              focalLength={depthOfField.focalLength}
              bokehScale={depthOfField.bokehScale}
              height={depthOfField.height}
            />
          )}
          {bloom.enabled && (
            <Bloom
              intensity={bloom.intensity}
              luminanceThreshold={bloom.luminanceThreshold}
              luminanceSmoothing={bloom.luminanceSmoothing}
              height={bloom.height}
            />
          )}
          {noise.enabled && <Noise opacity={noise.opacity} />}
          {vignette.enabled && (
            <Vignette
              eskil={vignette.eskil}
              offset={vignette.offset}
              darkness={vignette.darkness}
            />
          )}
          {brightness.enabled && (
            <BrightnessContrast
              brightness={brightness.brightness}
              contrast={brightness.constrast}
            />
          )}
        </EffectComposer>
        <color attach="background" args={["#defaf9"]} />
        <Perf position="top-left" />

        <hemisphereLight
          name="Default Ambient Light"
          intensity={control.ambiantIntensity}
          color="#eaeaea"
        />
        <directionalLight
          ref={lightRef}
          color={control.lightColor}
          layers={layers}
          position={[control.lightX, control.lightY, control.lightZ]}
          intensity={control.lightIntensity}
          shadow-bias={-0.001}
          shadow-mapSize={[4096, 4096]}
          shadow-camera-left={-150}
          shadow-camera-right={150}
          shadow-camera-top={150}
          shadow-camera-bottom={-150}
          castShadow
        />
        <OrthographicCamera
          name="1"
          makeDefault={true}
          zoom={30}
          far={1000}
          near={-100000}
          position={[200, 200, 200]}
          rotation={[-0.59, 0.37, 0.24]}
        />
        <OrbitControls makeDefault />

        <primitive object={city.scene} />
      </Canvas>
    </>
  )
}
