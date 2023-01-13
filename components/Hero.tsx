import Background from "./Background"
import SearchBar from "./SearchBar"

export default function Hero() {

  // TODO: Modularize it

  return (
    <div className="isolate bg-white">
      <Background></Background>
      <main className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-24 sm:pb-40">
          <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
            Rapidly create short URLs without ads
          </h1>
          <p className="mt-8 text-lg leading-8 text-gray-500 font-bold sm:text-center">
            A full open source project made with typescript and most modern frontend and backend frameworks. Visit our github repo to learn more.
          </p>
          <SearchBar includeClassName="sm:mt-20 mt-10"></SearchBar>
        </div>
      </main>
    </div>
  )
}
