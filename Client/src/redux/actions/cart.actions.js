export const MODIFY_CART = "MODIFY_CART"
export const CLEAN_CART = "CLEAN_CART"

export const addToCart = (cart, newProduct, quantityAdded) => {
    return (dispatch) => {
        let same = cart.findIndex((cartIndexFound) => cartIndexFound.id === newProduct.id)
        if (same === -1) {
            newProduct.quantity = parseInt(quantityAdded)
            cart.push(newProduct)
        } else {
            cart[same].quantity += parseInt(quantityAdded)
        }
        let localCart = JSON.stringify(cart)
        window.localStorage.setItem("metalibaba", localCart)

        dispatch({
            type: MODIFY_CART,
            payload: cart,
        })
    }
}

export const deleteFromCart = (cart, product) => {
    return (dispatch) => {
        let newCart = cart.filter((filteredCart) => filteredCart.id !== product.id)
        dispatch({
            type: MODIFY_CART,
            payload: newCart,
        })
    }
}

export const cleanCart = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_CART,
            payload: null
        })
    }
}