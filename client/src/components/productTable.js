import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import swal from 'sweetalert';

export default class ProductTable extends Component {
  constructor(props) {
    super(props)
    this.deleteProduct = this.deleteProduct.bind(this)
    
  }

  

  deleteProduct() {
    axios
      .delete(
        'http://localhost:9000/products/delete/' + this.props.obj._id,
      )
      .then((res) => {
        swal({
            text: "Product deleted successfully",
            icon: "success",
            type: "success"
        });
        console.log("product deleted successfully");
      })
      .catch((error) => {
        console.log(error)
      })
      window.location.href=('/dashboard')
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.price}</td>
        <td>{this.props.obj.quantity}</td>
        <td>
          
          <Link
            className="edit-link" path={"/:id"}
            to={'/update/' + this.props.obj._id}
            
          >
            Update
            
          </Link>
          
          <Button onClick={this.deleteProduct} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}