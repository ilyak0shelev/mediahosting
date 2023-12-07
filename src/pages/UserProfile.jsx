import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/UserProfile.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Popup from '../components/UI/popup/Popup'

const UserProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [exists, setExistence] = useState(false)
    const [errStatus, setErrStatus] = useState('')

    useEffect(() => {
        axios.post('/user/checkUser', {id})
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
                    <div className='userBoardCont'>
                        rskojdfgosdfigjoidfjgodfhjouifgjhoui
                    </div>
                </div>
            }
            <Popup status={errStatus} setStatus={setErrStatus}>Что-то пошло не так...</Popup>
        </>
    )
}

export default UserProfile