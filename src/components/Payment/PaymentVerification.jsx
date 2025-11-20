// src/components/Payment/PaymentVerification.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import { paymentTracker } from '../../utils/paymentTracker';

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  
  // REMOVED: const [paymentData, setPaymentData] = useState(null); <--- This was the cause

  useEffect(() => {
    const verifyPayment = async () => {
      // 1. Try getting reference from React Router params
      let reference = searchParams.get('reference');
      let trxref = searchParams.get('trxref');

      // 2. FALLBACK: Manually parse URL if React Router misses it
      if (!reference && !trxref) {
        const url = window.location.href;
        if (url.includes('reference=')) {
          reference = url.split('reference=')[1].split('&')[0];
        }
      }

      const paymentReference = reference || trxref;

      if (!paymentReference) {
        setVerificationStatus('error');
        setMessage('No payment reference found.');
        return;
      }

      try {
        const response = await paymentService.verifyPaystackPayment(paymentReference);
        
        if (response.data.status === 'success') {
          const successfulPayment = {
            eventId: response.data.metadata?.event_id || 'unknown',
            eventTitle: response.data.metadata?.event_title || 'Unknown Event',
            amount: response.data.amount / 100,
            reference: response.data.reference,
            tickets: response.data.metadata?.quantity || 1,
            customerEmail: response.data.customer?.email || 'unknown@example.com',
            customerName: response.data.metadata?.customer_name || 'Customer',
            paymentDate: response.data.paid_at || new Date().toISOString(),
            transactionId: response.data.id,
            currency: response.data.currency,
            paymentMethod: response.data.channel,
            status: response.data.status
          };

          paymentTracker.savePayment(successfulPayment);
          
          setVerificationStatus('success');
          setMessage('Payment completed successfully! Your tickets have been booked.');
          
          // REMOVED: setPaymentData(response.data); <--- usage removed here

          setTimeout(() => {
            navigate('/my-tickets');
          }, 3000);
        } else {
          setVerificationStatus('error');
          setMessage('Payment verification failed.');
        }
      } catch (error) {
        console.error('❌ Verification error:', error);
        setVerificationStatus('error');
        setMessage('Error verifying payment. Please try again.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {verificationStatus === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your payment...
            </p>
          </>
        )}

        {verificationStatus === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="text-sm text-gray-500 mt-4">
              Redirecting to tickets...
            </div>
            <button
              onClick={() => navigate('/my-tickets')}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              View My Tickets
            </button>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Payment Issue
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => navigate('/events')}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Events
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;