import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import '../styles/ProfilePhoto.css'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import { useParams } from 'react-router-dom'

const ProfilePhoto = (props) => {
    const [filename, setFilename] = useState('')
    const address = 'http://192.168.1.6:3000'
    const session = useContext(AuthStatusContext)
    const { id } = useParams()

    useEffect(() => {
        axios.post('/user/getProfilePhoto', { username: props.username })
            .then((res) => {
                if (res.data !== 'empty') {
                    setFilename(res.data)
                }
                else {
                    setFilename('')
                }
            })
    }, [filename, props.username])

    const changePhotoHandler = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('username', id)

        if (file) {
            axios.post('/user/setProfilePhoto', formData)
                .then((res) => {
                    if (res.status === 200) {
                        setFilename(file.name)
                    }
                })
        }
    }

    return (
        <div className='userPhotoWrapper'>
            <img id='profile_photo' src={filename ? `${address}/${props.username}/profilePhoto/${filename}` : `${address}/initialPhoto.jpg`} alt='profile_photo' />
            {(props.username === session.authStatus.login && session.authStatus.authorized) &&
                <>
                    <input type='file' className='userPhotoInput' name='user_photo_input' id='user_photo_input' accept='.jpeg, .jpg, .png' onChange={changePhotoHandler}></input>
                    <label htmlFor='user_photo_input' className='userPhotoInputLabel' id='user_photo_input_label'>
                    </label>
                    <div className='userPhotoInputLabelIcon'></div>
                </>
            }
        </div>
    )
}

export default ProfilePhoto