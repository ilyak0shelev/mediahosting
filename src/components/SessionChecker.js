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
                status.changeAuthStatus(result.data)
            } else {
                status.changeAuthStatus(result.data)
            }
        })
        .catch((error) => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!status.authStatus.authorized) {
            navigate('/')
        }
    }, [navigate, status])

  return null
}

export default SessionChecker