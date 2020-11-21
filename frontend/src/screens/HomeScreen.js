import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts} from '../actions/productActions';
import Rating from '../components/Rating';
import {useHistory} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Carousel from "../components/carousel";
import {WIDTH_LIST, HEIGHT_LIST, DIAMETER} from "../config";
import {listCategories} from "../actions/categoryAction";

function HomeScreen(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
    const productList = useSelector((state) => state.productList);
    const {categories, diameters, manufacturers, heights, widths, seasons} = useSelector((state) => state.categoryList.categories);
    const [page, setPage] = useState(1);
    const [totalPerPage, setTotalPerPage] = useState(32);
    const {products, loading, error, totalItems} = productList;
    const dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(listProducts(category));
        dispatch(listCategories())

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
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                        />
                                        <button type="submit">Search</button>
                                    </form>
                                </div>
                                <div className=" col-sm-6 col-md-3 sort my-3">
                                    <span className="mr-1">
                                        Sortiraj:
                                    </span>

                                    <select name="sortOrder" onChange={sortHandler}>
                                        <option value="">Novije</option>
                                        <option value="lowest">Cena rastuce</option>
                                        <option value="highest">Cena opadajuce</option>
                                    </select>
                                </div>
                                <div className="col-md-2 col-sm-6 my-3">
                                    <select name="sortOrder" onChange={sortHandler}>
                                        <option value="">-- Sirina --</option>
                                        {widths?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2 col-sm-6 my-3">
                                    <select name="sortOrder" onChange={sortHandler}>
                                        <option value="">-- Visina --</option>
                                        {heights?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2 col-sm-6 my-3">
                                    <select name="sortOrder" onChange={sortHandler}>
                                        <option value="">-- Precnik --</option>
                                        {diameters?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <select name="sortOrder" onChange={sortHandler}>
                                        <option value="">-- Kategorija --</option>
                                        {categories?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <select name="sortOrder" onChange={sortHandler}>
                                        <option value="">-- Proizvodjac --</option>
                                        {manufacturers?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <select name="sortOrder" onChange={sortHandler}>
                                        <option value="">-- Sezona --</option>
                                        {seasons?.map(item => {
                                            return <option value={item.name} key={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/*<ul className="filter">*/}
                        {/*    <li>*/}
                        {/*        <form onSubmit={submitHandler}>*/}
                        {/*            <input*/}
                        {/*                name="searchKeyword"*/}
                        {/*                onChange={(e) => setSearchKeyword(e.target.value)}*/}
                        {/*            />*/}
                        {/*            <button type="submit">Search</button>*/}
                        {/*        </form>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        Sortiraj po:{' '}*/}
                        {/*        <select name="sortOrder" onChange={sortHandler}>*/}
                        {/*            <option value="">Novije</option>*/}
                        {/*            <option value="lowest">Cena rastuce</option>*/}
                        {/*            <option value="highest">Cena opadajuce</option>*/}
                        {/*        </select>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <select name="sortOrder" onChange={sortHandler}>*/}
                        {/*            <option value="">-- Sirina --</option>*/}
                        {/*            {widths?.map(item => {*/}
                        {/*                return <option value={item.name} key={item.name}>{item.name}</option>*/}
                        {/*            })}*/}
                        {/*        </select>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <select name="sortOrder" onChange={sortHandler}>*/}
                        {/*            <option value="">-- Visina --</option>*/}
                        {/*            {heights?.map(item => {*/}
                        {/*                return <option value={item.name} key={item.name}>{item.name}</option>*/}
                        {/*            })}*/}
                        {/*        </select>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <select name="sortOrder" onChange={sortHandler}>*/}
                        {/*            <option value="">-- Precnik --</option>*/}
                        {/*            {diameters?.map(item => {*/}
                        {/*                return <option value={item.name} key={item.name}>{item.name}</option>*/}
                        {/*            })}*/}
                        {/*        </select>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </div>
                    <div className="col-md-12">
                        <div className="container">
                            <div className="row filter">

                            </div>
                        </div>

                        {/*<ul className="filter">*/}
                        {/*    <li>*/}
                        {/*        <select name="sortOrder" onChange={sortHandler}>*/}
                        {/*            <option value="">-- Kategorija --</option>*/}
                        {/*            {categories?.map(item => {*/}
                        {/*                return <option value={item.name} key={item.name}>{item.name}</option>*/}
                        {/*            })}*/}
                        {/*        </select>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <select name="sortOrder" onChange={sortHandler}>*/}
                        {/*            <option value="">-- Proizvodjac --</option>*/}
                        {/*            {manufacturers?.map(item => {*/}
                        {/*                return <option value={item.name} key={item.name}>{item.name}</option>*/}
                        {/*            })}*/}
                        {/*        </select>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <select name="sortOrder" onChange={sortHandler}>*/}
                        {/*            <option value="">-- Sezona --</option>*/}
                        {/*            {seasons?.map(item => {*/}
                        {/*                return <option value={item.name} key={item.name}>{item.name}</option>*/}
                        {/*            })}*/}
                        {/*        </select>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
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
                            {products.map((product) => (
                                <div className="col-lg-3 col-md-6 my-3 product-wrapper" key={product._id} onClick={event => history.push(`/product/${product._id}`)}>
                                    <div className="product">
                                        {/*<Link to={'/product/' + product._id}>*/}
                                        <a>
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
                </>
            )}
        </>
    );
}

export default HomeScreen;
