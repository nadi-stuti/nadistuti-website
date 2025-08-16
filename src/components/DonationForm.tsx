import React, { useState } from 'react';
import { CreditCard, Heart, Users, Zap } from 'lucide-react';

interface DonationOption {
  amount: number;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const DonationForm: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [isProcessing, setIsProcessing] = useState(false);

  const donationOptions: DonationOption[] = [
    {
      amount: 50,
      label: '₹50',
      description: 'Supports basic content maintenance',
      icon: <Heart className="w-4 h-4" />
    },
    {
      amount: 100,
      label: '₹100',
      description: 'Helps with server costs',
      icon: <Zap className="w-4 h-4" />
    },
    {
      amount: 500,
      label: '₹500',
      description: 'Funds new content development',
      icon: <Users className="w-4 h-4" />
    },
    {
      amount: 1000,
      label: '₹1000',
      description: 'Supports major feature development',
      icon: <CreditCard className="w-4 h-4" />
    }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value) || 0);
    }
  };

  const handleDonate = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      alert(`Thank you for your ${donationType} donation of ₹${selectedAmount}! This is a demo - no actual payment was processed.`);
      setIsProcessing(false);
    }, 2000);
  };

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Make a Donation</h2>
        <p className="text-gray-600">Choose your contribution amount and help preserve our cultural heritage</p>
      </div>

      {/* Donation Type Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-8 max-w-md mx-auto">
        <button
          onClick={() => setDonationType('one-time')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            donationType === 'one-time'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          One-time
        </button>
        <button
          onClick={() => setDonationType('monthly')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            donationType === 'monthly'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Donation Amount Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {donationOptions.map((option) => (
          <button
            key={option.amount}
            onClick={() => handleAmountSelect(option.amount)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedAmount === option.amount && !customAmount
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-gray-900">{option.label}</span>
              <div className="text-blue-500">{option.icon}</div>
            </div>
            <p className="text-xs text-gray-600">{option.description}</p>
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="mb-6">
        <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
          Or enter a custom amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <input
            id="custom-amount"
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter amount"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            min="1"
          />
        </div>
      </div>

      {/* Donation Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">
            {donationType === 'monthly' ? 'Monthly' : 'One-time'} donation:
          </span>
          <span className="text-2xl font-bold text-gray-900">₹{finalAmount}</span>
        </div>
        {donationType === 'monthly' && (
          <p className="text-sm text-gray-600">
            You'll be charged ₹{finalAmount} every month. You can cancel anytime.
          </p>
        )}
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['UPI', 'Card', 'Net Banking', 'Wallet'].map((method) => (
            <div
              key={method}
              className="p-3 border border-gray-200 rounded-lg text-center text-sm font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              {method}
            </div>
          ))}
        </div>
      </div>

      {/* Donate Button */}
      <button
        onClick={handleDonate}
        disabled={!finalAmount || finalAmount < 1 || isProcessing}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all transform ${
          !finalAmount || finalAmount < 1 || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Donate ₹${finalAmount} ${donationType === 'monthly' ? '/month' : ''}`
        )}
      </button>

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          Secure payment powered by Razorpay
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>

      {/* Tax Benefits */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-yellow-800">Tax Benefits Available</h4>
            <p className="text-xs text-yellow-700 mt-1">
              Donations to NadiStuti are eligible for tax deduction under Section 80G of the Income Tax Act. 
              You'll receive a donation receipt via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;