import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.loggingIn = this.loggingIn.bind(this);
  }

  handleChangeName(event) {
    event.preventDefault();
    this.setState({userName: event.target.value});
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  loggingIn(e, user, pw) {
    //this.props.setAuth(true);
    e.preventDefault();
    axios.post('/users/login', {
      username: user,
      password: pw
    })
    .then((response) =>{
      this.props.setAuth(response); //FUCK FUCK FUCK
    })
    .catch(function (error) {
      console.log("error logging in ", error);
    });
  }

  render() {
    return (
    <form onSubmit={(event)=>{this.loggingIn(event, this.state.userName, this.state.password)}}>
      <input type="text" value={this.state.userName} onChange={this.handleChangeName}/>
      <input type="text" value={this.state.password} onChange={this.handleChangePassword}/>
      <input type="submit" value="Submit"/>
    </form>
    );
  }
}

export default Login;