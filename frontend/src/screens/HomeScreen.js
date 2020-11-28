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
                                    <form onSubmit={submitHandler}>
                                        <input
                                            name="searchKeyword"
                                            defaultValue={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                        />
                                        <button type="submit">Search</button>
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
