
export default function authHeader(){
 const user = JSON.parse(localStorage.getItem('user'));

 if(user && user.accessToken){  
  //return {Authorization: 'Bearer ' +user.accessToken}  ; //for localStorage  
  return { 'x-access-token': user.accessToken }; // for Node.js Express back-end
 }else{
  return {};
 }
}

