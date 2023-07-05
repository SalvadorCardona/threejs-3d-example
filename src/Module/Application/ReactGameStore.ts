import { create } from "zustand"
import { Camera, Group } from "three"

interface ReactGameStoreInterface {
  player: null | Group
  camera: Camera | null
}

export const useReactGameStore = create<ReactGameStoreInterface>(() => ({
  player: null,
  camera: null,
}))
