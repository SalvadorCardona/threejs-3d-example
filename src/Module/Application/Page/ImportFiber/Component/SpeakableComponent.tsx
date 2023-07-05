import { Box3, Object3D, Vector3 } from "three"
import { useState } from "react"
import { Billboard, Html, useKeyboardControls } from "@react-three/drei"
import { useSplineGameStore } from "@/Module/Application/Page/ImportFiber/Store/SplineGameStore.ts"
import { useFrame } from "@react-three/fiber"
import { useModalDialogue } from "@/Module/Application/Page/ImportFiber/Component/ModalSpeakableComponent.tsx"

const dialogueText: string[] = [
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciun",
  " Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore",
]

export function SpeakableComponent(props: { object3d: Object3D }) {
  const [showE, setShowE] = useState<boolean>(false)
  let boundingBox = new Box3().setFromObject(props.object3d)
  let height = boundingBox.max.y - boundingBox.min.y
  let width = boundingBox.max.x - boundingBox.min.x
  const store = useSplineGameStore()
  const [, get] = useKeyboardControls()
  const modalDialogue = useModalDialogue()

  useFrame(() => {
    const { enter } = get()
    if (enter && showE) {
      modalDialogue.targetName = "Sam"
      modalDialogue.dialogue = dialogueText
      modalDialogue.open()
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
          props.object3d.position.x - width / 2,
          props.object3d.position.y + height * 1.2,
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
