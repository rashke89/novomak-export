import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Navbar(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);
    // const listHeaders = () => {
    //     axios.get(`/api/users/header`)
    //         .then(data => {
    //             setHeaders(data.data)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // };
    return <header className="header">
        <div className="brand">
            <Link to="/">
                <img src="http://www.novomak-export.com/wp-content/uploads/2013/06/novomak-logo2.png" alt=""/>
            </Link>
        </div>
        <div className="header-links">
            <Link to="/kategorija/shop">shop</Link>
            <Link to="/o-nama">o nama</Link>
            <Link to="/o-nama/kontakt">kontakt</Link>
            <Link to="/cart" className="cart-item">
                korpa
                <svg aria-hidden="true"
                     focusable="false"
                     data-prefix="fas"
                     data-icon="shopping-cart"
                     role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 576 512"
                     className="svg-inline--fa fa-shopping-cart fa-w-18 fa-3x">
                    <path fill="currentColor"
                          d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                          className=""></path>
                </svg>
                {cartItems ? <span>{cartItems.length}</span> : ''}
            </Link>
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
}
