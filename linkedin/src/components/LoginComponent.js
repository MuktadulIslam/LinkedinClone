import React, { useState } from 'react'
import constant from '../messageConstant';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const login = async (event) => {
        event.preventDefault();

        const formData = { email: email, password:password }
		console.log(email, password);

        await Axios.post(constant.SERVER_IP + "login", formData).then((response) => {
            if (response.data.message === constant.SERVER_ERROR) {
                console.log('Enternal server error');
            }
			else if(response.data.message === constant.INCORRECT_PASSWORD) {
				alert("Password does not match!!!");
			}
			else if(response.data.message === constant.NULL_USER) {
				alert("Database does not have an account in this email!!!");
			}
            else {
				localStorage.setItem('userData', JSON.stringify(response.data));
				console.log(response.data);
				navigate("/profile");		
            }
        }).catch((error) => {
            console.log('An error occurred while sending the data:');
        });
    }

	return (
		<>
			<div className="container-fluid h-custom">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-md-9 col-lg-6 col-xl-5">
						<img src="assets/img/loginBackground.webp"
							className="img-fluid" alt="Sample image" />
					</div>
					<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<form>
							<p className="text-center h1 fw-bold mb-5 mt-4">Login</p>

							<div className="d-flex flex-row align-items-center mb-4">
								<i className="me-3 bi bi-envelope-fill larger-icon"></i>
								<div className="form-outline flex-fill mb-0">
									<input type="email" className="form-control" placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)}/>
								</div>
							</div>

							<div className="d-flex flex-row align-items-center mb-4">
								<i className="me-3 bi bi-key-fill larger-icon"></i>
								<div className="form-outline flex-fill mb-0">
									<input type="password" className="form-control" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
								</div>
							</div>

							<div className="d-flex justify-content-between align-items-center">
								{/* <!-- Checkbox --> */}
								<div className="form-check mb-0">
									<input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
									<label className="form-check-label" htmlFor="form2Example3">Remember me</label>
								</div>
								<a href="#!" className="text-body">Forgot password?</a>
							</div>

							<div className="text-center text-lg-start mt-4 pt-2">
								<button type="button" className="btn btn-primary btn-lg"
									style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={login}>Login</button>
								<p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
									className="link-danger">Register</a></p>
							</div>

						</form>
					</div>
				</div>
			</div>
		</>
	)
}
