import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class productTable extends Component {
  constructor(props) {
    super(props)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  deleteStudent() {
    axios
      .delete(
        'http://localhost:9000/products/delete/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Product successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.price}</td>
        <td>{this.props.obj.quantity}</td>
        <td>
          <Link
            className="edit-link" path={"products/:id"}
            to={'products/update/' + this.props.obj._id}
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