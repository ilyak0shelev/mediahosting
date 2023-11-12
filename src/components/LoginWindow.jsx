import React, { useContext, useState } from "react";
import Modal from "./UI/modal/Modal";
import { PageContext } from "./contexts/PageContext";
import Button from "./UI/button/Button";
import "./AuthWindows.css"
import { AuthWindowContext } from "./contexts/AuthWindowContext";

const LoginWindow = () => {
    const value = useContext(PageContext)
    const visibility = useContext(AuthWindowContext)
    const [type, setType] = useState('password')
    const [icon, setIcon] = useState('fa fa-eye-slash')

    const toggleInputType = () => {
        if (type === 'password') {
            setType('text')
            setIcon('fa fa-eye')
        }
        else if (type === 'text') {
            setType('password')
            setIcon('fa fa-eye-slash')
        }
    }

    const closeBtnClicked = () => {
        value.changeActive('null')
        visibility.changeAuthVisibility("inactive")
    }

    const login = (event) => {
        event.preventDefault()
    }

    const registration = (event) => {
        event.preventDefault()
    }

    return (
        <Modal>
            <div className="windowCont">
                <div className="btnGroup">
                    <Button id={`login-window-btn-${value.active}`} onClick={() => value.changeActive('LoginWindowActive')}>Вход</Button>
                    <Button id={`reg-window-btn-${value.active}`} onClick={() => value.changeActive('RegWindowActive')}>Регистрация</Button>
                </div>
                <div className="contentCont">
                    <div className={`loginCont ${value.active}`}>
                        <form className="MainForm" onSubmit={login} action='' method='post'>
                            <h1 className="welcomeLabel">Добро пожаловать!</h1>
                            <div className="inputGroup">
                                <div className="nickGroup">
                                    <input className="nickInput" type='text' placeholder="Введите ваш никнейм..."></input>
                                </div>
                                <div className="pswdGroup">
                                    <input className="pswdInput" type={type} placeholder="Введите пароль..."></input>
                                    <span onClick={toggleInputType} className={`${icon}`}></span>
                                </div>
                            </div>
                            <div className="submitGroup">
                                <Button id='login-btn' type='submit'>
                                    Войти
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className={`regCont ${value.active}`}>
                        <form className="MainForm" onSubmit={registration} action='' method='post'>
                            <h1 className="welcomeLabel">Добро пожаловать!</h1>
                            <div className="inputGroup">
                                <div className="nickGroup">
                                    <input className="nickInput" type='text' placeholder="Введите ваш никнейм..."></input>
                                </div>
                                <div className="pswdGroup">
                                    <input className="pswdInput" type={type} placeholder="Введите пароль..."></input>
                                    <span onClick={toggleInputType} className={`${icon}`}></span>
                                </div>
                                <div className="pswdRepeatGroup">
                                    <input className="pswdInput" type={type} placeholder="Повторите пароль..."></input>
                                </div>
                            </div>
                            <div className="submitGroup">
                                <Button id='reg-btn' type='submit'>
                                    Создать аккаунт
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="closeBtnCont">
                    <Button onClick={closeBtnClicked} id="close-btn"></Button>
                </div>
        </Modal>
    )
}

export default LoginWindow
