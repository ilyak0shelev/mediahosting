import React, { useContext, useEffect } from 'react'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import useGetFiles from './hooks/useGetFiles'
import { useDispatch, useSelector } from 'react-redux'
import { addFiles, addHiddenFiles, clearStorage } from '../store/userFilesSlice'
import { clearLikes, setLikesCount } from '../store/userLikesSlice'
import axios from 'axios'
import useGetHiddenFiles from './hooks/useGetHiddenFiles'
import { addSubscribers, addSubscriptions, clearSubs } from '../store/userSubsSlice'

const FileReciever = () => {
    const status = useContext(AuthStatusContext)
    const [files, getFiles, clearFiles] = useGetFiles([])
    const [hiddenFiles, getHiddenFiles, clearHiddenFiles] = useGetHiddenFiles([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (status.authStatus.authorized) {
            getFiles(status.authStatus.login)
            getHiddenFiles(status.authStatus.login)

            axios.post('/post/getLikesCount', { nickname: status.authStatus.login })
                .then((result) => {
                    dispatch(setLikesCount(result.data.count))
                })
            axios.post('/user/getSubscriptions', { username: status.authStatus.login })
                .then((result) => {
                    if (result.status === 200) {
                        for (let i = 0; i < result.data.length; i++) {
                            dispatch(addSubscriptions(result.data[i]))
                        }
                    }
                })
            axios.post('/user/getSubscribers', { username: status.authStatus.login })
                .then((result) => {
                    if (result.status === 200) {
                        for (let i = 0; i < result.data.length; i++) {
                            dispatch(addSubscribers(result.data[i]))
                        }
                    }
                })
        }
        if (!status.authStatus.authorized) {
            dispatch(clearStorage())
            clearFiles()
            clearHiddenFiles()
            dispatch(clearLikes())
            dispatch(clearSubs())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.authStatus.authorized])

    useEffect(() => {
        if (files.length) {
            files.forEach(file => dispatch(addFiles(file)))
        }
        if (hiddenFiles.length) {
            hiddenFiles.forEach(file => dispatch(addHiddenFiles(file)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, hiddenFiles])

    return null
}

export default FileReciever