import React, {useEffect, useState} from 'react';
import guma1 from '../assets/imgs/guma7.jpg'
import guma2 from '../assets/imgs/guma2.jpg'
import guma3 from '../assets/imgs/guma3.jpg'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {clientSliderList} from "../actions/userActions";
import {Link} from "react-router-dom";

export default function ClientSlider(props) {
    const {slider} = useSelector((state) => state.slider);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clientSliderList())
    }, []);

    return <>
        {slider && Object.keys(slider).length ?
            <div className="brand-wrapper">
                <h1 className="info-text">Zastupljeni brendovi</h1>
                <div id="carouselExampleIndicators2" className="carousel slide my-5" data-ride="carousel" data-interval={7000}>
                    <div className="carousel-inner row">

                        {Object.keys(slider).map((item, index) => {
                            return <div key={index} className={`carousel-item ${!index ? 'active' : ''}`}>
                                {slider[item].map((product) => {
                                    return <div className="col-lg-3 col-md-6 my-3 img-fluid" key={product._id}>
                                        <img src={`${product.image}`} alt=""/>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                </div>
            </div> : ''}
    </>
}
