import { Billboard, Html, useGLTF } from "@react-three/drei"
import characterPath from "./../Asset/client.glb?url"
import { useCookingGameStore } from "@/Module/Application/Page/Cooking/Store/cookingStore.ts"
import { Box3, Group, Mesh, Object3D, Vector3 } from "three"
import { ThreeElements, useFrame } from "@react-three/fiber"
import {
  createRef,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { useSplineGameStore } from "@/Module/Application/Page/ImportFiber/Store/SplineGameStore.ts"

interface ClientInterface {
  currentClient: boolean
  position: Vector3
  hasDrink: boolean
  drunk: Object3D | null
  clientNumber: number
  ref: MutableRefObject<Group | null> | null
}

function createClient(args: Partial<ClientInterface>): ClientInterface {
  return {
    ...{
      currentClient: false,
      position: new Vector3(),
      hasDrink: false,
      drunk: null,
      clientNumber: 0,
      ref: createRef(),
    },
    ...args,
  }
}

const config = {
  clientNumber: 5,
  distanceBetweenClient: 50,
}

function generateClient(): ClientInterface[] {
  const clients = []

  for (let i = 0; i < config.clientNumber; i++) {
    const currentClient = i === 0
    const position = new Vector3(205 + config.distanceBetweenClient * i, 0.99, 157)

    const clientNumber = i
    const client = createClient({ currentClient, position, clientNumber })

    clients.push(client)
  }

  return clients
}

function addClient(clients: ClientInterface[]): ClientInterface {
  const lastClient = clients.pop()
  const position = lastClient?.position.clone()
  position?.setX(position?.x + config.distanceBetweenClient)

  return createClient({
    clientNumber: lastClient?.clientNumber + 1,
    position: position,
  })
}

export function ClientGeneratorComponent() {
  const cookingStore = useCookingGameStore()
  const gameStore = useSplineGameStore()
  const [ready, setReady] = useState(false)
  const gltf = useGLTF(characterPath)
  const character = gltf.scene
  const startPoint = cookingStore.selectors.getAbsolutePosition(
    "#generator"
  ) as Vector3
  const stopPoint = cookingStore.selectors.getAbsolutePosition(
    "#stopclient"
  ) as Vector3
  const drinks = cookingStore.selectors.getAll("#drink") as Mesh[]
  const [drink, setDrink] = useState<null | Object3D>(null)
  const [clients, setClients] = useState<ClientInterface[]>(generateClient())
  const [currentClient, setCurrentClient] = useState<ClientInterface>(clients[0])

  useFrame(() => {
    if (!ready) {
      setReady(true)
      return
    }
    const currentClientRef = currentClient.ref?.current as Group

    if (currentClientRef.position.x > stopPoint.x) {
      clients.forEach((client) => {
        if (!client.ref?.current) return
        const position = client.ref?.current?.position as Vector3
        position.setX(position.x - 1)
      })
    }
  })

  gameStore.onFoodGiven((object3d) => {
    setDrink(object3d)
    currentClient.drunk = object3d
    const newCurrentClient = clients[currentClient.clientNumber + 1]
    setCurrentClient(newCurrentClient)
    setClients([...clients, addClient(clients)])
  })

  return (
    <>
      {clients.map((client) => (
        <ClientComponent {...client} ref={client.ref} key={client.clientNumber} />
      ))}
    </>
  )
}

const ClientComponent = forwardRef(
  (props: ClientInterface, ref: ForwardedRef<Group>) => {
    const gltf = useGLTF<Group>(characterPath)
    const [ready, setReady] = useState<boolean>(false)
    const [rPosition, setRPosition] = useState<Vector3>(new Vector3())
    useEffect(() => {
      setRPosition(new Vector3(0, 50, 0))
      setReady(true)
    })
    const userRef = createRef()

    return (
      <group position={props.position} ref={ref}>
        {props.drunk && <primitive castShadow object={props.drunk} />}
        <primitive
          ref={userRef}
          castShadow
          object={gltf.scene.clone()}
          scale={20}
          rotation={[0, -Math.PI / 2, 0]}
        />
        {ready && (
          <Billboard
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false}
            position={rPosition}
          >
            <Html
              occlude
              style={{
                padding: 10,
                background: "rgba(255,255,255,0.5)",
              }}
            >
              <p>Cofee</p>
            </Html>
          </Billboard>
        )}
      </group>
    )
  }
)
