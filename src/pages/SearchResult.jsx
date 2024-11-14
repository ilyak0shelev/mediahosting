import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/SearchResult.css'
import ProfilePhoto from '../components/ProfilePhoto'
import SubscribeBtn from '../components/SubscribeBtn'
import { AuthStatusContext } from '../components/contexts/AuthStatusContext'
import useScrollDynamicHandler from '../components/hooks/useScrollDynamicHandler'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import PostItemSetter from '../components/PostItemSetter'

const SearchResult = () => {
    const { id } = useParams()
    const session_status = useContext(AuthStatusContext)
    const [fetchUsers, setFetchUsers] = useState(false)
    const [fetchPosts, setFetchPosts] = useState(false)
    const [fetchedUsers, setFetchedUsers] = useState([])
    const [fetchedPosts, setFetchedPosts] = useState([])
    const navigate = useNavigate()

    const skipCount = 20
    const limit = 20
    const [currentSkip, setCurrentSkip] = useState(0)
    const { reached, setReachedFalse, setReachedTrue } = useScrollDynamicHandler(true)
    const [filesExist, setFilesExist] = useState(true)
    const status = useContext(AuthStatusContext)

    useEffect(() => {
        if (reached && filesExist) {
            axios.post("/post/getPostsByMatch", { 'value': id, 'skipQuantity': currentSkip, 'limitQuantity': limit })
                .then((result) => {
                    if (result.data !== 'empty') {
                        setFetchPosts(true)
                        setFetchedPosts([...fetchedPosts, ...result.data])
                        setCurrentSkip(currentSkip + skipCount)
                    }
                    else {
                        setFilesExist(false)
                    }
                })
                .finally(() => {
                    setReachedFalse()
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reached, status.authStatus.authorized])

    useEffect(() => {
        setFetchedUsers([])
        setFetchedPosts([])
        setCurrentSkip(0)
        setFilesExist(true)
        setReachedTrue()
        setFetchUsers(false)
        setFetchPosts(false)

        axios.post('/user/getUsersByMatch', { value: id })
            .then((result) => {
                setFetchUsers(true)
                if (result.data !== 'empty') {
                    setFetchedUsers(result.data)
                }
            })
        // axios.post('', { value: id})
    }, [id])

    const profileNicknameClickHandler = (username) => {
        navigate(`/profiles/${username}`)
    }

    return (
        <div className='searchResultPageWrapper'>
            {!fetchUsers &&
                <span className='loader'></span>
            }
            {!fetchPosts &&
                <span className='loader'></span>
            }
            {fetchUsers &&
                <>
                    {fetchedUsers.length > 0 &&
                        <div className='fetchedUsersWrapper'>
                            <span className='searchResultUsersTitle'>Пользователи</span>
                            <div className='fetchedUsersItems'>
                                <div className='fetchedUsersItemsWrapper'>
                                    {fetchedUsers.map((el) =>
                                        <div className='fetchedUsersItem'>
                                            <div className='fetchedUsersProfilePhotoCont' onClick={() => profileNicknameClickHandler(el)}>
                                                <ProfilePhoto username={el} />
                                            </div>
                                            <div className='fetchedUsersNicknameCont'>
                                                <span className='fetchedUsersNickname' onClick={() => profileNicknameClickHandler(el)}>{el}</span>
                                            </div>
                                            {session_status.authStatus.authorized &&
                                                <SubscribeBtn subscriber={session_status.authStatus.login} user={el} />
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
            {fetchPosts &&
                <>
                    {fetchedPosts.length > 0 &&
                        <div className='fetchedPostsWrapper'>
                            <span className='searchResultPostsTitle'>Посты</span>
                            <ResponsiveMasonry className='fetchedPostsBoard' columnsCountBreakPoints={{ 350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6 }}>
                                <Masonry gutter="18px">
                                    {
                                        fetchedPosts.map(file =>
                                            <div className='fetchedPostsItems' onClick={() => navigate(`/posts/${file.id}`)}>
                                                <PostItemSetter className={'userBoardItem'} file={file} path={file.owner} />
                                            </div>)
                                    }
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>

                    }
                </>
            }
            {(fetchPosts && fetchUsers && !fetchedPosts.length && !fetchedUsers.length) &&
                <span>Ничего не найдено...</span>
            }
        </div>
    )
}

export default SearchResult