import { useEffect } from 'react'
import { useLocation } from 'react-router';
import {ButtonLnk} from "./Function/ButtonFunc";
import './App.css'

function App() {
  const { hash } = useLocation();

  //Scroll to a section when the nav bar links to it (ex: /#about)
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <main>
      <section className="hero">
        <span className="hero_eyebrow">Dedicated to the Disabled</span>
        <h1><span>ADHD:</span> Accessible Disability Healthcare Device</h1>
        <p className="hero_subtitle">
          A calm, simple place to keep track of your day and get connected with care.
        </p>
        <div className="hero_actions">
          <ButtonLnk page="journal" buttonname="Open Journal" />
          <ButtonLnk page="appointment" buttonname="Schedule Appointment" secondary />
        </div>
      </section>

      <section id="about" className="home_section">
        <h2>About</h2>
        <p>"ADHD" is a tool that helps organize daily life and makes navigating the healthcare system easier.
          It was designed for people with mental health based disabilities. ADHD connects users with local
          providers, journals medical data, and tracks medication with reminders.
        </p>
      </section>

      <section className="home_section features">
        <div className="card feature">
          <div className="feature_icon" aria-hidden="true">📓</div>
          <h3>Explore Our Journal</h3>
          <p>A homebase for daily activities and simple day to day reminders. The journal offers a sensory
            neutral, easy to use place for notes, medication reminders, and things you might forget. It is
            also a great way to track mental well-being, and can be shared as a reference with doctors
            working with patients with mental illnesses.
          </p>
          <ButtonLnk page="journal" buttonname="Open Journal →" />
        </div>

        <div className="card feature">
          <div className="feature_icon" aria-hidden="true">🩺</div>
          <h3>Schedule an Appointment</h3>
          <p>Fill out the provided form to get connected with a local healthcare provider suited to your needs.
            Your location and symptoms are used to assign an appointment based on priority.
          </p>
          <ButtonLnk page="appointment" buttonname="Schedule Appointment →" />
        </div>
      </section>
    </main>
  )
}

export default App
