import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

//import swal from 'sweetalert';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import CreateProduct from './components/createProduct'
import EditProduct from './components/editProduct'
import ProductList from './components/productList'
import Login from './Login'
import Signup from './Signup'

function App() {
  return (
    <div>
    <Router>
      <div>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={(props) => <Signup {...props} />}
                  />
                  <Route
                    exact
                    path="/login"
                    component={(props) => <Login {...props} />}
                  />
                  <Route
                    exact
                    path="/create"
                    component={(props) => <CreateProduct {...props} />}
                  />
                  <Route
                    exact
                    path="/update/:id"
                    component={(props) => <EditProduct {...props} />}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    component={(props) => <ProductList {...props} />}
                  />
                  
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      </Router>
    </div>
  )
}

export default App
