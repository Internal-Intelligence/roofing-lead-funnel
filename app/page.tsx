'use client';

export default function RoofForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! (Grok 4.3 will be connected in next step)");
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">REQUEST A FREE CONSULTATION</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="First name *" className="p-3 border rounded-2xl" required />
          <input type="text" placeholder="Last name *" className="p-3 border rounded-2xl" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <input type="email" placeholder="Email *" className="p-3 border rounded-2xl" required />
          <input type="tel" placeholder="Phone *" className="p-3 border rounded-2xl" required />
        </div>
        
        <input type="text" placeholder="Project address" className="p-3 border rounded-2xl w-full" />
        
        <select className="p-3 border rounded-2xl w-full">
          <option>Project type *</option>
          <option>Roof Replacement</option>
          <option>Storm Damage Repair</option>
          <option>Roof Repair</option>
        </select>
        
        <textarea placeholder="Tell us about your project" className="p-3 border rounded-2xl w-full h-32"></textarea>
        
        <div>
          <label className="block text-sm font-medium mb-1">Upload Photos or PDF</label>
          <input type="file" multiple className="p-3 border rounded-2xl w-full" />
        </div>
        
        <button type="submit" className="w-full py-4 bg-[#c2410c] text-white font-bold rounded-2xl">
          ANALYZE WITH GROK 4.3
        </button>
      </form>
    </div>
  );
}
