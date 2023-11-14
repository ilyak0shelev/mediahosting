import React, { useContext, useState, useEffect } from "react";
import Modal from "./UI/modal/Modal";
import { PageContext } from "./contexts/PageContext";
import Button from "./UI/button/Button";
import "./AuthWindows.css"
import { AuthWindowContext } from "./contexts/AuthWindowContext";
import axios from "axios";

const LoginWindow = () => {
    const value = useContext(PageContext)
    const visibility = useContext(AuthWindowContext)
    const [type, setType] = useState('password')
    const [icon, setIcon] = useState('fa fa-eye-slash')

    const [nickAuthValue, setNickAuthValue] = useState('')
    const [pswdAuthValue, setPswdAuthValue] = useState('')
    const [nickRegValue, setNickRegValue] = useState('')
    const [pswdRegValue, setPswdRegValue] = useState('')
    const [pswdRptValue, setPswdRptValue] = useState('')

    const [nickAuthDirty, setNickAuthDirty] = useState(false)
    const [pswdAuthDirty, setPswdAuthDirty] = useState(false)
    const [nickRegDirty, setNickRegDirty] = useState(false)
    const [pswdRegDirty, setPswdRegDirty] = useState(false)
    const [pswdRptDirty, setPswdRptDirty] = useState(false)

    const [nickAuthError, setNickAuthError] = useState('Заполните поле!')
    const [pswdAuthError, setPswdAuthError] = useState('Заполните поле!')
    const [nickRegError, setNickRegError] = useState('Заполните поле!')
    const [pswdRegError, setPswdRegError] = useState('Заполните поле!')
    const [pswdRptError, setPswdRptError] = useState('Заполните поле!')

    const [loginFormValid, setLoginFormValid] = useState(false)
    const [regFormValid, setRegFormValid] = useState(false)

    useEffect(() => {
        if (visibility.authVisibility === 'inactive') {
            setNickAuthValue('')
            setPswdAuthValue('')
            setNickRegValue('')
            setPswdRegValue('')
            setPswdRptValue('')
            setNickAuthError('Заполните поле!')
            setPswdAuthError('Заполните поле!')
            setNickRegError('Заполните поле!')
            setPswdRegError('Заполните поле!')
            setPswdRptError('Заполните поле!')
            setNickAuthDirty(false)
            setPswdAuthDirty(false)
            setNickRegDirty(false)
            setPswdRegDirty(false)
            setPswdRptDirty(false)
        }
    }, [visibility.authVisibility])

    useEffect(() => {
        if (nickAuthError || pswdAuthError) {
            setLoginFormValid(false)
        } else {
            setLoginFormValid(true)
        }
    }, [nickAuthError, pswdAuthError])

    useEffect(() => {
        if (nickRegError || pswdRegError || pswdRptError) {
            setRegFormValid(false)
        } else {
            setRegFormValid(true)
        }
    }, [nickRegError, pswdRegError, pswdRptError])

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

    const nickAuthHandler = (e) => {
        const re = /^[a-zA-Z][a-zA-Z0-9_.,-]{5,31}$/
        if(!re.test(String(e.target.value).toLowerCase())) {
            setNickAuthError('Никнейм некорректный!')
            if (!e.target.value) {
                setNickAuthError('Заполните поле!')
            }
        } else {
            setNickAuthError('')
        }
    }

    const nickRegHandler = (e) => {
        const re = /^[a-zA-Z][a-zA-Z0-9_-]{5,31}$/
        if(!re.test(String(e.target.value).toLowerCase())) {
            setNickRegError('Никнейм некорректный!')
            if (!e.target.value) {
                setNickRegError('Заполните поле!')
            }
        } else {
            setNickRegError('')
        }
    }

    const pswdAuthHandler = (e) => {
        const re = /^(?=.*\d)\w{4,20}$/
        if(!re.test(String(e.target.value).toLowerCase())) {
            setPswdAuthError('Пароль должен быть длиной 4-20 символов и содержать хотя бы одну цифру!')
            if (!e.target.value) {
                setPswdAuthError('Заполните поле!')
            }
        } else {
            setPswdAuthError('')
        }
    }

    const pswdRegHandler = (e) => {
        if (e.target.value !== pswdRptValue) {
            setPswdRptError('Пароли не совпадают!')
        } else {
            setPswdRptError('')
        }

        const re = /^(?=.*\d)\w{4,20}$/
        if(!re.test(String(e.target.value).toLowerCase())) {
            setPswdRegError('Пароль должен быть длиной 4-20 символов и содержать хотя бы одну цифру!')
            if (!e.target.value) {
                setPswdRegError('Заполните поле!')
            }
        } else {
            setPswdRegError('')
        }
    }

    const pswdRptHandler = (e) => {
        if(e.target.value !== pswdRegValue) {
            setPswdRptError('Пароли не совпадают!')
            if (!e.target.value) {
                setPswdRptError('Заполните поле!')
            }
        } else {
            setPswdRptError('')
        }
    }


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'authNickInput':
                setNickAuthDirty(true)
                break
            case 'authPswdInput':
                setPswdAuthDirty(true)
                break
            case 'regNickInput':
                setNickRegDirty(true)
                break
            case 'regPswdInput':
                setPswdRegDirty(true)
                break
            case 'regPswdRptInput':
                setPswdRptDirty(true)
                break
            default:
                break
        }
    }

    const closeWindow = () => {
        value.changeActive('null')
        visibility.changeAuthVisibility("inactive")
    }

    const login = (event) => {
        event.preventDefault()
        axios.post("/auth/login", {'nickname':event.target.authNickInput.value, 'pswd': event.target.authPswdInput.value})
        .then((res) => {

        })
    }

    const registration = (event) => {
        event.preventDefault()
        axios.post("/auth/registration", {'nickname':event.target.regNickInput.value, 'pswd': event.target.regPswdInput.value, 'pswdRepeat': event.target.regPswdRptInput.value})
        .then((res) => {

        })
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
                        <form className="MainForm" onSubmit={login} method='post'>
                            <h1 className="welcomeLabel">Добро пожаловать!</h1>
                            <div className="inputGroup">
                                <div className="nickGroup">
                                    <input value={nickAuthValue} onChange={(e) => {setNickAuthValue(e.target.value); nickAuthHandler(e)}} onBlur={blurHandler} name="authNickInput" className="nickInput" type='text' placeholder="Введите ваш никнейм..."></input>
                                    <span className="nickInfo" title="Разрешены: A-Z 0-9 _ -
                                                                      Никнейм должен начинаться с латинского символа
                                                                      Длина: от 6 до 32 символов">
                                    </span>
                                </div>
                                {(nickAuthDirty && nickAuthError) && <h1 style={{fontSize: "12px", color:"rgba(218, 73, 73, 1)"}}>{nickAuthError}</h1>}
                                <div className="pswdGroup">
                                    <input value={pswdAuthValue} onChange={(e) => {setPswdAuthValue(e.target.value); pswdAuthHandler(e)}} onBlur={blurHandler} name="authPswdInput" className="pswdInput" type={type} placeholder="Введите пароль..."></input>
                                    <span onClick={toggleInputType} className={`${icon}`}></span>
                                </div>
                                {(pswdAuthDirty && pswdAuthError) && <h1 style={{fontSize: "12px", color:"rgba(218, 73, 73, 1)"}}>{pswdAuthError}</h1>}
                            </div>
                            <div className="submitGroup">
                                <Button disabled={!loginFormValid} id='login-btn' type='submit'>
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
                                    <input value={nickRegValue} onChange={(e) => {setNickRegValue(e.target.value); nickRegHandler(e)}} onBlur={blurHandler} name="regNickInput" className="nickInput" type='text' placeholder="Введите ваш никнейм..."></input>
                                    <span className="nickInfo" title="Разрешены: A-Z 0-9 _ -
                                                                      Никнейм должен начинаться с латинского символа
                                                                      Длина: от 6 до 32 символов">
                                    </span>
                                </div>
                                {(nickRegDirty && nickRegError) && <h1 style={{fontSize: "12px", color:"rgba(218, 73, 73, 1)"}}>{nickRegError}</h1>}
                                <div className="pswdGroup">
                                    <input value={pswdRegValue} onChange={(e) => {setPswdRegValue(e.target.value); pswdRegHandler(e)}} onBlur={blurHandler} name="regPswdInput" className="pswdInput" type={type} placeholder="Введите пароль..."></input>
                                    <span onClick={toggleInputType} className={`${icon}`}></span>
                                </div>
                                {(pswdRegDirty && pswdRegError) && <h1 style={{fontSize: "12px", color:"rgba(218, 73, 73, 1)"}}>{pswdRegError}</h1>}
                                <div className="pswdRepeatGroup">
                                    <input value={pswdRptValue} onChange={(e) => {setPswdRptValue(e.target.value); pswdRptHandler(e)}} onBlur={blurHandler} name="regPswdRptInput" className="pswdInput" type={type} placeholder="Повторите пароль..."></input>
                                </div>
                                {(pswdRptDirty && pswdRptError) && <h1 style={{fontSize: "12px", color:"rgba(218, 73, 73, 1)"}}>{pswdRptError}</h1>}
                            </div>
                            <div className="submitGroup">
                                <Button disabled={!regFormValid} id='reg-btn' type='submit'>
                                    Создать аккаунт
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="closeBtnCont">
                    <Button onClick={closeWindow} id="close-btn"></Button>
                </div>
        </Modal>
    )
}

export default LoginWindow
