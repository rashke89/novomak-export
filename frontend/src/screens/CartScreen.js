import React, {useEffect, useState} from 'react';
import {addToCart, clearCart, removeFromCart, updateCartItemQty} from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from "axios";
let int = 5;
function CartScreen(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validForm, setValidForm] = useState(true);
  const [apiStarted, setApiStarted] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [order, setOrder] = useState({});
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems])

  const checkoutHandler = () => {
    setFormSubmitted(true);
    if (!name || !lastName || !email || !address || !city || !phone) {
      setValidForm(false);
      return 'validacija'
    }
    setApiStarted(true);
    let orderBody = {
      user: {
        name, lastName, email, address, phone, city, note,
      },
       cart,
       priceSum: cartItems.reduce((a, c) => a + c.Cena * c.qty, 0).toFixed(2)
    };
    Axios.post(`/api/orders/submit`, orderBody)
        .then(data => {
          setOrder(data.data.data.newOrder);
          setApiSuccess(true);
          setTimeout(() => {
            dispatch(clearCart());
          }, 8000)
          setTimeout(() => {
            props.history.push('/');
          }, 10000)
        })
        .catch(error => {
          setApiError(true);
          console.log(error);
        })
        .finally(() => {
          setApiStarted(false);
        });
  };

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Korpa
          </h3>
          <div>
            Cena
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Korpa je prazna
          </div>
            :
            cartItems.map((item, id) =>
              <li key={id}>
                <div className="cart-image">
                  <img src={item.Slika} alt="product" />
                </div>
                <div className="cart-name mb-3">
                  <div>
                    <Link to={"/proizvod/" + item._id}>
                      {item.Naziv}
                    </Link>

                  </div>
                  <div>
                    Broj proizvoda:
                  <select className="mr-3 my-3" value={item.qty} onChange={(e) => dispatch(updateCartItemQty(item._id, e.target.value))}>
                      {[...Array(item.Lager).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>

                    <button type="button" className="button" onClick={() => removeFromCartHandler(item._id)} >
                      Izbrisi
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  {item.Cena} rsd
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3 className="mb-5">
        Ukupno ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} proizvoda):
        <span className="float-right">
          {cartItems.reduce((a, c) => a + c.Cena * c.qty, 0).toFixed(2)} rsd
        </span>
      </h3>
      {formSubmitted && !validForm && <p className="error-text">Potrebno je popuniti sva obavezna polja kako biste narucili proizvod(e).</p>}
      <div className="form-modal">
          {/*<label htmlFor="name">Ime</label>*/}
          <input
              placeholder="Ime (obavezno)"
              type="text"
              name="name"
              value={name}
              id="name"
              className={`${formSubmitted && !name ? 'not-valid' : ''}`}
              onChange={(e) => setName(e.target.value)}
          />
          {/*<label htmlFor="sureName">Prezime</label>*/}
          <input
              placeholder="Prezime (obavezno)"
              type="text"
              name="lastName"
              value={lastName}
              id="lastName"
              className={`${formSubmitted && !lastName ? 'not-valid' : ''}`}
              onChange={(e) => setLastName(e.target.value)}
          />
        {/*<label htmlFor="phone">Broj telefona</label>*/}
        <input
            placeholder="Broj telefona (obavezno)"
            type="text"
            name="phone"
            value={phone}
            id="phone"
            className={`${formSubmitted && !phone ? 'not-valid' : ''}`}
            onChange={(e) => setPhone(e.target.value)}
        />
          {/*<label htmlFor="address">Adresa</label>*/}
          <input
              placeholder="Adresa (obavezno)"
              type="text"
              name="address"
              value={address}
              id="address"
              className={`${formSubmitted && !address ? 'not-valid' : ''}`}
              onChange={(e) => setAddress(e.target.value)}
          />
          {/*<label htmlFor="city">Grad</label>*/}
          <input
              placeholder="Grad (obavezno)"
              type="text"
              name="city"
              value={city}
              id="city"
              className={`${formSubmitted && !city ? 'not-valid' : ''}`}
              onChange={(e) => setCity(e.target.value)}
          />
          {/*<label htmlFor="email">E mail</label>*/}
          <input
              placeholder="E-mail (obavezno)"
              type="mail"
              name="email"
              value={email}
              id="email"
              className={`${formSubmitted && !email ? 'not-valid' : ''}`}
              onChange={(e) => setEmail(e.target.value)}
          />
        <textarea
            style={{padding: "10px"}}
            placeholder="Napomena..."
            name="note"
            value={note}
            id="note"
            className="w-100"
            rows={4}
            onChange={(e) => setNote(e.target.value)}
        ></textarea>

      </div>
      {apiError && <p className="error-text mt-5">Doslo je do greske prilikom narucivanja, pokusajte ponovo.</p>}
      {apiSuccess && <p className="success-text mt-5">Uspesno ste porucili proizvod(e). Broj porudzbine: <i>{order._id}</i>. Proverite vas mail. <br/>
        <span>
          Redirekcija na pocetnu stranu za: 10s
        </span>
      </p>}
      <button onClick={checkoutHandler} className={`${!cartItems.length ? 'btn-disabled' : ''} button primary full-width mt-5`} disabled={!cartItems.length}>
        {apiStarted && <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>}
        Naruci
      </button>

    </div>

  </div>
}

export default CartScreen;