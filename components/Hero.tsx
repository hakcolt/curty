import { Validation } from "@hakcolt/validator"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { HomeContext } from "../src/providers/home/HomeProvider"
import SearchBar from "./SearchBar"

export default function Hero() {
  const [error, setError] = useState("")
  const { linkForm, dialog } = useContext(HomeContext)
  const { register, handleSubmit } = useForm()

  function openForm({ url }) {
    if (!Validation.URL_REGEX.test(url)) return setError("Invalid URL")
    setError("")
    linkForm.url = url
    dialog.setShow(true)
  }

  return (
    <div className="lg:px-8 px-6 pt-20 sm:pt-24">
      <h1 className="text-neutral-200 text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
        Rapidly create short URLs without ads
      </h1>
      <p className="mt-8 text-lg leading-8 text-neutral-400 font-bold sm:text-center">
        A full open source project made with typescript and most modern frontend and backend frameworks. Visit our github repo to learn more.
      </p>
      <SearchBar
        name="url"
        type="url"
        label="Insert your link here"
        register={ register("url", { required: true }) }
        submit={ handleSubmit(openForm as any) }
        className="sm:mt-20 mt-10" />
      { error && <p className="text-white inline-block bg-red-500 p-2 px-4 text-sm mt-4 rounded-md">Invalid URL</p> }
    </div>
  )
}
