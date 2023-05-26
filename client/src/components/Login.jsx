import React from 'react'
import axios from 'axios';
import { useState } from 'react';
export const Login = () => {
    const [register, setregistered] = useState(true);
    var latitude = 0;
    var longitude = 0;
    var clicked = false ; 
    function getLocation() {
        if (navigator.geolocation) {
          clicked = true;
          navigator.geolocation.getCurrentPosition(showPosition);
        } 
        else{
            console.log(`error with geo`);
        }
      }
      function phonenumber(num) {
        var phoneno = /^\d{10}$/;
        if(num.match(phoneno)){
            return true;  }
            else {
              alert("enter a valid phone number ");
              return false;
              }
      }

      async function showPosition(position) {
        latitude= position.coords.latitude ; 
         longitude= position.coords.longitude;
      }

      async function handler(e){
        e.preventDefault();
        let x = '91';
        if(phonenumber(e.target.number.value)){
           x = x.concat(e.target.number.value);
        }
        if(clicked != true){
          alert("click the enable location button ");}
          else{
        console.log("hello" ,latitude , longitude, x);
        setregistered(!register);
        const qt = await axios.post('/weather',{latitude : latitude, longitude:longitude , phnnumber : x });
          } 
      }

      async function handlemanual(e){
        e.preventDefault();
        let x = '91';
        let phn = document.getElementById('phnnumber').value;
        if(clicked != true){
          alert("click the enable location button ");}
          else{
        console.log("phn",phn);
        if(phonenumber(phn)){
           x = x.concat(phn);
        }
        console.log("hello" ,latitude , longitude,phn)
        await axios.post('/manual',{latitude : latitude, longitude:longitude , phnnumber : x });
      }
      }
      // https://quote-generator-5ox7.onrender.com
  return (
    <>
      {register?
      <div className='box'>
      <form className ="container" onSubmit={handler} >
            <div className="inputs">
            <input type= "text" placeholder = 'Phone number ' id='phnnumber' name="number"></input><br></br>
            <button onClick={getLocation} id='button' type='button'>Give your Location</button><br></br>
            <button onClick={handlemanual} type='button'>Manually Send </button><br></br>
            <button type='submit'>Submit Details</button>
            </div>
            </form>
            </div>
           : <div className="inputs"><h1>Hey you registered for receiving daily notifications</h1></div> }
    </>
  )
}
