import { useGLTF, useVideoTexture } from "@react-three/drei"
import { Model } from "@/Module/Shared/Application/Model/getModel.ts"
import { RigidBody } from "@react-three/rapier"

const videoUrl = "https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4"

function chairPositionGenerator(): Array<[number, number, number]> {
  const chairPosition: Array<[number, number, number]> = []

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      chairPosition.push([i - 5, 0.1, j])
    }
  }

  return chairPosition
}

export function CinemaChairComponent() {
  const chairModel = useGLTF(Model.CHAIR)
  const videoMap = useVideoTexture(videoUrl)
  const videoSize = 7
  return (
    <>
      <mesh position={[5, 3, 3]} rotation={[0, -1.5, 0]}>
        <planeGeometry args={[videoSize, videoSize / 1.6]} />
        <meshBasicMaterial map={videoMap} toneMapped={false} />
      </mesh>
      {chairPositionGenerator().map((position) => {
        const mesh = chairModel.scene.clone()
        return (
          <RigidBody
            key={mesh.uuid}
            type="dynamic"
            colliders="hull"
            position={position}
          >
            <primitive
              castShadow={true}
              object={mesh}
              scale={0.2}
              rotation-y={Math.PI / 2}
            />
          </RigidBody>
        )
      })}
    </>
  )
}
