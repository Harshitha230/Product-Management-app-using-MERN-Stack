import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import swal from 'sweetalert';


export default class EditProduct extends Component {

  constructor(props) {
    super(props)

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel= this.onCancel.bind(this);

    // State
    this.state = {
      name: '',
      price: '',
      quantity: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9000/products/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          price: res.data.price,
          quantity: res.data.quantity
        });
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onChangePrice(e) {
    this.setState({ price: e.target.value })
  }

  onChangeQuantity(e) {
    this.setState({ quantity: e.target.value })
  }

  onCancel(){
    this.props.history.push('/dashboard');

  }

  onSubmit(e) {
    e.preventDefault()

    const product = {
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity
    };

    axios.put('http://localhost:9000/products/update/' + this.props.match.params.id, product)
      .then((res) => {
        swal({
            text:"Product updated successfully",
            icon: "success",
            type: "success"
        })
        console.log(res.data)
        console.log('Product successfully updated')
        this.props.history.push('/dashboard')
      }).catch((error) => {
        swal({
            text:"Failed to Update Product",
            icon: "error",
            type: "error"
        })

        console.log(error)
      })

    // Redirect to Student List 
    //this.props.history.push('/productlist')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Price/Unit</Form.Label>
          <Form.Control type="text" value={this.state.price} onChange={this.onChangePrice} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" value={this.state.quantity} onChange={this.onChangeQuantity} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Product
        </Button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
        <Button size="lg" block="block" type="submit" className="mt-4" onClick={this.onCancel}>
          Cancel
        </Button>
      </Form>
    </div>);
  }
}