import React, { useState } from 'react';
import Header from './components/Header';
import FormPage from './components/FormPage';
import ResultPage from './components/ResultPage';
import { DEFAULT_CANDIDATE, DEFAULT_SUBJECTS } from './data';

export default function App() {
  const [submitted, setSubmitted] = useState(null);

  // Candidate data comes solely from src/data.js — not editable via UI
  const candidate = DEFAULT_CANDIDATE;
  const subjects  = DEFAULT_SUBJECTS;

  const handleSubmit = (fields) => {
    setSubmitted(fields);
  };

  const goBack = () => {
    setSubmitted(null);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Header />

      {/* Page Content */}
      <div className="card">
        {!submitted && (
          <FormPage onSubmit={handleSubmit} />
        )}

        {submitted && (
          <ResultPage
            rollNo={submitted.roll}
            schoolNo={submitted.school}
            candidate={candidate}
            subjects={subjects}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  );
}
