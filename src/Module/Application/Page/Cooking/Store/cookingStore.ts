import { create } from "zustand"
import {
  createSelector,
  SelectorSceneInterface,
} from "@/Module/Shared/Application/createSelectorsByScene.ts"
export interface CookingGameInterface {
  selectors: SelectorSceneInterface
}

export const useCookingGameStore = create<CookingGameInterface>((set) => ({
  selectors: createSelector(),
}))
