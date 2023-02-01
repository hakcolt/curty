import { Validation } from "@hakcolt/validator"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { HomeContext } from "../../src/providers/home/HomeProvider"
import FormButton from "../form/Button"
import InputForm from "../form/InputForm"

export default function DialogContent() {
  const { linkForm, pushLink, dialog } = useContext(HomeContext)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const [error, setError] = useState("")

  async function onSubmit(data) {
    if (!Validation.URL_PATH_REGEX.test(data.path)) return setError("Invalid path")
    linkForm.name = data.title
    linkForm.path = data.path
    try {
      setError("")
      await pushLink()
      dialog.setShow(false)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <Transition.Child
      as={ Fragment }
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <Dialog.Panel className="transform overflow-hidden rounded-lg bg-neutral-800 shadow-xl transition-all sm:my-8 max-w-lg">
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-neutral-200">
                Short link
              </Dialog.Title>

              <div className=" w-full box-border text-neutral-400 text-center bg-neutral-900 p-1 px-4 mt-3 text-sm rounded-md">
                <p className="w-full whitespace-nowrap overflow-hidden">{ linkForm.url }</p>
              </div>

              <InputForm
                register={ register("title") }
                id="title"
                name="title"
                type="text"
                label="Title"
                className={ "mt-4 w-full rounded-md" }
                placeholder />

              <InputForm
                register={ register("path", { required: true }) }
                id="path"
                name="path"
                type="text"
                label="/path *"
                className={ "w-full mt-2 rounded-md" }
                placeholder />
              <p className="mt-1 text-red-300 text-xs">{ error }</p>
            </div>
          </div>

          <div className="bg-neutral-800 gap-2 px-4 py-3 flex flex-col sm:flex-row-reverse sm:px-6">
            <FormButton
              className="w-full sm:w-auto sm:shrink-0"
              isLoading={ isSubmitting }
            >Save</FormButton>
            <button
              type="button"
              className="w-full sm:w-auto sm:shrink-0 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-neutral-200 bg-neutral-700 hover:bg-neutral-600 focus:ring-2 focus:ring-red-600"
              onClick={ () => dialog.setShow(false) }
            >Cancel</button>
          </div>
        </form>
      </Dialog.Panel>
    </Transition.Child>
  )
}