import { shaderMaterial } from "@react-three/drei"
import { Color } from "three"
import vertex from "./vertex.glsl?raw"
import fragment from "./fragment.glsl?raw"

export const customMasterial = shaderMaterial(
  { time: 0, color: new Color(0.2, 0.0, 0.1) },
  // vertex shader
  /*glsl*/ vertex,
  // fragment shader
  /*glsl*/ fragment
)
