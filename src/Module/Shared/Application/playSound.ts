import {
  AudioLoader,
  Audio as ThreeAudio,
  AudioListener as ThreeAudioListener,
} from "three"

export default function playSound(soundUrl: string): Promise<ThreeAudio> {
  const listener = new ThreeAudioListener()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sound = new ThreeAudio(listener)

  const audioLoader = new AudioLoader()
  return new Promise((resolve) => {
    audioLoader.load(soundUrl, function (buffer) {
      sound.setBuffer(buffer)
      sound.setVolume(0.5)
      sound.play()
      resolve(sound)
    })
  })
}
