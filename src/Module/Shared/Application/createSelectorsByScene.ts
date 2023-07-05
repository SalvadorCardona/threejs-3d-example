import { Group, Mesh, Object3D, Scene, Vector3 } from "three"

export interface SelectorSceneInterface {
  objects: {
    [key: string]: Object3D[] | Mesh[]
  }
  add: (name: string, object: Object3D | Mesh) => void
  get: (name: string) => Object3D | Mesh | null
  getAll: (name: string) => Object3D[] | Mesh[] | null
  has: (name: string) => boolean
  getAbsolutePosition: (name: string) => Vector3 | null
}

export function createSelector(): SelectorSceneInterface {
  return {
    objects: {},
    add: function (name, object3d) {
      if (!this.has(name)) this.objects[name] = []
      this.objects[name].push(object3d)
    },
    has: function (name: string) {
      return Object.hasOwn(this.objects, name)
    },
    get: function (name) {
      if (this.has(name)) return this.objects[name][0]
      return null
    },
    getAbsolutePosition: function (name) {
      const object3D = this.get(name)
      if (!object3D) return object3D

      const position = new Vector3()
      return position.setFromMatrixPosition(object3D.matrixWorld)
    },
    getAll: function (name) {
      if (this.has(name)) return this.objects[name]
      return null
    },
  }
}
export default function createSelectorsByScene(
  scene: Scene | Group
): SelectorSceneInterface {
  const selectors: SelectorSceneInterface = createSelector()

  scene.traverse((object) => {
    if (object.name.includes("#")) {
      const regex = /#[a-zA-Z0-9_]+/g
      object.name?.match(regex).forEach((selector) => {
        selectors.add(selector, object)
      })
    }
  })

  return selectors
}
