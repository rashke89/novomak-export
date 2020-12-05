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

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
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
        <header className="header">
          <div className="brand">
            {/*<button onClick={openMenu}>&#9776;</button>*/}
            <Link to="/">
              <img src="http://www.novomak-export.com/wp-content/uploads/2013/06/novomak-logo2.png" alt=""/>
            </Link>
          </div>
          <div className="header-links">
            {/*<a >Korpa</a>*/}
            <Link to="/kategorija/shop">shop</Link>
            <Link to="/cart">korpa</Link>
            <Link to="/o-nama">o nama</Link>
            <Link to="/o-nama/kontakt">kontakt</Link>
            {/*{userInfo ? (*/}
            {/*  <Link to="/profile">{userInfo.name}</Link>*/}
            {/*) : (*/}
            {/*    <div></div>*/}
            {/*)}*/}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">{userInfo.name}</a>
                <ul className="dropdown-content">
                  <li className="my-4">
                    <Link to="/profile">Porudzbine</Link>
                  </li>
                  <li className="my-4">
                    <Link to="/kategorije">Kategorije</Link>
                  </li>
                  <li className="my-4">
                    <Link to="/products">Proizvodi</Link>
                  </li>
                  <li className="my-4">
                    <Link to="/header">Header</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
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
            <Route path="/header" component={HeaderScreen} />
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
