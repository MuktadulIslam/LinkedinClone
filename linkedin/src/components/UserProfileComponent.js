import React, { useState } from 'react'
import UserNabvarMenu from './UserNabvarMenu';
import NabvarComponent from './NabvarComponent';
import UserProfileHomePage from './UserProfileHomePage';
import PostPageComponent from './PostPageComponent';
import NotificationComponent from './NotificationComponent';

export default function UserProfileComponent() {
    const [body,setBody] = useState(<UserProfileHomePage/>);

    const changebody = (bodyComponentName, event) => {
        event.preventDefault();
        if(bodyComponentName === "profile") setBody(<UserProfileHomePage/>);
        else if(bodyComponentName === "post") setBody(<PostPageComponent/>);
        else if(bodyComponentName === "notification") setBody(<NotificationComponent/>)
    }

    return (
        <>
            <NabvarComponent nabvarmenu={<UserNabvarMenu bodychangingFunction={changebody}/>}/>

            {body}
        </>
    )
}
