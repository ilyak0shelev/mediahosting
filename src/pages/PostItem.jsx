import React, { useEffect, useState } from 'react'
import PostItemSetter from '../components/PostItemSetter'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const PostItem = () => {
  const { id } = useParams()
  const [file, setFile] = useState({})

  useEffect(() => {
    axios.post('/post/getFileById', { id: id })
      .then((result) => {
        setFile(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {Object.keys(file).length !== 0 && <PostItemSetter className={'userBoardItem'} file={file} path={file.owner}></PostItemSetter>}
    </>
  )
}

export default PostItem