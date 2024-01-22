import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/UserProfile.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Popup from '../components/UI/popup/Popup'
import { useDispatch, useSelector } from 'react-redux'
import { addFiles } from '../store/userFilesSlice'
import PostItemSetter from '../components/PostItemSetter'
import { AuthStatusContext } from '../components/contexts/AuthStatusContext'
import useGetFiles from '../components/hooks/useGetFiles'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const UserProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const session_status = useContext(AuthStatusContext)
    const [exists, setExistence] = useState(false)
    const [errStatus, setErrStatus] = useState('')
    const redux_files = useSelector(state => state.userfiles.files)
    const [files, getFiles, clearFiles] = useGetFiles([])

    useEffect(() => {
        axios.post('/user/checkUser', { id })
            .then((result) => {
                if (result.status === 200) {
                    setExistence(true)
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    navigate('/error')
                }
                else {
                    setErrStatus(true)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (id !== session_status.authStatus.login && exists) {
            getFiles(id)
        }
    }, [exists])

    const postClickHandler = (id) => {
        navigate(`/posts/${id}`)
    }

    return (
        <>
            {exists &&
                <div className='profileCont'>
                    <div className='userInfoCont'>
                        <div className='profilePhotoCont'>
                            <img id='profile_photo' src='/imgs/pokerface.jpg' alt='profile_photo' />
                        </div>
                        <div className='profileNicknameCont'>
                            <h1>{id}</h1>
                        </div>
                    </div>
                    {(id === session_status.authStatus.login) &&
                        <ResponsiveMasonry className='userBoardCont' columnsCountBreakPoints={{350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6}}>
                            <Masonry gutter="18px">
                                {
                                    redux_files.map(file => <div className='userBoardItems' onClick={() => postClickHandler(file.id)} ><PostItemSetter className={'userBoardItem'} file={file} path={session_status.authStatus.login} /></div>)
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                    }
                    {(id !== session_status.authStatus.login) &&
                        <ResponsiveMasonry className='userBoardCont' columnsCountBreakPoints={{350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6}}>
                            <Masonry>
                                {
                                    files.map(file => <div className='userBoardItems'><PostItemSetter className={'userBoardItem'} file={file} path={id} /></div>)
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                    }
                </div>
            }
            <Popup status={errStatus} setStatus={setErrStatus}>Что-то пошло не так...</Popup>
        </>
    )
}

export default UserProfile