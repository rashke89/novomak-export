import React, {useEffect, useState} from 'react';
import guma1 from '../assets/imgs/guma7.jpg'
import guma2 from '../assets/imgs/guma2.jpg'
import guma3 from '../assets/imgs/guma3.jpg'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {clientSliderList} from "../actions/userActions";
import {Link} from "react-router-dom";
import * as config from "../config";

export default function ClientSlider(props) {
    const {slider} = useSelector((state) => state.slider);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clientSliderList())
    }, []);

    return <>
        {slider && Object.keys(slider).length ?
            <div className="brand-wrapper">
                <h1 className="info-text"><strong className="pr-1">Zastupljeni</strong> brendovi</h1>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner row">

                        {Object.keys(slider).map((item, index) => {
                            return <div key={index} className={`carousel-item ${!index ? 'active' : ''}`}>
                                {slider[item].map((product) => {
                                    return <div className="col-lg-3 col-md-6 my-3" key={product._id}>
                                        <img className="img-fluid" src={`${config.formatImagePath(product.image)}`} alt=""/>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                </div>
                {/*<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">*/}
                {/*    <div className="carousel-inner">*/}
                {/*        <div className="carousel-item active">*/}
                {/*            <img src="..." className="d-block w-100" alt="..."/>*/}
                {/*        </div>*/}
                {/*        <div className="carousel-item">*/}
                {/*            <img src="..." className="d-block w-100" alt="..."/>*/}
                {/*        </div>*/}
                {/*        <div className="carousel-item">*/}
                {/*            <img src="..." className="d-block w-100" alt="..."/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">*/}
                {/*        <span className="carousel-control-prev-icon" aria-hidden="true"></span>*/}
                {/*        <span className="sr-only">Previous</span>*/}
                {/*    </a>*/}
                {/*    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">*/}
                {/*        <span className="carousel-control-next-icon" aria-hidden="true"></span>*/}
                {/*        <span className="sr-only">Next</span>*/}
                {/*    </a>*/}
                {/*</div>*/}


            </div> : ''}
    </>
}
