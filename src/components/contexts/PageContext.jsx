import { createContext, useState } from "react";

const PageContext = createContext()

function PageProvider ({children}) {
    const [active, setActive] = useState(null)

    const changeActive = (value) => {
        setActive(value)
    }

    return (
        <PageContext.Provider value={{active, changeActive}}>
            {children}
        </PageContext.Provider>
    )
}

export {PageProvider, PageContext}