import { NextPageContext } from "next"
import Head from "next/head"
import nookies from "nookies"
import { refreshTokenRequest } from "../../src/lib/auth"
import UFormHeader from "./UFormHeader"
import UserForm from "./UserForm"

export async function getServerSideProps(ctx: NextPageContext) {
  const { "curty.authMode": authMode } = nookies.get(ctx)

  const redirect = {
    destination: "/",
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
  } catch (e: unknown) {
    if (process.env.NODE_ENV === "development") console.log(e)
    return { props: { serverError: "Serve unavailable" } }
  }
}

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
        <link rel="shortcut icon" href="/images/logo-simple.svg" type="image/x-icon" />
      </Head>

      <div className="min-h-screen pb-4 flex items-center justify-center">
        <div className="md:grid md:grid-cols-3">
          <div className="md:col-span-1 md:flex md:text-center md:items-center">
            <UFormHeader />
          </div>
          
          <div className="mt-5 md:col-span-2 md:mt-0 md:px-5">
            <UserForm />
          </div>
        </div>
      </div>
    </>
  )
}