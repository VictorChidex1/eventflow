// Environment configuration
export const env = {
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  paystackSecretKey: import.meta.env.VITE_PAYSTACK_SECRET_KEY,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
};

// Validate required environment variables
export const validateEnv = () => {
  const missingVars = [];
  
  if (!env.paystackPublicKey || env.paystackPublicKey.includes('your_paystack_test')) {
    missingVars.push('VITE_PAYSTACK_PUBLIC_KEY');
  }
  
  if (!env.paystackSecretKey || env.paystackSecretKey.includes('your_paystack_test')) {
    missingVars.push('VITE_PAYSTACK_SECRET_KEY');
  }
  
  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(', ')}`);
    console.warn('💰 Using mock payment service. Add Paystack keys to .env for real payments.');
    return false;
  }
  
  console.log('✅ All payment environment variables are set');
  return true;
};