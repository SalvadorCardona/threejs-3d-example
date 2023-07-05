export default function generateRandomNumber(
  min: number,
  max: number,
  isFloatNumber: boolean = false
): number {
  const result = Math.random() * (max - min) + min

  return !isFloatNumber ? Math.floor(result) : result
}
