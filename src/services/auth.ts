import { v4 as uuid } from 'uuid'
import { User } from './../entity/User'
import { Session } from './../entity/Session'
import { NextPageContext } from 'next';

type SignInRequestData = {
  email: string
  password: string
}

type SignInResponseData = {
  session: Session
  user: User
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(credentials: SignInRequestData): Promise<SignInResponseData> {
  await delay()

  const tokenExpires = new Date()
  tokenExpires.setTime(tokenExpires.getTime() + ((1000 * 60) * 30))

  return {
    session: {
      token: uuid(),
      expiresAt: tokenExpires.toISOString()
    },
    user: {
      uid: uuid(),
      imageUrl: "/profile_picture.jpg",
      firstName: "Igor",
      lastName: "Hakcolt",
      email: "hakcolt@gmail.com",
      gender: "male"
    }
  }
}

export async function recoverUserInformation(ctx?: NextPageContext): Promise<User> {
  await delay()

  return {
    uid: uuid(),
    imageUrl: "/profile_picture.jpg",
    firstName: "Igor",
    lastName: "Hakcolt",
    email: "hakcolt@gmail.com",
    gender: "male"
  }
}