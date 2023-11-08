import React, {useContext} from 'react'
import Button from './UI/button/Button'
import { PageContext } from './contexts/PageContext'

export const ProfileBar = () => {
  const value = useContext(PageContext)

  return (
    <div className='profileBar'>
      <Button id='newPostBtn' title='New post'></Button>
      <Button onClick={() => value.changeActive('LoginWindow')}>Войти</Button>
      <Button onClick={() => value.changeActive('RegWindow')}>Регистрация</Button>
    </div>
  )
}
export default ProfileBar;