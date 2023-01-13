import Head from "next/head"
import nookies from 'nookies'
import { NextPageContext } from 'next'
import { recoverUserInformation } from "../src/services/auth"
import { useEffect } from "react"
import Toolbar from "../components/toolbar"
import Hero from "../components/Hero"


export async function getServerSideProps(ctx: NextPageContext) {
  const token = nookies.get(ctx)["SHORT_Y_TOKEN"]

  if (!token) {
    console.log("Token null")
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const user = await recoverUserInformation(ctx)

  return {
    props: { user }
  }
}

export default function Home() {

  useEffect(() => {
    // api.get('/users');
  }, [])

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/images/logo_simple_white.svg" type="image/x-icon" />
      </Head>

      <Toolbar></Toolbar>
      <Hero></Hero>
    </div>
  )
}