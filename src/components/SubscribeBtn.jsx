import React, { useEffect, useState } from 'react'
import Button from './UI/button/Button'
import '../styles/SubscribeBtn.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addSubscriptions, filterSubscriptions } from '../store/userSubsSlice'

const SubscribeBtn = (props) => {
    const [subscribed, setSubscribed] = useState()
    const dispatch = useDispatch()
    const redux_subscribers = useSelector(state => state.usersubs.subscribers)
    const redux_subscriptions = useSelector(state => state.usersubs.subscriptions)

    useEffect(() => {
        if (!(redux_subscriptions.find((temp) => temp === props.user))) {
            axios.post('/user/checkSub', { 'subscriber': props.subscriber, 'user': props.user })
                .then((res) => {
                    setSubscribed(res.data)
                })
        }
        else {
            setSubscribed(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const subBtnHandler = () => {
        axios.post('/user/subscribe', { 'subscriber': props.subscriber, 'user': props.user })
            .then(() => {
                setSubscribed(true)
                dispatch(addSubscriptions(props))
            })
    }

    const unsubBtnHandler = () => {
        axios.post('/user/unsubscribe', { 'subscriber': props.subscriber, 'user': props.user })
            .then(() => {
                setSubscribed(false)
                dispatch(filterSubscriptions(props))
            })
    }

    return (
        <>
            {props.subscriber !== props.user &&
                <>
                    {subscribed === true &&
                        <Button style={{ backgroundColor: 'rgba(141, 140, 141, 0.4)' }} id='sub_btn' onClick={unsubBtnHandler}>Вы подписаны</Button>
                    }
                    {subscribed === false &&
                        <Button id='sub_btn' onClick={subBtnHandler}>Подписаться</Button>
                    }
                    {subscribed === undefined &&
                        <Button id='sub_btn'></Button>
                    }
                </>
            }
        </>
    )
}

export default SubscribeBtn