import React, { useState } from 'react';
import HomePage from './HomePage';
import Post from './Post';
import Notification from './Notification';
import Nabvar from'./Nabvar';

export default function ProfileBody(props) {
    const user = props.user;
    // console.log(user);
    const [body, setBody] = useState(<HomePage user={user}/>);

    const changebody = (bodyComponentName, event) => {
        event.preventDefault();
        if (bodyComponentName === "profile") setBody(<HomePage user={user}/>);
        else if (bodyComponentName === "post") setBody(<Post user={user}/>);
        else if (bodyComponentName === "notification") setBody(<Notification user={user}/>)
        else {
            console.log("error occur in ProfileBody.js")
        }
    }
    return (
        <>
            <Nabvar bodychangingFunction={changebody} user={user}/>
            {body}
        </>
    )
}
