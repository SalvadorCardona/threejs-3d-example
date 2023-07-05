import {
  KeyboardControls,
  OrbitControls,
  OrthographicCamera,
  useGLTF,
} from "@react-three/drei"
import sceneUrl from "./Asset/cooking.glb?url"
import { Canvas } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier"
import { PlayerComponent } from "@/Module/Application/Page/Cooking/Component/PlayerComponent.tsx"

import { useCookingGameStore } from "@/Module/Application/Page/Cooking/Store/cookingStore.ts"
import { ClientGeneratorComponent } from "@/Module/Application/Page/Cooking/Component/ClientGeneratorComponent.tsx"
import { Mesh } from "three"
import createSelectorsByScene from "@/Module/Shared/Application/createSelectorsByScene.ts"
import { SeaComponent } from "@/Module/Application/Page/Cooking/Component/SeaComponent.tsx"

export function CookingPage() {
  const gltf = useGLTF(sceneUrl)
  const store = useCookingGameStore()
  gltf.scene.traverse((object) => {
    object.castShadow = true
    object.receiveShadow = true
  })
  store.selectors = createSelectorsByScene(gltf.scene)

  return (
    <>
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
          <SeaComponent></SeaComponent>
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={1.2}
            color={"white"}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[-25, 50, 25]}
          />
          <OrthographicCamera
            name="1"
            makeDefault={true}
            zoom={2}
            far={100000}
            near={-100000}
            position={[-444.64, 1022.11, 323.49]}
            rotation={[-1.2, -0.31, -0.67]}
            scale={1}
          />
          <OrbitControls makeDefault />
          <ambientLight intensity={0.7} color="#white" />

          <Physics gravity={[0, -100, 0]}>
            <PlayerComponent></PlayerComponent>
            <RigidBody type="fixed" restitution={0} friction={0}>
              <primitive
                object={gltf.scene}
                castShadow
                receiveShadow
                scale={50}
              ></primitive>
            </RigidBody>
            <ClientGeneratorComponent></ClientGeneratorComponent>
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  )
}
