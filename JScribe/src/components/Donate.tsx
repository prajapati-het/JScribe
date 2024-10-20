import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from './ui/button';

function AlertModal({ message, onClose }) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} // Close when clicking on the backdrop
        >
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
            >
                <iframe
                    title="Alert Animation"
                    src="https://lottie.host/embed/b92139d9-8e92-44f2-9879-8668f6801caa/MLeDMmZI3N.lottie"
                    className="w-full h-24 mb-4"
                ></iframe>
                <p className="text-center text-gray-900 dark:text-gray-100">{message}</p>
            </div>
        </div>
    );
}

export default function Donate() {
    const [paymentStatus, setPaymentStatus] = useState('');
    const [amount, setAmount] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        
        if (status) {
            setPaymentStatus(status);
        }
    }, [location]);

    async function handlePayment() {
        const publisherKey = "pk_test_51PNFOSB6EmEevP6dAdGycVBJv461SEe2bh9wpjF8wiD3U7ZuOnjgY42qOVNBx7TGa9YRDXt6OYOWStVh9INkNsHg00Pm9UAbxn";
        if (!publisherKey) {
            console.error("Missing Stripe publishable key.");
            return;
        }
    
        if (!amount || isNaN(Number(amount)) || !Number.isInteger(Number(amount)) || Number(amount) <= 0) {
            setShowAlert(true);
            return;
        }
    
        const stripe = await loadStripe(publisherKey);
        if (!stripe) {
            console.error("Stripe initialization failed.");
            return;
        }
    
        const response = await fetch("http://localhost:4000/api/create-donate-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: Number(amount),
            }),
        });
    
        if (!response.ok) {
            console.error("Failed to create payment session.");
            return;
        }
    
        const session = await response.json();
    
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    
        if (result.error) {
            console.error(result.error.message);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Make a Donation</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    placeholder="Enter donation amount (e.g., 10)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button onClick={handlePayment} variant="secondary" className="w-full">Donate Now</Button>
            {paymentStatus === 'success' && (
                <p className="text-green-500 dark:text-green-400 mt-4">Your payment was successful. Thank you for your donation!</p>
            )}
            {paymentStatus === 'canceled' && (
                <p className="text-red-500 dark:text-red-400 mt-4">Payment was canceled. Please try again.</p>
            )}
            {showAlert && (
                <AlertModal
                    message="Enter a valid amount"
                    onClose={() => setShowAlert(false)}
                />
            )}
        </div>
    );
}
