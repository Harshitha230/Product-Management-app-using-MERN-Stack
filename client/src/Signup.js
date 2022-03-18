import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email:'',
      password: ''
     
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:9000/products/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: 'Registered successfully',
        icon: "success",
        type: "success"
      });
      this.props.history.push('/login');
      
    }).catch((err) => {
      swal({
        text: 'Failed to Sign up user',
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <center>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.register}
          >
            Sign Up
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/login">
            Login
          </Link>
        </div>
        </center>
      </div>
    );
  }
}

export default Signup;

