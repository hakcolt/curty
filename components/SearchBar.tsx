import { ArrowRightIcon } from "@heroicons/react/24/outline"

export default function SearchBar({
  label,
  name,
  type,
  className,
  register,
  submit }) {
  return (
    <div className={ className + " place-items-center flex rounded-lg center border border-neutral-600 bg-neutral-700 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-red-700" }
    >
      <form onSubmit={ submit } className="flex place-content-center w-full">
        <input
          { ...register }
          name={ name }
          type={ type }
          className="p-2 w-full appearance-none rounded-none bg-transparent ml-2 border-0 placeholder-neutral-300 text-neutral-100 rounded-t-md focus:outline-none focus:ring-transparent focus:border-transparent focus:z-10 sm:text-base text-base"
          placeholder={ label }>
        </input>

        <button>
          <ArrowRightIcon fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-red-700 text-neutral-200 h-6 w-5"></ArrowRightIcon>
        </button>
      </form>
    </div>
  )
}