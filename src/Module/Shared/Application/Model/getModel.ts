import { GLTF } from "three-stdlib"
import GltfLoader from "@/Module/Shared/Application/GltfLoader.ts"

export enum Model {
  MINI_ROOM = "mini-room.gltf",
  CITY = "city.gltf",
  WOOD_ISLAND = "wood-island.gltf",
  CLOUD = "cloud.glb",
  BOAT = "boat_draft.glb",
  TRACTOR = "tractor.glb",
  SHOES_PLATFORM = "shoes-platform.glb",
  SHOES = "shoes.glb",
  CHARACTER = "character.glb",
  SPIN_BOWLING = "spin-bowling.glb",
  CHAIR = "chair.glb",
  CITY_BIG = "city.glb",
  IMPORT_FIBER = "import_fiber.glb",
}

export default function getModel(model: Model): Promise<GLTF> {
  return GltfLoader(model)
}
