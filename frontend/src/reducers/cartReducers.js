import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CLEAR_CART, UPDATE_CART_ITEM_QTY} from "../constants/cartConstants";
import Cookie from "js-cookie";

function cartReducer(state = {cartItems: [], shipping: {}, payment: {}}, action) {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x._id === item._id);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return {cartItems: [...state.cartItems, item]};
        case UPDATE_CART_ITEM_QTY:
            let data = action.payload;
            let findProduct = state.cartItems.find(item => item._id === data.productId);

            if (findProduct) {
                findProduct.qty = data.qty;
            }
            Cookie.set("cartItems", JSON.stringify(state.cartItems));
            return {...state, cartItems: [...state.cartItems]};
        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x => x._id !== action.payload)};
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload};
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload};
        case CLEAR_CART:
            return {cartItems: [], shipping: {}, payment: {}};
        default:
            return state
    }
}

export {cartReducer}