import { Canvas } from "@react-three/fiber"
import { OrbitControls, OrthographicCamera } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { useControls } from "leva"
import { Physics, RigidBody } from "@react-three/rapier"
import useSpline from "@splinetool/r3f-spline"
import { Group, Mesh, Object3D } from "three"
import { EnvironementComponent } from "@/Module/Application/Page/FiberTest/Component/EnvironementComponent.tsx"

interface Model {
  nodes: Nodes
  materials: Materials
}

interface Material {
  uuid: string
}
interface Materials {
  [key: string]: Material
}

interface Nodes {
  [key: string]: {
    uuid: string
    parent: Object3D // | Mesh
    type:
      | "Scene"
      | "Group"
      | "Mesh"
      | "DirectionalLight"
      | "HemisphereLight"
      | "OrthographicCamera"
    data: {
      physics: {
        fusedBody: boolean
        rigidBody: "positioned"
        density: number
        pointMass: number
        gravityScale: number
        friction: number
        damping: number
        restitution: number
        colliderType: "convex"
        enabledRotation: [boolean, boolean, boolean]
        enabledTranslation: [boolean, boolean, boolean]
      }
    }
  }
}

export function ImportFiber() {
  const model = useSpline(
    "https://prod.spline.design/pOOUxPClBs3XmKkm/scene.splinecode"
  )
  const { nodes, materials } = model as Model

  const nodesFiltered = Object.values(nodes).filter((node) => {
    if (
      [
        "Scene",
        "DirectionalLight",
        "HemisphereLight",
        "OrthographicCamera",
      ].includes(node.type)
    )
      return false

    if (node.parent.type === "Scene") return true
    if (node.parent.type === "Group") return false

    return true
  })

  const { color, lightIntensity, lightX, lightY, lightZ, ...config } = useControls({
    lightX: { value: 69, min: -600, max: 600, step: 1 },
    lightY: { value: 234, min: -600, max: 600, step: 1 },
    lightZ: { value: 41, min: -600, max: 600, step: 1 },
    lightIntensity: { value: 0.5, min: 0, max: 3, step: 0.05 },
  })

  return (
    <>
      <Canvas shadows flat linear>
        <color attach="background" args={["skyblue"]} />
        <EnvironementComponent></EnvironementComponent>
        <OrbitControls makeDefault />
        <OrthographicCamera
          name="1"
          makeDefault={true}
          zoom={0.29}
          far={100000}
          near={-100000}
          position={[953.19, 1335.05, 2196.01]}
          rotation={[-0.59, 0.37, 0.24]}
        />
        <Perf position="top-left" />

        <Physics gravity={[0, 0, 0]} debug>
          <RigidBody type="dynamic" colliders="hull" position={[-5, 0.1, 1]}>
            <mesh castShadow>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </RigidBody>
          <RigidBody type="fixed" position={[-5, -10, 1]}>
            <mesh>
              <boxGeometry args={[10000, 0.5, 10000]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>
          {nodesFiltered.map((nodes) => (
            <StrategyComponent key={nodes.uuid} object3d={nodes} />
          ))}
        </Physics>
      </Canvas>
    </>
  )
}

function StrategyComponent(props: { object3d: Object3D }): JSX.Element {
  const { object3d } = props

  const component = <primitive object={object3d}></primitive>

  // return component
  return (
    <RigidBody position={object3d.position}>
      <primitive object={object3d}></primitive>
    </RigidBody>
  )
}

function MeshComponent(props: { mesh: Mesh; isRigidBody: false }): JSX.Element {
  const { mesh, isRigidBody } = props

  const meshComponent = (
    <mesh
      name={mesh.name}
      geometry={mesh.geometry}
      material={mesh.material}
      castShadow
      receiveShadow
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
    />
  )

  if (!isRigidBody) return meshComponent

  return (
    <RigidBody type="dynamic" colliders="hull">
      {meshComponent}
    </RigidBody>
  )
}

function GroupComponent(props: { group: Group; isRigidBody: false }): JSX.Element {
  const { group, isRigidBody } = props
  const position = group.position

  const groupComponent = (
    <group
      dispose={null}
      name={group.name}
      geometry={group.geometry}
      material={group.material}
      castShadow
      receiveShadow
      position={position}
      rotation={group.rotation}
      quaternion={group.quaternion}
      scale={group.scale}
    >
      {group.children.map((mesh) => (
        <StrategyComponent key={mesh.uuid} object3d={mesh}></StrategyComponent>
      ))}
    </group>
  )

  if (!isRigidBody) return groupComponent

  return (
    <RigidBody type="dynamic" colliders="hull">
      {groupComponent}
    </RigidBody>
  )
}
