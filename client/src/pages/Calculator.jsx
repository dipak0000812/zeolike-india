import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [savedResults, setSavedResults] = useState([]);

  useEffect(() => {
    const storedResults = localStorage.getItem('calculatorResults');
    if (storedResults) {
      setSavedResults(JSON.parse(storedResults));
    }
  }, []);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    const monthly = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const total = monthly * term;
    const interest = total - principal;
    setMonthlyPayment(monthly);
    setTotalPayment(total);
    setTotalInterest(interest);
    const result = { loanAmount, interestRate, loanTerm, monthlyPayment: monthly, totalPayment: total, totalInterest: interest, date: new Date().toISOString() };
    const updatedResults = [...savedResults, result];
    setSavedResults(updatedResults);
    localStorage.setItem('calculatorResults', JSON.stringify(updatedResults));
  };

  const shareResults = () => {
    const shareText = `Loan Amount: ₹${loanAmount}\nInterest Rate: ${interestRate}%\nLoan Term: ${loanTerm} years\nMonthly Payment: ₹${monthlyPayment.toFixed(2)}\nTotal Payment: ₹${totalPayment.toFixed(2)}\nTotal Interest: ₹${totalInterest.toFixed(2)}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Home Loan Calculator</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter loan amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter interest rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter loan term"
              />
            </div>
            <button
              onClick={calculateLoan}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate
            </button>
          </div>
          {monthlyPayment > 0 && (
            <div className="mt-6 space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Results</h2>
              <p className="text-gray-600">Monthly Payment: ₹{monthlyPayment.toFixed(2)}</p>
              <p className="text-gray-600">Total Payment: ₹{totalPayment.toFixed(2)}</p>
              <p className="text-gray-600">Total Interest: ₹{totalInterest.toFixed(2)}</p>
              <button
                onClick={shareResults}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Share Results
              </button>
            </div>
          )}
          {savedResults.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Saved Results</h2>
              <div className="space-y-2">
                {savedResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="text-gray-600">Loan Amount: ₹{result.loanAmount}</p>
                    <p className="text-gray-600">Interest Rate: {result.interestRate}%</p>
                    <p className="text-gray-600">Loan Term: {result.loanTerm} years</p>
                    <p className="text-gray-600">Monthly Payment: ₹{result.monthlyPayment.toFixed(2)}</p>
                    <p className="text-gray-600">Total Payment: ₹{result.totalPayment.toFixed(2)}</p>
                    <p className="text-gray-600">Total Interest: ₹{result.totalInterest.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">{new Date(result.date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator; 