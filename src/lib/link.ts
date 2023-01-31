import { Link } from "../entity/Link"
import { ResultData } from "./types"
import constants from "./types/Contraints"

export type PushRequestInput = {
  name: string
  path: string
  url: string
}

export async function getURLsRequest(accessToken: string): Promise<ResultData<Link[]>> {
  const options: any = {
    mode: "cors",
    credentials: "include"
  }

  options.headers = { "Authorization": `Bearer ${accessToken}` }

  const res = await fetch(`${constants.API_URL}/v1/links`, options)

  const json = await res.json()
  return json
}

export async function pushLinkRequest(accessToken: string, input: PushRequestInput): Promise<ResultData<Link[]>> {
  const requestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`
  }

  const res = await fetch(`${constants.API_URL}/v1/links`, {
    method: "POST",
    mode: "cors",
    headers: requestHeaders,
    body: JSON.stringify(input),
    credentials: "include"
  })

  const json = res.json()

  return json
}

export async function deleteLinkRequest(accessToken: string, id: string): Promise<ResultData<Link[]>> {
  const requestHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`
  }

  const res = await fetch(`${constants.API_URL}/v1/links/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: requestHeaders,
    credentials: "include"
  })

  const json = res.json()

  return json
}