import React from 'react'
import ProfileBar from './ProfileBar'
import SearchBar from './SearchBar'
import "../styles/Header.css"
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <header className='header'>
                <div onClick={() => navigate('/')} className='logo'>
                    <Link to='/'><img id='logo-img' width='35px' src='/imgs/logo-2.png' alt='logo'/></Link>
                    <div id='nameCont'>
                        <h1 id='projectName'>ArtBoard</h1>
                    </div>
                </div>
                <SearchBar/>
                <ProfileBar/>
        </header>
    )
}

export default Header
