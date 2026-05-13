import React, { useState } from 'react';

const CANDIDATE_FIELDS = [
  { k: 'name',     lbl: 'Candidate Name' },
  { k: 'mother',   lbl: "Mother's Name" },
  { k: 'father',   lbl: "Father's Name" },
  { k: 'school',   lbl: 'School Name' },
  { k: 'rollNo',   lbl: 'Roll Number' },
  { k: 'schoolNo', lbl: 'School No.' },
];

export default function EditPanel({ candidate, setCandidate, subjects, setSubjects }) {
  const [saved, setSaved] = useState(false);

  const updateC = (k) => (e) => setCandidate((c) => ({ ...c, [k]: e.target.value }));

  const updateS = (i, k) => (e) => {
    const val = e.target.value;
    setSubjects((s) => s.map((row, idx) => (idx === i ? { ...row, [k]: val } : row)));
  };

  const addSubject = () =>
    setSubjects((s) => [...s, { code: '', name: '', theory: '', practical: '' }]);

  const delSubject = (i) =>
    setSubjects((s) => s.filter((_, idx) => idx !== i));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="edit-wrap">
      <div className="edit-title">
        Edit Candidate Details
        <span className="badge">LIVE EDIT</span>
      </div>

      {/* ── Candidate Info ── */}
      <div className="section-title">Candidate Info</div>
      <div className="edit-grid">
        {CANDIDATE_FIELDS.map(({ k, lbl }) => (
          <div className="edit-row" key={k}>
            <label className="edit-label">{lbl}</label>
            <input className="edit-input" value={candidate[k]} onChange={updateC(k)} />
          </div>
        ))}
      </div>

      {/* ── Subjects ── */}
      <div className="section-title">📚 Subjects &amp; Marks</div>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 380 }}>
          {/* column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '62px 1fr 72px 72px 30px',
              gap: 8,
              marginBottom: 6,
            }}
          >
            {['Code', 'Subject Name', 'Theory', 'Practical', ''].map((h) => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#666' }}>
                {h}
              </span>
            ))}
          </div>

          {subjects.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '62px 1fr 72px 72px 30px',
                gap: 8,
                marginBottom: 6,
                alignItems: 'center',
              }}
            >
              <input className="edit-input" value={s.code}      onChange={updateS(i, 'code')}      placeholder="Code" />
              <input className="edit-input" value={s.name}      onChange={updateS(i, 'name')}      placeholder="Subject" />
              <input className="edit-input" value={s.theory}    onChange={updateS(i, 'theory')}    placeholder="Th." />
              <input className="edit-input" value={s.practical} onChange={updateS(i, 'practical')} placeholder="Pr." />
              <button className="del-btn" onClick={() => delSubject(i)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <button className="add-btn" onClick={addSubject}>+ Add Subject</button>

      <div>
        <button className="save-btn" onClick={save}>💾 Save Changes</button>
        {saved && <span className="saved-msg">✓ Saved!</span>}
      </div>
    </div>
  );
}
