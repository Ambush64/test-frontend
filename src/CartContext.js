import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialCart = [];

export const CartContext = React.createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const { id, name, price } = action.payload;
            const existingProductIndex = state.findIndex(item => item.id === id);

            if (existingProductIndex !== -1) {
                const updatedCart = state.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                const newCartItem = { id, name, price, quantity: 1 };
                const newCart = [...state, newCartItem];
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }

        case 'REMOVE_FROM_CART':
            const productIdToRemove = action.payload;
            const updatedCart = state
                .map(item =>
                    item.id === productIdToRemove
                        ? {
                            ...item,
                            quantity: Math.max(1, item.quantity - 1), // Ensure quantity is at least 1
                        }
                        : item
                )
                .filter(item => item.quantity > 1); // Remove items with quantity 1

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;


        case 'INITIALIZE_CART':
            return action.payload;

        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            dispatch({ type: 'INITIALIZE_CART', payload: JSON.parse(savedCart) });
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
