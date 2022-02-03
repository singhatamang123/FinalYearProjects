// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// // import product from './product.js'
// import { useDispatch, useSelector } from "react-redux";

// import { listProducts } from "../../actions/productActions";
// // import Loader from "../alertAndmessage/Loader";
// // import Messages from "../alertAndmessage/Messages";

// function Directory() {
//     const dispatch = useDispatch();
//     const productList = useSelector((state) => state.productList);
//     const { products } = productList;

//     // console.log(keyword)
//     useEffect(() => {
//         dispatch(listProducts());
//     }, [dispatch]);

//     return (
//         <div className='directory-menu'>
//             {products.map(product => (
//                 <MenuItem key={product.id} product={product} />
//             ))}
//         </div>
//     );
// }
// export default Directory;

import MenuItem from "../menu_item/menu_item.js";
import './directory.scss'


import React from 'react';
class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: [
                {
                    title: 'hats',
                    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                    id: 1
                },
                {
                    title: 'jackets',
                    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 2
                },
                {
                    title: 'sneakers',
                    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 3
                },
                {
                    title: 'womens',
                    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                    size: 'large',
                    id: 4
                },
                {
                    title: 'mens',
                    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                    size: 'large',
                    id: 5
                }
            ]
        };
    }

    render() {
        return (
            <div className='directory-menu'>
                {this.state.sections.map(({ title, imageUrl, id, size }) => (
                    <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
                ))}
            </div>
        );
    }
}

export default Directory;