import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('travel-cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('travel-user');
            return savedUser ? JSON.parse(savedUser) : null;
        }
        return null;
    });

    useEffect(() => {
        localStorage.setItem('travel-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('travel-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('travel-user');
        }
    }, [user]);

    const addToCart = (item) => {
        if (!cartItems.some(cartItem => cartItem.id === item.id)) {
            setCartItems([...cartItems, item]);
            return true;
        }
        return false;
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const updateCartItem = (id, updatedFields) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, ...updatedFields } : item
        ));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.fees.replace('$', '').replace(',', ''));
            return total + (price * (item.adults || 1) + (price * 0.5 * (item.children || 0)));
        }, 0);
    };

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    const requireAuth = (action) => {
        if (!user) {
            return { requiresAuth: true, action };
        }
        return { requiresAuth: false };
    };

    return (
        <CartContext.Provider 
            value={{ 
                cartItems,
                user,
                addToCart, 
                removeFromCart, 
                clearCart,
                updateCartItem,
                calculateTotal,
                cartCount: cartItems.length,
                loginUser,
                logoutUser,
                requireAuth
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

export default CartContext;