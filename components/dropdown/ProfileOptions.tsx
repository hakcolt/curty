import { Menu, Transition } from "@headlessui/react"
import { Fragment, useContext } from "react"

import { UserCircleIcon } from "@heroicons/react/24/outline"
import { HomeContext } from "../../src/providers/home/HomeProvider"
import { useAuth } from "../../src/providers/auth"
import Router from "next/router"

export default function ProfileOptions({ profileNavigation }) {
  const { logOut } = useAuth()
  const { user } = useContext(HomeContext)
  const image = user?.imageUrl

  const onLogOutListener = () => {
    logOut()
    Router.push("/login")
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          { image ?
            (<img className="h-8 w-8 rounded-full" src={ image } alt="Profile"></img>)
            : <UserCircleIcon className="h-8 w-8 rounded-full text-gray-400"></UserCircleIcon>
          }
        </Menu.Button>
      </div>
      <Transition
        as={ Fragment }
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          { profileNavigation.map(({ name, href }) => (
            <Menu.Item key={ name }>
              { ({ active }) => (
                <a
                  href={ href }
                  className={ (active ? "bg-gray-600" : '') + " block px-4 py-2 text-sm text-gray-200" }
                >
                  { name }
                </a>
              ) }
            </Menu.Item>
          )) }
          <button
            className={ "w-full text-left block px-4 hover:bg-gray-600 py-2 text-sm text-gray-200" }
            onClick={ onLogOutListener }
          >Log out</button>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

