import React, { useState, useEffect } from 'react'

//Appointment request form, location + symptoms are used to set priority

const badgeClass = {
  Routine: 'badge',
  Soon: 'badge badge_soon',
  Urgent: 'badge badge_urgent',
};

export default function Appointment() {
  // Load saved requests from localStorage if they exist
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('appointment_requests');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage in sync with our state
  useEffect(() => {
    localStorage.setItem('appointment_requests', JSON.stringify(requests));
  }, [requests]);

  const [name, setName] = useState('');
  const [zip, setZip] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [priority, setPriority] = useState('Routine');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!name.trim() || !zip.trim() || !symptoms.trim()) return;

    const newRequest = {
      id: Date.now(),
      name,
      zip,
      symptoms,
      priority,
      date: new Date().toLocaleDateString()
    };

    setRequests([newRequest, ...requests]);

    // Reset
    setName('');
    setZip('');
    setSymptoms('');
    setPriority('Routine');
  };

  return (
    <main className="page">
      <div className="page_header">
        <div>
          <h2>Schedule an Appointment</h2>
          <p>Tell us where you are and how you're feeling, and we'll match you with a local provider.</p>
        </div>
      </div>

      <form className="card form" onSubmit={handleSubmit}>
        <div className="form_row">
          <div className="field">
            <label htmlFor="appt-name">Full Name</label>
            <input id="appt-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="appt-zip">ZIP Code</label>
            <input id="appt-zip" type="text" inputMode="numeric" pattern="[0-9]{5}" title="5 digit ZIP code" value={zip} onChange={(e) => setZip(e.target.value)} required />
          </div>
        </div>

        <div className="field">
          <label htmlFor="appt-symptoms">Symptoms</label>
          <textarea id="appt-symptoms" rows="4" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Describe what you are experiencing..." required />
        </div>

        <div className="field">
          <label htmlFor="appt-priority">How urgent is this?</label>
          <select id="appt-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Routine">Routine</option>
            <option value="Soon">Soon (within a week)</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div className="form_actions">
          <button type="submit" className="btn">Request Appointment</button>
        </div>
      </form>

      <h3 className="section_title">Your Requests</h3>
      {requests.length === 0 ? (
        <p className="empty">No appointment requests yet.</p>
      ) : (
        <div className="card_grid">
          {requests.map((req) => (
            <article key={req.id} className="card entry">
              <div className="entry_top">
                <h3>{req.name}</h3>
                <span className={badgeClass[req.priority]}>{req.priority}</span>
              </div>
              <small>{req.date} · ZIP {req.zip}</small>
              <p>{req.symptoms}</p>
              <button className="btn_text" onClick={() => setRequests(requests.filter(r => r.id !== req.id))}>
                Cancel request
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
