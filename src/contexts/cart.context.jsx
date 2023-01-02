import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingProduct = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingProduct) {
        return cartItems.map((cartItem) => (
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        ))
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

const incrementCartItemCount = (cartItems, productToIncrement) => {
    return (
        cartItems.map((cartItem) => {
            return (
                cartItem.id === productToIncrement.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
        })
    );
}

const decrementCartItemCount = (cartItems, productToDecrement) => {
    return (
        cartItems.map((cartItem) => {
            if (cartItem.quantity <= 0) return { ...cartItem, quantity: 0 };
            return (
                cartItem.id === productToDecrement.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
        })
    );
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const incrementCount = (productToIncrement) => {
        setCartItems(incrementCartItemCount(cartItems, productToIncrement));
    }

    const decrementCount = (productToDecrement) => {
        setCartItems(decrementCartItemCount(cartItems, productToDecrement));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        cartItems,
        cartCount,
        incrementCount,
        decrementCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
