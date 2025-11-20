import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      const trxref = searchParams.get('trxref');

      if (!reference && !trxref) {
        setVerificationStatus('error');
        setMessage('No payment reference found. Please check your email for confirmation.');
        return;
      }

      const paymentReference = reference || trxref;

      try {
        console.log('🔍 Verifying payment with reference:', paymentReference);
        const response = await paymentService.verifyPaystackPayment(paymentReference);
        
        if (response.data.status === 'success') {
          setVerificationStatus('success');
          setMessage('Payment completed successfully! Your tickets have been booked.');
          setPaymentData(response.data);
          
          // Here you would typically:
          // 1. Update ticket inventory in your database
          // 2. Generate and send tickets via email
          // 3. Update order status
          
          console.log('✅ Payment successful:', response.data);
          
          // Redirect to tickets page after 5 seconds
          setTimeout(() => {
            navigate('/my-tickets');
          }, 5000);
        } else {
          setVerificationStatus('error');
          setMessage('Payment verification failed. Please contact support with your reference: ' + paymentReference);
        }
      } catch (error) {
        console.error('❌ Verification error:', error);
        setVerificationStatus('error');
        setMessage('Error verifying payment. Please check your email for confirmation or contact support.');
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
            
            {paymentData && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4 text-left">
                <h4 className="font-semibold mb-2">Payment Details:</h4>
                <p className="text-sm"><strong>Amount:</strong> ₦{(paymentData.amount / 100).toLocaleString()}</p>
                <p className="text-sm"><strong>Reference:</strong> {paymentData.reference}</p>
                <p className="text-sm"><strong>Date:</strong> {new Date(paymentData.paid_at).toLocaleString()}</p>
              </div>
            )}
            
            <div className="text-sm text-gray-500 mt-4">
              Redirecting to your tickets...
            </div>
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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