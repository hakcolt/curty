import { AccessToken } from "../../entity/Session"
import { User } from "../../entity/User"

type LoginApiResponse = {
  message: string | undefined
  error: string | undefined
  statusCode: number,
  _isSuccess: boolean,
  next: string | undefined
  data: {
    accessToken: AccessToken
    user: User
  } 

}

export type { LoginApiResponse }