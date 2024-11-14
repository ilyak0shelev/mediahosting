import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../styles/PostItem.css'
import Button from '../components/UI/button/Button'
import { AuthStatusContext } from '../components/contexts/AuthStatusContext'
import Popup from '../components/UI/popup/Popup'
import { useDispatch } from 'react-redux'
import { addLikes, decreaseLikesCount, filterLikes, increaseLikesCount } from '../store/userLikesSlice'
import ItemsControls from '../components/ItemsControls'
import SubscribeBtn from '../components/SubscribeBtn'
import ProfilePhoto from '../components/ProfilePhoto'

const PostItem = () => {
  const { id } = useParams()
  const [file, setFile] = useState({})

  const address = 'http://192.168.1.6:3000'

  const navigate = useNavigate()

  const session_status = useContext(AuthStatusContext)
  const [modal, toggleModal] = useState(false)
  const [maxIconVisible, toggleMaxIconVisible] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const [isCommentValid, setCommentValid] = useState(false)
  const [published, setPublished] = useState('')
  const [publishedMsg, setPublishedMsg] = useState('')

  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    axios.post('/post/getFileById', { id: id })
      .then((result) => {
        if (result.data) {
          setFile(result.data)
          axios.post('/post/getComments', { postID: id })
            .then((result) => {
              let temp = []
              for (let i = 0; i < result.data.length; i++) {
                temp.push({
                  postID: result.data[i].id, commentID: result.data[i].commentID, nickname: result.data[i].nickname, value: result.data[i].value, birthtime: result.data[i].birthtime
                })
              }
              temp.sort((a, b) => Number(a.birthtime) > Number(b.birthtime) ? 1 : -1)
              setComments(temp)
            })
            .catch((error) => {
              console.log(error)
            })
        }
        else {
          navigate('/error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (session_status.authStatus.login) {
      axios.post('/post/checkLike', { nickname: session_status.authStatus.login, postID: file.id })
        .then((result) => {
          if (result.status === 200) {
            setLiked(true)
          } else {
            setLiked(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [file.id, session_status])

  const commentHandler = (e) => {

    if (commentValue.length < 150) {
      setCommentValue(e.target.value)
      if (!e.target.value) {
        setCommentValid(false)
      } else {
        setCommentValid(true)
      }
    }
    else {
      setCommentValue(commentValue.slice(0, commentValue.length - 1))
    }

  }

  const sendCommentBthHandler = (e) => {
    e.preventDefault()
    setCommentValue('')

    if (isCommentValid) {
      setCommentValid(false)
      const time = new Date(Date.now())

      axios.post('/post/saveComment', { postID: file.id, nickname: session_status.authStatus.login, value: commentValue, birthtime: time })
        .then((res) => {
          setPublished(true)
          setPublishedMsg('Комментарий добавлен!')

          let copy = Object.assign([], comments)
          copy.unshift({ postID: res.data.id, commentID: res.data.commentID, nickname: res.data.nickname, value: res.data.value, birthtime: res.data.birthtime })
          setComments(copy)

        })
        .catch((error) => {
          setPublished(true)
          setPublishedMsg('Что-то пошло не так...')
        })
    }
  }

  const dropCommentBtnHandler = (item) => {
    axios.post('/post/dropComment', { commentID: item })
      .then((result) => {
        if (result.status === 200) {
          setPublished(true)
          setPublishedMsg('Комментарий удалён!')
          setComments(comments.filter(obj => obj.commentID !== item))
        }
      })
      .catch((error) => {

      })
  }

  const likeBtnHandler = () => {
    const time = new Date(Date.now())
    axios.post('/post/likePost', { nickname: session_status.authStatus.login, postID: file.id, birthtime: time })
      .then((res) => {
        setLiked(true)
        dispatch(addLikes(res.data))
        dispatch(increaseLikesCount())
      })
      .catch((error) => {

      })
  }

  const dislikeBtnHandler = () => {
    axios.post('/post/dislikePost', { nickname: session_status.authStatus.login, postID: file.id })
      .then((res) => {
        setLiked(false)
        dispatch(filterLikes(file.id))
        dispatch(decreaseLikesCount())
      })
      .catch((error) => {

      })
  }

  return (
    <>
      {modal &&
        <div className='fileItemModalCont' onClick={() => { toggleModal(false) }}>
          <div className='fileItemModal'>
            <img className={'fileItemModalImg'} src={`${address}/${file.owner}/images/${file.name}`} alt={file.name}></img>
          </div>
        </div>
      }
      {Object.keys(file).length !== 0 &&
        <div className='postItemPageCont'>
          <div className='postItemCont'>
            {file.type.match('image') &&
              <div className='maximizeIconCont' onClick={() => { toggleModal(true) }} onMouseEnter={() => { toggleMaxIconVisible(true) }} onMouseLeave={() => { toggleMaxIconVisible(false) }}>
                <img className={`${maxIconVisible ? "maximizeIcon" : "maximizeIconHidden"}`} src='/imgs/maximize_icon.png' alt='max'></img>
                <img className={'fileItem'} src={`${address}/${file.owner}/images/${file.name}`} alt={file.name}></img>
              </div>
            }
            {file.type.match('video') && <video className={'fileItem'} src={`${address}/${file.owner}/videos/${file.name}`} alt={file.name} controls autoPlay muted></video>}

            <div className='postInfoCont'>
              {file.owner === session_status.authStatus.login &&
                <ItemsControls file={file} />
              }
              <div className='postInfoUserSection'>
                <div className='postInfoUserNameSection' onClick={() => navigate(`/profiles/${file.owner}`)}>
                  <div className='postInfoUserPhoto'>
                    <ProfilePhoto username={file.owner} />
                  </div>
                  <div>
                    <h2 className='postInfoUserName'>{file.owner}</h2>
                    <span className='commentDate'>{file.birthtime ? new Date(file.birthtime).toLocaleString() : 'Дата неизвестна'}</span>
                  </div>
                </div>
                {session_status.authStatus.authorized &&
                  <SubscribeBtn subscriber={session_status.authStatus.login} user={file.owner} />
                }
              </div>

              <div className='postInfo'>
                <div className='postInfoTitleSection'>
                  <h3 className='postInfoTitle'>{file.title}</h3>
                  <span className='postInfoDescription'>{file.description}</span>
                </div>

                <h3 className='commentsLabel'>Комментарии</h3>
                <div className='postCommentsSection'>
                  {!comments.length &&
                    <div>Комментариев пока что нет...</div>
                  }
                  {comments.length > 0 &&
                    <div>
                      {
                        comments.map(item =>
                          <div>
                            <div className='commentItem'>
                              <div className='commentContent'>
                                <div className='commentItemNicknameSection'>
                                  <h2 className='commentItemNickname' onClick={() => navigate(`/profiles/${item.nickname}`)}>{item.nickname}</h2>
                                  <div>
                                    {item.nickname === session_status.authStatus.login && <h2 className='commentItemNicknameYou' onClick={() => navigate(`/profiles/${item.nickname}`)}>Вы</h2>}
                                  </div>
                                </div>
                                <span className='commentItemValue'>{item.value}</span>
                                <span className='commentDate'>{item.birthtime ? new Date(item.birthtime).toLocaleString() : 'Дата неизвестна'}</span>
                              </div>
                              <div className='commentDrop'>
                                {((file.owner === session_status.authStatus.login) || (item.nickname === session_status.authStatus.login)) && <div className='commentDropContent' onClick={() => { dropCommentBtnHandler(item.commentID) }}></div>}
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  }
                </div>

              </div>

              <div className='writeCommentSection'>
                {session_status.authStatus.authorized === true &&
                  <form className='sendCommentForm'>
                    <input value={commentValue} onChange={(e) => { commentHandler(e) }} className='commentInput' placeholder='Оставьте комментарий к посту...'></input>
                    <Button disabled={!isCommentValid} onClick={(e) => sendCommentBthHandler(e)} id='send_comment_btn'>Отправить</Button>
                    {liked === false &&
                      <div onClick={likeBtnHandler} className={(file.owner === session_status.authStatus.login) ? 'likeBtnSelf' : 'likeBtn'}></div>
                    }
                    {liked === true &&
                      <div onClick={dislikeBtnHandler} className={(file.owner === session_status.authStatus.login) ? 'dislikeBtnSelf' : 'dislikeBtn'}></div>
                    }
                  </form>
                }
              </div>
            </div>

          </div>
        </div>
      }
      <Popup status={published} setStatus={setPublished}>{publishedMsg}</Popup>
    </>
  )
}

export default PostItem