import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Navbar(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const [activeLink, setActiveLink] = useState('0');
    useEffect(() => {
        document.querySelector('#nav-icon3').addEventListener('click', function(event){
            if (document.querySelector('#nav-icon3').classNameList.contains('open')) {
                document.querySelector('.navbar-overlay').style.display = 'none';
                document.querySelector('#nav-icon3').classNameList.remove('open');
            } else {
                document.querySelector('.navbar-overlay').style.display = 'block';
                document.querySelector('#nav-icon3').classNameList.add('open');
            }
        });
        var links = document.querySelectorAll(".nav-item a");
        links.forEach((item) => {
            item.addEventListener('click', (event) => {
                document.querySelector('#nav-icon3').click()
            })
        });
        document.querySelector('.navbar-overlay').addEventListener('click', (event) => {
            document.querySelector('#nav-icon3').click()
        })

    }, []);
    useEffect(() => {
        switch (window.location.pathname) {
            case '/' :
                setActiveLink(0);
                break;
            case '/kategorija/shop':
                setActiveLink(1);
                break;
            case '/o-nama':
                setActiveLink(2);
                break;
            case '/o-nama/kontakt':
                setActiveLink(3);
                break;
            case '/cart':
                setActiveLink(4);
                break;
            default:
                console.log('ne postoji stranica.')
        }
    }, [activeLink]);
    // const listHeaders = () => {
    //     axios.get(`/api/users/header`)
    //         .then(data => {
    //             setHeaders(data.data)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // };
    const onChooseLink = (link) => {
        setActiveLink(link);
    };
    return <header >

    <div className="container top">

        <div className="row">

        <div className="col-auto col-md-auto col-xl-4 pl-0 d-flex justify-content-start  info-box">
        <a href="tel:022/314-740" className="pr-2 py-1">022 314 740</a>
    /
    <a href="#" className="pl-2 py-1" >novomakexport@yahoo.com</a>
    </div>



        <div className="col-12 col-xl-3 box-form d-none d-xl-block info-box">

        </div>





        <div className="col-auto ml-auto col-md-auto col-xl-5 d-flex justify-content-end">

    </div>
    </div>
    </div>





            <div className=" navbar container">
                    <div className="brand">
                    <Link to="/" onClick={e => onChooseLink(0)}>
                        <img  className="w-75"src="http://media2.power-pixels.com/2021/01/novomak-logo2.png" alt=""/>
                    </Link>
                    </div>
                    <div className="header-links">
                    <Link  className={`${activeLink == 0 ? "active" : ""}`} to="/" onClick={e => onChooseLink(0)}>Početna</Link>
                <Link className={`${activeLink == 1 ? "active" : ""}`} to="/kategorija/shop" onClick={e => onChooseLink(1)}>Shop</Link>
                <Link className={`${activeLink == 2 ? "active" : ""}`} to="/o-nama" onClick={e => onChooseLink(2)}>O nama</Link>
                <Link className={`${activeLink == 3 ? "active" : ""}`} to="/o-nama/kontakt" onClick={e => onChooseLink(3)}>Kontakt</Link>
                <Link to="/cart" className={`${activeLink == 4 ? "active" : ""} cart-item`} onClick={e => onChooseLink(4)}>
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

                <a className="face-a"href="#" ><img  className="face"src="http://media2.power-pixels.com/2021/01/facebook-1.png" alt=""/></a>

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
                    <li className="mb-5">
                    <Link to="/proizvodjaci">Porizvođači</Link>
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
                <li className="nav-item">
                    <Link to="/profile">PORUDZBINE</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/kategorije">KATEGORIJE</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/products">PROIZVODI</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/header">HEADER</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/proizvodjaci">PROIZVOĐAČI</Link>
                    </li></> : ''}
            
                </ul>
                </div>
            
                <div className="navbar-overlay"></div>


            </div>


    </header>
}
