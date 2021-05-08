import React, {useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';

import AuthService from "../../services/auth.service";

import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import Profile from '../Profile'
import BoardUser from '../BoardUser'
import BoardModerator  from '../BoardModerator'
import BoardAdmin  from '../BoardAdmin'

const Navbar= ()=> {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(()=>{
    const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user);
      setShowModeratorBoard(user.role.includes('ROLE_MODERATOR')); //this can be ROLE_MODERATOR //role_moderator
      setShowAdminBoard(user.role.includes('ROLE_ADMIN'));//ROLE_ADMIN //role_admin
    }
  },[]);
  
  const logOut=()=>{
    AuthService.logout();
  };

  return (
    document.title = 'AuthX2 Navbar',
    <div className= "Navbar">
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/'} className='navbar-brand'>
          AuthX2
        </Link>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/home'} className='nav-link'>
              Home
            </Link>
          </li>
          {showModeratorBoard && (
            <li className='nav-item'>
              <Link to={'/mod'} className='nav-link'>
                Moderator Boadrd
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className='nav-item'>
              <Link to={'/admin'} className='nav-link'>
                Admin Boadrd
              </Link>
            </li>
          )}
          {currentUser && (
            <li className='nav-item'>
              <Link to={'/use'} className='nav-link'>
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ):(
          <div className='log_in_out nabvar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/login'} className='nam-link'>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/register'} className='nam-link'>
                Sign up
              </Link>
            </li>            
          </div>
        )}
      </nav>

      <div className='container mt-3'>
        <Switch>
          <Route exact path={['/', '/Home']} component={Home}/>
          <Route exact path={'/login'} component={Login}/>
          <Route exact path={'/Register'} component={Register}/>
          <Route exact path={'/profile'} component={Profile}/>
          <Route exact path={'/user'} component={BoardUser}/>
          <Route exact path={'/mod'} component={BoardModerator}/>
          <Route exact path={'/admin'} component={BoardAdmin}/>
        </Switch>
      </div>
    </div>
  );
}

export default Navbar;
