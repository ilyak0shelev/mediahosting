import React, {useEffect} from 'react'
import classes from './Popup.module.css'

const Popup = ({ status, setStatus, children }) => {
    useEffect(() => {
        setTimeout(() => {
            setStatus(false)
        }, 3000)
      }, [setStatus, status])

    return (
        <>
            {status &&
                <div className={classes.alertCont}><div className={classes.alert}>{children}</div></div>
            }
        </>
    )
}

export default Popup