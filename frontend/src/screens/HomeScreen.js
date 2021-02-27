import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts, randomProductsList, updateFilter} from '../actions/productActions';
import Rating from '../components/Rating';
import {useHistory} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Carousel from "../components/carousel";
import * as config from "../config";
import {listCategories} from "../actions/categoryAction";
import Cookie from "js-cookie";
import {sliderList} from "../actions/userActions";
import ClientSlider from "../components/clinet-slider";

function HomeScreen(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
    const seasonId = props.match.params.seasonId ? props.match.params.seasonId : '';
    const productList = useSelector((state) => state.productList);
    const filter = useSelector((state) => state.filter);
    const {categories, diameters, manufacturers, heights, widths, seasons} = useSelector((state) => state.categoryList.categories);
    const [page, setPage] = useState(1);
    const [totalPerPage, setTotalPerPage] = useState(32);
    const {products, loading, error, totalItems, randomProducts} = productList;
    const dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(listProducts(category));
        return () => {
            //
        };
    }, [category]);

    // const { pathname } = useLocation();
    //
    // useEffect(() => {
    //     console.log(randomProducts);
    // }, [randomProducts]);
    useEffect(() => {
        // dispatch(listProducts(category));
        // dispatch(listCategories());
        if (categories?.length && category) {
            let findCategory;
            let newFilter;
            if (category !== 'shop' ) {
                findCategory = categories.find(item => item._id === category);
                newFilter  = {...filter, page: 1, Kategorija: findCategory.name}
            } else {
                newFilter = {...filter, page: 1}
            }
            dispatch(updateFilter(newFilter));
            dispatch(listProducts('', filter.searchKeyword, filter.sortOrder, filter.page, newFilter));
        } else if (seasons?.length && seasonId) {
            let findCategory;
            let newFilter;
            if (seasonId) {
                findCategory = seasons.find(item => item._id === seasonId);
                newFilter  = {...filter, page: 1, Sezona: findCategory.name}
            } else {
                newFilter = {...filter, page: 1}
            }
            dispatch(updateFilter(newFilter));
            dispatch(listProducts('', filter.searchKeyword, filter.sortOrder, filter.page, newFilter));
        }
        return () => {
            //
        };
    }, [categories, category, seasonId]);
    useEffect(() => {
        if (!category)
            dispatch(randomProductsList());

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
        category && dispatch(listProducts(category, searchKeyword, sortOrder, 1, filter));
    };
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        setPage(1);
        dispatch(updateFilter({...filter, page: 1, sortOrder}));
        category && dispatch(listProducts(category, searchKeyword, e.target.value, page, filter));
    };
    const handlePagination = (num) => {
        let options = {
            behavior: 'smooth'
        };
        setTimeout(() => {
            document.getElementById('home-section').scrollIntoView(options)
        }, 800);
        setPage(num);
        dispatch(updateFilter({...filter, page: num}));
        category && dispatch(listProducts(category, searchKeyword, sortOrder, num, filter));
    };
    const formatPrice = (product) => {
        if (product?.priceChanged) {
            return product.Cena;
        }
        let foundCategory = categories.find(item => item.name === product.Kategorija);
        if (foundCategory && foundCategory?.discount) {
            product.priceChanged = true;
            if (foundCategory.discount < 0) {
                product.staraCena = product.Cena;
                return product.Cena = product.Cena - ((product.Cena * Number(Math.abs(foundCategory.discount))) / 100).toFixed(0);
            } else if(foundCategory.discount > 0) {
                return product.Cena = Number(product.Cena) + Number(((product.Cena * Number(foundCategory.discount)) / 100).toFixed(0));
            }
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
        dispatch(updateFilter({...newFilterObj}));
        category && dispatch(listProducts(category, searchKeyword, sortOrder, 1, newFilterObj));
    };
    const removeFilter = (filterName) => {
        let newFilterObj = {...filter, page: 1};
        delete newFilterObj[filterName];
        setPage(1);
        dispatch(updateFilter({...newFilterObj}));
        dispatch(listProducts(category, searchKeyword, sortOrder, 1, newFilterObj));
    };
    const handleSearch = () => {
        let newFilterObj;
        if (searchKeyword) {
            newFilterObj = {...filter, searchKeyword}
        } else {
            newFilterObj = {...filter}
        }
        dispatch(updateFilter({...newFilterObj}));
        history.push(`/kategorija/shop`)
    };
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

    return (
        <>
            <section className="-carousel">
                <div className="carousel-wrapper">
                    <Carousel/>
                </div>
            </section>

            <div id="home-section"></div>

            {loading ? (
                <div>Učitavanje...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    {categories?.length && category ? '' : <section className="filter-wrapper container">
                        <div className="row m-0">
                            <div className="col-md-12 p-0">
                                <div className="container p-0">
                                    <div className="row filter bg-blue">
                                        <div className="col-sm-6 col-md-3 my-3">
                                            <form onSubmit={submitHandler} className="search-input">
                                                <input
                                                    placeholder="Pretraga..."
                                                    name="searchKeyword"
                                                    defaultValue={searchKeyword}
                                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                                />
                                                <svg onClick={submitHandler} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img"
                                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                     className="svg-inline--fa fa-search fa-w-16 fa-3x">
                                                    <path fill="currentColor"
                                                          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                                          className=""></path>
                                                </svg>
                                                {/*<button type="submit">Search</button>*/}
                                            </form>
                                        </div>
                                        <div className=" col-sm-6 col-md-3 sort my-3">
                                    {/*<span className="mr-1">*/}
                                    {/*    Sortiraj:*/}
                                    {/*</span>*/}

                                            <select name="sortOrder" value={sortOrder} onChange={sortHandler}>
                                                <option value="">Novije</option>
                                                <option value="lowest">Cena rastuce</option>
                                                <option value="highest">Cena opadajuce</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2 col-sm-6 my-3">
                                            <select name="Sirina" value={filter.Sirina} onChange={filterHandler}>
                                                <option value="">-- Širina --</option>
                                                {filter.Kategorija ?  widths?.map(item => {
                                                    if (item.usedCategories.findIndex(o => o === filter.Kategorija) >= 0)
                                                        return<option value={item.name} key={item.name}>{item.name}</option>;
                                                }) : widths?.sort((a, b) => a.name - b.name).map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-2 col-sm-6 my-3">
                                            <select name="Visina" value={filter.Visina} onChange={filterHandler}>
                                                <option value="">-- Visina --</option>
                                                {filter.Kategorija ?  heights?.map(item => {
                                                    if (item.usedCategories.findIndex(o => o === filter.Kategorija) >= 0)
                                                        return<option value={item.name} key={item.name}>{item.name}</option>;
                                                }) : heights?.sort((a, b) => a.name - b.name).map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-2 col-sm-6 my-3">
                                            <select name="Precnik" value={filter.Precnik} onChange={filterHandler}>
                                                <option value="">-- Prečnik --</option>
                                                {filter.Kategorija ?  diameters?.map(item => {
                                                    if (item.usedCategories.findIndex(o => o === filter.Kategorija) >= 0)
                                                        return<option value={item.name} key={item.name}>{item.name}</option>;
                                                }) : diameters?.sort((a, b) => a.name - b.name).map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-3 col-sm-6 my-3">
                                            <select name="Kategorija" value={filter.Kategorija} onChange={filterHandler}>
                                                <option value="">-- Kategorija --</option>
                                                {categories?.sort((a, b) => a.order -b.order).map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-3 col-sm-6 my-3">
                                            <select name="Proizvodjac" value={filter.Proizvodjac} onChange={filterHandler}>
                                                <option value="">-- Proizvođač --</option>
                                                {manufacturers?.map(item => {
                                                    return <option value={item.name} key={item._id}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-3 col-sm-6 my-3">
                                            <select name="Sezona" value={filter.Sezona} onChange={filterHandler}>
                                                <option value="">-- Sezona --</option>
                                                {seasons?.map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-3 col-sm-12 my-3">
                                            <button className="search-btn" type="button" onClick={handleSearch}>Pretraži</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>}
                    {(categories?.length && category) || seasonId ? <div className="row category-screen-wrapper">
                        <div className="col-md-3 col-sm-12 filter">
                            <div className="col-sm-12">
                                <h2 className="info-text">Filter</h2>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <form onSubmit={submitHandler} className="search-input">
                                    <input
                                        placeholder="Pretraga..."
                                        name="searchKeyword"
                                        defaultValue={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                    />
                                    <svg onClick={submitHandler} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512"
                                         className="svg-inline--fa fa-search fa-w-16 fa-3x">
                                        <path fill="currentColor"
                                              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                              className=""></path>
                                    </svg>
                                </form>
                            </div>
                            <div className="col-sm-6 col-md-12">
                                <select name="Kategorija" value={filter.Kategorija} onChange={filterHandler}>
                                    <option value="">-- Kategorija --</option>
                                    {categories?.sort((a, b) => a.order -b.order).map(item => {
                                        return <option value={item.name} key={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-6 col-md-12">
                                <select name="Sirina" value={filter.Sirina} onChange={filterHandler}>
                                    <option value="">-- Širina --</option>
                                    {filter.Kategorija ?  widths?.map(item => {
                                        if (item.usedCategories.findIndex(o => o === filter.Kategorija) >= 0)
                                            return<option value={item.name} key={item.name}>{item.name}</option>;
                                    }) : widths?.sort((a, b) => a.name - b.name).map(item => {
                                        return <option value={item.name} key={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-6 col-md-12">
                                <select name="Visina" value={filter.Visina} onChange={filterHandler}>
                                    <option value="">-- Visina --</option>
                                    {filter.Kategorija ?  heights?.map(item => {
                                        if (item.usedCategories.findIndex(o => o === filter.Kategorija) >= 0)
                                            return<option value={item.name} key={item.name}>{item.name}</option>;
                                    }) : heights?.sort((a, b) => a.name - b.name).map(item => {
                                        return <option value={item.name} key={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-6 col-md-12">
                                <select name="Precnik" value={filter.Precnik} onChange={filterHandler}>
                                    <option value="">-- Prečnik --</option>
                                    {filter.Kategorija ?  diameters?.map(item => {
                                        if (item.usedCategories.findIndex(o => o === filter.Kategorija) >= 0)
                                            return<option value={item.name} key={item.name}>{item.name}</option>;
                                    }) : diameters?.sort((a, b) => a.name - b.name).map(item => {
                                        return <option value={item.name} key={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-6 col-md-12">
                                <select name="Proizvodjac" value={filter.Proizvodjac} onChange={filterHandler}>
                                    <option value="">-- Proizvođač --</option>
                                    {manufacturers?.map(item => {
                                        return <option value={item.name} key={item._id}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-6 col-md-12">
                                <select name="Sezona" value={filter.Sezona} onChange={filterHandler}>
                                    <option value="">-- Sezona --</option>
                                    {seasons?.map(item => {
                                        return <option value={item.name} key={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-9 col-sm-12 category-products">
                            <div className="row">
                                <div className="col-md-9 col-sm-12 selected-filter-wrapper">
                                    {filter ? Object.keys(filter).map(key => {
                                        if (key !== 'page' && key !== 'searchKeyword' && key !== 'sortOrder') {
                                            return <div className="selected-filter" key={key}>{key}: {filter[key]}
                                                <svg aria-hidden="true"
                                                     onClick={e => removeFilter(key)}
                                                     focusable="false"
                                                     data-prefix="fas"
                                                     data-icon="times"
                                                     role="img"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 352 512"
                                                     className="svg-inline--fa fa-times fa-w-11 fa-3x">
                                                    <path fill="currentColor"
                                                          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                                          className=""></path>
                                                </svg>
                                            </div>
                                        } else {
                                            return ''
                                        }

                                    }) : ''}
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <select className="sort-order-right" name="sortOrder" value={sortOrder} onChange={sortHandler}>
                                        <option value="">Novije</option>
                                        <option value="lowest">Cena rastuce</option>
                                        <option value="highest">Cena opadajuce</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                {categories && products?.length ? products.map((product) => (
                                    <div className="col-lg-3 col-md-6 my-3 product-wrapper" key={product._id} onClick={event => history.push(`/proizvod/${product._id}`)}>
                                        <div className="product">
                                            <Link to={'/proizvod/' + product._id}>
                                                <div className="link">
                                                    <div style={{'backgroundImage': `url(${config.formatImagePath(product.Slika)})`}} className="-bg-image">

                                                    </div>
                                                </div>
                                                <div className="product-name px-3">
                                                    {product.Naziv}
                                                </div>
                                                <div className="product-brand px-3">{product.Proizvodjac}</div>
                                                <div className="product-description px-3">{product.Specifikacija}</div>
                                                <div className="product-price px-3">{formatPrice(product)} rsd</div>
                                                {product.Akcija == 1 ? <div className="action">Akcijska cena</div> : ''}
                                            </Link>
                                        </div>
                                    </div>
                                )) : <h2 className="info-text m-auto">Nema rezultata.</h2>}
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
                    </div> : <div className="home-screen-wrapper">
                        <h1 className=" info-text title-title"><strong className="pr-1">Naša</strong>Ponuda</h1>
                        <h3 className=" text-center mt-3">Sve za vašeg <strong>"ljubimca" </strong> na jednom mestu</h3>
                        <div className="main-categories">

                        {!categories?.length ? '' :
<>
    {categories.sort((a, b) => a.order -b.order).map(item => {
        let image = item?.image ? item.image : 'https://le-cdn.websites.hibu.com/8f8b35766e8947e2be0e167cbf9a4001/dms3rep/multi/opt/shutterstock_262895021-640w.jpg';
        return <div key={item._id} className="category-bg-image" style={{"backgroundImage": `url('${config.formatImagePath(image)}')`}} onClick={e => goToCategory(item)}>
            <div className="layer position-relative">
                <h2>{item.name}</h2>
    <img  className="vulco"src="https://www.novomak-export.com/wp-content/themes/novomak/images/vulco%20logo.png" alt=""/>
            </div>
        </div>
    })}
</>


                        }
                        </div>
                        {/*<div className=" products">*/}
                        {/*    {false ? products.map((product) => (*/}
                        {/*        <div className="col-lg-3 col-md-6 my-3 product-wrapper" key={product._id} onClick={event => history.push(`/proizvod/${product._id}`)}>*/}
                        {/*            <div className="product">*/}
                        {/*                <Link to={'/proizvod/' + product._id}>*/}
                        {/*                    <div className="link">*/}
                        {/*                        <div style={{'backgroundImage': `url(${product.Slika})`}} className="-bg-image">*/}

                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="product-name px-3">*/}
                        {/*                        {product.Naziv}*/}
                        {/*                    </div>*/}
                        {/*                    <div className="product-brand px-3">{product.Proizvodjac}</div>*/}
                        {/*                    <div className="product-description px-3">{product.Specifikacija}</div>*/}
                        {/*                    <div className="product-price px-3">{formatPrice(product)} rsd</div>*/}
                        {/*                </Link>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    )) : <h2 className="info-text">Nema rezultata.</h2>}*/}

                        {/*</div>*/}
                        {/*<div className="row">*/}
                        {/*    <div className="col-md-12">*/}
                        {/*        <div className="pagination-wrapper">*/}
                        {/*            {totalItems && products.length ? <Pagination*/}
                        {/*                activePage={page}*/}
                        {/*                itemsCountPerPage={totalPerPage}*/}
                        {/*                totalItemsCount={totalItems}*/}
                        {/*                pageRangeDisplayed={5}*/}
                        {/*                onChange={handlePagination}*/}
                        {/*            /> : ''}*/}
                        {/*        </div>*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="highlight-products">
                            <h1 className="info-text"><strong className="pr-1">Istaknuti</strong> proizvodi</h1>
                        </div>

                        <div id="carouselExampleIndicators1" className="carousel slide my-5" data-ride="carousel">
                            <div className="carousel-inner row">
                                {randomProducts && categories ?
                                    Object.keys(randomProducts).map((item, index) => {
                                        return <div key={index} className={`carousel-item ${!index ? 'active' : ''}`}>
                                            {randomProducts[item].map((product, index) => {
                                                return  <div className="col-lg-3 col-md-6 my-3 product-wrapper" key={product._id} onClick={event => history.push(`/proizvod/${product._id}`)}>
                                                    <div className="product">
                                                        <Link to={'/proizvod/' + product._id}>
                                                            <div className="link">
                                                                <div style={{'backgroundImage': `url(${config.formatImagePath(product.Slika)})`}} className="-bg-image">

                                                                </div>
                                                            </div>
                                                            <div className="product-name px-3">
                                                                {product.Naziv}
                                                            </div>
                                                            <div className="product-brand px-3">{product.Proizvodjac}</div>
                                                            <div className="product-description px-3">{product.Specifikacija}</div>
                                                            <div className="product-price px-3">{formatPrice(product)} rsd</div>
                                                            {product.Akcija == 1 ? <div className="action">Akcijska cena</div> : ''}
                                                        </Link>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    })
                                    : ''}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators1" role="button" data-slide="prev">
                                <div className="indi-custom">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                </div>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators1" role="button" data-slide="next">
                                <div className="indi-custom">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                </div>

                                <span className="sr-only">Next</span>
                            </a>
                        </div>



                            <ClientSlider/>



                    </div>}

                </>
            )}
        </>
    );
}

export default HomeScreen;
