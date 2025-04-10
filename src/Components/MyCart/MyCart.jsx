import React, { useState } from 'react';
import './myCart.scss';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiFillDelete } from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import AuthPromptModal from '../Navbar/AuthPromptModal.jsx';

const MyCart = () => {
    const { 
        cartItems, 
        removeFromCart, 
        updateCartItem, 
        calculateTotal,
        user,
        requireAuth
    } = useCart();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleBookingChange = (id, field, value) => {
        updateCartItem(id, { [field]: value });
    };

    const handleProceedToSummary = () => {
        const authCheck = requireAuth('proceedToCheckout');
        if (authCheck.requiresAuth) {
            setShowAuthModal(true);
            return;
        }

        // Check if all required fields are filled
        const incompleteBookings = cartItems.filter(item => {
            return !item.firstName || !item.lastName || !item.email || !item.phone || !item.citizenship;
        });

        if (incompleteBookings.length > 0) {
            alert('Please complete all booking forms before proceeding');
            return;
        }

        navigate('/summary');
    };

    return (
        <section className="myCart container section">
            <div className="secTitle">
                <h3 className="title">My Cart</h3>
                <p className="subtitle">Complete your booking details</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <p>Your cart is empty. Select some destinations to get started!</p>
                    <a href="/kenyan-holidays" className="btn">Browse Kenyan Holidays</a>
                    <a href="/international-holidays" className="btn">Browse International Holidays</a>
                </div>
            ) : (
                <div className="cartContent">
                    <div className="cartItems">
                        {cartItems.map(item => (
                            <div key={item.id} className="cartItem">
                                <div className="itemImage">
                                    <img src={item.imgSrc} alt={item.destTitle || item.packageTitle} />
                                </div>
                                
                                <div className="itemDetails">
                                    <h4>{item.destTitle || item.packageTitle}</h4>
                                    <span className="location flex">
                                        <HiOutlineLocationMarker className="icon" />
                                        <span>{item.location || item.locations?.join(', ')}</span>
                                    </span>
                                    
                                    {item.duration && <p className="duration">{item.duration}</p>}
                                    
                                    <p className="price">{item.fees}</p>
                                    <p className="description">{item.description}</p>
                                    
                                    <button 
                                        className="btn removeBtn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <AiFillDelete className="icon" /> Remove
                                    </button>
                                </div>
                                
                                <div className="bookingForm">
                                    <h5>Book This {item.packageTitle ? 'Package' : 'Destination'}</h5>
                                    <form>
                                        <div className="formRow">
                                            <div className="formGroup">
                                                <label>First Name *</label>
                                                <input 
                                                    type="text" 
                                                    value={item.firstName || ''}
                                                    onChange={(e) => handleBookingChange(item.id, 'firstName', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="formGroup">
                                                <label>Last Name *</label>
                                                <input 
                                                    type="text" 
                                                    value={item.lastName || ''}
                                                    onChange={(e) => handleBookingChange(item.id, 'lastName', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="formRow">
                                            <div className="formGroup">
                                                <label>Email *</label>
                                                <input 
                                                    type="email" 
                                                    value={item.email || ''}
                                                    onChange={(e) => handleBookingChange(item.id, 'email', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="formGroup">
                                                <label>Phone Number *</label>
                                                <input 
                                                    type="tel" 
                                                    value={item.phone || ''}
                                                    onChange={(e) => handleBookingChange(item.id, 'phone', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="formRow">
                                            <div className="formGroup">
                                                <label>Citizenship *</label>
                                                <select
                                                    value={item.citizenship || ''}
                                                    onChange={(e) => handleBookingChange(item.id, 'citizenship', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Country</option>
                                                    <option value="Kenya">Kenya</option>
                                                    <option value="USA">USA</option>
                                                    <option value="UK">United Kingdom</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="formRow">
                                            <div className="formGroup">
                                                <label>Number of Adults</label>
                                                <input 
                                                    type="number" 
                                                    min="1"
                                                    value={item.adults || 1}
                                                    onChange={(e) => handleBookingChange(item.id, 'adults', parseInt(e.target.value))}
                                                />
                                            </div>
                                            <div className="formGroup">
                                                <label>Number of Children</label>
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    value={item.children || 0}
                                                    onChange={(e) => handleBookingChange(item.id, 'children', parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="formGroup">
                                            <label>Special Requests</label>
                                            <textarea 
                                                value={item.requests || ''}
                                                onChange={(e) => handleBookingChange(item.id, 'requests', e.target.value)}
                                                placeholder="Any special requirements or notes"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cartSummary">
                        <div className="summaryCard">
                            <h4>Order Summary</h4>
                            
                            <div className="summaryDetails">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summaryItem">
                                        <span>{item.destTitle || item.packageTitle}</span>
                                        <span>
                                            {item.fees} 
                                            {item.adults > 1 ? ` × ${item.adults}` : ''}
                                            {item.children > 0 ? ` + ${item.children} child` : ''}
                                        </span>
                                    </div>
                                ))}
                                
                                <div className="summaryTotal">
                                    <span>Total:</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>

                            <button 
                                className="btn proceedBtn"
                                onClick={handleProceedToSummary}
                            >
                                Proceed to Summary
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AuthPromptModal 
                show={showAuthModal}
                action="proceedToCheckout"
                onClose={() => setShowAuthModal(false)}
            />
        </section>
    );
};

export default MyCart;