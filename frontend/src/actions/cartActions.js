import Axios from "axios";
import Cookie from "js-cookie";
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CLEAR_CART, UPDATE_CART_ITEM_QTY} from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM, payload: {
        ...data,
        Lager:  data.Lager && !isNaN(data.Lager) ? Number(data.Lager) : Number(data.Lager.match(/\d+/)[0]),
        qty
      }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

  } catch (error) {

  }
};
const updateCartItemQty = (productId, qty) => (dispatch) => {
  dispatch({
    type: UPDATE_CART_ITEM_QTY,
    payload: {
      productId, qty
    }
  })
};
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
const clearCart = () => (dispatch) => {
  Cookie.remove("cartItems");
  dispatch({type: CLEAR_CART})
};
export { addToCart,
  updateCartItemQty,
  removeFromCart,
  saveShipping,
  savePayment,
  clearCart }