import React from 'react'
import CreatePost from '../pages/CreatePost';
import UserProfile from '../pages/UserProfile';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route 
                path='/' 
                element={<MainPage />}
            />
            <Route 
                path='/create_post' 
                element={<CreatePost />}
            />
            <Route 
                path='/profiles/:id' 
                element={<UserProfile />} 
            />
            <Route 
                path='/error' 
                element={<ErrorPage />} 
            />
            <Route 
                path="*"
                element={<Navigate to="/error" replace />}
            />
        </Routes>
    )
}

export default AppRouter