import React, { useEffect, useState } from 'react';
import MenuItem from "../menu_item/menu_item.js";
import './directory.scss'
import axios from 'axios';

function Directory() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        async function fetchCategory() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products/category/')
            setCategory(data)
        }
        fetchCategory();
    }, [])

    return (
        <div className='directory-menu'>
            {category.map((categor) => (
                <MenuItem key={categor._id} category={categor} />
            ))}

        </div>
    );
}
export default Directory;
