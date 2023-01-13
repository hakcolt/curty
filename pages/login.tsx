import Head from 'next/head'
import { LockClosedIcon } from "@heroicons/react/24/solid"
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext, AuthProvider } from '../src/contexts/AuthContext'
import Image from "next/image"

import logoPlusImage from "../public/images/logo_plus.svg"
import Button from "../components/Button"
import InputType from "../components/InputType"
import CheckBox from "../components/CheckBox"

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data) {
    await signIn(data)
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Login</title>
          <link rel="shortcut icon" href="/images/logo_simple_white.svg" type="image/x-icon" />
        </Head>

        <div className="max-w-sm w-full">
          <Image
            className="mx-auto"
            style={
              {
                width: "100%",
                height: "150px",
                objectFit: "cover"
              }
            }
            src={ logoPlusImage }
            width={ 500 }
            height={ 150 }
            alt="Workflow"></Image>

          <h2 className="mt-10 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

          <form className="mt-8 space-y-6" onSubmit={ handleSubmit(handleSignIn) }>
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

            <div className="flex items-center justify-between">
              <CheckBox
                label="Remember me"
                registerForm={ register("remember") }
                name="remember"
                className="h-4 w-4"
              />

              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button className={ "w-full" }></Button>
          </form>
        </div>
      </div>
    </AuthProvider>
  )
}
