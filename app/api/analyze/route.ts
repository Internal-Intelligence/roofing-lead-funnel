'use client';

import { useState } from 'react';

export default function RoofAssessment() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("Grok 4.3 had an issue. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">REQUEST A FREE CONSULTATION</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-3xl shadow-xl">
        {/* Add all your form fields here (same as before) */}
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First name" className="p-3 border rounded-2xl" required />
          <input type="text" name="lastName" placeholder="Last name" className="p-3 border rounded-2xl" required />
        </div>
        
        {/* ... other fields ... */}
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-[#c2410c] text-white font-bold rounded-2xl"
        >
          {loading ? 'Analyzing...' : 'ANALYZE WITH GROK 4.3'}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-green-50 p-8 rounded-3xl">
          <div className="text-4xl font-bold text-green-700">{result.priceRange}</div>
          <div className="mt-4 text-lg">{result.summary}</div>
        </div>
      )}
    </div>
  );
}
