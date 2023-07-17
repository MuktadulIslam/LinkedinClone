import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function HomeNavbarManu(props) {
    const changebody = props.bodychangingFunction;
    return (
        <>
            <Nav.Link onClick={(e) => changebody("home",e)}>Home</Nav.Link>
            <Nav.Link onClick={(e) => changebody("register",e)}>Register</Nav.Link>
            <Nav.Link onClick={(e) => changebody("login",e)}>Login</Nav.Link>
        </>
    )
}
