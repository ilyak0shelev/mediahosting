import { useEffect, useState } from 'react'

const useScrollDynamicHandler = (initialState) => {
    const [reached, setReached] = useState(initialState)

    const scrollHandler = (e) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200)) {
            setReached(true)
        }
        else {
            setReached(false)
        }
    }

    const setReachedFalse = () => {
        setReached(false)
    }

    const setReachedTrue = () => {
        setReached(true)
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { reached, setReachedFalse, setReachedTrue }
}

export default useScrollDynamicHandler