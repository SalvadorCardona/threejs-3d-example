import { create } from "zustand"
import { RapierRigidBody } from "@react-three/rapier"
import { Object3D } from "three"

export interface SplineGameStoreInterface {
  player: RapierRigidBody | null
  moveHandlers: Array<(store: SplineGameStoreInterface) => void>
  move: () => void
  onMove: (action: (store: SplineGameStoreInterface) => void) => void
  foodGivenHandlers: Array<(object: Object3D) => void>
  foodGiven: (object: Object3D) => void
  onFoodGiven: (action: (object: Object3D) => void) => void
}

export const useSplineGameStore = create<SplineGameStoreInterface>(() => ({
  player: null,
  moveHandlers: [],
  move: function () {
    this.moveHandlers.forEach((handler) => handler(this))
  },
  onMove: function (action) {
    this.moveHandlers.push(action)
  },
  foodGivenHandlers: [],
  foodGiven: function (object: Object3D) {
    this.foodGivenHandlers.forEach((handler) => handler(object))
  },
  onFoodGiven: function (action) {
    this.foodGivenHandlers.push(action)
  },
}))
