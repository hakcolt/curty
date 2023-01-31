import { ResultData } from "./types"
import constants from "./types/Contraints"
import { UserInput } from "./types"
import { User } from "../entity/User"

export async function createUserRequest(user: UserInput) {  
  const options: any = {
    mode: "cors",
    headers:{ "Content-Type": "application/json" },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(user)
  }

  const res = await fetch(`${constants.API_URL}/v1/users/signup`, options)

  const json = await res.json()
  return json
}

export async function getUserRequest(accessToken: string): Promise<ResultData<User>> {
  const options: any = {
    mode: "cors",
    credentials: "include"
  }

  options.headers = { "Authorization": `Bearer ${accessToken}` }

  const res = await fetch(`${constants.API_URL}/v1/users/get`, options)

  const json = await res.json()
  return json
}
