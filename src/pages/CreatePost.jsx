import React, {useContext, useRef, useState} from 'react'
import '../styles/CreatePost.css'
import axios from 'axios'
import { AuthStatusContext } from '../components/contexts/AuthStatusContext'
import Button from '../components/UI/button/Button'

const CreatePost = () => {
  const status = useContext(AuthStatusContext)
  const [file, setFile] = useState('')
  const [data, getFile] = useState({ name: "", path: "" });

  const [progress, setProgess] = useState(0); // progessbar
  const el = useRef();

  const handleChange = (e) => {
    setProgess(0)
    const file = e.target.files[0]; // доступ к файлу
    console.log(file);
    setFile(file);
  }

  const uploadFile = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file);
    axios.post('', formData, {
      onUploadProgress: (ProgressEvent) => {
        let progress = Math.round(
          ProgressEvent.loaded / ProgressEvent.total * 100
        ) + '%';
        setProgess(progress);
      }
    })
  }

  return (
    <div className='newPostCont'>
      <div className='newPostTitleCont'>
        <h1 className='newPostTitle'>Создание поста</h1>
      </div>
      <div className='newPostMainCont'>
        <div className='uploadField'>
          <label className='fileLabel'>
            <div className='fileExplanation'>
              <img src='/imgs/upload-2.png' alt='upload'/>
              <h1>Нажмите, чтобы выбрать файл, или просто перетащите его сюда!</h1>
            </div>
            <input onChange={handleChange} className='fileInput' type='file' accept='.mp4, .avi, .jpeg, .jpg, .png'/>
          </label>
        </div>
        <div className='newPostDescriptionCont'>
          <form className='descriptionForm'>
            <textarea required type='text' placeholder='Название поста...' name='postName' className='newPostInput'/>
            <textarea required type='text' placeholder='Описание...' name='postDescription' className='newPostInput'/>
            <textarea required type='text' placeholder='Теги...' name='postTags' className='newPostInput'/>
            <Button id='createBtn'>Создать пост</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost