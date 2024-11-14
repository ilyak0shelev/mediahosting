import React from 'react'
import useScrollStaticHandler from '../../hooks/useScrollStaticHandler'
import classes from './OnTopBtn.module.css'

const OnTopBtn = () => {
    const { reached, setReachedFalse } = useScrollStaticHandler(false)

    const onTopBtnHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <>
            {reached &&
                <button className={classes.onTopBtn} onClick={onTopBtnHandler}></button>
            }
        </>
    )
}

export default OnTopBtn