import { ActionCallBackInterface } from "@/Module/Game/Application/GameStore.ts"
import { Object3D, Raycaster, Vector2, Vector3, Intersection } from "three"

const objects: Object3D[] = []

export function addRayMouseObject(object: Object3D) {
  objects.push(object)
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const rayCaster = new Raycaster()
let currentIntersect: Intersection | null = null
const rayDirection = new Vector3(10, 0, 0)
rayDirection.normalize()
const mouse = new Vector2()

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1
  mouse.y = -(event.clientY / sizes.height) * 2 + 1
})

window.addEventListener("click", () => {
  if (!currentIntersect) return
  console.log(currentIntersect)
})

export const MouseRayCasterAction: ActionCallBackInterface = (gameStore) => {
  rayCaster.setFromCamera(mouse, gameStore.camera)
  const intersects = rayCaster.intersectObjects(objects)

  if (intersects.length) {
    if (!currentIntersect) {
      console.log("mouse enter", currentIntersect)
    }

    currentIntersect = intersects[0]
  } else {
    if (currentIntersect) {
      console.log("mouse leave", currentIntersect)
    }

    currentIntersect = null
  }
}
