import { MODIFY_CART, CLEAN_CART } from "../actions/cart.actions";

let localCart: any[] = [];
const storedCart = window.localStorage.getItem("metalibaba");
if (storedCart) {
  localCart = JSON.parse(storedCart);
} else {
    localCart = []
}

const calculateTotalPrice = (cart:any) => {
    let priceTotal = 0

    for (let i = 0; i < cart.length; i++) {
        let total = parseFloat(cart[i].price) * parseInt(cart[i].quantityInCart)
        priceTotal += total
    }

    return priceTotal
}

let totalPrice = calculateTotalPrice(localCart)

const initialState = {
    cart: localCart,
    totalPrice: totalPrice
}

export const cartReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case MODIFY_CART:
            let totalPrice = calculateTotalPrice(action.payload)

            return { cart : action.payload, totalPrice: totalPrice}
        
        case CLEAN_CART:
            return {cart: [], totalPrice: 0}
        
        default: 
            return state
    }
}