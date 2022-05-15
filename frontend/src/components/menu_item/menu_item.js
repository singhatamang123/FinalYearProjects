import React from 'react';
import { useHistory } from 'react-router-dom'

import './menu-item.scss';
import { Link } from "react-router-dom";


function MenuItem({ category }) {
    let history = useHistory()


    const handler = (e) => {
        e.preventDefault();
        if (category.category === '') {
            history.push(`/category/?keyword=${category.category} &page=1`);
        } else {
            history.push(history.push(history.location.pathname))
        }

    }

    return (
        <div className='menu-item'>
            {/* <h1 className='title'>{product.name}</h1> */}

            <div
                className='background-image'
                style={{
                    backgroundImage: `url(${category.image})`
                }}
            />

            <button className='content' onSubmit={handler}>
                <Link to={`/category/?keyword=${category.name}`} style={{ textDecoration: 'none' }}>
                    <h1 className='title'>{category.name}</h1>
                </Link>
                {/* <span className='subtitle'>SHOP NOW</span> */}
            </button>


        </div >
    );
}


export default MenuItem;


// const MenuItem = ({ title, imageUrl, size, }) => (
//     <div
//         className={`${size} menu-item`}
//     >
//         <div
//             className='background-image'
//             style={{
//                 backgroundImage: `url(${imageUrl})`
//             }}
//         />
//         <div className='content'>
//             <h1 className='title'>{title.toUpperCase()}</h1>
//             <span className='subtitle'>SHOP NOW</span>
//         </div>
//     </div>
// );

// export default MenuItem;
