import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies } from "nookies"
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "../services/auth"
import { api } from "../services/api"
import { User } from "../entity/User"

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  const { 'SHORT_Y_TOKEN': token } = parseCookies()
  if (token) {
    recoverUserInformation().then(response => {
      setUser(response)
    })
  }

async function signIn({ email, password }: SignInData) {
  const { session, user } = await signInRequest({
    email,
    password,
  })

  const expiresDate = new Date(session.expiresAt)

  setCookie(undefined, 'SHORT_Y_TOKEN', session.token, {
    expires: expiresDate,
    path: "/"
  })

  api.defaults.headers['Authorization'] = `Bearer ${session.token}`

  setUser(user)

  Router.push("/")
}

return (
  <AuthContext.Provider value={ { user, isAuthenticated, signIn } }>
    { children }
  </AuthContext.Provider>
)
}