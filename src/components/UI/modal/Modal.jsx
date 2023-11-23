import "./Modal.css"

const Modal = ({ children, visibility, changeVisibility }) => {

  const handlerClicker = () => {
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
