import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import { getUserDetails, updateUser } from "../actions/userAction";
import FormContain from "../components/FormContain";
import { Form, Button } from "react-bootstrap"
import { IoArrowBackCircleSharp } from "react-icons/io5";

import { USER_UPDATE_RESET } from '../constant/usersConstant';


function UserEditScreen({ match, history }) {

    const userId = match.params.id
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;



    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {


        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')

        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))

            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }

        }

    }, [user, userId, dispatch, successUpdate, history]);

    const submitHandler = (e) => {

        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))

    };

    return (
        <div>
            <Link to='/admin/userlist'>
                <h1>
                    <IoArrowBackCircleSharp />
                </h1>
            </Link>
            <FormContain>
                <h1>Edit User</h1>

                {loadingUpdate && <Loader />}
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

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContain >

        </div>
    );
}

export default UserEditScreen;
