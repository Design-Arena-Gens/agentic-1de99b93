'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
  {
    title: 'Your Info',
    description: 'Quick intro to your clinic profile and preferences.'
  },
  {
    title: 'Add Patients',
    description: 'Gather essentials so your care team is always ready.'
  },
  {
    title: 'Complete',
    description: 'Review and launch your proactive care workspace.'
  }
];

const initialForm = {
  name: '',
  age: '',
  gender: 'Male',
  bloodType: '',
  allergies: '',
  conditions: '',
  emergencyContact: '',
  emergencyPhone: ''
};

export default function Page() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [patients, setPatients] = useState([]);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      setMouse({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100
      });
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  useEffect(() => {
    if (patients.length) {
      setHighlight(true);
      const timeout = setTimeout(() => setHighlight(false), 1400);
      return () => clearTimeout(timeout);
    }
  }, [patients]);

  const cardGlow = useMemo(
    () => ({
      background: `radial-gradient(500px circle at ${mouse.x}% ${mouse.y}%, rgba(99, 102, 241, 0.35), transparent 60%)`
    }),
    [mouse]
  );

  const handleInput = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const submitPatient = (event) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    if (!trimmedName) return;

    setPatients((prev) => [
      {
        id: crypto.randomUUID(),
        ...form,
        name: trimmedName,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
    setForm(initialForm);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 2.5rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          width: 'min(1024px, 95vw)',
          display: 'grid',
          gap: '2.5rem',
          gridTemplateColumns: 'minmax(0, 0.45fr) minmax(0, 0.55fr)',
          background: 'rgba(10, 12, 22, 0.75)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          boxShadow: '0 20px 65px rgba(17, 25, 40, 0.65)'
        }}
      >
        <aside
          style={{
            padding: '3rem 2.5rem',
            position: 'relative',
            backdropFilter: 'blur(18px)',
            borderRight: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              transition: 'background 0.4s ease'
            }}
            animate={cardGlow}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.h1
              layout
              style={{
                fontSize: '2.15rem',
                margin: 0,
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Setup Wizard
            </motion.h1>
            <p
              style={{
                marginTop: '0.75rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6
              }}
            >
              Bring patients onboard with a single flow. Smooth transitions, zero friction.
            </p>

            <div style={{ marginTop: '3rem', display: 'grid', gap: '1.5rem' }}>
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isComplete = index < activeStep;
                return (
                  <motion.button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      position: 'relative',
                      padding: '1.45rem 1.35rem',
                      borderRadius: '18px',
                      background: `linear-gradient(135deg, rgba(17, 25, 40, 0.78), rgba(17, 25, 40, 0.55))`,
                      border: isActive
                        ? '1px solid rgba(99, 102, 241, 0.8)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: isActive
                        ? '0 12px 35px rgba(99, 102, 241, 0.25)'
                        : '0 12px 28px rgba(15, 18, 30, 0.45)',
                      display: 'grid',
                      gap: '0.55rem'
                    }}
                  >
                    <motion.span
                      layout
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.015em',
                        color: isActive || isComplete ? '#f4f6fb' : 'rgba(255,255,255,0.6)'
                      }}
                    >
                      <motion.span
                        layout
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '15px',
                          display: 'grid',
                          placeItems: 'center',
                          background: isComplete
                            ? 'linear-gradient(135deg, #22d3ee, #818cf8)'
                            : isActive
                            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                            : 'rgba(255, 255, 255, 0.08)',
                          color: isActive || isComplete ? '#08090d' : 'rgba(255, 255, 255, 0.6)',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          transition: 'background 0.4s ease, color 0.4s ease'
                        }}
                      >
                        {index + 1}
                      </motion.span>
                      {step.title}
                    </motion.span>
                    <motion.p
                      layout
                      style={{
                        margin: 0,
                        fontSize: '0.92rem',
                        color: 'rgba(255,255,255,0.62)',
                        lineHeight: 1.5
                      }}
                    >
                      {step.description}
                    </motion.p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </aside>

        <section
          style={{
            padding: '3.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.25rem',
            position: 'relative'
          }}
        >
          <motion.div
            animate={{
              background: `radial-gradient(420px circle at ${mouse.x}% ${mouse.y}%, rgba(79, 70, 229, 0.25), transparent 70%)`
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none'
            }}
          />

          <header style={{ position: 'relative', zIndex: 1 }}>
            <motion.p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.58)',
                fontWeight: 600
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              Step {activeStep + 1}
            </motion.p>
            <motion.h2
              layout
              style={{
                margin: '0.65rem 0 0',
                fontSize: '2.1rem',
                fontWeight: 700,
                letterSpacing: '-0.01em'
              }}
            >
              {steps[activeStep].title}
            </motion.h2>
            <p
              style={{
                margin: '0.75rem 0 0',
                maxWidth: '38ch',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6
              }}
            >
              {steps[activeStep].description}
            </p>
          </header>

          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.form
                key="patient-form"
                onSubmit={submitPatient}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'grid',
                  gap: '1.4rem'
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.2rem'
                  }}
                >
                  <Field
                    label="Patient Name"
                    hint="Full name"
                    required
                    value={form.name}
                    onChange={handleInput('name')}
                  />
                  <Field
                    label="Age"
                    type="number"
                    hint="Age"
                    required
                    value={form.age}
                    onChange={handleInput('age')}
                  />
                  <Select
                    label="Gender"
                    value={form.gender}
                    onChange={handleInput('gender')}
                    options={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' },
                      { label: 'Non-binary', value: 'Non-binary' },
                      { label: 'Prefer not to say', value: 'Prefer not to say' }
                    ]}
                  />
                  <Field
                    label="Blood Type"
                    hint="e.g., O+"
                    value={form.bloodType}
                    onChange={handleInput('bloodType')}
                  />
                  <Field
                    label="Allergies"
                    hint="Any allergies"
                    value={form.allergies}
                    onChange={handleInput('allergies')}
                  />
                  <Field
                    label="Medical Conditions"
                    hint="List any medical conditions"
                    value={form.conditions}
                    onChange={handleInput('conditions')}
                  />
                  <Field
                    label="Emergency Contact"
                    hint="Contact name"
                    value={form.emergencyContact}
                    onChange={handleInput('emergencyContact')}
                  />
                  <Field
                    label="Emergency Phone"
                    hint="Contact phone"
                    value={form.emergencyPhone}
                    onChange={handleInput('emergencyPhone')}
                  />
                </div>

                <motion.div
                  layout
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.4rem'
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    whileHover={{ x: -5 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.65)',
                      display: 'inline-flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>⟵</span> Back
                  </motion.button>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '0.85rem 1.6rem',
                      borderRadius: '999px',
                      border: 'none',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: '#08090d',
                      background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                      boxShadow: '0 18px 35px rgba(99,102,241,0.35)',
                      cursor: 'pointer'
                    }}
                  >
                    Add Patient
                  </motion.button>
                </motion.div>
              </motion.form>
            )}

            {activeStep !== 1 && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'grid',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  borderRadius: '18px',
                  border: '1px dashed rgba(255,255,255,0.16)',
                  background: 'rgba(12, 16, 28, 0.6)'
                }}
              >
                <motion.p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  {activeStep === 0
                    ? 'Complete your profile basics so patients always know who is contacting them.'
                    : 'Review your newly onboarded patients, confirm details, and launch care automations.'}
                </motion.p>
                <motion.button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'rgba(129, 140, 248, 0.18)',
                    color: '#c7d2fe',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Jump to Add Patients
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', letterSpacing: '-0.01em' }}>
                Patient Roster
              </h3>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
                {patients.length} saved
              </span>
            </div>

            <motion.div
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(11, 15, 25, 0.65)',
                padding: '1.4rem',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative'
              }}
              animate={highlight ? { boxShadow: '0 0 0 2px rgba(129, 140, 248, 0.2)' } : { boxShadow: '0 0 0 0 rgba(129,140,248,0)' }}
            >
              <AnimatePresence initial={false}>
                {patients.length === 0 && (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      margin: 'auto',
                      textAlign: 'center',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.6
                    }}
                  >
                    Add your first patient to see them appear here in real-time.
                  </motion.p>
                )}

                {patients.map((patient) => (
                  <motion.div
                    key={patient.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    style={{
                      padding: '0.95rem 1rem',
                      borderRadius: '14px',
                      background: 'rgba(17, 25, 40, 0.65)',
                      border: '1px solid rgba(129,140,248,0.25)',
                      display: 'grid',
                      gap: '0.4rem',
                      boxShadow: '0 12px 24px rgba(9, 11, 19, 0.45)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                        {patient.name}
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                        {new Date(patient.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '0.35rem',
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.65)'
                      }}
                    >
                      <span>Age: {patient.age || '—'}</span>
                      <span>Gender: {patient.gender || '—'}</span>
                      <span>Blood: {patient.bloodType || '—'}</span>
                      <span>Allergies: {patient.allergies || 'None'}</span>
                      <span>Conditions: {patient.conditions || 'None'}</span>
                      <span>Emergency: {patient.emergencyContact || '—'}</span>
                      <span>Phone: {patient.emergencyPhone || '—'}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}

function Field({ label, hint, type = 'text', required = false, value, onChange }) {
  return (
    <label
      style={{
        display: 'grid',
        gap: '0.55rem',
        padding: '1rem 1.2rem',
        borderRadius: '16px',
        background: 'rgba(18, 23, 40, 0.68)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'border-color 0.3s ease, transform 0.3s ease'
      }}
    >
      <span style={{ fontSize: '0.98rem', fontWeight: 600 }}>{label}{required ? ' *' : ''}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={hint}
        style={{
          width: '100%',
          padding: '0.75rem 0.85rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(12, 16, 28, 0.65)',
          color: '#f4f6fb',
          outline: 'none',
          transition: 'border-color 0.3s ease'
        }}
        onFocus={(event) => {
          event.target.parentElement.style.borderColor = 'rgba(129, 140, 248, 0.65)';
          event.target.parentElement.style.transform = 'translateY(-2px)';
        }}
        onBlur={(event) => {
          event.target.parentElement.style.borderColor = 'rgba(255,255,255,0.08)';
          event.target.parentElement.style.transform = 'translateY(0)';
        }}
      />
      <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>{hint}</span>
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label
      style={{
        display: 'grid',
        gap: '0.55rem',
        padding: '1rem 1.2rem',
        borderRadius: '16px',
        background: 'rgba(18, 23, 40, 0.68)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'border-color 0.3s ease, transform 0.3s ease'
      }}
    >
      <span style={{ fontSize: '0.98rem', fontWeight: 600 }}>{label}</span>
      <select
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '0.75rem 0.85rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(12, 16, 28, 0.65)',
          color: '#f4f6fb',
          outline: 'none',
          transition: 'border-color 0.3s ease'
        }}
        onFocus={(event) => {
          event.target.parentElement.style.borderColor = 'rgba(129, 140, 248, 0.65)';
          event.target.parentElement.style.transform = 'translateY(-2px)';
        }}
        onBlur={(event) => {
          event.target.parentElement.style.borderColor = 'rgba(255,255,255,0.08)';
          event.target.parentElement.style.transform = 'translateY(0)';
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} style={{ color: '#000' }}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
