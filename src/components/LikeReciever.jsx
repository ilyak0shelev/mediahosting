import { useContext, useEffect, useState } from 'react'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addLikes } from '../store/userLikesSlice'
import useScrollDynamicHandler from './hooks/useScrollDynamicHandler'

const LikeReciever = () => {
    const dispatch = useDispatch()
    const likesCount = useSelector(state => state.userlikes.likesCount)
    const skipCount = 20
    const limit = 20
    const [currentSkip, setCurrentSkip] = useState(likesCount - skipCount)
    const { reached, setReachedFalse, setReachedTrue } = useScrollDynamicHandler(true)
    const [filesExist, setFilesExist] = useState(true)
    const status = useContext(AuthStatusContext)

    useEffect(() => {
        if (reached && status.authStatus.authorized && filesExist) {
            axios.post("/post/getLikes", { 'nickname': status.authStatus.login, 'skipQuantity': currentSkip, 'limitQuantity': limit })
                .then((result) => {
                    if (result.data.length) {
                        result.data.forEach((file) => dispatch(addLikes(file)))
                        setCurrentSkip(currentSkip - skipCount)
                    }
                    else {
                        setFilesExist(false)
                    }
                })
                .finally(() => {
                    setReachedFalse()
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reached, status.authStatus.authorized])

    return null
}

export default LikeReciever