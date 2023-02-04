import Head from 'next/head'
import Image from "next/image"
import logoPlusImage from "../../public/images/logo-plus.svg"
import Router from "next/router"
import { NextPageContext } from "next"
import nookies from "nookies"
import LoginForm from "./LoginForm"
import { refreshTokenRequest } from "../../src/lib/auth"

export async function getServerSideProps(ctx: NextPageContext) {
  let { "curty.authMode": authMode } = nookies.get(ctx)

  const redirect = {
    destination: '/',
    permanent: false
  }

  try {
    if (authMode !== "keep-logged") return { props: {} }

    const res = await refreshTokenRequest(ctx)
    if (!res._isSuccess) return { props: {} }

    const serverAccessToken = res.data
    nookies.set(ctx, "curty.accessToken", serverAccessToken.token, {
      expires: new Date(serverAccessToken.expiresAt)
    })
    return { redirect }

    // TODO: axios
  } catch (e: any) {
    if (process.env.NODE_ENV === "development") console.log(e)
    return { props: { serverError: "Serve unavailable" } }
  }
}

export default function Login({ serverError }) {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="shortcut icon" href="/images/logo-simple.svg" type="image/x-icon" />
      </Head>

      <div>
        {
          serverError &&
            <p className="sm:max-w-sm w-full m-auto bg-red-500 text-neutral-300 px-3 py-1 text-center text-sm rounded-md">{ serverError }</p>
        }

        <div className="max-w-sm flex flex-col m-auto items-center sm:px-2 px-5 pt-14">
          <Image
            className="mx-auto mt-6"
            src={ logoPlusImage }
            width={ 500 }
            height={ 200 }
            alt="Logo" />

          <h2 className="mt-16 text-center text-3xl font-extrabold text-neutral-100">Sign in to your account</h2>

          <LoginForm />

          <p className="text-sm w-full mt-2 text-neutral-200">You don't have a account? <button className="text-red-500 hover:text-red-400" onClick={ () => Router.push("/register") }>Sign up</button>.</p>
        </div>
      </div>
    </>
  )
}


