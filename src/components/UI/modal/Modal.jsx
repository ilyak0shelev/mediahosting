import React, { useContext } from 'react'
import "./Modal.css"
import { PageContext } from '../../contexts/PageContext'
import { AuthWindowContext } from '../../contexts/AuthWindowContext'

const Modal = ({ children }) => {

  const value = useContext(PageContext)
  const visibility = useContext(AuthWindowContext)

  const handlerClicker = () => {
    value.changeActive('null')
    visibility.changeAuthVisibility('inactive')
  }
  
  return (
    <div className={`modal ${visibility.authVisibility}`} onClick={handlerClicker}>
      <div className={`modal__content ${visibility.authVisibility}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )

}

export default Modal
