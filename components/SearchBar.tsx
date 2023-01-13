export default function SearchBar({ includeClassName }) {
  return (
    <div className={ includeClassName +  " place-items-center flex rounded-lg center border border-red-200 bg-gray-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1" }
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="flex-none text-slate-300 text-gray-200" aria-hidden="true">
        <path d="m19 19-3.5-3.5"></path>
        <circle cx="11" cy="11" r="6"></circle>
      </svg>

      <input
        className="p-2 w-full appearance-none rounded-none bg-transparent ml-2 border-0 placeholder-gray-300 text-gray-200 rounded-t-md focus:outline-none focus:ring-transparent focus:border-transparent focus:z-10 sm:text-sm"
        placeholder="Insert your link here">
      </input>
    </div>
  )
}