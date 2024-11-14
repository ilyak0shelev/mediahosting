import { useEffect, useState } from 'react'

const useScrollStaticHandler = (initialState) => {
    const [reached, setReached] = useState(initialState)

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollTop > 500) {
            setReached(true)
        }
        else {
            setReached(false)
        }
    }

    const setReachedFalse = () => {
        setReached(false)
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {reached, setReachedFalse}
}

export default useScrollStaticHandler