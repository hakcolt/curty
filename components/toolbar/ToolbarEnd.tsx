import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Notification from "../dropdown/Notifications"
import ProfileOptions from "../dropdown/ProfileOptions"

export function ToolbarEnd({ profileNavigation, open }) {
  return (
    <>
      <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          <Notification></Notification>
          <ProfileOptions profileNavigation={ profileNavigation }></ProfileOptions>
        </div>
      </div>

      {/* Mobile menu button */ }
      <div className="-mr-2 flex md:hidden">
        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open main menu</span>
          { open ? (
            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
          ) }
        </Disclosure.Button>
      </div>
    </>
  )
}