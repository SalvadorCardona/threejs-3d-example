import { Canvas, useFrame } from "@react-three/fiber"
import {
  Billboard,
  KeyboardControls,
  OrbitControls,
  OrthographicCamera,
  useGLTF,
  Html,
  useKeyboardControls,
} from "@react-three/drei"
import { Perf } from "r3f-perf"

import { Physics, RigidBody } from "@react-three/rapier"

import { Camera, Mesh, MeshPhongMaterial, Object3D } from "three"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { RigidBodyTypeString } from "@react-three/rapier/dist/declarations/src/types"
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react"
import { PlayerComponent } from "@/Module/Application/Page/ImportFiber/Component/PlayerComponent.tsx"
import { useControls } from "leva"
import playSound from "@/Module/Shared/Application/playSound.ts"
import { OpenAbleComponent } from "@/Module/Application/Page/ImportFiber/Component/OpenAbleComponent.tsx"
import { ModalComponent } from "@/Module/Application/Page/ImportFiber/Component/ModalComponent.tsx"
import { useSplineGameStore } from "@/Module/Application/Page/ImportFiber/Store/SplineGameStore.ts"
import { SpeakableComponent } from "@/Module/Application/Page/ImportFiber/Component/SpeakableComponent.tsx"
import { ModalSpeakableComponent } from "@/Module/Application/Page/ImportFiber/Component/ModalSpeakableComponent.tsx"

function getMainObject(objects: Object3D[]): Object3D[] {
  return objects.filter((object) => {
    return (
      object.name !== "" &&
      object.name !== "Default_Ambient_Light" &&
      object.type === "Object3D" &&
      object?.parent.name === ""
    )
  })
}
export function ImportFiber() {
  const gltf = useGLTF(Model.IMPORT_FIBER)
  const [meshFiltered] = useState<Object3D[]>([])
  const cameraRef = useRef<Camera>(null)
  const { ambientLight, color, lightIntensity, debug, sound } = useControls({
    debug: false,
    lightX: { value: 69, min: -600, max: 600, step: 1 },
    lightY: { value: 234, min: -600, max: 600, step: 1 },
    lightZ: { value: 41, min: -600, max: 600, step: 1 },
    lightIntensity: { value: 0.8, min: 0, max: 3, step: 0.05 },
    ambientLight: { value: 1.2, min: 0, max: 3, step: 0.05 },
    sound: false,
  })
  const store = useSplineGameStore()

  if (sound) {
    playSound("/sound/theme-music.wav")
  }

  gltf.scene.traverse((node: Mesh) => {
    if (
      [
        "Scene",
        "DirectionalLight",
        "HemisphereLight",
        "OrthographicCamera",
        "PerspectiveCamera",
      ].includes(node.type)
    )
      return false

    node.castShadow = true
    node.receiveShadow = true

    meshFiltered.push(node)
  })
  const material = new MeshPhongMaterial({
    color,
    opacity: 0.1,
    transparent: true,
  })

  return (
    <>
      <ModalComponent></ModalComponent>
      <ModalSpeakableComponent></ModalSpeakableComponent>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
          { name: "enter", keys: ["e", "enter"] },
        ]}
      >
        <Canvas shadows flat linear>
          <color attach="background" args={["skyblue"]} />
          <ambientLight intensity={ambientLight} />
          <directionalLight
            name="Directional Light 2"
            castShadow
            intensity={lightIntensity}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-3984.615}
            shadow-camera-right={3984.615}
            shadow-camera-top={3984.615}
            shadow-camera-bottom={-3984.615}
            position={[-1211.45, 1619.84, -88.42]}
          />
          {debug && <OrbitControls makeDefault />}
          {debug && <Perf position="top-left" />}
          <CameraComponent ref={cameraRef} />

          <Physics gravity={[0, -500, 0]} debug={debug}>
            <PlayerComponent></PlayerComponent>
            <RigidBody type="fixed" position={[-5, 80, 1]}>
              <mesh material={material}>
                <boxGeometry args={[100000, -30, 100000]} />
              </mesh>
            </RigidBody>
            {getMainObject(meshFiltered).map((nodes) => (
              <StrategyComponent key={nodes.uuid} object3d={nodes} />
            ))}
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  )
}

function StrategyComponent(props: { object3d: Object3D }): JSX.Element {
  const { object3d } = props
  let baseComponent = <primitive object={object3d}></primitive>
  if (!object3d.name.includes("#")) return baseComponent

  let type: RigidBodyTypeString = object3d.name.includes("#fixed")
    ? "fixed"
    : "dynamic"

  if (object3d.name.includes("#openable")) {
    baseComponent = <OpenAbleComponent object3d={object3d} />
  }

  if (object3d.name.includes("#speakable")) {
    baseComponent = <SpeakableComponent object3d={object3d} />
    type = "fixed"
  }

  return (
    <RigidBody type={type} colliders={"cuboid"} mass={10}>
      {baseComponent}
    </RigidBody>
  )
}

const CameraComponent = forwardRef((props: {}, ref: ForwardedRef<Camera>) => {
  return (
    <OrthographicCamera
      {...props}
      ref={ref}
      name="1"
      makeDefault={true}
      zoom={0.5}
      far={100000}
      near={-100000}
      position={[953.19, 1335.05, 2196.01]}
      rotation={[-0.59, 0.37, 0.24]}
    />
  )
})
