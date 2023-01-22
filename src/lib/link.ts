import { Link } from "../entity/Link"
import { Result, ResultData } from "./types"

export type PushRequestInput = {
  name: string
  path: string
  url: string
}

export async function getURLsRequest(accessToken: string): Promise<ResultData<Link[]>> {
  return {
    "message": "All right",
    "statusCode": 200,
    "_isSuccess": true,
    "data": [
      {
        "id": "haha",
        "name": "Test",
        "path": "/test",
        "url": "https://test.com"
      },
      {
        "id": "haha3",
        "name": "Link to Test2",
        "path": "/test2",
        "url": "https://hakcolt.com"
      }
    ]
  } as ResultData<Link[]>
}

export async function pushLinkRequest(accessToken: string, input: PushRequestInput): Promise<ResultData<Link[]>> {
  return {
    "message": "All right",
    "statusCode": 200,
    "_isSuccess": true,
    "data": [
      {
        "id": "haha",
        "name": "Test",
        "path": "/test",
        "url": "https://test.com"
      },
      {
        "id": "haha3",
        "name": "Link to Test2",
        "path": "/test2",
        "url": "https://hakcolt.com"
      },
      {
        "id": "random",
        "name": input.name,
        "path": input.path,
        "url": input.url
      }
    ]
  } as ResultData<Link[]>
}