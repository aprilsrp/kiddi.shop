import React, { Fragment, Suspense } from 'react'
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"

const Register = React.lazy(() => import('./Pages/Register/Register'))
const Home = React.lazy(() => import('./Pages/Home/Home'))
const Login = React.lazy(() => import('./Pages/Login/Login'))
const AdminHandle = React.lazy(() => import('./Pages/Admin/AdminHandle'))
const ProductHandle = React.lazy(() => import('./Pages/Products/ProductHandle'))
const Promotions = React.lazy(() => import('./Pages/Promotions/promotions'))
const Cart = React.lazy(() => import('./Pages/Cart/cart'))
const Customer = React.lazy(() => import('./Pages/Customer/CustomerHandle'))
const Checkout = React.lazy(() => import('./Pages/Checkout/checkout'))
const Payment = React.lazy(() => import('./Pages/Payment/payment'))


function App() {
  return (
    <Fragment>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>
      <Router>
        <div>
          <Suspense fallback="Loading ...">
            <Switch>

              {/* Admin */}
              <Route path="/admin">
                <AdminHandle />
              </Route>
              {/* Costumer */}
              <div className="container px-2 md:px-16 lg:px-32 mx-auto">
                <Nav />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/product">
                  <ProductHandle />
                </Route>
                <Route path="/promotions">
                  <Promotions />
                </Route>
                <Route path="/cart">
                  <Cart />
                </Route>
                <Route path="/customer">
                  <Customer />
                </Route>
                <Route path="/checkout">
                  <Checkout />
                </Route>
                <Route path="/payment/:productId">
                  <Payment />
                </Route>
                <Footer />
              </div>
              
            </Switch>
          </Suspense>
          
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
