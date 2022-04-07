import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants';


export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // If item is already in cart we need to create below
      const item = action.payload

      // console.log(state.cartItems);
      // if it exists
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
        }
      } else {
        // if it item doesnt exists in cart we push it into the arr
        return {
          ...state,
          // spread and add the new item
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== action.payload)
      }

    default:
      return state
  }
}