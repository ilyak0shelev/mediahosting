import React, { useContext } from 'react'
import Button from './UI/button/Button'
import { PageContext } from './contexts/PageContext'
import { AuthWindowContext } from './contexts/AuthWindowContext'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

export const ProfileBar = () => {
  const value = useContext(PageContext)
  const auth_visibility = useContext(AuthWindowContext)
  const session_status = useContext(AuthStatusContext)
  const navigate = useNavigate()

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
    <div className='profileCont'>
      {session_status.authStatus === true &&
        <div className='profileBar'>
          <Button id='newPostBtn' title='New post' onClick={newPostBthHandler}></Button>
          <Button id='logoutBtn' onClick={logoutBthHandler}>Выйти</Button>
        </div>
      }
      {!session_status.authStatus &&
        <div className='profileBar'>
          <Button onClick={loginBthHandler}>Войти</Button>
          <Button onClick={regBthHandler}>Регистрация</Button>
        </div>
      }
    </div>
  )
}
export default ProfileBar;