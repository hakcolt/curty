import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/24/outline"

function formatClassName(...classNames: string[]) {
  return classNames.join(" ")
}

type Input = {
  className: string,
  isLoading: boolean,
  icon?: boolean,
  children: any
}

export default function FormButton({
  className,
  isLoading,
  icon,
  children }: Input) {
  return (
    <button
      type="submit"
      disabled={ isLoading }
      className={
        formatClassName(
          "inline-flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-neutral-200 hover:bg-red-700 focus:ring-2 focus:ring-red-600 ",
          className,
          isLoading ? "bg-red-700" : "bg-red-600"
        ) }>
      {
        icon && (
          isLoading ?
            <ArrowPathIcon className="h-5 w-5 shrink-0 text-red-300"></ArrowPathIcon> :
            <LockClosedIcon className="h-5 w-5 text-red-400 shrink-0 group-hover:text-red-300" aria-hidden="true" />
        )
      }
      <p className={
        formatClassName("text-center w-full", icon ? "ml-2" : "")
        }> { isLoading ? "Loading" : children }</p>
    </button>
  )
}