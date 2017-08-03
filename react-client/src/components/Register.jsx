import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.register = this.register.bind(this);
  }

  handleChangeName(event) {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  handleChangePassword2(event) {
    event.preventDefault();
    this.setState({password2: event.target.value});
  }

  register(e, user, pw, pw2) {
    e.preventDefault();
    axios.post('/users/register', {
      username: user,
      password: pw,
      password2: pw2
    })
    .then((response) =>{
      console.log("successfully registered");
      console.log(response);

    })
    .catch(function (error) {
      console.log("error response registering from axios");
      console.log(error);
    });
  }

  render() {
    return (
    <form onSubmit={(event)=>{this.register(event, this.state.username, this.state.password, this.state.password2)}}>
      Please enter a username:
      <input type="text" value={this.state.username} onChange={this.handleChangeName}/>
      Please enter a password:
      <input type="text" value={this.state.password} onChange={this.handleChangePassword}/>
      Please confirm password:
      <input type="text" value={this.state.password2} onChange={this.handleChangePassword2}/>
      <input type="submit" value="Submit"/>
    </form>
    );
  }
}

export default Register;