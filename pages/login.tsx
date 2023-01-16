import Head from 'next/head'
import { useForm } from 'react-hook-form'
import Image from "next/image"
import logoPlusImage from "../public/images/logo_plus.svg"
import FormButton from "../components/form/Button"
import InputType from "../components/form/InputType"
import CheckBox from "../components/CheckBox"
import { LoginInput, useAuth } from "../src/providers/auth"
import Router from "next/router"
import { useState } from "react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export default function Login() {
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>()

  const { logIn } = useAuth()

  const onSubmit = async (data: LoginInput) => {
    try {
      await logIn(data)
      Router.push("/")
    } catch (e: any) { setError(e.message) }
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login</title>
        <link rel="shortcut icon" href="/images/logo_simple_white.svg" type="image/x-icon" />
      </Head>

      <div className="max-w-sm w-full">
        <Image
          className="mx-auto"
          style=
          { {
            width: "100%",
            height: "150px",
            objectFit: "cover"
          } }
          src={ logoPlusImage }
          width={ 500 }
          height={ 150 }
          alt="Workflow"></Image>

        <h2 className="mt-10 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

        <form className="mt-8 space-y-6" onSubmit={ handleSubmit(onSubmit) }>
          <div className="shadow-sm">
            <InputType
              label="Email adress"
              registerForm={ register("email") }
              className="w-full rounded-t-md"
              name="email"
              type="email"
              autoComplete="email"
              required
            ></InputType>

            <InputType
              label="Password"
              registerForm={ register('password') }
              className="w-full rounded-b-md"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            ></InputType>
          </div>
          {
            error ?
              (<div className="flex items-center bg-red-300 p-4 rounded-md gap-3">
                <ExclamationTriangleIcon className="h-6 w-6 flex-shrink-0"></ExclamationTriangleIcon>
                <p>{ error }</p>
              </div>) : ""
          }

          <div className="flex items-center justify-between">
            { /* TODO */ }
            <CheckBox
              label="Remember me"
              registerForm={ {} }
              name="remember"
              className="h-4 w-4"
            />

            <div className="text-sm">
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <FormButton className={ "w-full" } isLoading={ isSubmitting }>Sign in</FormButton>
        </form>
      </div>
    </div>
  )
}
