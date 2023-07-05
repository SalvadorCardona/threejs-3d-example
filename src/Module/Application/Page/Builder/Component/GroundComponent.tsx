export function GroundComponent() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4000, 4000, 40, 40]} />
      <meshBasicMaterial color={"#ccc"} />
    </mesh>
  )
}
