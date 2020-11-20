import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    console.log(cartItems);
  }, []);

  const checkoutHandler = () => {
    return null;
    props.history.push("/signin?redirect=shipping");
  }

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
                    <Link to={"/product/" + item._id}>
                      {item.Naziv}
                    </Link>

                  </div>
                  <div>
                    Broj proizvoda:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.Lager).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>

                    <button type="button" className="button ml-3" onClick={() => removeFromCartHandler(item._id)} >
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
      <h3>
        Ukupno ({cartItems.reduce((a, c) => a + c.qty, 0)} proizvoda): <br/>
        {cartItems.reduce((a, c) => a + c.Cena * c.qty, 0)} rsd
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width mt-5" disabled={cartItems.length === 0}>
        Odradi Kupovinu
      </button>

    </div>

  </div>
}

export default CartScreen;