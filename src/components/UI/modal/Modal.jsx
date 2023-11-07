import React, { useContext } from 'react'
import "./Modal.css"
import { PageContext } from '../../contexts/PageContext'

const Modal = ({ children }) => {

  const value = useContext(PageContext)

  return (
    <div className='modal' onClick={() => value.changeActive('null')}>
      <div className='modal__content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )

}

export default Modal
