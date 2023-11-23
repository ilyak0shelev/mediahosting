import {useContext, useEffect} from 'react'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SessionChecker = () => {
    const status = useContext(AuthStatusContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/auth/check_session')
        .then((result) => {
            if (result.data.authorized) {
                status.changeAuthStatus(true)
                console.log('authorized')
            } else {
                status.changeAuthStatus(false)
                console.log('Not authorized')
            }
        })
        .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        if (!status.authStatus) {
            navigate('/')
        }
    }, [navigate, status])

  return null
}

export default SessionChecker