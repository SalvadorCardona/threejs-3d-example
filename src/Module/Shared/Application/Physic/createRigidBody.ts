import { Mesh, Object3D, SphereGeometry } from "three"
import { Body, Box, Plane, Vec3, Sphere } from "cannon-es"
import object3DToBox from "@/Module/Shared/Application/object3DToBox.ts"
import { createConvexPolyhedron } from "@/Module/Shared/Application/Physic/CannonDebugRenderer.ts"
import { ConvexGeometry } from "three-stdlib"
import getDelta from "@/Module/Shared/Application/Math/getDelta.ts"

export default function createRigidBody(object3d: Mesh): Body {
  const { width, height, depth } = object3DToBox(object3d)
  const position = object3d.position
  const quaternion = object3d.quaternion
  const geometry = object3d.geometry

  if (object3d.name === "ground") {
    const floorShape = new Plane()
    const floorBody = new Body()
    floorBody.mass = 0
    floorBody.addShape(floorShape)
    floorBody.quaternion.setFromAxisAngle(new Vec3(-1, 0, 0), Math.PI * 0.5)

    return floorBody
  }

  let shape = new Box(new Vec3(width * 0.5, height * 0.5, depth * 0.5))
  if (geometry instanceof SphereGeometry) {
    shape = new Sphere(width * 0.5)
  }
  const body = new Body({
    mass: 0.1,
    shape: shape,
  })

  body.mass = 1
  body.position.set(position.x, position.y, position.z)
  body.quaternion.x = quaternion.x
  body.quaternion.z = quaternion.z
  body.quaternion.y = quaternion.y

  return body
}
