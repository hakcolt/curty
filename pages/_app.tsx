import "tailwindcss/tailwind.css"
import { AuthProvider } from "../src/providers/auth"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
