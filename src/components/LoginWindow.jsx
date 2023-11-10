import React, { useContext, useState } from "react";
import Modal from "./UI/modal/Modal";
import { PageContext } from "./contexts/PageContext";
import Button from "./UI/button/Button";
import "./AuthWindows.css"

const LoginWindow = () => {
    const value = useContext(PageContext)
    const [type, setType] = useState('password')
    const [icon, setIcon] = useState('fa fa-eye-slash')

    const toggleInput = () => {
        if (type === 'password') {
            setType('text')
            setIcon('fa fa-eye')
        }
        else if (type === 'text') {
            setType('password')
            setIcon('fa fa-eye-slash')
        }
    }

    const login = (event) => {
        event.preventDefault()
    }

    return (
        <Modal>
            <div className="windowCont">
                <div className="btnGroup">
                    <Button onClick={() => value.changeActive('LoginWindow')}>Вход</Button>
                    <Button onClick={() => value.changeActive('RegWindow')}>Регистрация</Button>
                </div>
                {value.active === 'LoginWindow' &&
                    <div className="loginCont">
                        <form onSubmit={login} action='' method='post'>
                            <h1 className="welcomeLabel">Добро пожаловать!</h1>
                            <div className="inputGroup">
                                <input className="" type='text' placeholder="Введите ваш никнейм..."></input>
                                <div className="pswdGroup">
                                    <input className="" type={type} placeholder="Введите пароль..."></input>
                                    <span onClick={toggleInput} className={`${icon}`}></span>
                                </div>
                                <div className="pswdRepeatGroup">
                                    <input className="" type={type} placeholder="Повторите пароль..."></input>
                                    <span onClick={toggleInput} className={`${icon}`}></span>
                                </div>
                            </div>
                            <div className="btnGroup">
                                <Button id='submit-btn' type='submit'>
                                    Войти
                                </Button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </Modal>
    )
}

export default LoginWindow
