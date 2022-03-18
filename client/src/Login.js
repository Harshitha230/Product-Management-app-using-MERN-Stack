import React, { Component } from 'react';
import { Button, TextField, Link } from '@material-ui/core';
import swal from 'sweetalert';
import axios from 'axios';
//import bcrypt from 'bcryptjs';
//var salt = bcrypt.genSaltSync(10);

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };
    }
  
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
  
    login = async(e) => {
      e.preventDefault();
  
      //const pwd = bcrypt.hashSync(this.state.password, salt);
      
      const {data} = await axios.post('http://localhost:9000/products/login', {
          email: this.state.email,
          password: this.state.password
      })
      console.log(data);



      if (data.success === true){
          console.log('Login success')
        
            
          localStorage.setItem("token", JSON.stringify(data));
          window.location.href = "/dashboard";
            
        
      }
      else if(data.success===false){
        swal({
          text: "Invalid Credentials",
          icon: "error",
          type:"error"
        })

      }


      //this.props.history.push('/http://localhost:3000')
        
      
      

  
      
    }
  
    render() {
      return (
        <div style={{ marginTop: '200px' }}>
        <center> 
          <div>
            <h1>User Login</h1>
          </div>
  
          <div>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              placeholder="Password"
              required
            />
            <br /><br />
            <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={this.state.username === '' && this.state.password === ''}
              onClick={this.login}
            >
              Login
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/">
              Sign Up
            </Link>
          </div>
          </center>
        </div>
      );
    }
  }

  export default Login;