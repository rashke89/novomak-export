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
        document.querySelector('#nav-icon3').addEventListener('click', function(event){
            if (document.querySelector('#nav-icon3').classList.contains('open')) {
                document.querySelector('#nav-icon3').classList.remove('open')
                document.querySelector('.navbar-overlay').style.display = 'none'
            } else {
                document.querySelector('#nav-icon3').classList.add('open');
                document.querySelector('.navbar-overlay').style.display = 'block'
            }
        });
        var links = document.querySelectorAll(".nav-item a");
        links.forEach((item) => {
            item.addEventListener('click', (event) => {
                document.querySelector('#nav-icon3').click()
            })
        })
        document.querySelector('.navbar-overlay').addEventListener('click', (event) => {
            document.querySelector('#nav-icon3').click()
        })
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
    return <header className="header navbar">
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
                        <li className="mb-5 mt-3">
                            <Link to="/profile">Porudzbine</Link>
                        </li>
                        <li className="mb-5">
                            <Link to="/kategorije">Kategorije</Link>
                        </li>
                        <li className="mb-5">
                            <Link to="/products">Proizvodi</Link>
                        </li>
                        <li className="mb-5">
                            <Link to="/header">Header</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
        <div className="mobile-navbar">
            <Link to="/cart" className="cart-item">
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
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                <div id="nav-icon3">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/kategorija/shop">SHOP</Link>
                </li>
                <li className="nav-item">
                    <Link to="/o-nama">O NAMA</Link>
                </li>
                <li className="nav-item">
                    <Link to="/o-nama/kontakt">KONTAKT</Link>
                </li>
                {userInfo && userInfo.isAdmin ? <>
                    <li className="nav-item dropdown">
                        <Link to="/profile">PORUDZBINE</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="/kategorije">KATEGORIJE</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="/products">PROIZVODI</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="/header">HEADER</Link>
                    </li></> : ''}

            </ul>
        </div>

        <div className="navbar-overlay"></div>

    </header>
}
