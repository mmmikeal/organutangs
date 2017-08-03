import React from 'react';
import axios from 'axios';
import MeetUpForm from './MeetUpForm.jsx';
import Title from './Title.jsx';
import Map from './Map.jsx';
import Login from './Login.jsx';
import LogoutButton from './LogoutButton.jsx';
import Register from './Register.jsx';
import List from './List.jsx';

function LoginViewController (props) {
  var isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) { //render our app if logged in
    return (
      <div>
        <LogoutButton setAuth={props.setAuth}/>
        <Title />
        <MeetUpForm />
        <div style={{width:500, height:600, backgroundColor:'red', border: '2px solid black'}}>
          <Map
            markers={ this.state.meetingLocations }
            center={{ lat: 40.751094, lng: -73.987597 }}
            containerElement={<div style={{height:100+'%'}} />}
            mapElement={<div style={{height:100+'%'}} />}
          />
        <List items={ this.state.meetingLocations } />
      </div>)
  } else { //else render login
    return (
      <div>
        <Login setAuth={props.setAuth} />
        <Register/>
      </div>
    )
  }
}

export default LoginViewController;