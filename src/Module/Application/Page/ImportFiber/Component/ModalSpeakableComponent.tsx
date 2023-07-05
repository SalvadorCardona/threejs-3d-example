import { create } from "zustand"
export interface ModalDialogInterface {
  isOpen: boolean
  open: () => void
  modalContent: JSX.Element | null
  onClose: () => void
  dialogue: string[] | null
  targetName: string | null
}

export const useModalDialogue = create<ModalDialogInterface>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true })
  },
  onClose: () => {
    set({ isOpen: false })
  },
  modalContent: null,
  dialogue: null,
  targetName: null,
}))

export function ModalSpeakableComponent() {
  const { isOpen, onClose, dialogue } = useModalDialogue()
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") onClose()
  })
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-[12514807]">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className={"m-5 text-right"}>
                <button onClick={() => onClose()}>Close</button>
              </div>
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <div>
                    {dialogue && dialogue.map((content) => <p>{content}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
