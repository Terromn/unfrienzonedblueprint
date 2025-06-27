import React, { useState, useCallback, useMemo } from 'react';

interface PurchaseFormProps {
  onPurchaseSuccess: (data: { email: string; fullName: string }) => void;
  onPurchaseError: (error: Error) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = React.memo(({ onPurchaseSuccess, onPurchaseError }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API call to payment gateway
      console.log('Attempting purchase with:', { email, fullName });
      
      // Simulate a random success/failure for demonstration of error boundaries and circuit breakers
      const success = Math.random() > 0.1; // 90% success rate, 10% failure for testing

      if (success) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        console.log('Purchase successful!');
        onPurchaseSuccess({ email, fullName });
        alert('🎉 Thank you for your interest! In a real implementation, this would process your purchase.');
        setEmail('');
        setFullName('');
      } else {
        throw new Error('Payment processing failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Purchase error:', err);
      setError(err.message || 'An unexpected error occurred.');
      onPurchaseError(err);
    } finally {
      setLoading(false);
    }
  }, [email, fullName, onPurchaseSuccess, onPurchaseError]);

  const isFormValid = useMemo(() => email.length > 5 && fullName.length > 3, [email, fullName]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-gray-900 dark:text-white shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Get Instant Access</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Secure checkout • 60-day guarantee
        </p>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            id="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-yellow focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
          <input 
            type="text" 
            id="fullName"
            required
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-yellow focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full btn-primary text-lg py-4 mt-6"
          disabled={loading || !isFormValid}
        >
          {loading ? 'Processing...' : '🔒 Get Instant Access - $47'}
        </button>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
            </svg>
            Secure SSL Encryption
          </div>
          <p>We accept all major credit cards and PayPal</p>
        </div>
      </form>
    </div>
  );
});

export default PurchaseForm; 