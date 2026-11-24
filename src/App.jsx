import React, { useEffect, useState } from 'react';

// Add the team's WhatsApp number with country code (digits only) to receive enquiries directly.
const WHATSAPP_NUMBER = '918792100629';

const services = [
  { id: 's1', img: 'transformation-7.jpeg', title: '100 Days Challenge', duration: '100 days', text: '100 focused days. Real discipline.' },
  { id: 's2', img: 'transformation-6.jpeg', title: '60 Days Transformation', duration: '60 days', text: 'A visible body change in 60 days.' },
  { id: 's3', img: 'transformation-5.jpeg', title: '90 Days Challenge', duration: '90 days', text: '90 days of focused training and diet.' },
  { id: 's4', img: 'transformation-4.jpeg', title: '60 Days Transformation', duration: '60 days', text: 'Train, eat right, see results.' },
  { id: 's5', img: 'transformation-3.jpeg', title: 'Over Fat Loss in 60 Days', duration: '60 days', text: 'Lose stubborn fat in 60 days.' },
  { id: 's6', img: 'transformation-2.jpeg', title: '90 Days Transformation', duration: '90 days', text: 'Strength, fat loss and confidence.' },
  { id: 's7', img: 'transformation-1.jpeg', title: '30 Days Transformation', duration: '30 days', text: 'Kickstart your change in 30 days.' },
  { id: 's8', img: 'transformation-8.jpeg', title: 'Muscle Gain in 6 Months', duration: '6 months', text: 'Build lean muscle in 6 months.' },
  { id: 's9', img: 'transformation-9.jpeg', title: 'Over Fat Loss & Muscle Gain in 6 Months', duration: '6 months', text: 'Lose fat and build muscle together.' },
];

function Brand() {
  return (
    <a className="brand" href="#top"><span className="brand-mark">V</span><span className="brand-text"><span>VYOMCUTS</span><small className="brand-sub">Online Coaching</small></span></a>
  );
}

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    if (!selectedService) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') setSelectedService(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedService]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || !selectedService) return;
    if (form.elements.website.value) return;
    const data = new FormData(form);
    const message = `Hello Team Vyomcuts,\n\nI would like to start online coaching.\n\nFull Name: ${data.get('full_name')}\nAge: ${data.get('age')}\nGender: ${data.get('gender')}\nCountry: ${data.get('country')}\nCity: ${data.get('city')}\nProfession: ${data.get('profession')}\nInstagram: ${data.get('instagram') || 'N/A'}\nHeight: ${data.get('height')}\nWeight: ${data.get('weight')}\nPhone: ${data.get('phone_number')}\nEmail: ${data.get('email')}\nFood Preference: ${data.get('food')}\nFitness Goal: ${selectedService.title}\nTraining Experience: ${data.get('experience')}\n\nI will send my Front, Side and Back physique photos here.\n\nThank you.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    const w = window.open(url, '_blank');
    if (w) w.opener = null;
    setSubmitted(true);
    form.reset();
  }

  return (
    <>
      <header className="site-header" id="top"><Brand /><nav><a href="#services" className="nav-cta">View services<span>→</span></a></nav></header>
      <main>
        <section className="intro">
          <div className="intro-inner">
            <div className="intro-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> ONLINE COACHING</p>
              <h1>Your transformation<br /><em>starts today.</em></h1>
              <p className="intro-text">Fat loss, muscle gain or confidence — we guide you every step. Pick your goal to begin.</p>
              <a className="button" href="#services">Choose your goal <span>↓</span></a>
            </div>
            <div className="intro-photo"><img src={`${import.meta.env.BASE_URL}hero.png`} alt="Vyomcuts coach flexing" /></div>
          </div>
        </section>

        <section className="services section-wrap" id="services">
          <div className="service-grid">{services.map((s) => (
            <button type="button" className="service-card" key={s.id} onClick={() => { setSelectedService(s); setSubmitted(false); setWhatsappUrl(''); }} aria-label={`Select ${s.title}`}>
              <span className="service-photo"><img src={`${import.meta.env.BASE_URL}${s.img}`} alt={s.title} loading="lazy" /></span>
              <strong>{s.title}</strong>
              <span className="service-text">{s.text}</span>
              <span className="service-meta"><span className="chip">{s.duration}</span><span className="service-select">Select &amp; enquire <i>→</i></span></span>
            </button>
          ))}</div>
        </section>


        {selectedService && (
          <div className="enquiry-modal" role="dialog" aria-modal="true" aria-label={`Enquiry for ${selectedService.title}`} onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedService(null); }}>
            <div className="enquiry-sheet">
              <button type="button" className="enquiry-close" onClick={() => setSelectedService(null)} aria-label="Close enquiry">×</button>
              {submitted ? (
                <div className="enquiry-success" role="status">
                  <div className="success-mark">✓</div>
                  <p className="eyebrow">ENQUIRY READY</p>
                  <h3>Your enquiry is ready.</h3>
                  <p>WhatsApp is ready with your details. Press Send there to message the team. If it did not open, use the button below.</p>
                  <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Continue to WhatsApp <span>↗</span></a>
                  <button className="modal-back" type="button" onClick={() => setSubmitted(false)}>Back to form</button>
                </div>
              ) : (
                <>
                  <div className="form-heading"><div><span className="form-kicker">VYOMCUTS / ONLINE COACHING</span><h3>Transform with Vyomcuts</h3></div><span className="required-note">* REQUIRED</span></div>
                  <div className="selected-program"><span>FITNESS GOAL</span><strong>{selectedService.title}</strong></div>
                  <p className="form-intro">Fill out this form honestly so we can create a personalized plan for your goals.</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                      <label>Full name <span>*</span><input name="full_name" type="text" autoComplete="name" minLength="2" maxLength="120" required /></label>
                      <label>Age <span>*</span><input name="age" type="number" min="10" max="99" required /></label>
                      <label>Gender <span>*</span><select name="gender" defaultValue="" required><option value="" disabled>Select</option><option>Male</option><option>Female</option></select></label>
                      <label>Country of current residence <span>*</span><input name="country" type="text" autoComplete="country-name" defaultValue="India" required /></label>
                      <label>Place / City <span>*</span><input name="city" type="text" autoComplete="address-level2" required /></label>
                      <label>Profession / occupation <span>*</span><input name="profession" type="text" maxLength="120" required /></label>
                      <label>Instagram ID <small>(optional)</small><input name="instagram" type="text" placeholder="@username" maxLength="60" /></label>
                      <label>Height <span>*</span><input name="height" type="text" placeholder="e.g. 170 cm" maxLength="20" required /></label>
                      <label>Weight <span>*</span><input name="weight" type="text" placeholder="e.g. 70 kg" maxLength="20" required /></label>
                      <label>Phone number <span>*</span><input name="phone_number" type="tel" placeholder="+91 98765 43210" autoComplete="tel" pattern="\+?[0-9\s()\-]{7,18}" required /></label>
                      <label>Email address <span>*</span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength="254" required /></label>
                      <label>Food preference <span>*</span><select name="food" defaultValue="" required><option value="" disabled>Select</option><option>Veg</option><option>Non-veg</option></select></label>
                      <label>Training experience <span>*</span><select name="experience" defaultValue="" required><option value="" disabled>Select</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
                    </div>
                    <p className="photo-note">After submitting, please send your current <b>Front, Side and Back</b> physique photos on WhatsApp.</p>
                    <label className="honeypot" aria-hidden="true">Website<input name="website" type="text" tabIndex="-1" autoComplete="off" /></label>
                    <label className="consent"><input type="checkbox" name="consent_given" required /><span>I agree to share my information with Team Vyomcuts for coaching and follow-up. <b>*</b></span></label>
                    <button type="submit" className="button submit-button">Submit &amp; continue to WhatsApp <span>↗</span></button>
                    <p className="submit-note">WhatsApp opens with a prepared message; press Send there to contact the team.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer"><Brand /><span>VYOMCUTS · ONLINE COACHING</span><a href="#top">BACK TO TOP ↑</a></footer>
    </>
  );
}
