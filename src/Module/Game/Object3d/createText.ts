import Object3DFactoryInterface from "@/Module/Shared/Domain/Object3DFactoryInterface.ts"
import { Mesh, MeshBasicMaterial } from "three"
import { FontLoader, TextGeometry } from "three-stdlib"
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json"
import getDelta from "@/Module/Shared/Application/Math/getDelta.ts"

export const createText: Object3DFactoryInterface<{ text: string }> = (args) => {
  const fontLoader = new FontLoader()
  const textGeometry = new TextGeometry(args?.data?.text ?? "Text empty", {
    font: fontLoader.parse(typefaceFont),
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
  })
  const textMaterial = new MeshBasicMaterial()
  const mesh = new Mesh(textGeometry, textMaterial)
  mesh.position.set(0, 0, 0)
  mesh.castShadow = true
  mesh.geometry.computeBoundingBox()
  const bounty = mesh.geometry.boundingBox
  // mesh.translateX(getDelta(bounty?.min.x, bounty?.max.x) / 2)
  return mesh
}
