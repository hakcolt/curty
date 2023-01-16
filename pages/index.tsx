import Head from "next/head"
import nookies from 'nookies'
import { NextPageContext } from 'next'
import Toolbar from "../components/toolbar"
import Hero from "../components/Hero"
import { refreshTokenRequest } from "../src/lib/auth"
import { getUserRequest } from "../src/lib/user"
import UserContext from "../src/providers/user/UserContext"


export async function getServerSideProps(ctx: NextPageContext) {
  let { "curty.accessToken": accessToken, "curty.authMode": authMode } = nookies.get(ctx)

  if (!accessToken) {
    try {
      if (authMode != "keep-logged") throw new Error("User is not logged in")
      const res = await refreshTokenRequest(ctx)
      if (!res._isSuccess) throw new Error(res.error)

      const serverAccessToken = res.data
      nookies.set(ctx, "curty.accessToken", serverAccessToken.token, {
        expires: new Date(serverAccessToken.expiresAt)
      })
      accessToken = serverAccessToken.token
      // TODO: axios
    } catch (e: any) {
      if (process.env.NODE_ENV === "development") console.log(e)
      const redirect = {
        destination: '/login',
        permanent: false
      }
      return { redirect }
    }
  }

  try {
    const res = await getUserRequest(accessToken)
    if (!res._isSuccess) throw new Error(res.error)
    const props = { user: res.data }
    return { props }
  } catch (e: any) {
    if (process.env.NODE_ENV === "development") console.log(e)
    const redirect = {
      destination: '/login',
      permanent: false
    }
    return { redirect }
  }
}


export default function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/images/logo_simple_white.svg" type="image/x-icon" />
      </Head>

      <UserContext.Provider value={ user }>
        <Toolbar></Toolbar>
        <Hero></Hero>
      </UserContext.Provider>
    </div>
  )
}