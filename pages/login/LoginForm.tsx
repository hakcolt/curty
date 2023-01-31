import { Validation } from "@hakcolt/validator"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Router from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import FormButton from "../../components/form/Button"
import CheckBox from "../../components/form/CheckBox"
import InputForm from "../../components/form/InputForm"
import { LoginInput } from "../../src/lib/auth"
import { useAuth } from "../../src/providers/auth"

export default function LoginForm() {
  const [responseError, setResponseError] = useState<string | null>(null)
  const { logIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<LoginInput>()

  function validateData(data: LoginInput): boolean {
    if (!data.email || !data.password) return false
    const isEmailValid = Validation.EMAIL_REGEX.test(data.email)
    const isPasswordValid = Validation.PASSWORD_REGEX.test(data.password)
    return isEmailValid && isPasswordValid
  }

  const onSubmit = async (data: LoginInput) => {
    if (!validateData(data)) return setResponseError("Invalid email or password")
    setResponseError("")
    try {
      await logIn(data)
      Router.push("/")
    } catch (e: any) {
      setResponseError(e.message)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={ handleSubmit(onSubmit) }>
      <div className="shadow-sm">
        <InputForm
          id="email"
          placeholder
          label="Email adress"
          register={ register("email", { required: true }) }
          className="w-full rounded-t-md px-2 py-3"
          name="email"
          type="email" />

        <InputForm
          id="password"
          placeholder
          label="Password"
          register={ register("password", { required: true }) }
          className="w-full rounded-b-md px-2 py-3"
          name="password"
          type="password" />
      </div>
      {
        responseError ?
          (<div className="flex items-center bg-red-400 text-neutral-200 p-4 rounded-md gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-neutral-300 flex-shrink-0"></ExclamationTriangleIcon>
            <p>{ responseError }</p>
          </div>) : ""
      }

      <div className="flex items-center justify-between">
        { /* TODO */ }
        <CheckBox
          label="Remember me"
          register={ {} }
          id="checkbox"
          name="remember"
          className="h-4 w-4"
        />

        <div className="text-sm">
          <a href="#" className="font-medium text-red-600 hover:text-red-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <FormButton
        icon
        className={ "w-full" }
        isLoading={ isSubmitting }
      >Sign In</FormButton>
    </form>
  )
}