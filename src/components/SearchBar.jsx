import React, {useState} from 'react'
import Button from './UI/button/Button'

export const SearchBar = () => {

    const [data, setData] = useState('')

    const addSearchReq = (event) => {
        event.preventDefault()
        // console.log(data)
    }

    return (
        <form className='SearchForm' action='' method='get'>
            <input value={data} onChange={(event) => setData(event.target.value)} id='search-input' type="text" placeholder="Найти..." />
            <Button id='search-btn' type='submit' onClick={addSearchReq}></Button>
        </form>
    )
}

export default SearchBar;