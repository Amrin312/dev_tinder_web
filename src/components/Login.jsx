import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from "../slice/userSlice";

const Login = () => {
    const [email, setEmail] = useState('amrin@gmail.com');
    const [password, setPassword] = useState('Amrin@1234');

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try{
            const res = await axios.post("http://localhost:7777/login", {
                    email, password
                }, 
                { withCredentials: true }
            );
            
            dispatch(addUser(res.data));

            console.log(res.data);


        }catch(err){
            console.log(err.message);
            
        }
    }

  return (
    <div className='flex items-center justify-center mt-8'>
        <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title text-center">Welcome Back!</h2>

                <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email:</legend>
                        <input type="text" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password:</legend>
                        <input type="text" className="input" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Enter Password" />
                    </fieldset>
                </div>

                <div className="card-actions justify-end mt-3">
                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>Login</button>
                    <p className='text-center mt-2'>Register new account</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login