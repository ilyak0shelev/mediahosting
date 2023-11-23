import React from 'react'
import CreatePost from '../pages/CreatePost';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/create_post' element={<CreatePost />} />
        </Routes>
    )
}

export default AppRouter