import React from 'react'
import '../styles/CreatePost.css'

const CreatePost = () => {
  return (
    <div className='newPostCont'>
      <div className='newPostTitleCont'>
        <h1 className='newPostTitle'>Создание поста</h1>
      </div>
      <div className='newPostMainCont'>
        <div className='uploadField'>
          <label className='fileLabel'>
            <input className='fileInput' type='file' />
          </label>
        </div>
      </div>
    </div>
  )
}

export default CreatePost