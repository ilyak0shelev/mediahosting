import React, { useContext, useState } from "react";
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

    const closeBtnClicked = () => {
        value.changeActive('null')
        visibility.changeAuthVisibility("inactive")
        setNickAuthValue('')
        setPswdAuthValue('')
        setNickRegValue('')
        setPswdRegValue('')
        setPswdRptValue('')
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
        <Modal clearNickAuth={setNickAuthValue} clearPswdAuth={setPswdAuthValue} clearNickReg={setNickRegValue} clearPwsdReg={setPswdRegValue} clearPwsdRegRpt={setPswdRptValue}>
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
                                    <input value={nickAuthValue} onChange={(e) => setNickAuthValue(e.target.value)} onBlur={blurHandler} name="authNickInput" className="nickInput" type='text' placeholder="Введите ваш никнейм..."></input>
                                </div>
                                {(nickAuthDirty && nickAuthError) && <h1 style={{fontSize: "14px", color:"rgba(218, 73, 73, 1)", justifyContent:"left"}}>{nickAuthError}</h1>}
                                <div className="pswdGroup">
                                    <input value={pswdAuthValue} onChange={(e) => setPswdAuthValue(e.target.value)} onBlur={blurHandler} name="authPswdInput" className="pswdInput" type={type} placeholder="Введите пароль..."></input>
                                    <span onClick={toggleInputType} className={`${icon}`}></span>
                                </div>
                                {(pswdAuthDirty && pswdAuthError) && <h1 style={{fontSize: "14px", color:"rgba(218, 73, 73, 1)", justifyContent:"left"}}>{pswdAuthError}</h1>}
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
                                    <input value={nickRegValue} onChange={(e) => setNickRegValue(e.target.value)} onBlur={blurHandler} name="regNickInput" className="nickInput" type='text' placeholder="Введите ваш никнейм..."></input>
                                </div>
                                {(nickRegDirty && nickRegError) && <h1 style={{fontSize: "14px", color:"rgba(218, 73, 73, 1)", justifyContent:"left"}}>{nickRegError}</h1>}
                                <div className="pswdGroup">
                                    <input value={pswdRegValue} onChange={(e) => setPswdRegValue(e.target.value)} onBlur={blurHandler} name="regPswdInput" className="pswdInput" type={type} placeholder="Введите пароль..."></input>
                                    <span onClick={toggleInputType} className={`${icon}`}></span>
                                </div>
                                {(pswdRegDirty && pswdRegError) && <h1 style={{fontSize: "14px", color:"rgba(218, 73, 73, 1)", justifyContent:"left"}}>{pswdRegError}</h1>}
                                <div className="pswdRepeatGroup">
                                    <input value={pswdRptValue} onChange={(e) => setPswdRptValue(e.target.value)} onBlur={blurHandler} name="regPswdRptInput" className="pswdInput" type={type} placeholder="Повторите пароль..."></input>
                                </div>
                                {(pswdRptDirty && pswdRptError) && <h1 style={{fontSize: "14px", color:"rgba(218, 73, 73, 1)", justifyContent:"left"}}>{pswdRptError}</h1>}
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
