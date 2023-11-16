import React, { useContext } from 'react'
import "./Modal.css"
import { PageContext } from '../../contexts/PageContext'

const Modal = ({ children, visibility, changeVisibility }) => {

  const value = useContext(PageContext)

  const handlerClicker = () => {
    value.changeActive(null)
    changeVisibility('inactive')
  }
  
  return (
    <div className={`modal ${visibility}`} onClick={handlerClicker}>
      <div className={`modal__content ${visibility}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )

}

export default Modal
