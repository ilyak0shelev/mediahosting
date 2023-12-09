import React, { useContext, useState } from 'react'
import Button from './UI/button/Button'
import { PageContext } from './contexts/PageContext'
import { AuthWindowContext } from './contexts/AuthWindowContext'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import { useNavigate } from 'react-router-dom'
import useOutsideClick from './hooks/useOutsideClick'
import axios from 'axios'

export const ProfileBar = () => {
  const value = useContext(PageContext)
  const auth_visibility = useContext(AuthWindowContext)
  const session_status = useContext(AuthStatusContext)
  const navigate = useNavigate()
  const { ref, isActive, setIsActive } = useOutsideClick(false);

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
        setIsActive(false)
      })
      .catch()
  }

  const newPostBthHandler = () => {
    navigate('/create_post')
  }

  return (
    <div className='profileBarCont'>
      {session_status.authStatus.authorized &&
        <div ref={ref} className='profileBar'>
          <Button id='newPostBtn' data-title='Создать пост' onClick={newPostBthHandler}></Button>
          <Button id='myProfileBtn' data-title='Профиль' onClick={myProfileBtnHandler}></Button>
          <button className='menuBtn' onClick={() => setIsActive(!isActive)}></button>
          <nav className={`menu ${isActive ? 'active' : ''}`}>
            <ul className='menuList'>
              <li className='menuItem'>
                <span id='settingsBtn'>Настройки</span>
              </li>
              <li className='menuItem'>
                <span id='logoutBtn' onClick={logoutBthHandler}>Выйти</span>
              </li>
            </ul>
          </nav>
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