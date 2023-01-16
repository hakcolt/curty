import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/24/outline"

function formatClassName(...classNames) {
  return classNames.join(" ")
}

export default function FormButton({ className, isLoading, children }) {
  return (
    <button
      type="submit"
      disabled={ isLoading }
      className={
        formatClassName(
          "group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white acti bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:red-indigo-500 ",
          className,
          isLoading ? "bg-red-700" : "bg-red-600"
        ) }>
      <span className={
        formatClassName(
          "absolute left-0 inset-y-0 flex items-center pl-3"
        ) }>
        {
          isLoading ? <ArrowPathIcon className="h-5 w-5 text-red-400"></ArrowPathIcon> :
            <LockClosedIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
        }
      </span>
      {isLoading ?  "Loading" : children}
    </button>
  )
}