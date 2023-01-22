import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { HomeContext } from "../src/providers/home/HomeProvider"

export default function SearchBar({ className }) {
  const { pushLink } = useContext(HomeContext)
  const { register, handleSubmit } = useForm()

  function onSubmit(data) {
    const url = data?.url
    pushLink({
      name: "Test 3",
      path: "/que",
      url
    })
  }

  return (
    <div className={ className + " place-items-center flex rounded-lg center border border-gray-800 bg-gray-700 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-red-900" }
    >
      <form onSubmit={ handleSubmit(onSubmit) } className="flex place-content-center w-full">
        <input
          { ...register("url") }
          name="url"
          type="url"
          className="p-2 w-full appearance-none rounded-none bg-transparent ml-2 border-0 placeholder-gray-300 text-gray-100 rounded-t-md focus:outline-none focus:ring-transparent focus:border-transparent focus:z-10 sm:text-base text-base"
          placeholder="Insert your link here">
        </input>

        <button>
          <ArrowRightIcon fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 hover:text-red-900 text-gray-100 h-6 w-5"></ArrowRightIcon>
        </button>
      </form>
    </div>
  )
}