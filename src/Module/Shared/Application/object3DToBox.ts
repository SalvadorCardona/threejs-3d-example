import { Box3, Mesh, Object3D, Vector3 } from "three"
import { createConvexPolyhedron } from "@/Module/Shared/Application/Physic/CannonDebugRenderer.ts"
import { TextGeometry } from "three-stdlib"

interface BoxInterface {
  width: number
  height: number
  depth: number
}
export default function object3DToBox(object3D: Object3D): BoxInterface {
  const type = object3D.type
  let width = 0
  let height = 0
  let depth = 0
  let minX = Infinity
  let minY = Infinity
  let minZ = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let maxZ = -Infinity

  if (type === "Group") {
    const groupSize = new Vector3()
    object3D.traverse(function (child) {
      if (child instanceof Mesh) {
        child.geometry.computeBoundingBox()
        const boundingBox = child.geometry.boundingBox
        boundingBox.min.add(child.position)
        boundingBox.max.add(child.position)

        minX = Math.min(minX, boundingBox.min.x)
        minY = Math.min(minY, boundingBox.min.y)
        minZ = Math.min(minZ, boundingBox.min.z)
        maxX = Math.max(maxX, boundingBox.max.x)
        maxY = Math.max(maxY, boundingBox.max.y)
        maxZ = Math.max(maxZ, boundingBox.max.z)
        console.log(child)
        const objectSize = new Box3().setFromObject(child)
        groupSize.max(objectSize.getSize(groupSize))
      }
    })

    // return {
    //   width: groupSize.x,
    //   height: groupSize.y,
    //   depth: groupSize.z,
    // }
    width = maxX - minX
    height = maxY - minY
    depth = maxZ - minZ

    return {
      width,
      height,
      depth,
    }
  }

  const boundingBox = new Box3().setFromObject(object3D)
  const size = new Vector3()
  const finalSize = boundingBox.getSize(size)
  width = finalSize.x
  height = finalSize.y
  depth = finalSize.z

  return {
    width,
    height,
    depth,
  }
}
