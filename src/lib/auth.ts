import { NextPageContext } from "next"
import { AccessToken } from "../entity/AccessToken"
import { User } from "../entity/User"
import { ResultData } from "./types"

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export interface LoginInput {
  email: string,
  password: string
}

export type LoginApiResponse = ResultData<{
  accessToken: AccessToken
  user: User
}>

export async function signInRequest(credentials: LoginInput): Promise<LoginApiResponse> {
  const requestHeaders = {
    "Content-Type": "application/json"
  }
  const res = await fetch("http://localhost:3000/api/v1/users/signin", {
    method: "POST",
    mode: "cors",
    headers: requestHeaders,
    body: JSON.stringify(credentials),
    credentials: "include"
  })

  const json = res.json()

  return json
}

export async function refreshTokenRequest(ctx?: NextPageContext) {
  const req = ctx?.req

  const options: any = {
    mode: "cors",
    credentials: "include"
  }

  if (req)
    options.headers = { "Cookie": req.headers.cookie! }

  const res = await fetch("http://localhost:3000/api/v1/users/refresh", options)

  const json = await res.json()
  return json
}