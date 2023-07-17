import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function UserNabvarMenu(props) {
    const changebody = props.bodychangingFunction;
    return (
        <>
            <Nav.Link onClick={(e) => changebody("profile",e)}>Home</Nav.Link>
            <Nav.Link onClick={(e) => changebody("post",e)}>Make Posts</Nav.Link>
            <Nav.Link onClick={(e) => changebody("notification",e)}>Notificatons</Nav.Link>
            <Nav.Link as={Link} to="/" style={{ color: "red" }}>Log Out</Nav.Link>
        </>
    )
}
