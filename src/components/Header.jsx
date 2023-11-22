import React from 'react'
import ProfileBar from './ProfileBar'
import SearchBar from './SearchBar'
import "../styles/Header.css"

const Header = () => {
    return (
        <header className='header'>
                <div className='logo'>
                    <a href=''><img id='logo-img' width='35px' src='/imgs/logo-2.jpg' alt='logo'/></a>
                    <div id='nameCont'>
                        <h1 id='projectName'>testName</h1>
                    </div>
                </div>
                <SearchBar/>
                <ProfileBar/>
        </header>
    )
}

export default Header
