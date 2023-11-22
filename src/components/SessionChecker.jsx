import React, {useContext, useEffect} from 'react'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import axios from 'axios'

const SessionChecker = () => {
    const status = useContext(AuthStatusContext)

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
        axios.get('/auth/check_session')
        .then((res) => console.log(res))
    }, [status])

  return (
    null
  )
}

export default SessionChecker