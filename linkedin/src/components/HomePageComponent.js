import React, { useState } from 'react'

import NabvarComponent from './NabvarComponent';
import HomeNavbarManu from './HomeNavbarManu';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import Home from './Home';

export default function HomePageComponent() {

    const [body,setBody] = useState(<Home/>);

    const changebody = (bodyComponentName, event) => {
        event.preventDefault();
        if(bodyComponentName === "login") setBody(<LoginComponent/>);
        else if(bodyComponentName === "register") setBody(<RegisterComponent/>);
        else if(bodyComponentName === "home") setBody(<Home/>)
    }

    return (
        <>
            <NabvarComponent nabvarmenu={<HomeNavbarManu bodychangingFunction={changebody}/>}/>

            {body}
        </>
    )
}
