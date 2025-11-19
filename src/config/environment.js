// Environment configuration
export const env = {
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
};

// Validate required environment variables
export const validateEnv = () => {
  const missingVars = [];
  
  if (!env.paystackPublicKey) {
    missingVars.push('VITE_PAYSTACK_PUBLIC_KEY');
  }
  
  if (!env.stripePublicKey) {
    missingVars.push('VITE_STRIPE_PUBLIC_KEY');
  }
  
  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
    console.warn('Using test mode. Payments will not work in production without valid keys.');
  }
  
  return missingVars.length === 0;
};