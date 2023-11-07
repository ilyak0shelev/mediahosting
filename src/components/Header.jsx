import React from 'react'
import ProfileBar from './ProfileBar'
import SearchBar from './SearchBar'
import "./Header.css"

const Header = () => {
    return (
        <header className='header'>
                <div className='logo'>
                    <a href=''><img id='logo-img' width='35px' src='/imgs/logo-2.jpg' alt='logo'/></a>
                </div>
                <SearchBar/>
                <ProfileBar/>
        </header>
    )
}

export default Header
