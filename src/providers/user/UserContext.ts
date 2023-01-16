import { createContext } from "react"
import { User } from "../../entity/User"

const UserContext = createContext<User | null>(null)

export default UserContext