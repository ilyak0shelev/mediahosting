import { createContext, useState } from "react";

const AuthWindowContext = createContext()

function AuthWindowProvider ({children}) {
    const [authVisibility, setAuthVisiblity] = useState('inactive')

    const changeAuthVisibility = (value) => {
        setAuthVisiblity(value)
    }

    return (
        <AuthWindowContext.Provider value={{authVisibility, changeAuthVisibility}}>
            {children}
        </AuthWindowContext.Provider>
    )
}

export {AuthWindowProvider, AuthWindowContext}