import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {logout, update} from '../actions/userActions';
import {listMyOrders} from '../actions/orderActions';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from "../actions/productActions";
import Pagination from "react-js-pagination";

function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading, success, error} = userUpdate;
    const [page, setPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const myOrderList = useSelector(state => {
        return state.myOrderList
    });
    const [totalPerPage, setTotalPerPage] = useState(30);
    const {loading: loadingOrders, orders: orders, error: errorOrders, totalItems} = myOrderList;

    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        dispatch(listMyOrders(page, searchKeyword));
        return () => {

        };
    }, [userInfo]);
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({userId: userInfo._id, email, name, password}))
    };
    const handlePagination = (num) => {
        setPage(num);
        dispatch(listMyOrders(num, searchKeyword));
    };

    return <div className="profile">
        <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                        <>
                          <div className="head-section">
                            <h3>Porudzbine</h3>
                            <input value={searchKeyword}
                                   type="text"
                                   id="search"
                                   name="search"
                                   placeholder="Pretraga (ID ili ime/prezime kupca)"
                                   onKeyDown={e => {
                                     if(e.keyCode == 13){
                                       handlePagination(page)
                                     }
                                   }}
                                   onChange={(e) => setSearchKeyword(e.target.value)}>
                            </input>
                          </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Datum</th>
                                    <th>Kupac</th>
                                    <th>Ukupna cena</th>
                                    <th>Detalji</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                                    <td>{order.user?.name} {order?.user?.lastName}</td>
                                    <td>{order.priceSum} rsd</td>
                                    <td>
                                        <Link to={"/order/" + order._id}>DETALJI</Link>
                                    </td>
                                </tr>)}
                                </tbody>
                            </table>
                        </>
            }
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
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Profile Saved Successfully.</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </li>

                        <li>
                            <button type="submit" className="button primary">Update</button>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
    </div>
}

export default ProfileScreen;