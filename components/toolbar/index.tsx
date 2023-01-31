import { Disclosure } from '@headlessui/react'
import ToolbarMobile from "./mobile"
import { ToolbarEnd } from "./ToolbarEnd"
import ToolbarStart from "./ToolbarStart"

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Github', href: 'https://github.com/hakcolt/curty', current: false },
  { name: 'About', href: 'https://hakcolt.com', current: false }
]
const profileNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' }
]

export default function Toolbar() {
  return (
    <Disclosure as="nav" className="bg-neutral-800">
      { ({ open }) => (<>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <ToolbarStart navigation={ navigation }></ToolbarStart>
            <ToolbarEnd open={ open } profileNavigation={ profileNavigation }></ToolbarEnd>
          </div>
        </div>

        <ToolbarMobile navigation={ navigation } profileNavigation={ profileNavigation }></ToolbarMobile>
      </>) }
    </Disclosure>
  )
}
