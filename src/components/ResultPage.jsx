import React from 'react';
import { getGrade } from '../data';

export default function ResultPage({ rollNo, schoolNo, candidate, subjects, onBack }) {
  // Compute per-subject totals
  const rows = subjects.map((s) => {
    const th = Number(s.theory);
    const pr = Number(s.practical);
    const numeric = !isNaN(th) && !isNaN(pr);
    const total = numeric ? th + pr : 'A';
    const grade = numeric ? getGrade(th + pr) : 'A1';
    return { ...s, thDisplay: isNaN(Number(s.theory)) ? '—' : String(th).padStart(3,'0'),
                   prDisplay: isNaN(Number(s.practical)) ? '—' : String(pr).padStart(3,'0'),
                   total, grade };
  });

  const numericRows = rows.filter((r) => typeof r.total === 'number');
  const grandTotal  = numericRows.reduce((a, r) => a + r.total, 0);
  const maxPossible = numericRows.reduce((a, r) => {
    const t = Number(r.theory) || 0;
    const p = Number(r.practical) || 0;
    return a + t + p;
  }, 0);
  const pass = numericRows.every((r) => r.total >= 33);

  return (
    <div className="result-wrap">
      {/* top bar */}
      <div className="res-topbar">
        <span>Roll No: {rollNo || candidate.rollNo}</span>
        <span>Brought to you by National Informatics Centre (NIC)</span>
      </div>

      {/* heading */}
      <div className="res-head">
        <h2>Examination Results</h2>
        <p>Senior School Certificate Examination (Class XII) Results 2026</p>
      </div>

      {/* candidate info */}
      <div className="info-grid">
        <div className="info-row">
          <span className="info-lbl">Roll No. :</span>
          <span className="info-val">{rollNo || candidate.rollNo}</span>
        </div>
        <div className="info-row">
          <span className="info-lbl">School No. :</span>
          <span className="info-val">{schoolNo || candidate.schoolNo}</span>
        </div>
        <div className="info-row">
          <span className="info-lbl">Candidate Name :</span>
          <span className="info-val">{candidate.name}</span>
        </div>
        <div className="info-row">
          <span className="info-lbl">Mother's Name :</span>
          <span className="info-val">{candidate.mother}</span>
        </div>
        <div className="info-row">
          <span className="info-lbl">Father's Name :</span>
          <span className="info-val">{candidate.father}</span>
        </div>
        <div className="info-row">
          <span className="info-lbl">School's Name :</span>
          <span className="info-val">{candidate.school}</span>
        </div>
      </div>

      {/* marks table */}
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>SUB CODE</th>
              <th>SUB NAME</th>
              <th>THEORY</th>
              <th>PRAC./IA/PRO.</th>
              <th>MARKS</th>
              <th>POSITIONAL GRADE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.code}</td>
                <td>{r.name}</td>
                <td>{r.thDisplay}</td>
                <td>{r.prDisplay}</td>
                <td>{r.total}</td>
                <td>{r.grade}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                {pass ? 'Result : PASS' : 'Result : COMPARTMENT'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* footer */}
      <div className="res-footer">
        <div>
          <div className={pass ? 'status-pass' : 'status-fail'}>
            {pass ? '✓ Result : PASS' : '✗ Result : COMPARTMENT'}
          </div>
          <div className="grade-info">
            Total Marks : {grandTotal} / {maxPossible}
          </div>
        </div>
        <div className="res-note">
          Marks shown are provisional.<br />
          Refer to official marksheet for records.
        </div>
      </div>

      {/* actions */}
      <div className="action-row">
        <button className="back-btn" onClick={onBack}>← Check Another Result</button>
        <button className="print-btn" onClick={() => window.print()}>🖨 Print / Save PDF</button>
      </div>
    </div>
  );
}
