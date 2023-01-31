import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useContext } from "react"
import { HomeContext } from "../../src/providers/home/HomeProvider"
import DialogContent from "./DialogContent"

export default function FormModal() {
  const { dialog } = useContext(HomeContext)
  return (
    <Transition.Root show={ dialog.show } as={ Fragment }>
      <Dialog as="div" className="relative z-10" onClose={ dialog.setShow }>
        { /* Backdrop */ }
        <Transition.Child
          as={ Fragment }
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        { /* Full-screen scrollable container */ }
        <div className="fixed inset-0 z-10 overflow-y-auto">
          { /* Container to center the panel */ }
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogContent />
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}