import { useContext } from "react"
import { Link } from "../src/entity/Link"
import { HomeContext } from "../src/providers/home/HomeProvider"

export default function BottomModal() {
  const links: Link[] | null = useContext(HomeContext)?.links
  return (
    <div className="bg-gray-700 p-6 z-50 relative lg:p-8 rounded-t-3xl border shadow-lg border-gray-800">
      <h2 className="text-gray-200 text-3xl font-bold mb-4">Your Urls</h2>
      <div className="h-px bg-gray-600 w-full"></div>

      { links ? links.map(generateLinkComponents) : "" }
    </div>
  )
}

function generateLinkComponents(item: Link, index: number, list: Link[]) {
  return <>
    <div className="text-xl p-3">
      <h3 className="text-gray-200 font-bold text-xl">{ item.name }</h3>
      <a href={ "https://s.hakcolt.com" + item.path } className="text-base p-0 text-gray-300 hover:text-red-400">{ "s.hakcolt.com" + item.path }</a>
    </div>
    { index != (list.length - 1) ?
      <div className="h-px bg-gray-600 w-full"></div> : undefined }
  </>
}