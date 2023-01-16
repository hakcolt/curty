import { Disclosure } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

import { UserCircleIcon } from "@heroicons/react/24/outline"
import UserContext from "../../../src/providers/user/UserContext"
import { useAuth } from "../../../src/providers/auth"
import Router from "next/router"

export default function ToolbarMobile({ navigation, profileNavigation }) {
  const { logOut } = useAuth()
  const user = useContext(UserContext)

  const profileImage = user?.imageUrl

  const onLogOutListener = () => {
    logOut()
    Router.push("/login")
  }

  return (
    <Disclosure.Panel className="md:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        { navigation.map((item: { name: string, href: string, current: boolean }) => (
          <Disclosure.Button
            key={ item.name }
            as="a"
            href={ item.href }
            className={ (item.current ?
              'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
              ' block px-3 py-2 rounded-md text-base font-medium'
            }
            aria-current={ item.current ? 'page' : undefined }
          >
            { item.name }
          </Disclosure.Button>
        )) }
      </div>
      <div className="border-t border-gray-700 pt-4 pb-3">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            {
              profileImage ? <img className="h-10 w-10 rounded-full" src={ profileImage } alt="" /> :
                <UserCircleIcon className="h-10 w-10 rounded-full"></UserCircleIcon>
            }
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">{ `${user?.firstName} ${user?.lastName}` }</div>
            <div className="text-sm mt-1 font-medium leading-none text-gray-400">{ user?.email }</div>
          </div>
          <button
            type="button"
            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 space-y-1 px-2">
          { profileNavigation.map((item: { name: string, href: string }) => (
            <Disclosure.Button
              key={ item.name }
              as="a"
              href={ item.href }
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              { item.name }
            </Disclosure.Button>
          )) }

          <Disclosure.Button
            key="Log Out"
            as="button"
            onClick={ onLogOutListener }
            className="block text-left w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >Log Out</Disclosure.Button>

        </div>
      </div>
    </Disclosure.Panel>
  )
}