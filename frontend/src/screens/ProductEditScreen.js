import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import FormContain from "../components/FormContain";
import { listProductDetails, updateProduct } from "../actions/productActions";

import { Form, Button } from "react-bootstrap"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { PRODUCT_UPDATE_RESET } from "../constant/productConstants";
import axios from "axios";


function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countinstock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);


    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;


    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {


        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }



    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countinstock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)

        }

    }

    return (
        <div>
            <Link to='/admin/productlist'>
                <h1>
                    <IoArrowBackCircleSharp />
                </h1>
            </Link>
            <FormContain>
                <h1>Edit Product</h1>
                {loadingUpdate && <loader />}
                {errorUpdate && <Messages variant="danger">{errorUpdate}</Messages>}

                {loading ? <Loader /> : error ? <Messages variant='danger'>{error}</Messages>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>



                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.Control
                                    type='file'
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                />

                                {uploading && <Loader />}
                            </Form.Group>



                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='countinstock'>
                                <Form.Label>CountInStock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter countinstock'
                                    value={countinstock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary' style={{ marginTop: '10px' }}>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContain >

        </div>
    );
}

export default ProductEditScreen;
