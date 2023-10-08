import React, { useState } from 'react'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const loginHandller = (e) => {
       e.preventDefault()

       Axios.post('http://localhost:8000/api/auth/login', {
        email: email,
        password: password,
       }).then((response) => {
        const type = response.data.type;
        console.log(response.data);
        if (type === "admin") {
            navigate('/dashboard');
        } else if (type === "casher") {
            navigate('/casher');
        } else {
            navigate('/');
        }
       }).catch((error) => {
        console.log(error);
       })
    }  
  return (
    <div className="content-inner login-cover">

        <div className="container">
            <div className="row justify-content-center mt-3">
			
                <form className="login-form col-5" onSubmit={loginHandller}>
                    
                    {/* @csrf */}
                   
                    <div className="card ml-4 mt-5 col-12 mt-3 shadow-lg" style={{width :'25rem'}}>
						<div className="card-header">
							{/* @if (\Session::has('success'))
							<div className="alert alert-danger">
							 <ul>
								 <li>{!! \Session::get('success') !!}</li>
							 </ul>
							   </div>    
								@endif */}
					</div>
                     
                        <div className="card-body">
                            <div className="text-center mb-3">
								<img   className="img-fluid"  src={`../../assets/user.png`} alt="logo" style={{width:'200px'}} />
								{/* {{-- <i className="icon-reading icon-2x text-secondary border-secondary border-3 rounded-pill p-1 mb-1 mt-1"></i> --}} */}
								<h5 className="mt-1">Login to your account</h5>
								<span className="d-block text-muted">Enter your credentials below</span>
							</div>

							<div className="form-group form-group-feedback form-group-feedback-left">
								<input type="email" className="form-control mb-2" placeholder="email" name="email" required  onChange={e => setEmail(e.target.value)}/>
								<div className="form-control-feedback">
									<i className="icon-envelop3 text-muted"></i>
								</div>

							<div className="form-group form-group-feedback form-group-feedback-left">
								<input type="password" className="form-control" placeholder="Password" name="password" required onChange={e => setPassword(e.target.value)}/>
								<div className="form-control-feedback">
									<i className="icon-lock2 text-muted"></i>
								</div>
							</div>
							
		
                           
							<div className="form-group form-group-feedback form-group-feedback-left">
                                    <div className="form-group-floating mb-2">
                                        <div className="position-relative ">
                                           <button type="submit" className="btn btn-primary btn-block">Login</button>
                                       </div>
                                    </div>
                                </div>

                            
                        </div>
                    </div>
                    </div>
                </form>
            
      
                </div>

            </div>
        </div>
  )
}

export default Login