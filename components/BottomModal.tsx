import { ArrowPathRoundedSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useContext, useState } from "react"
import { Link } from "../src/entity/Link"
import { HomeContext, HomeContextType } from "../src/providers/home/HomeProvider"

export default function BottomModal() {
  const { deleteLink, links }: HomeContextType = useContext(HomeContext)
  const [updateLayout, setUpdateLayout] = useState(false)

  async function onDeleteLink(link: Link) {
    try {
      await deleteLink(link)
      setUpdateLayout(!updateLayout)
    } catch (e: any) {
      if (process.env.NODE_ENV === "development") console.log(e)
    }
  }

  return (
    <div style={ {
      minHeight: "300px"
    } } className="bg-neutral-800 p-6 relative lg:p-8 rounded-t-3xl border shadow-lg border-neutral-800">
      <h2 className="text-neutral-200 text-3xl font-bold mb-4">Your Urls</h2>
      <div className="h-px bg-neutral-600 w-full"></div>
      {
        (links && links.length > 0) ?
          <ul>{ links.map((item, index) => <li key={ index }>
            <LinkComponent
              item={ item }
              index={ index }
              onClick={ onDeleteLink }
            />
          </li>) }</ul> :
          <p className="text-2xl text-neutral-400 text-center mt-20">No Content</p>
      }
    </div>
  )
}


function LinkComponent(props: { item: Link, index: number, onClick }) {
  const [loading, setLoading] = useState(false)
  const { links } = useContext(HomeContext)

  const list = links?.length ? links : [undefined]

  return <>
    <div className="flex justify-between items-center">
      <div className="text-xl p-3">
        <h3 className="text-neutral-200 font-bold text-xl">{ props.item.name }</h3>
        <a href={ "https://s.hakcolt.com" + props.item.path } className="text-base p-0 text-neutral-300 hover:text-red-400">{ "s.hakcolt.com" + props.item.path }</a>
      </div>
      <button className="mr-3 text-neutral-300" onClick={ () => {
        setLoading(true)
        props.onClick(props.item)
        setLoading(false)
      } }>
        { loading ?
          <ArrowPathRoundedSquareIcon className="h-6 w-6"></ArrowPathRoundedSquareIcon> :
          <TrashIcon className="h-6 w-6 hover:text-red-400"></TrashIcon>
        }
      </button>
    </div>
    { props.index != (list.length - 1) ?
      <div className="h-px bg-neutral-600 w-full"></div> : undefined }
  </>
}