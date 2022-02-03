import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <div className="search_wrap search_wrap_3">
                <div className="search_box">
                    <input type="text" className="input" onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search for products...' />
                    <div className="btn btn_common">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            </div>
        </Form >




    )
}

export default SearchBox