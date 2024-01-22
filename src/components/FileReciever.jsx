import React, { useContext, useEffect } from 'react'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import useGetFiles from './hooks/useGetFiles'
import { useDispatch, useSelector } from 'react-redux'
import { addFiles, clearStorage } from '../store/userFilesSlice'

const FileReciever = () => {
    const status = useContext(AuthStatusContext)
    const [files, getFiles, clearFiles] = useGetFiles([])
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (status.authStatus.authorized && !files.length) {
            getFiles(status.authStatus.login)
        }
        if (!status.authStatus.authorized && files.length) {
            clearFiles()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.authStatus.authorized])
    
    useEffect(() => {
        if (files.length) {
            files.forEach(file => dispatch(addFiles({
                id: file.id, name: file.name, title: file.title, description: file.description, tags: file.tags, type: file.type, owner: file.owner, birthtime: file.birthtime
            })))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files])

    return null
}

export default FileReciever