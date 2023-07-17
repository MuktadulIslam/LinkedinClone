import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import HomePageComponent from './components/HomePageComponent'
import UserProfileComponent from './components/UserProfileComponent';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePageComponent/>} />
                    {/* <Route path="/login" element={<LoginComponent/>} />
                    <Route path="/register" element={<RegisterComponent/>} />
                    <Route path="/notification" element={<NotificationComponent/>} /> */}
                    <Route path="/profile" element={<UserProfileComponent/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
