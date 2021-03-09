// import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';
import Form from './Form';
import * as api from './api'
import {GoogleLogin} from "react-google-login";



function App() {
  const [isSign, setIsSign] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error,setError] = useState("")
  const [user, setUser] = useState({email:"",number:""})


  const googleSuccess = async (res) =>{
    console.log(res)
    try {
      const auth = await api.authorize(res.profileObj.email)
      if(auth.data.status==="success"){
        setIsSign(true)
        setIsError(false)
        setUser({email:auth.data.email,number:auth.data.number})
      }else{
        setIsError(true)
      setError('Sorry! you are not in the list')
      }
    } catch (error) {
      setIsError(true)
    setError('Google Signin Failed. Try Again')
    }
    
    
  }
  const googleFailure = (res) =>{
    console.log(res)
    setIsError(true)
    setError('Google Signin Failed. Try Again')
  }
  return (
    <div className="App">
      {isSign 
      ? <Form email={user.email} number={user.number}/> //: null
       : <>
       <p>Welcome</p>
       <GoogleLogin
         clientId="288835951212-j705l7vfpojovk1ph638b9du59k1n9m5.apps.googleusercontent.com"
         render={renderProps=>(
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in using Google</button>
         )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
         /></>
        
      }
      {isError && <p>{error}</p>}
    </div>
  );
}

export default App;
