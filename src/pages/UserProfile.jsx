import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/UserProfile.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Popup from '../components/UI/popup/Popup'
import { useSelector } from 'react-redux'
import PostItemSetter from '../components/PostItemSetter'
import { AuthStatusContext } from '../components/contexts/AuthStatusContext'
import useGetFiles from '../components/hooks/useGetFiles'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import LikeReciever from '../components/LikeReciever'
import OnTopBtn from '../components/UI/ontopbtn/OnTopBtn'
import ItemsControls from '../components/ItemsControls'
import SubscribeBtn from '../components/SubscribeBtn'
import ProfilePhoto from '../components/ProfilePhoto'
import Button from '../components/UI/button/Button'

const UserProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const session_status = useContext(AuthStatusContext)
    const [exists, setExistence] = useState(false)
    const [errStatus, setErrStatus] = useState('')
    const redux_files = useSelector(state => state.userfiles.files)
    const redux_likes = useSelector(state => state.userlikes.likes)
    const redux_hiddenFiles = useSelector(state => state.userfiles.hiddenFiles)
    const redux_subscriptions = useSelector(state => state.usersubs.subscriptions)
    const redux_subscribers = useSelector(state => state.usersubs.subscribers)
    let [findedSubscriptions, setFindedSubscriptions] = useState([])
    let [findedSubscribers, setFindedSubscribers] = useState([])
    const fetched = useSelector(state => state.userfiles.filesFetched)
    const [files, getFiles, clearFiles] = useGetFiles([])
    const [selectedPostsType, setSelectedPostsType] = useState('mine')
    const [selectedSubsType, setSelectedSubsType] = useState('')
    const [searchData, setSearchData] = useState('')
    const [modal, toggleModal] = useState(false)

    useEffect(() => {
        setExistence(false)
        axios.post('/user/checkUser', { id })
            .then((result) => {
                if (result.status === 200) {
                    setExistence(true)
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    navigate('/error')
                }
                else {
                    setErrStatus(true)
                }
            })
    }, [id])

    useEffect(() => {
        if (id !== session_status.authStatus.login && exists) {
            clearFiles()
            getFiles(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exists])

    for (let v of document.getElementsByTagName('video')) {
        if (v.played)
            v.pause();
    }

    const postClickHandler = (id) => {
        navigate(`/posts/${id}`)
    }

    const postsTypeHandler = (e) => {
        setSelectedPostsType(e.target.value)
    }

    const subsBtnHandler = (value) => {
        toggleModal(true)
        setSelectedSubsType(value)
    }

    const subsBtnHandlerModal = (value) => {
        setSelectedSubsType(value)
    }

    const profileNicknameClickHandler = (username) => {
        navigate(`/profiles/${username}`)
        toggleModal(false)
    }

    const searchSubsHandler = (value) => {
        setSearchData(value)
    }

    useEffect(() => {
        if (searchData) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (selectedSubsType === 'subscriptions') {
                const temp = redux_subscriptions.filter(el => el.user.match(searchData))
                setFindedSubscriptions(temp)
            }
            else if (selectedSubsType === 'subscribers') {
                const temp = redux_subscribers.filter(el => el.subscriber.match(searchData))
                setFindedSubscribers(temp)
            }
        }
    }, [searchData, selectedSubsType])

    return (
        <>
            {exists &&
                <div className='profileCont'>
                    <div className='userInfoCont'>
                        <div className='profilePhotoCont'>
                            <ProfilePhoto username={id} />
                        </div>
                        <div className='profileNicknameCont'>
                            <h1>{id}</h1>
                        </div>
                        {session_status.authStatus.authorized &&
                            <div className='subBtnCont'>
                                <SubscribeBtn subscriber={session_status.authStatus.login} user={id} />
                            </div>
                        }

                    </div>
                    {modal &&
                        <div className='subsModalCont' onClick={() => { toggleModal(false) }}>
                            <div className='subsModal' onClick={e => e.stopPropagation()}>
                                <div className='userSubscribersModalWrapper'>
                                    <div className={selectedSubsType === 'subscriptions' ? 'userSubscribersModalItemActive' : 'userSubscribersModalItem'} onClick={() => subsBtnHandlerModal('subscriptions')}>Подписки</div>
                                    <div className={selectedSubsType === 'subscribers' ? 'userSubscribersModalItemActive' : 'userSubscribersModalItem'} onClick={() => subsBtnHandlerModal('subscribers')}>Подписчики</div>
                                </div>
                                <input value={searchData} onChange={(event) => searchSubsHandler(event.target.value)} className='searchUsersInput' type="text" placeholder="Найти..." />
                                <div className='userSubscribersModalBodyWrapper'>
                                    {(selectedSubsType === 'subscriptions' && !searchData) &&
                                        <>
                                            {redux_subscriptions.map(el =>
                                                <div className='userSubscribersModalBodyItem'>
                                                    <div className='profilePhotoModalCont'>
                                                        <ProfilePhoto username={el.user} />
                                                    </div>
                                                    <div className='profileNicknameModalCont'>
                                                        <span className='profileNicknameModal' onClick={() => profileNicknameClickHandler(el.user)}>{el.user}</span>
                                                    </div>
                                                    <SubscribeBtn subscriber={session_status.authStatus.login} user={el.user} />
                                                </div>
                                            )}
                                        </>
                                    }
                                    {(selectedSubsType === 'subscribers' && !searchData) &&
                                        <>
                                            {redux_subscribers.map(el =>
                                                <div className='userSubscribersModalBodyItem'>
                                                    <div className='profilePhotoModalCont'>
                                                        <ProfilePhoto username={el.subscriber} />
                                                    </div>
                                                    <div className='profileNicknameModalCont'>
                                                        <span className='profileNicknameModal' onClick={() => profileNicknameClickHandler(el.subscriber)}>{el.subscriber}</span>
                                                    </div>
                                                    <SubscribeBtn subscriber={session_status.authStatus.login} user={el.subscriber} />
                                                </div>
                                            )}
                                        </>
                                    }
                                    {(selectedSubsType === 'subscriptions' && searchData) &&
                                        <>
                                            {!findedSubscriptions.length &&
                                                <div>Ничего не нашлось...</div>
                                            }
                                            {findedSubscriptions.map(el =>
                                                <div className='userSubscribersModalBodyItem'>
                                                    <div className='profilePhotoModalCont'>
                                                        <ProfilePhoto username={el.user} />
                                                    </div>
                                                    <div className='profileNicknameModalCont'>
                                                        <span className='profileNicknameModal' onClick={() => profileNicknameClickHandler(el.user)}>{el.user}</span>
                                                    </div>
                                                    <SubscribeBtn subscriber={session_status.authStatus.login} user={el.user} />
                                                </div>
                                            )

                                            }
                                        </>
                                    }
                                    {(selectedSubsType === 'subscribers' && searchData) &&
                                        <>
                                            {!findedSubscribers.length &&
                                                <div>Ничего не нашлось...</div>
                                            }
                                            {findedSubscribers.map(el =>
                                                <div className='userSubscribersModalBodyItem'>
                                                    <div className='profilePhotoModalCont'>
                                                        <ProfilePhoto username={el.subscriber} />
                                                    </div>
                                                    <div className='profileNicknameModalCont'>
                                                        <span className='profileNicknameModal' onClick={() => profileNicknameClickHandler(el.subscriber)}>{el.subscriber}</span>
                                                    </div>
                                                    <SubscribeBtn subscriber={session_status.authStatus.login} user={el.subscriber} />
                                                </div>
                                            )
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <OnTopBtn />

                    {(id === session_status.authStatus.login && fetched) &&
                        <div className='userSubInfoWrapper'>
                            <div className='userSubscribersWrapper'>
                                <span className='userSubscribersItem' onClick={() => subsBtnHandler('subscriptions')}>Подписки: {redux_subscriptions.length}</span>
                                <span className='userSubscribersItem' onClick={() => subsBtnHandler('subscribers')}>Подписчики: {redux_subscribers.length}</span>
                            </div>
                            <div className='togglePostTypeWrapper'>
                                <div className='togglePostTypeItem MyPosts'>
                                    <input id="fid-1" type="radio" name="radio" value="mine" onChange={(e) => postsTypeHandler(e)} defaultChecked></input>
                                    <label for="fid-1">Мои посты</label>
                                </div>
                                <div className='togglePostTypeItem LikedPosts'>
                                    <input id="fid-2" type="radio" name="radio" value="liked" onChange={(e) => postsTypeHandler(e)}></input>
                                    <label for="fid-2">Сохранённые</label>
                                </div>
                                <div className='togglePostTypeItem PrivatePosts'>
                                    <input id="fid-3" type="radio" name="radio" value="private" onChange={(e) => postsTypeHandler(e)}></input>
                                    <label for="fid-3">Скрытые</label>
                                </div>
                            </div>
                        </div>
                    }
                    {(selectedPostsType === 'mine') &&
                        <>
                            {(id === session_status.authStatus.login) &&
                                <>
                                    {!redux_files.length &&
                                        <div className='emptyStorageMessageWrapper'>
                                            <div className='emptyStorageMessage'>
                                                Здесь пока ничего нет...
                                            </div>
                                            <Button id='emptyStorageMessageBtn' onClick={() => navigate('/create_post')}>Создать пост</Button>
                                        </div>
                                    }
                                    <ResponsiveMasonry className='userBoardCont' columnsCountBreakPoints={{ 350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6 }}>
                                        <Masonry gutter="18px">
                                            {
                                                redux_files.map(file =>
                                                    <div className='userBoardItems selfItems'>
                                                        <div onClick={() => postClickHandler(file.id)}>
                                                            <PostItemSetter className={'userBoardItem'} file={file} path={session_status.authStatus.login} />
                                                        </div>
                                                        <ItemsControls file={file} />
                                                    </div>)
                                            }
                                        </Masonry>
                                    </ResponsiveMasonry>
                                </>
                            }
                            {(id !== session_status.authStatus.login) &&
                                <>
                                    {!files.length &&
                                        <div className='emptyStorageMessageWrapper'>
                                            <div className='emptyStorageMessage'>
                                                Здесь пока ничего нет...
                                            </div>
                                        </div>
                                    }

                                    <ResponsiveMasonry className='userBoardCont' columnsCountBreakPoints={{ 350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6 }}>
                                        <Masonry gutter="18px">
                                            {
                                                files.map(file => <div className='userBoardItems' onClick={() => postClickHandler(file.id)}><PostItemSetter className={'userBoardItem'} file={file} path={id} /></div>)
                                            }
                                        </Masonry>
                                    </ResponsiveMasonry>
                                </>
                            }
                        </>
                    }
                    {(selectedPostsType === 'liked') &&
                        <>
                            <LikeReciever />
                            <ResponsiveMasonry className='userBoardCont' columnsCountBreakPoints={{ 350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6 }}>
                                <Masonry gutter="18px">
                                    {
                                        redux_likes.map(file => <div className='userBoardItems' onClick={() => postClickHandler(file.postID)}><PostItemSetter className={'userBoardItem'} file={file} path={file.owner} /></div>)
                                    }
                                </Masonry>
                            </ResponsiveMasonry>
                        </>

                    }
                    {(selectedPostsType === 'private') &&
                        <>
                            <ResponsiveMasonry className='userBoardCont' columnsCountBreakPoints={{ 350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6 }}>
                                <Masonry gutter="18px">
                                    {
                                        redux_hiddenFiles.map(file =>
                                            <div className='userBoardItems selfItems'>
                                                <div onClick={() => postClickHandler(file.id)}><PostItemSetter className={'userBoardItem'} file={file} path={session_status.authStatus.login} /></div>
                                                <ItemsControls file={file} />
                                            </div>)
                                    }
                                </Masonry>
                            </ResponsiveMasonry>
                        </>
                    }
                </div>
            }
            <Popup status={errStatus} setStatus={setErrStatus}>Что-то пошло не так...</Popup>
        </>
    )
}

export default UserProfile