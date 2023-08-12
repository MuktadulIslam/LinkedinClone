import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Login from './components2/Login';
import Registration from './components2/Registration';
import ProfileBody from './components2/profile/ProfileBody';
import { useEffect, useState } from 'react';


const PrivateRoute = () => {
    return sessionStorage.getItem('isLoggedIn') == 'true' ?
    <>
    <Outlet/>
    </>
    :
     <Navigate to="/login" replace />

};


function App() {
    const storedUserData = sessionStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(storedUserData));

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/registration" element={<Registration setUser={setUser} />} />

                    <Route path='/' element={<PrivateRoute/>} >
                        <Route path='/profile' element={<ProfileBody user={user} />} />
                    </Route>
                    <Route path='/profile' element={<PrivateRoute />} >
                        <Route path="/profile" element={<ProfileBody user={user} />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
