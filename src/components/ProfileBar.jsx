import React, {useContext} from 'react'
import Button from './UI/button/Button'
import { PageContext } from './contexts/PageContext'
import { AuthWindowContext } from './contexts/AuthWindowContext'

export const ProfileBar = () => {
  const value = useContext(PageContext)
  const visibility = useContext(AuthWindowContext)

  const loginClicker = () => {
    value.changeActive('LoginWindow')
    visibility.changeAuthVisibility('')
  }

  const regClicker = () => {
    value.changeActive('RegWindow')
    visibility.changeAuthVisibility('')
  }

  return (
    <div className='profileBar'>
      <Button id='newPostBtn' title='New post'></Button>
      <Button onClick={loginClicker}>Войти</Button>
      <Button onClick={regClicker}>Регистрация</Button>
    </div>
  )
}
export default ProfileBar;