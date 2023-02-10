import { rest } from "msw"
import { constants } from "../lib/types"

const signUp = (req, res, ctx) => {
  return res(ctx.json({
    message: "Success",
    isSuccess: true
  }))
}

export const handlers = [
  rest.post(`${constants.API_URL}/v1/users/signup`, signUp)
]