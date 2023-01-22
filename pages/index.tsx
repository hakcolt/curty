import Head from "next/head"
import nookies from 'nookies'
import { NextPageContext } from 'next'
import Toolbar from "../components/toolbar"
import Hero from "../components/Hero"
import { refreshTokenRequest } from "../src/lib/auth"
import { getUserRequest } from "../src/lib/user"
import { HomeProvider } from "../src/providers/home/HomeProvider"
import Background from "../components/Background"
import BottomModal from "../components/BottomModal"
import { Link } from "../src/entity/Link"
import { getURLsRequest } from "../src/lib/link"


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
    const userRes = await getUserRequest(accessToken)
    if (!userRes._isSuccess) throw new Error(userRes.error)
    const user = userRes.data

    const linkRes = await getURLsRequest(accessToken)
    if (!linkRes._isSuccess) throw new Error(linkRes.error)
    const links: Link[] = linkRes.data

    const props = { user, links }
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


export default function Home({ user, links }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/images/logo_simple_white.svg" type="image/x-icon" />
      </Head>

      <HomeProvider data={ { user, links } }>
        <div className="overflow-x-hidden relative bg-gray-900">
          <Toolbar></Toolbar>
          <Background></Background>
          <main className="relative max-w-3xl m-auto">
            <Hero></Hero>
            <div className="px-1 -mt-14">
              <BottomModal></BottomModal>
            </div>
          </main>
        </div>
      </HomeProvider>
    </>
  )
}