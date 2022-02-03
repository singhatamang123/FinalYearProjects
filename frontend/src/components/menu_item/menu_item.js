import React from 'react';

import './menu-item.scss';

// function MenuItem({ product }) {

//     return (
//         // <div className='menu-item'>
//         //     <div
//         //         className='background-image'
//         //         style={{
//         //             backgroundImage: `url(${product.image})`
//         //         }}
//         //     />
//         //     <div className='content'>
//         //         {/* <h1 className='title'>{product.name}</h1> */}
//         //         <span className='subtitle'>SHOP NOW</span>
//         //     </div>
//         // </div>
//     );
// }


// export default MenuItem;


const MenuItem = ({ title, imageUrl, size, }) => (
    <div
        className={`${size} menu-item`}
    >
        <div
            className='background-image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default MenuItem;
