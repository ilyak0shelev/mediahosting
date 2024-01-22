import React, { useContext, useEffect, useState } from 'react'
import '../styles/CreatePost.css'
import axios from 'axios'
import Button from '../components/UI/button/Button'
import Popup from '../components/UI/popup/Popup'
import { AuthStatusContext } from '../components/contexts/AuthStatusContext'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addFiles } from '../store/userFilesSlice'

const CreatePost = () => {
  const [file, setFile] = useState('')
  const [data, getFile] = useState({ type: "", name: "", path: "" })
  const [selected, setSelected] = useState(false)
  const [progress, setProgess] = useState(0)
  const [published, setPublished] = useState('')
  const [publishedMsg, setPublishedMsg] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [descValue, setDescValue] = useState('')
  const [tagsValue, setTagsValue] = useState('')

  const session_status = useContext(AuthStatusContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!session_status.authStatus.authorized) {
      navigate('/')
    }
  }, [session_status])

  const handleFileChange = (e) => {
    setProgess(0)
    const file = e.target.files[0];
    setFile(file);
    setSelected(true)
    const reader = new FileReader();
    reader.onloadend = () => {
      getFile({ type: file.type, path: reader.result })
    }
    reader.readAsDataURL(file);
  }

  const clearLayout = () => {
    setNameValue('')
    setDescValue('')
    setTagsValue('')
    setSelected(false)
    getFile({ type: "", name: "", path: "" })
    setFile('')
    setProgess(0)
  }

  const uploadFile = (e) => {
    e.preventDefault()
    const currentDate = new Date()
    const formData = new FormData()
    formData.append('file', file);
    formData.append('title', nameValue)
    formData.append('description', descValue)
    formData.append('tags', tagsValue)
    formData.append('birthtime', currentDate)

    axios.post('/post/upload', formData, {
      onUploadProgress: (ProgressEvent) => {
        let progress = Math.round(
          ProgressEvent.loaded / ProgressEvent.total * 100
        ) + '%';
        setProgess(progress);
      },
    })
      .then((res) => {
        setPublished(true)
        setPublishedMsg('Пост опубликован!')
        clearLayout()
        dispatch(addFiles({
          id: res.data.id, name: res.data.name, title: res.data.title, description: res.data.description, tags: res.data.tags, type: res.data.type, owner: res.data.owner
        }))
      })
      .catch(() => {
        setPublished(true)
        setPublishedMsg('Что-то пошло не так...')
        clearLayout()
      })
  }

  return (
    <div className='newPostCont'>
      <div className='newPostTitleCont'>
        <h1 className='newPostTitle'>Создание поста</h1>
      </div>
      <div className='clearBtnCont'>
        <Button onClick={clearLayout} id='clear-btn'>Очистить макет</Button>
      </div>
      <div className='newPostMainCont'>
        {data.type.match('video') && <video className={selected ? 'uploadFieldSelected' : 'uploadField'} src={data.path} alt={data.name} loop controls />}
        {data.type.match('image') && <img className={selected ? 'uploadFieldSelected' : 'uploadField'} src={data.path} alt={data.name} />}
        {!data.path &&
          <div className={selected ? 'uploadFieldSelected' : 'uploadField'}>
            <label className='fileLabel'>
              <div className='fileExplanation'>
                <img src='/imgs/upload-2.png' alt='upload' />
                <h1>Нажмите, чтобы выбрать файл, или просто перетащите его сюда!</h1>
              </div>
              <input onChange={handleFileChange} className='fileInput' type='file' accept='.mp4, .avi, .jpeg, .jpg, .png' />
            </label>
          </div>
        }
        <div className='newPostDescriptionCont'>
          <form className='descriptionForm' onSubmit={uploadFile}>
            <textarea value={nameValue} onChange={(e) => { setNameValue(e.target.value) }} required type='text' placeholder='Название поста...' name='postName' className='newPostInput' />
            <textarea value={descValue} onChange={(e) => { setDescValue(e.target.value) }} type='text' placeholder='Описание...' name='postDescription' className='newPostInput' />
            <textarea value={tagsValue} onChange={(e) => { setTagsValue(e.target.value) }} type='text' placeholder='Теги...' name='postTags' className='newPostInput' />
            {selected && <div className='progessBarCont'><div className="progessBar" style={{ width: progress }}></div></div>}
            <Button disabled={!selected} id='createBtn'>Опубликовать пост</Button>
          </form>
        </div>
      </div>
      <Popup status={published} setStatus={setPublished}>{publishedMsg}</Popup>
    </div>
  )
}

export default CreatePost