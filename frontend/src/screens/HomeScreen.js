import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts} from '../actions/productActions';
import Rating from '../components/Rating';
import { useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";

function HomeScreen(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
    const productList = useSelector((state) => state.productList);
    const [page, setPage] = useState(1);
    const [totalPerPage, setTotalPerPage] = useState(32);
    const {products, loading, error, totalItems} = productList;
    const dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(listProducts(category));

        return () => {
            //
        };
    }, [category]);


    const submitHandler = (e) => {
        e.preventDefault();
        setPage(1);
        dispatch(listProducts(category, searchKeyword, sortOrder, 1));
    };
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, e.target.value, page));
    };
    const handlePagination = (num) => {
        setPage(num);
        dispatch(listProducts(category, searchKeyword, sortOrder, num));
    };

    return (
        <>
            {category && <h2>{category}</h2>}

            <ul className="filter">
                <li>
                    <form onSubmit={submitHandler}>
                        <input
                            name="searchKeyword"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </li>
                <li>
                    Sortiraj po:{' '}
                    <select name="sortOrder" onChange={sortHandler}>
                        <option value="">Novije</option>
                        <option value="lowest">Cena rastuce</option>
                        <option value="highest">Cena opadajuce</option>
                    </select>
                </li>
            </ul>
            {loading ? (
                <div>Ucitavanje...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className="container ">
                    <div className="row products">
                        {products.map((product) => (
                                <div className="col-md-3 my-3 product-wrapper" key={product._id} onClick={event => history.push(`/product/${product._id}`)}>
                                    <div className="product">
                                        {/*<Link to={'/product/' + product._id}>*/}
                                        <a >
                                            <div style={{'backgroundImage': `url(${product.Slika})`}} className="-bg-image">

                                            </div>
                                        </a>
                                            <div className="product-name px-3">
                                                <Link to={'/product/' + product._id}>{product.Naziv}</Link>
                                            </div>
                                            <div className="product-brand px-3">{product.Proizvodjac}</div>
                                            <div className="product-description px-3">{product.Specifikacija}</div>
                                            <div className="product-price px-3">{product.Cena} rsd</div>
                                            <div className="product-rating px-3">
                                                {/*<Rating*/}
                                                {/*    value={product.rating}*/}
                                                {/*    text={product.numReviews + ' reviews'}*/}
                                                {/*/>*/}
                                            </div>

                                    </div>
                                </div>
                        ))}

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="pagination-wrapper">
                                {totalItems && <Pagination
                                    activePage={page}
                                    itemsCountPerPage={totalPerPage}
                                    totalItemsCount={totalItems}
                                    pageRangeDisplayed={5}
                                    onChange={handlePagination}
                                />}
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default HomeScreen;
