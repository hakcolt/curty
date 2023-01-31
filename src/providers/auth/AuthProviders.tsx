import { destroyCookie, setCookie } from "nookies"
import { createContext, useContext } from "react"
import { LoginInput, signInRequest } from "../../lib/auth"
import { UserInput } from "../../lib/types"
import { createUserRequest } from "../../lib/user"

interface AuthContextData {
  createUser(data: UserInput): Promise<void>
  logIn(_data: LoginInput): Promise<void>
  logOut(): void
}

const AuthContext = createContext<AuthContextData>({
  createUser: async () => { },
  logIn: async () => { },
  logOut: () => { }
})

export function AuthProvider({ children }) {

  const registerUser = async (data: UserInput) => {
    const res = await createUserRequest(data)
    if (!res._isSuccess) throw new Error(res.error)
  }

  const logIn = async ({ email, password }: LoginInput) => {
    const res = await signInRequest({
      email,
      password
    })

    if (!res._isSuccess) throw new Error(res.error)

    const { token, expiresAt } = res.data.accessToken

    setCookie(undefined, "curty.accessToken", token, {
      expires: new Date(expiresAt)
    })
    setCookie(undefined, "curty.authMode", "keep-logged")
  }

  const logOut = () => {
    destroyCookie(undefined, "curty.accessToken")
    destroyCookie(undefined, "curty.authMode")
  }

  return (
    <AuthContext.Provider value={ {
      createUser: registerUser,
      logIn,
      logOut
    } }>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) throw new Error("User must be used with AuthProvider")
  return context
}