import Link from "next/link"
import Logo from "../Logo"

export default function ToolbarStart({ navigation }) {
  return (
    <div className="flex items-center">
      <Logo className="h-16 w-40" size="270%"></Logo>
        
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          { navigation.map(({ name, href, current }) => (
            <Link
              key={ name }
              href={ href }
              className={
                (current ? 'bg-gray-900 text-white' :
                  'text-gray-300 hover:bg-gray-700 hover:text-white') +
                  ' px-3 py-2 rounded-md text-sm font-medium'
              }
              aria-current={ current ? 'page' : undefined }
            >
              { name }
            </Link>
          )) }
        </div>
      </div>
    </div>
  )
}