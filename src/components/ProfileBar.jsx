import React, { useContext } from 'react'
import Button from './UI/button/Button'
import { PageContext } from './contexts/PageContext'
import { AuthWindowContext } from './contexts/AuthWindowContext'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export const ProfileBar = () => {
  const value = useContext(PageContext)
  const auth_visibility = useContext(AuthWindowContext)
  const session_status = useContext(AuthStatusContext)
  const navigate = useNavigate()

  const myProfileBtnHandler = () => {
    navigate(`/profiles/${session_status.authStatus.login}`)
  }

  const loginBthHandler = () => {
    value.changeActive('LoginWindowActive')
    auth_visibility.changeAuthVisibility('')
  }

  const regBthHandler = () => {
    value.changeActive('RegWindowActive')
    auth_visibility.changeAuthVisibility('')
  }

  const logoutBthHandler = () => {
    axios.get('/auth/logout')
      .then(() => {
        session_status.changeAuthStatus(false)
      })
      .catch()
  }

  const newPostBthHandler = () => {
    navigate('/create_post')
  }

  return (
    <div className='profileBarCont'>
      {session_status.authStatus.authorized === true &&
        <div className='profileBar'>
          <Button id='newPostBtn' data-title='Создать пост' onClick={newPostBthHandler}></Button>
          <Button id='myProfileBtn' data-title='Профиль' onClick={myProfileBtnHandler}>Профиль</Button>
          <Button id='logoutBtn' onClick={logoutBthHandler}>Выйти</Button>
        </div>
      }
      {!session_status.authStatus.authorized &&
        <div className='profileBar'>
          <Button onClick={loginBthHandler}>Войти</Button>
          <Button onClick={regBthHandler}>Регистрация</Button>
        </div>
      }
    </div>
  )
}
export default ProfileBar;