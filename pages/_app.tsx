import { AuthProvider } from "../src/providers/auth"
import "tailwindcss/tailwind.css"

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-neutral-900 min-h-screen selection:bg-red-700">
      <AuthProvider>
        <Component { ...pageProps } />
      </AuthProvider>
    </div>
  )
}

export default MyApp
