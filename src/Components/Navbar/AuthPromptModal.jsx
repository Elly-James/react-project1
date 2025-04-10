import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import AppleLogin from './AppleLogin.jsx';
import './AuthPromptModal.scss';

const AuthPromptModal = ({ show, action, onClose }) => {
    if (!show) return null;

    const actionText = {
        'addToCart': 'add items to your cart',
        'proceedToCheckout': 'proceed to checkout',
        'viewCart': 'view your cart'
    }[action] || 'perform this action';

    return (
        <div className="authModal">
            <div className="modalContent">
                <h3>Login Required</h3>
                <p>You need to login to {actionText}.</p>
                
                <div className="authProviders">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            // Handle Google login success
                            onClose();
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />
                    <AppleLogin onSuccess={onClose} />
                </div>
                
                <button className="closeModal" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default AuthPromptModal;