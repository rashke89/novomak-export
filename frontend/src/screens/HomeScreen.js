import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts} from '../actions/productActions';
import Rating from '../components/Rating';
import { useHistory } from 'react-router-dom'

function HomeScreen(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
    const productList = useSelector((state) => state.productList);
    const {products, loading, error} = productList;
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
        dispatch(listProducts(category, searchKeyword, sortOrder));
    };
    const sortHandler = (e) => {
        console.log(e.target.value);
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, e.target.value));
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
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className="container products">
                    <div className="row">
                        {products.map((product) => (
                                <div className="col-md-3 my-3 product-wrapper" key={product._id} onClick={event => history.push(`/product/${product._id}`)}>
                                    <div className="product">
                                        {/*<Link to={'/product/' + product._id}>*/}
                                        <a >
                                            <div style={{'backgroundImage': `url(${product.image})`}} className="-bg-image">

                                            </div>
                                        </a>
                                            <div className="product-name px-3">
                                                <Link to={'/product/' + product._id}>{product.name}</Link>
                                            </div>
                                            <div className="product-brand px-3">{product.brand}</div>
                                            <div className="product-description px-3">{product.description}</div>
                                            <div className="product-price px-3">{product.price} rsd</div>
                                            <div className="product-rating px-3">
                                                <Rating
                                                    value={product.rating}
                                                    text={product.numReviews + ' reviews'}
                                                />
                                            </div>

                                    </div>
                                </div>
                        ))}
                    </div>

                </div>
            )}
        </>
    );
}

export default HomeScreen;
