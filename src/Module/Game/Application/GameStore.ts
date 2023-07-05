import {
  Clock,
  DirectionalLight,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Renderer,
  Scene,
} from "three"
import createCamera from "@/Module/Game/Object3d/Camera/createCamera.ts"
import createScene from "@/Module/Game/Render/createScene.ts"
import GUI from "lil-gui"
import createRender from "@/Module/Game/Render/createRender.ts"
import createDirectionalLight from "@/Module/Game/Object3d/createDirectionalLight.ts"
import { Body, World } from "cannon-es"
import createRigidBody from "@/Module/Shared/Application/Physic/createRigidBody.ts"
import createWorld from "@/Module/Shared/Application/Physic/createWorld.ts"

export interface ActionCallBackInterface {
  (gameState: GameStateInterface): void
}

export interface ItemObject3DInterface {
  mesh: Mesh | Object3D
  body: Body | null
}

export interface ListObject3DInterface {
  [key: string]: ItemObject3DInterface
}

export interface GameStateInterface {
  items: ListObject3DInterface
  world: World
  clock: Clock
  lastFrameTime: number
  getDeltaTime: () => number
  gui: GUI | null
  container: HTMLDivElement | null
  gameObject: Object3D[]
  actions: ActionCallBackInterface[]
  player: ItemObject3DInterface | null
  camera: PerspectiveCamera
  scene: Scene
  light: DirectionalLight
  renderer: Renderer
  add: (item: Object3D) => ItemObject3DInterface
  addToRigidBody: (item: Mesh) => ItemObject3DInterface
  remove: (item: Object3D) => void
  render: () => void
  start: () => void
  addAction: (action: ActionCallBackInterface) => void
}

function createGameState(): GameStateInterface {
  const light = createDirectionalLight()
  const scene = createScene()
  scene.add(light)

  return {
    items: {},
    world: createWorld(),
    clock: new Clock(),
    lastFrameTime: 0,
    light: light,
    gui: null,
    actions: [],
    container: null,
    scene: scene,
    renderer: createRender(),
    gameObject: [],
    player: null,
    camera: createCamera(),
    add: function (item: Object3D) {
      const id = item.uuid

      this.items[id] = {
        mesh: item,
        body: null,
      }

      this.scene.add(item)

      return this.items[id]
    },
    addToRigidBody: function (item: Mesh): ItemObject3DInterface {
      const id = item.uuid

      const body = createRigidBody(item)

      this.items[id] = {
        mesh: item,
        body: body,
      }

      this.scene.add(item)
      this.world.addBody(body)

      return this.items[id]
    },
    remove: function (item: Object3D) {
      this.scene.remove(item)
      this.render()
    },
    render: function () {
      this.renderer.render(this.scene, this.camera)
    },
    start: function () {
      const tick = () => {
        this.actions.map((action) => action(this))
        Object.keys(this.items)
          .filter((key) => this.items[key].body)
          .forEach((key) => {
            const item = this.items[key]
            const mesh = item.mesh
            const body = item.body as Body

            mesh.position.copy(body.position)
            mesh.quaternion.copy(body.quaternion)
          })
        this.world.step(1 / 60, this.getDeltaTime(), 3)
        this.render()
        this.lastFrameTime = this.clock.getElapsedTime()
        window.requestAnimationFrame(tick)
      }

      tick()
    },
    addAction: function (action: ActionCallBackInterface) {
      this.actions.push(action)
    },
    getDeltaTime: function () {
      return this.clock.getElapsedTime() - this.lastFrameTime
    },
  }
}

let gameState: GameStateInterface | null = null

export function useGameStore(
  container: HTMLDivElement | null = null
): GameStateInterface | null {
  if (container && !gameState) {
    if (gameState && gameState.scene.children.length > 0) {
      gameState.scene.remove(...gameState.scene.children)
    }
    gameState = createGameState()
    gameState.container = container as HTMLDivElement
    gameState.container.appendChild(gameState.renderer.domElement)

    gameState.render()
  }

  return gameState
}
