import React, { useEffect, useState } from 'react'
import Button from './UI/button/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {
    const navigate = useNavigate()

    const [data, setData] = useState('')

    const addSearchReq = (event) => {
        event.preventDefault()
        if (data) {
            navigate(`/search/${data}`)
        }
    }

    return (
        <form className='SearchForm' action='' method='get' onSubmit={(event) => addSearchReq(event.target.value)}>
            <input value={data} onChange={(event) => setData(event.target.value)} id='search-input' type="text" placeholder="Найти..." />
            <Button id='search-btn' type='submit' onClick={addSearchReq}></Button>
        </form>
    )
}

export default SearchBar;