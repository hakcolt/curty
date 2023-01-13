import { LockClosedIcon } from "@heroicons/react/24/outline"

export default function Button({ className }) {
  return (
    <button
      type="submit"
      className={ "group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:red-indigo-500 " + className }
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <LockClosedIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
      </span>
      Sign in
    </button>
  )
}