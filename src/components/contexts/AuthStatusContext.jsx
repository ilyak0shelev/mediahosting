import { createContext, useState } from "react";

const AuthStatusContext = createContext()

function AuthStatusProvider ({children}) {
    const [authStatus, setAuthStatus] = useState('initial')

    const changeAuthStatus = (value) => {
        setAuthStatus(value)
    }

    return (
        <AuthStatusContext.Provider value={{authStatus, changeAuthStatus}}>
            {children}
        </AuthStatusContext.Provider>
    )
}

export {AuthStatusProvider, AuthStatusContext}