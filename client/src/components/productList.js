import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ProductTable from './productTable';
import {Button} from '@material-ui/core';
import { Link } from "react-router-dom";


export default class ProductList extends Component {

  constructor(props) {
    super(props)
    this.logout= this.logout.bind(this);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/products/allproducts')
      .then(res => {
        this.setState({
          products: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  logout(){
    axios.get('http://localhost:9000/products/logout')
    localStorage.setItem('token', null)
    this.props.history.push('/login')
  }

  DataTable() {
    return this.state.products.map((res, i) => {
      return <ProductTable obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
        <div>
          <h2>Product Dashboard </h2>
          <Link to={'/create'}>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            //onClick={CreateProduct}
          >
            Add Product
          
          </Button>
          </Link>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.logout}
          >
            Logout
          </Button>

          
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price/unit</th>
            <th>Units in Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}