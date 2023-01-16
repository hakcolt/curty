export async function getUserRequest(accessToken: string) {
  const options: any = {
    mode: "cors",
    credentials: "include"
  }

  options.headers = { "Authorization": `Bearer ${accessToken}` }

  const res = await fetch("http://localhost:3000/api/v1/users/get", options)

  const json = await res.json()
  return json
}