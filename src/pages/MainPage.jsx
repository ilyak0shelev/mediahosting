import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import PostItemSetter from '../components/PostItemSetter'
import { AuthStatusContext } from '../components/contexts/AuthStatusContext'
import LikeReciever from '../components/LikeReciever'
import '../styles/MainPage.css'
import useScrollDynamicHandler from '../components/hooks/useScrollDynamicHandler'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProfilePhoto from '../components/ProfilePhoto'
import SubscribeBtn from '../components/SubscribeBtn'

const MainPage = () => {
  const navigate = useNavigate()
  const session_status = useContext(AuthStatusContext)

  const [selectedPostsType, setSelectedPostsType] = useState('all')

  const [fetchedSubPosts, setFetchedSubPosts] = useState([])
  const [fetchedAllPosts, setFetchedAllPosts] = useState([])
  const [fetchSubPosts, setFetchSubPosts] = useState(false)
  const [fetchAllPosts, setFetchAllPosts] = useState(false)

  const redux_subscriptions = useSelector(state => state.usersubs.subscriptions)

  const skipSubsCount = 20
  const limitSubs = 20

  const skipAllCount = 20
  const limitAll = 20

  const [currentSubsSkip, setCurrentSubsSkip] = useState(0)
  const [subsExist, setSubsExist] = useState(true)

  const [currentAllSkip, setCurrentAllSkip] = useState(0)
  const [allExist, setAllExist] = useState(true)

  const { reached, setReachedFalse, setReachedTrue } = useScrollDynamicHandler(true)

  useEffect(() => {
    setReachedTrue()
    setFetchedSubPosts([])
    setFetchedAllPosts([])
    setCurrentSubsSkip(0)
    setCurrentAllSkip(0)
    setFetchAllPosts(false)
    setFetchSubPosts(false)
  }, [session_status.authStatus.authorized])

  useEffect(() => {
    if (selectedPostsType === 'subs') {
      if (reached && subsExist && session_status.authStatus.authorized) {
        axios.post("/post/getPostsBySubs", { 'subs': redux_subscriptions, 'skipQuantity': currentSubsSkip, 'limitQuantity': limitSubs })
          .then((result) => {
            if (result.data !== 'empty') {
              setFetchedSubPosts([...fetchedSubPosts, ...result.data])
              setCurrentSubsSkip(currentSubsSkip + skipSubsCount)
            }
            else {
              setSubsExist(false)
            }
          })
          .finally(() => {
            setFetchSubPosts(true)
            setReachedFalse()
          })
      }
    }
    else if (selectedPostsType === 'all') {
      if (reached && allExist) {
        axios.post("/post/getFilesForMainPage", { 'skipQuantity': currentAllSkip, 'limitQuantity': limitAll })
          .then((result) => {
            if (result.data !== 'empty') {
              setFetchedAllPosts([...fetchedAllPosts, ...result.data])
              setCurrentAllSkip(currentAllSkip + skipAllCount)
            }
            else {
              setAllExist(false)
            }
          })
          .finally(() => {
            setFetchAllPosts(true)
            setReachedFalse()
          })
      }
    }
  }, [selectedPostsType, reached, session_status.authStatus.authorized])

  const postsTypeHandler = (value) => {
    setReachedTrue()
    setSelectedPostsType(value)
  }

  for (let v of document.getElementsByTagName('video')) {
    if (v.played)
      v.pause();
  }

  return (
    <div className='mainPageWrapper'>
      {session_status.authStatus.authorized &&
        <div className='togglePostTypeWrapper'>
          <div className='togglePostTypeItem MyPosts'>
            <input id="fid-1" type="radio" name="radio" value="all" onChange={(e) => postsTypeHandler(e.target.value)} defaultChecked></input>
            <label for="fid-1">Общие</label>
          </div>
          <div className='togglePostTypeItem LikedPosts'>
            <input id="fid-2" type="radio" name="radio" value="subs" onChange={(e) => postsTypeHandler(e.target.value)}></input>
            <label for="fid-2">Подписки</label>
          </div>
        </div>
      }

      {!fetchSubPosts && selectedPostsType === 'subs' &&
        <span className='loader'></span>
      }
      {!fetchAllPosts && selectedPostsType === 'all' &&
        <span className='loader'></span>
      }
      <div className='mainPageBoard'>
        {selectedPostsType === 'subs' &&
          <>
            <div className='fetchedPostsWrapper'>
              <ResponsiveMasonry className='fetchedPostsBoard' columnsCountBreakPoints={{ 350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6 }}>
                <Masonry gutter="18px">
                  {
                    fetchedSubPosts.map(file =>
                      <div className='fetchedSubsWrapper'>
                        <div onClick={() => navigate(`/posts/${file.id}`)}>
                          <PostItemSetter className={'userBoardItem'} file={file} path={file.owner} />
                        </div>
                        <div className='userSubscribersModalBodyItem' id='main_nickname'>
                          <div className='profilePhotoModalCont'>
                            <ProfilePhoto username={file.owner} />
                          </div>
                          <div className='profileNicknameModalCont'>
                            <span className='profileNicknameModal' onClick={() => navigate(`/profiles/${file.owner}`)}>{file.owner}</span>
                          </div>
                          <SubscribeBtn subscriber={session_status.authStatus.login} user={file.owner} />
                        </div>
                      </div>
                    )
                  }
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </>
        }
        {selectedPostsType === 'all' &&
          <>
            <div className='fetchedPostsWrapper'>
              <ResponsiveMasonry className='fetchedPostsBoard' columnsCountBreakPoints={{ 350: 2, 750: 3, 1050: 4, 1350: 5, 1600: 6 }}>
                <Masonry gutter="18px">
                  {
                    fetchedAllPosts.map(file =>
                      <div className='fetchedSubsWrapper'>
                        <div onClick={() => navigate(`/posts/${file.id}`)}>
                          <PostItemSetter className={'userBoardItem'} file={file} path={file.owner} />
                        </div>
                        <div className='userSubscribersModalBodyItem' id='main_nickname'>
                          <div className='profilePhotoModalCont'>
                            <ProfilePhoto username={file.owner} />
                          </div>
                          <div className='profileNicknameModalCont'>
                            <span className='profileNicknameModal' onClick={() => navigate(`/profiles/${file.owner}`)}>{file.owner}</span>
                          </div>
                          {session_status.authStatus.authorized &&
                            <SubscribeBtn subscriber={session_status.authStatus.login} user={file.owner} />
                          }
                        </div>
                      </div>
                    )
                  }
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default MainPage