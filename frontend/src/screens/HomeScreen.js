import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts, updateFilter} from '../actions/productActions';
import Rating from '../components/Rating';
import {useHistory} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Carousel from "../components/carousel";
import {WIDTH_LIST, HEIGHT_LIST, DIAMETER} from "../config";
import {listCategories} from "../actions/categoryAction";
import Cookie from "js-cookie";

function HomeScreen(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
    const productList = useSelector((state) => state.productList);
    const filter = useSelector((state) =>  state.filter);
    const {categories, diameters, manufacturers, heights, widths, seasons} = useSelector((state) => state.categoryList.categories);
    const [page, setPage] = useState(1);
    const [totalPerPage, setTotalPerPage] = useState(32);
    const {products, loading, error, totalItems} = productList;
    const dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(listProducts(category));
        dispatch(listCategories());

        return () => {
            //
        };
    }, [category]);

    useEffect(() => {
        if (Object.keys(filter).length) {
            setSearchKeyword(filter?.searchKeyword);
            setSortOrder(filter?.sortOrder);
            setPage(filter?.page);
            dispatch(listProducts('', filter.searchKeyword, filter.sortOrder, filter.page, filter));
        }
    }, []);


    const submitHandler = (e) => {
        e.preventDefault();
        setPage(1);
        dispatch(updateFilter({...filter, page: 1, searchKeyword}));
        dispatch(listProducts(category, searchKeyword, sortOrder, 1, filter));
    };
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        setPage(1);
        dispatch(updateFilter({...filter, page: 1, sortOrder}));
        dispatch(listProducts(category, searchKeyword, e.target.value, page, filter));
    };
    const handlePagination = (num) => {
        setPage(num);
        dispatch(updateFilter({...filter, page: num}));
        dispatch(listProducts(category, searchKeyword, sortOrder, num, filter));
    };
    const formatPrice = (product) => {
        let foundCategory = categories.find(item => item.name === product.Kategorija);
        if (foundCategory && foundCategory?.discount) {
            return product.Cena - ((product.Cena * Number(foundCategory.discount)) / 100).toFixed(2);
        }
        return product.Cena;
    };
    const filterHandler = (e) => {
        let newFilterObj = {...filter, page: 1};
        if (e.target.value)
            newFilterObj = {
                ...filter,
                [e.target.name]: e.target.value
            };
        else
            delete newFilterObj[e.target.name];
        setPage(1);
        console.log('new filter...', newFilterObj);
        dispatch(updateFilter({...newFilterObj}));
        dispatch(listProducts(category, searchKeyword, sortOrder, 1, newFilterObj));
    };

    return (
        <>
            <section className="-carousel">
                <div className="carousel-wrapper">
                    <Carousel/>
                </div>
            </section>
            <section className="filter-wrapper container">
                <div className="row m-0">
                    <div className="col-md-12 p-0">
                        <div className="container p-0">
                            <div className="row filter">
                                <div className="col-sm-6 col-md-3 my-3">
                                    <form onSubmit={submitHandler} className="search-input">
                                        <input
                                            placeholder="Pretraga..."
                                            name="searchKeyword"
                                            defaultValue={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                        />
                                        <svg onClick={submitHandler} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                             className="svg-inline--fa fa-search fa-w-16 fa-3x">
                                            <path fill="currentColor"
                                                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                                  className=""></path>
                                        </svg>
                                        {/*<button type="submit">Search</button>*/}
                                    </form>
                                </div>
                                <div className=" col-sm-6 col-md-3 sort my-3">
                                    <span className="mr-1">
                                        Sortiraj:
                                    </span>

                                    <select name="sortOrder" value={sortOrder} onChange={sortHandler}>
                                        <option value="">Novije</option>
                                        <option value="lowest">Cena rastuce</option>
                                        <option value="highest">Cena opadajuce</option>
                                    </select>
                                </div>
                                <div className="col-md-2 col-sm-6 my-3">
                                    <select name="Sirina" value={filter.Sirina} onChange={filterHandler}>
                                        <option value="">-- Sirina --</option>
                                        {widths?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2 col-sm-6 my-3">
                                    <select name="Visina" value={filter.Visina} onChange={filterHandler}>
                                        <option value="">-- Visina --</option>
                                        {heights?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2 col-sm-6 my-3">
                                    <select name="Precnik" value={filter.Precnik} onChange={filterHandler}>
                                        <option value="">-- Precnik --</option>
                                        {diameters?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <select name="Kategorija" value={filter.Kategorija} onChange={filterHandler}>
                                        <option value="">-- Kategorija --</option>
                                        {categories?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <select name="Proizvodjac" value={filter.Proizvodjac} onChange={filterHandler}>
                                        <option value="">-- Proizvodjac --</option>
                                        {manufacturers?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <select name="Sezona" value={filter.Sezona} onChange={filterHandler}>
                                        <option value="">-- Sezona --</option>
                                        {seasons?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            {loading ? (
                <div>Ucitavanje...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>

                    <div className="">
                        <div className=" products">
                            {categories && products.length ? products.map((product) => (
                                <div className="col-lg-3 col-md-6 my-3 product-wrapper" key={product._id} onClick={event => history.push(`/product/${product._id}`)}>
                                    <div className="product">
                                        <Link to={'/product/' + product._id}>
                                        <div className="link">
                                            <div style={{'backgroundImage': `url(${product.Slika})`}} className="-bg-image">

                                            </div>
                                        </div>
                                        <div className="product-name px-3">
                                            {product.Naziv}
                                        </div>
                                        <div className="product-brand px-3">{product.Proizvodjac}</div>
                                        <div className="product-description px-3">{product.Specifikacija}</div>
                                        <div className="product-price px-3">{formatPrice(product)} rsd</div>
                                        </Link>
                                    </div>
                                </div>
                            )) : <h2 className="info-text">Nema rezultata.</h2>}

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pagination-wrapper">
                                    {totalItems && products.length ? <Pagination
                                        activePage={page}
                                        itemsCountPerPage={totalPerPage}
                                        totalItemsCount={totalItems}
                                        pageRangeDisplayed={5}
                                        onChange={handlePagination}
                                    /> : ''}
                                </div>

                            </div>
                        </div>

                    </div>
                </>
            )}
        </>
    );
}

export default HomeScreen;
