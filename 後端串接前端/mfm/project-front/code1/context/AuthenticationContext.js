import { createContext,useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    //login User
    const login = async({username,password}) => {
        console.log('login context')
        console.log({username,password})
    }

    return (
        <AuthenticationContext.Provider value={{ user, accessToken,error,login}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext

