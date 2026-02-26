import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loginForm, setLoginForm] = useState(true);


    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            const res = await axios.post(BASE_URL + "/login", {
                    email, password
                }, 
                { withCredentials: true }
            );
             
            dispatch(addUser(res.data));
            navigate('/feed');

        }catch(err){
            console.log(err);
            setError(err.message)
        }
    }

    const handleSignup = async () => {
        try{
            const res = await axios.post(BASE_URL + '/signup', { firstName, lastName, email, password }, { withCredentials: true });
            dispatch(addUser(res.data.data));
            navigate('/profile');
        }catch(err){
            console.log(err);
            
            setError(err.message)
        }
    } 

  return (
    <div className='flex items-center justify-center mt-8'>
        <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title text-center mx-auto">{loginForm ? 'Login' : 'Sign Up'}</h2>

                <div>
                    {
                        !loginForm && (
                            <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name:</legend>
                                <input type="text" className="input" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter First Name" />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name:</legend>
                                <input type="text" className="input" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name" />
                            </fieldset>
                        
                            </>
                        )
                    }

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email:</legend>
                        <input type="text" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password:</legend>
                        <input type="text" className="input" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Enter Password" />
                    </fieldset>
                </div>

                <p className='text-red-400'>{ error }</p>

                <div className="card-actions justify-end mt-3">
                    <button className="btn btn-primary btn-block" onClick={loginForm ? handleSubmit : handleSignup}>{loginForm ? 'Login' : 'Sign Up'}</button>
                    <p className='text-center mt-2 cursor-pointer' onClick={() => setLoginForm(value => !value)}>{ loginForm ? 'Create new account' : 'Already have an account Login here!' }</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login