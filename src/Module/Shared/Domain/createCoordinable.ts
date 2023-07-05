import CoordinableInterface from "@/Module/Shared/Domain/CoordinableInterface.ts"
import { Object3D, Vector3 } from "three"

interface createCoordinableInterface {
  x?: number
  y?: number
  z?: number
}
export default function createCoordinable(
  args: createCoordinableInterface
): CoordinableInterface {
  return {
    ...{
      x: 0,
      y: 0,
      z: 0,
    },
    ...args,
  }
}

export function createCoordinableFromObject3D(
  object3d: Object3D
): CoordinableInterface {
  return {
    x: object3d.position.x,
    y: object3d.position.y,
    z: object3d.position.z,
  }
}

export function createVector3FromCoordinable(
  coordinable: CoordinableInterface
): Vector3 {
  return new Vector3(coordinable.x, coordinable.y, coordinable.z)
}
