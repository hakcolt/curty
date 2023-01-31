import "tailwindcss/tailwind.css"
import { AuthProvider } from "../src/providers/auth"

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-neutral-900 min-h-screen">
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    </div>
  )
}

export default MyApp
