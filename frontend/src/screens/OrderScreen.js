import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }



  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="w-100 px-3 mb-4">
          <h3>Detalji porudzbine ID: {order._id}</h3>
        </div>
        <div className="placeorder-info">
          <div>
            <ul className="cart-list-container">

              {
                order.orderItems.length === 0 ?
                  <div>
                    Ova porudzbina nema selektovanih proizvoda.
          </div>
                  :
                  order.orderItems.map((item, index) =>
                    <li key={index}>
                      <div className="cart-image">
                        <img src={item.Slika} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.Naziv}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
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


        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <h2>Podaci:</h2>
            </li>
            <li>
              <div>Datum:</div>
              <div>{new Date(order.createdAt).toLocaleString()}</div>
            </li>
            <li>
              <div>Ime i prezime:</div>
              <div className="text-capitalize">{order.user?.fullName}</div>
            </li>
            <li>
              <div>E-mail:</div>
              <div>{order.user?.email}</div>
            </li>
            <li>
              <div>Adresa:</div>
              <div>{order.user?.address}</div>
            </li>
            <li>
              <div>Grad:</div>
              <div>{order.user?.city}</div>
            </li>
            <li>
              <div>Telefon:</div>
              <div>{order.user?.phone}</div>
            </li>
            <li>
              <div className="mr-3">Napomena:</div>
              <div>{order.user?.note}</div>
            </li>
            <li>
              <div>Ukupna cena:</div>
              <div>{order.priceSum} rsd</div>
            </li>

          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;