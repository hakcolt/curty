import { parseCookies } from "nookies"
import { createContext, useState } from "react"
import { Link } from "../../entity/Link"
import { User } from "../../entity/User"
import { deleteLinkRequest, pushLinkRequest } from "../../lib/link"

export type HomeContextType = {
  user: User | null
  links: Link[] | null,
  pushLink: () => Promise<void>,
  deleteLink: (link: Link) => Promise<void>,
  linkForm: Link,
  dialog: { show: boolean, setShow: ((v: boolean) => void) }

}

export const HomeContext = createContext<HomeContextType>({
  user: null,
  links: null,
  pushLink: async () => { },
  deleteLink: async () => {},
  linkForm: {} as Link,
  dialog: { show: false, setShow: () => { } }
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
  const [linkForm] = useState({} as Link)

  const pushLink = async () => {
    const { "curty.accessToken": accessToken } = parseCookies()
    
    const res: any = await pushLinkRequest(accessToken, linkForm)
    if (!res._isSuccess) throw new Error(res.error)
    
    links.push(res.data as Link)
    setLinks(links)
  }

  const deleteLink = async (link: Link) => {
    const { "curty.accessToken": accessToken } = parseCookies()

    const res: any = await deleteLinkRequest(accessToken, link.id)
    if (!res._isSuccess) throw new Error(res.error)

    links.splice(links.indexOf(link), 1)
    console.log("links:", links)
    setLinks(links)
  }
  
  const [show, setShow] = useState(false)

  return <HomeContext.Provider value={ {
    user: fetchedUser,
    links,
    pushLink,
    deleteLink,
    linkForm,
    dialog: { show, setShow }
  } }>
    { children }
  </HomeContext.Provider>
}