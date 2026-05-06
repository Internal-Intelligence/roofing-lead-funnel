'use client';

export default function RoofAssessment() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const button = form.querySelector('button') as HTMLButtonElement;
    const originalText = button.innerHTML;
    button.innerHTML = '🧠 Grok 4.3 analyzing...';
    button.disabled = true;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      // Show result
      const resultDiv = document.createElement('div');
      resultDiv.className = 'mt-8 bg-green-50 border border-green-200 rounded-3xl p-8';
      resultDiv.innerHTML = `
        <div class="text-3xl font-bold text-green-800 mb-4">✅ Grok 4.3 Analysis Complete</div>
        <div class="text-5xl font-bold text-green-700 mb-6">${data.priceRange}</div>
        <div class="text-lg text-slate-700">${data.summary}</div>
        
        <div class="mt-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-2xl">
          <p class="font-semibold text-orange-800">📧 Check your email shortly</p>
          <p class="text-orange-700">You'll receive a full report + link to book your <strong>FREE consultation</strong>.</p>
        </div>
      `;
      
      form.parentNode?.appendChild(resultDiv);
      resultDiv.scrollIntoView({ behavior: "smooth" });

    } catch (err) {
      alert("Grok 4.3 had an issue. Please try again.");
    }

    button.innerHTML = originalText;
    button.disabled = false;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl p-10">
          <div className="text-3xl font-bold mb-8">REQUEST A FREE CONSULTATION</div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First name *" className="p-3 border rounded-2xl" required />
              <input type="text" name="lastName" placeholder="Last name *" className="p-3 border rounded-2xl" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input type="email" name="email" placeholder="Email *" className="p-3 border rounded-2xl" required />
              <input type="tel" name="phone" placeholder="Phone *" className="p-3 border rounded-2xl" required />
            </div>
            
            <input type="text" name="address" placeholder="Project address (city, ZIP)" className="p-3 border rounded-2xl w-full" />
            
            <select name="projectType" className="p-3 border rounded-2xl w-full" required>
              <option value="">Project type *</option>
              <option value="Roof Replacement">Roof Replacement</option>
              <option value="Storm Damage Repair">Storm Damage Repair</option>
              <option value="Roof Repair">Roof Repair</option>
              <option value="Siding">Siding</option>
              <option value="Gutters">Gutters</option>
              <option value="Other">Other</option>
            </select>
            
            <textarea name="message" placeholder="Tell us about your project" className="p-3 border rounded-2xl w-full h-32"></textarea>
            
            <div>
              <label className="block text-sm font-medium mb-1">Upload Photos or PDF (recommended)</label>
              <input type="file" name="photos" multiple accept="image/*,.pdf" className="p-3 border rounded-2xl w-full" />
            </div>
            
            <button type="submit" className="w-full py-4 bg-[#c2410c] hover:bg-[#9f1239] text-white font-bold text-lg rounded-2xl transition-colors">
              ANALYZE WITH GROK 4.3
            </button>
            
            <p className="text-xs text-center text-slate-500">We respect your privacy. Your information will only be used to respond to your request.</p>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl shadow p-8">
            <div className="font-bold text-xl mb-6">GET IN TOUCH</div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <i className="fa-solid fa-phone text-[#c2410c] mt-1"></i>
                <div>
                  <div className="font-medium">(901) 555-0199</div>
                  <div className="text-sm text-slate-500">Mon–Fri 7am–6pm</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <i className="fa-solid fa-envelope text-[#c2410c] mt-1"></i>
                <div>info@neadinghomeservices.com</div>
              </div>
              <div className="flex items-start gap-4">
                <i className="fa-solid fa-map-marker-alt text-[#c2410c] mt-1"></i>
                <div>Bartlett, TN<br /><span className="text-sm text-slate-500">Greater Memphis service area</span></div>
              </div>
            </div>
          </div>

          <div className="bg-[#c2410c] text-white rounded-3xl p-8">
            <div className="font-bold text-2xl mb-4">EMERGENCY?</div>
            <div className="mb-5 text-sm">For urgent exterior or storm damage repairs, call us directly:</div>
            <a href="tel:9015550199" className="block w-full py-3.5 bg-black text-center rounded-2xl font-bold text-lg">(901) 555-0199</a>
          </div>
        </div>
      </div>
    </div>
  );
}
