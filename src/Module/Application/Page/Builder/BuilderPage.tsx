import { Canvas } from "@react-three/fiber"
import { OrbitControls, OrthographicCamera } from "@react-three/drei"
import { GroundComponent } from "@/Module/Application/Page/Builder/Component/GroundComponent.tsx"
import { BatimentInterfaceComponent } from "@/Module/Application/Page/Builder/Component/BatimentInterfaceComponent.tsx"

export function BuilderPage() {
  return (
    <>
      <BatimentInterfaceComponent></BatimentInterfaceComponent>
      <Canvas shadows flat linear>
        <color attach="background" args={["skyblue"]} />
        <OrthographicCamera
          name="1"
          makeDefault={true}
          zoom={0.5}
          far={100000}
          near={-100000}
          position={[-444.64, 1022.11, 323.49]}
          rotation={[-1.2, -0.31, -0.67]}
          scale={1}
        />
        <OrbitControls makeDefault />
        <GroundComponent></GroundComponent>
      </Canvas>
    </>
  )
}
