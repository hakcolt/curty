import { BellIcon } from "@heroicons/react/24/outline"


// Dropdown was not implemented yet
export default function Notification() {
  return (
    <button
      type="button"
      className="rounded-full bg-neutral-800 p-1 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}