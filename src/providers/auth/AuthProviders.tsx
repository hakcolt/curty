import { destroyCookie, parseCookies, setCookie } from "nookies"
import { createContext, useContext, useEffect, useState } from "react"
import { LoginInput, signInRequest } from "../../lib/auth"

interface AuthContextData {
  accessToken: string | null
  isAuthenticated: boolean
  logIn(_data: LoginInput): Promise<void>
  logOut(): void
}

const AuthContext = createContext<AuthContextData>({
  accessToken: null,
  isAuthenticated: false,
  logIn: () => Promise.resolve(),
  logOut: () => { }
})

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    if (accessToken) return
      const { "curty.accessToken": cookieAccessToken } = parseCookies()
      if (cookieAccessToken) {
        setAccessToken(cookieAccessToken)
        setIsAuthenticated(true)
      }
  }, [accessToken])

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
    setAccessToken(token)

    setCookie(undefined, "curty.authMode", "keep-logged")
    setIsAuthenticated(true)
  }

  const logOut = () => {
    destroyCookie(undefined, "curty.accessToken")
    setAccessToken(null)

    destroyCookie(undefined, "curty.authMode")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={ {
      accessToken,
      isAuthenticated,
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