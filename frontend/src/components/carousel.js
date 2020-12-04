import React, {useEffect, useState} from 'react';
import guma1 from '../assets/imgs/guma7.jpg'
import guma2 from '../assets/imgs/guma2.jpg'
import guma3 from '../assets/imgs/guma3.jpg'
import axios from "axios";

export default function Carousel(props) {
    const [headers, setHeaders] = useState([]);
    useEffect(() => {
        listHeaders()
    }, [])
    const listHeaders = () => {
        axios.get(`/api/users/header`)
            .then(data => {
                setHeaders(data.data)
            })
            .catch(error => {
                console.log(error);
            })
    };
    return <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
        <ol className="carousel-indicators">
            {headers?.length ?
                headers.map((item, index) => {
                    return <li key={index} data-target="#carouselExampleIndicators" data-slide-to="0" className={`${!index ? 'active' : ''}`}></li>
                })
                : ''}
        </ol>
        <div className="carousel-inner">
            {headers?.length ?
                headers.map((item, index) => {
                    return <div key={index} className={`carousel-item ${!index ? 'active' : ''}`} style={{'backgroundImage': `url('${item.image}')`}}>
                        <div className="container h-100">
                            <div className="row h-100">
                                <div className="col-md-12 h-100" style={{'justifyContent': item.position == 1 ? 'flex-end' : ''}}>
                                    <div className={`content ${item.position == 1 ? 'right' : ''}`}>
                                        <h1>{item.text}</h1>
                                        <a href={item.link}>{item.button}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                })
                : ''}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
}
