import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/UserProfile.css'

const UserProfile = () => {
    const {id} = useParams()

    return (
        <div className='profileCont'>
            <div className='userInfoCont'>
                <div className='profilePhotoCont'>
                    <img id='profile_photo' src='/imgs/pokerface.jpg' alt='profile_photo'/>
                </div>
                <div className='profileNicknameCont'>
                    <h1>{id}</h1>
                </div>
            </div>
            <div className='userBoardCont'>
                rskojdfgosdfigjoidfjgodfhjouifgjhoui
            </div>
        </div>
    )
}

export default UserProfile