import { parseCookies } from "nookies"
import { createContext, useState } from "react"
import { Link } from "../../entity/Link"
import { User } from "../../entity/User"
import { pushLinkRequest, PushRequestInput } from "../../lib/link"

type HomeContextType = {
  user: User | null
  links: Link[] | null,
  pushLink: (data: PushRequestInput) => void
}

export const HomeContext = createContext<HomeContextType>({
  user: null,
  links: null,
  pushLink: () => { }
})

type ProviderInput = {
  data: {
    user: User,
    links: Link[]
  },
  children: any
}

export function HomeProvider({ data, children }: ProviderInput) {
  const { user: fetchedUser, links: fetchedLinks } = data
  
  const [links, setLinks] = useState<Link[]>(fetchedLinks || [])

  const pushLink = async (data: PushRequestInput) => {
    const { "curty.accessToken": accessToken } = parseCookies()

    const res: any = await pushLinkRequest(accessToken, data)
    if (!res._isSuccess) throw new Error(res.error)

    setLinks(res.data)
  }

  return <HomeContext.Provider value={ {
    user: fetchedUser,
    links,
    pushLink
  } }>
    { children }
  </HomeContext.Provider>
}