import React, {useState, useRef} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import Form from 'react-validation/build/form';
// import Input from 'react-validation/build/input';
// import CheckButton from 'react-validation/build/button';

import AuthService from '../services/auth.service';

const required = (value)=>{
 if(!value){
  return(
   <div className='alert alert-danger' role='alert'>
    This field is required
   </div>
  );
 }
}

const Login = (props)=>{
 const form = useRef();
 const checkBtn = useRef();

 const [username, setUsername] = useState('');
 const [pw, setPw] = useState('');
 const [loading, setLoading] = useState('');
 const [message, setMessage] = useState('');

 const onChangeUsername = (e)=>{
  const username = e.target.value;
  console.log('Login /username: ',username)
  setUsername(username);
 }

 const OnChangePW =(e)=>{
  const pw = e.target.value;
  setPw(pw);
 }

 const handleLogin = (e)=>{
  e.preventDefault();

  setMessage('');
  setLoading(true);

  // form.current.validateAll();

  // if(checkBtn.current.context._errors.length ===0){
   AuthService.login(username, pw).then(
    ()=>{
     props.history.push('/profile');
     window.location.reload();
    },
    (error)=>{
     // const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
     setLoading(false);
     // setMessage(resMessage);
    }
   );
  // }else{setLoading(false)}

 };//handleLogin

 return(
  <div className="reg col-md-12">
   <div className="card card-container">
    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
    <form onSubmit={handleLogin} ref={form}>
     <div className="form-group">
      <label htmlFor="username">Username</label>
      {/* <Input        type="text"       className="form-control"       name="username"       value={username}       onChange={onChangeUsername}       validations={[required]}      /> */}
      <input 
       type="text"
       className="form-control"
       name="username"
       value={username}
       onChange={onChangeUsername}
       // validations={[required]}
      />
     </div>
     <div className="form-group">
      <label htmlFor="pw">Password</label>
      {/* <Input        type="password"       className="form-control"       name="pw"       value={pw}       onChange={OnChangePW}       validations={[required]}      /> */}
      <input 
       type="password"
       className="form-control"
       name="pw"
       value={pw}
       onChange={OnChangePW}
       // validations={[required]}
      />
     </div>
     <div className="form-group">
      <button className="btn btn-primary btn-block" disabled={loading}>
       {loading && (<span className="spinner-border spinner-border-sm"></span>)}
       <span>Login</span>
      </button>      
     </div>
     {message && (
      <div className="form-group">
       <div className="alert alert-danger" role="alert">
        {message}
       </div>
      </div>
     )}
     {/* <CheckButton style={{display: 'none'}} ref={checkBtn}/> */}
    </form>
   </div>
  </div>
 );
}

export default Login;