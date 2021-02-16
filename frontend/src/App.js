import React, {useEffect} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import {useDispatch, useSelector} from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import Footer from "./components/footer";
import {listCategories} from "./actions/categoryAction";
import HeaderScreen from "./screens/HeaderScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import Navbar from "./components/navbar";
import ClientsScreen from "./screens/ClientsScreen";
import axios from 'axios';

axios.defaults.baseURL = 'https://https://0.0.0.0:9000';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(request => {
  console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
    console.log(process.env);
  }, []);

  // const openMenu = () => {
  //   document.querySelector('.sidebar').classList.add('open');
  // };
  // const closeMenu = () => {
  //   document.querySelector('.sidebar').classList.remove('open');
  // };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Navbar/>
        {/*<aside className="sidebar">*/}
        {/*  <h3 className="my-3">Kategorije</h3>*/}
        {/*  <button className="sidebar-close-button" onClick={closeMenu}>*/}
        {/*    x*/}
        {/*  </button>*/}
        {/*  <ul className="categories">*/}
        {/*    <li>*/}
        {/*      <Link to="/category/Gume">Gume</Link>*/}
        {/*    </li>*/}

        {/*    <li>*/}
        {/*      /!*<Link to="/category/Shirts">Shirts</Link>*!/*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</aside>*/}

        <main className="main container">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/kategorije" component={CategoriesScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/proizvod/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/kategorija/:id" component={HomeScreen} />
            <Route path="/sezona/:seasonId" component={HomeScreen} />
            <Route path="/header" component={HeaderScreen} />
            <Route path="/proizvodjaci" component={ClientsScreen} />
            <Route path="/o-nama" exact={true} component={AboutUsScreen} />
            <Route path="/o-nama/:contact" component={AboutUsScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
