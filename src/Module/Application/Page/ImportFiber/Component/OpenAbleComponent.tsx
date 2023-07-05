import { Box3, Object3D, Vector3 } from "three"
import { useState } from "react"
import { useSplineGameStore } from "@/Module/Application/Page/ImportFiber/Store/SplineGameStore.ts"
import { Billboard, Html, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useModal } from "@/Module/Application/Page/ImportFiber/Component/ModalComponent.tsx"

export function OpenAbleComponent(props: { object3d: Object3D }) {
  const [showE, setShowE] = useState<boolean>(false)
  let boundingBox = new Box3().setFromObject(props.object3d)
  let height = boundingBox.max.y - boundingBox.min.y
  let width = boundingBox.max.x - boundingBox.min.x
  const store = useSplineGameStore()
  const modal = useModal()
  const [, get] = useKeyboardControls()

  useFrame(() => {
    const { enter } = get()
    if (enter && showE) {
      console.log("test")
      modal.modalContent = <ModalContent></ModalContent>
      modal.open()
    }
  })
  store.onMove(() => {
    const translation = store.player?.translation()
    const vector = new Vector3(translation.x, translation.y, translation.z)
    if (translation && props.object3d.position.distanceTo(vector) < 500) {
      setShowE(true)
      return
    }
    setShowE(false)
  })
  return (
    <group>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[
          props.object3d.position.x - width / 4,
          props.object3d.position.y + height,
          props.object3d.position.z,
        ]}
      >
        <Html
          occlude
          style={{
            padding: 10,
            background: "rgba(255,255,255,0.5)",
          }}
        >
          <p>
            {showE && <span className={"accent-green-600 border p-2"}>E</span>}
            Interargir
          </p>
        </Html>
      </Billboard>
      <primitive object={props.object3d}></primitive>
    </group>
  )
}

function ModalContent(): JSX.Element {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold ">You're are win</h1>
      <div>
        <img src="./image/starving.png" alt="" />
      </div>
    </>
  )
}
