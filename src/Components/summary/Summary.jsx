import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiFillDelete } from 'react-icons/ai';
import './summary.scss';

const Summary = () => {
    const { cartItems, removeFromCart, calculateTotal, clearCart } = useCart();
    const [editMode, setEditMode] = useState(null);
    const [editedDetails, setEditedDetails] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const [mpesaNumber, setMpesaNumber] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    const handleEdit = (id) => {
        setEditMode(id);
        setEditedDetails({
            ...cartItems.find(item => item.id === id),
            ...editedDetails
        });
    };

    const handleSave = (id) => {
        setEditMode(null);
        // In a real app, you would update the cart items here
    };

    const handleInputChange = (id, field, value) => {
        setEditedDetails({
            ...editedDetails,
            [field]: value
        });
    };

    const handleCardChange = (field, value) => {
        setCardDetails({
            ...cardDetails,
            [field]: value
        });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        if (paymentMethod === 'mpesa' && !mpesaNumber) {
            alert('Please enter your M-Pesa number');
            return;
        }
        if (paymentMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
            alert('Please complete all card details');
            return;
        }
        
        alert(`Payment of $${calculateTotal()} processed successfully!`);
        clearCart();
    };

    return (
        <section className="summary container section">
            <div className="secTitle">
                <h3 className="title">Booking Summary</h3>
                <p className="subtitle">Review your booking details before payment</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="emptySummary">
                    <p>Your booking summary is empty. Add some destinations to your cart first!</p>
                    <a href="/kenyan-holidays" className="btn">Browse Kenyan Holidays</a>
                    <a href="/international-holidays" className="btn">Browse International Holidays</a>
                </div>
            ) : (
                <div className="summaryContent">
                    <div className="bookingsList">
                        {cartItems.map(item => (
                            <div key={item.id} className="bookingItem">
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
                                    
                                    {editMode === item.id ? (
                                        <div className="editForm">
                                            <div className="formGroup">
                                                <label>Travel Date:</label>
                                                <input 
                                                    type="date" 
                                                    value={editedDetails.travelDate || ''}
                                                    onChange={(e) => handleInputChange(item.id, 'travelDate', e.target.value)}
                                                />
                                            </div>
                                            <div className="formGroup">
                                                <label>Return Date:</label>
                                                <input 
                                                    type="date" 
                                                    value={editedDetails.returnDate || ''}
                                                    onChange={(e) => handleInputChange(item.id, 'returnDate', e.target.value)}
                                                />
                                            </div>
                                            <div className="formGroup">
                                                <label>Number of People:</label>
                                                <input 
                                                    type="number" 
                                                    min="1"
                                                    value={editedDetails.people || ''}
                                                    onChange={(e) => handleInputChange(item.id, 'people', e.target.value)}
                                                />
                                            </div>
                                            <div className="formActions">
                                                <button 
                                                    className="btn saveBtn"
                                                    onClick={() => handleSave(item.id)}
                                                >
                                                    Save Changes
                                                </button>
                                                <button 
                                                    className="btn cancelBtn"
                                                    onClick={() => setEditMode(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bookingInfo">
                                            <p><strong>Travel Date:</strong> {item.travelDate || 'Not set'}</p>
                                            <p><strong>Return Date:</strong> {item.returnDate || 'Not set'}</p>
                                            <p><strong>People:</strong> {item.people || 'Not set'}</p>
                                            <div className="itemActions">
                                                <button 
                                                    className="btn editBtn"
                                                    onClick={() => handleEdit(item.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn removeBtn"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <AiFillDelete className="icon" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="paymentSection">
                        <div className="summaryCard">
                            <h4>Order Summary</h4>
                            
                            <div className="summaryDetails">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summaryItem">
                                        <span>{item.destTitle || item.packageTitle}</span>
                                        <span>{item.fees}</span>
                                    </div>
                                ))}
                                
                                <div className="summaryTotal">
                                    <span>Total:</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>

                            <form className="paymentForm" onSubmit={handlePayment}>
                                <h4>Payment Method</h4>
                                
                                <div className="paymentOptions">
                                    <label className={`paymentOption ${paymentMethod === 'mpesa' ? 'active' : ''}`}>
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="mpesa" 
                                            checked={paymentMethod === 'mpesa'}
                                            onChange={() => setPaymentMethod('mpesa')}
                                        />
                                        <span>M-Pesa</span>
                                    </label>
                                    
                                    <label className={`paymentOption ${paymentMethod === 'card' ? 'active' : ''}`}>
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="card" 
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                        />
                                        <span>Credit/Debit Card</span>
                                    </label>
                                </div>
                                
                                {paymentMethod === 'mpesa' && (
                                    <div className="mpesaDetails">
                                        <div className="formGroup">
                                            <label>M-Pesa Phone Number (Kenyan format: 07XXXXXXXX)</label>
                                            <input 
                                                type="tel" 
                                                placeholder="07XXXXXXXX"
                                                pattern="[0-9]{10}"
                                                value={mpesaNumber}
                                                onChange={(e) => setMpesaNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                {paymentMethod === 'card' && (
                                    <div className="cardDetails">
                                        <div className="formGroup">
                                            <label>Card Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="1234 5678 9012 3456"
                                                value={cardDetails.cardNumber}
                                                onChange={(e) => handleCardChange('cardNumber', e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="formRow">
                                            <div className="formGroup">
                                                <label>Expiry Date</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="MM/YY"
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => handleCardChange('expiry', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="formGroup">
                                                <label>CVV</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="123"
                                                    value={cardDetails.cvv}
                                                    onChange={(e) => handleCardChange('cvv', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="formGroup">
                                            <label>Name on Card</label>
                                            <input 
                                                type="text" 
                                                placeholder="John Doe"
                                                value={cardDetails.name}
                                                onChange={(e) => handleCardChange('name', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                <button type="submit" className="btn payBtn">
                                    Pay ${calculateTotal()}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Summary;