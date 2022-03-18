import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/category/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <form onSubmit={submitHandler} >
            <div className="search_wrap search_wrap_3">
                <div className="search_box">
                    <input type="text" className="input" onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search for products...' />
                    <div className="btn btn_common">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchBox