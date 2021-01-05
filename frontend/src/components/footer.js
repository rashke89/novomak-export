import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import Map from "./map";
import {useDispatch, useSelector} from "react-redux";
import {updateFilter} from "../actions/productActions";

export default function Footer(props) {
    const {categories, seasons} = useSelector((state) => state.categoryList.categories);
    const dispatch = useDispatch();
    let history = useHistory();
    // useEffect(() => {
    // }, [categories]);

    const goToCategory = (category) => {
        let options = {
            behavior: 'smooth'
        };
        let name = category.name.replace(/\/+/g, '').replace(/[/,+\/.+\/:+\/;+\/"+\/'+\/*+\/!+\/?+]+/g, '').replace(/\s+/g, '-').toLowerCase();
        setTimeout(() => {
            document.getElementById('home-section').scrollIntoView(options)
        }, 500);
        dispatch(updateFilter({'Kategorija': category.name}));
        history.push(`/kategorija/${category._id}/${name}`);
    };
    const goToSeason = (season) => {
        let options = {
            behavior: 'smooth'
        };
        let name = season.name.replace(/\/+/g, '').replace(/[/,+\/.+\/:+\/;+\/"+\/'+\/*+\/!+\/?+]+/g, '').replace(/\s+/g, '-').toLowerCase();
        setTimeout(() => {
            document.getElementById('home-section').scrollIntoView(options)
        }, 500);
        dispatch(updateFilter({'Sezona': season.name, page: 1}));
        history.push(`/sezona/${season._id}/${name}`);
    };

    return <footer className="footer">
        <div className="container">
            <div className="row center">
                <div className="col-md-4">
                    <h3 className="info-text">Glanve kategorije</h3>
                    <ul>
                        {categories?.length ?
                        categories.sort((a, b) => a.order -b.order).map(item => {
                            return <li onClick={e => goToCategory(item)} key={item._id}>{item.name}</li>
                        }) :
                        ''}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h3 className="info-text">Sezone</h3>
                    <ul>
                        {seasons?.length ?
                            seasons.sort((a, b) => a.order -b.order).map(item => {
                                return <li onClick={e => goToSeason(item)} key={item._id}>{item.name}</li>
                            }) :
                            ''}
                    </ul>
                </div>
                <div className="col-md-4">
                    <div className="contact">
                        <a href="tel:022/314-740">
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                     className="svg-inline--fa fa-phone fa-w-16 fa-3x">
                                    <path fill="currentColor"
                                          d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                                          className=""></path>
                                </svg>

                                022/314-740
                            </p>
                        </a>
                        <a href="mailto:novomakexport@yahoo.com">
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                     className="svg-inline--fa fa-envelope fa-w-16 fa-3x">
                                    <path fill="currentColor"
                                          d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                                          className=""></path>
                                </svg>
                                novomakexport@yahoo.com
                            </p>
                        </a>
                        <a href="https://www.google.com/maps?ll=44.991588,20.157549&z=16&t=m&hl=en-GB&gl=RS&mapclient=embed&cid=3269410594426619850" target="_blank">
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                     className="svg-inline--fa fa-map-marker-alt fa-w-12 fa-3x">
                                    <path fill="currentColor"
                                          d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                                          className=""></path>
                                </svg>
                                Kralja Petra I Karađorđevića 78, Stara Pazova 22300
                            </p>
                        </a>

                        <p className="rights"> Novomak Export d.o.o. | <i>Sva prava zadrzana</i> |</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
