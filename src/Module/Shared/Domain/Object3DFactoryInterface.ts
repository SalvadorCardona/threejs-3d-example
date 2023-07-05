import CoordinableInterface from "@/Module/Shared/Domain/CoordinableInterface.ts"
import { Object3D } from "three"

export interface Object3Data<T> {
  position?: CoordinableInterface
  rotation?: CoordinableInterface
  data?: null | T
}

export default interface Object3DFactoryInterface<T> {
  (args: Object3Data<T>): Object3D
}

export interface Object3DFactoryAsyncInterface<T> {
  (args: Object3Data<T>): Promise<Object3D>
}
