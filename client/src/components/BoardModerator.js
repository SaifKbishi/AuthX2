import React, {useState, useEffect} from 'react';
import UserService from '../services/user.service';

const BoardModerator = ()=>{
 const [content, setContent] =useState('');

 useEffect(()=>{
  UserService.getUserBoard()
 .then((response)=>{setContent(response.data)},
 (error)=>{const _content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  setContent(_content);
 })
 },[]);
 return(
  <div className="container">
   <header className="jumbtron">
    <h3>{content}</h3>
   </header>
  </div>
 );

}//BoardModerator

export default BoardModerator;