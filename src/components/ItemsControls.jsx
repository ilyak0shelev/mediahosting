import React, { useContext, useState } from 'react'
import '../styles/ItemsControls.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthStatusContext } from './contexts/AuthStatusContext'
import { useDispatch } from 'react-redux'
import { addFiles, addHiddenFiles, editFile, filterFiles, filterHiddenFiles, toggleFileVisibility, unshiftFiles } from '../store/userFilesSlice'
import Button from './UI/button/Button'

const ItemsControls = (props) => {
    const navigate = useNavigate()
    const status = useContext(AuthStatusContext)
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [nameValue, setNameValue] = useState(props.file.title)
    const [descValue, setDescValue] = useState(props.file.description)
    const [tagsValue, setTagsValue] = useState(props.file.tags)

    const hideBtnHandler = () => {
        axios.post('/post/togglePostVisibility', { 'id': props.file.id, 'owner': props.file.owner, 'hiddenValue': !props.file.hidden })
            .then((res) => {
                if (props.file.hidden) {
                    dispatch(filterHiddenFiles(props.file.id))
                    dispatch(unshiftFiles(props.file))
                    dispatch(toggleFileVisibility(props.file))
                    navigate(`/profiles/${status.authStatus.login}`)
                }
                else {
                    dispatch(filterFiles(props.file.id))
                    dispatch(addHiddenFiles(props.file))
                    dispatch(toggleFileVisibility(props.file))
                    navigate(`/profiles/${status.authStatus.login}`)
                }
            })
            .catch((err) => { })
    }

    const editPostHandler = () => {
        if (nameValue.length) {
            axios.post('/post/editPost', { 'id': props.file.id, 'owner': props.file.owner, 'title': nameValue, 'description': descValue, 'tags': tagsValue })
                .then((res) => {
                    setModal(false)
                    dispatch(editFile({ 'title': nameValue, 'description': descValue, 'tags': tagsValue, 'id': props.file.id, 'hidden': props.file.hidden }))
                })
                .catch((error) => { })
        }
    }

    const deleteBtnHandler = () => {
        let type = ''
        if (props.file.type.match('image')) {
            type = 'images'
        }
        else if (props.file.type.match('video')) {
            type = 'videos'
        }

        axios.post('/post/dropPost', { id: props.file.id, owner: props.file.owner, type: type })
            .then((result) => {
                if (result.status === 200) {
                    dispatch(filterFiles(props.file.id))
                    navigate(`/profiles/${status.authStatus.login}`)
                }
            })
    }

    return (
        <>
            <div className='userBoardControls'>
                <button className='userBoardControlsItem' id={props.file.hidden ? 'hide_btn_active' : 'hide_btn'} onClick={hideBtnHandler}></button>
                <button className='userBoardControlsItem' id='edit_btn' onClick={() => { modal ? setModal(false) : setModal(true) }}></button>
                <button className='userBoardControlsItem' id='delete_btn' onClick={deleteBtnHandler}></button>
            </div>
            {modal &&
                <div className='fileEditModalCont'>
                    <div className='fileEditItemModal'>
                        <textarea value={nameValue} onChange={(e) => { setNameValue(e.target.value) }} required type='text' placeholder='Название поста...' name='postName' className='editPostInput' />
                        <textarea value={descValue} onChange={(e) => { setDescValue(e.target.value) }} type='text' placeholder='Описание...' name='postDescription' className='editPostInput' />
                        <textarea value={tagsValue} onChange={(e) => { setTagsValue(e.target.value) }} type='text' placeholder='Теги...' name='postTags' className='editPostInput' />
                        <Button id='editPostBtn' onClick={editPostHandler}>Изменить</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default ItemsControls