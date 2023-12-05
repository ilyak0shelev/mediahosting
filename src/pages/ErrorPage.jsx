import React from 'react'
import classes from '../styles/ErrorPage.module.css'
import Button from '../components/UI/button/Button'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className={classes.errorPageCont}>
            <div className={classes.errorMsgCont}>
                <h1 className={classes.errorMsg}>Хм... Кажется, такой страницы не существует...</h1>
                <Button onClick={handleClick}>Вернуться на главную</Button>
            </div>
        </div>
    )
}

export default ErrorPage