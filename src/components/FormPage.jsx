import React, { useState } from 'react';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const genCaptcha = () =>
  Array.from({ length: 6 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');

const FIELDS = [
  { key: 'roll',   label: 'Enter Your Roll Number :',  ph: 'Roll Number' },
  { key: 'school', label: 'Enter School No. :',         ph: 'School Number' },
  { key: 'admit',  label: 'Enter Admit Card ID.',       ph: 'Admit Card Id',  note: '(as given on your admit card)' },
  { key: 'pin',    label: 'Enter Security Pin',         ph: 'Security Pin',   note: '(case sensitive)' },
];

export default function FormPage({ onSubmit }) {
  const [fields, setFields] = useState({ roll: '', school: '', admit: '', pin: '' });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(genCaptcha);

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!fields.roll.trim())   e.roll   = 'Please enter your Roll Number.';
    if (!fields.school.trim()) e.school = 'Please enter your School Number.';
    if (!fields.admit.trim())  e.admit  = 'Please enter your Admit Card ID.';
    if (!fields.pin.trim())    e.pin    = 'Please enter the Security Pin shown below.';
    else if (fields.pin !== captcha) e.pin = 'Security Pin does not match. Please try again.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) onSubmit(fields);
  };

  const handleReset = () => {
    setFields({ roll: '', school: '', admit: '', pin: '' });
    setErrors({});
    setCaptcha(genCaptcha());
  };

  return (
    <div className="form-wrap">
      <div className="form-title">
        Senior School Certificate Examination (Class XII)<br />Results 2026
      </div>

      {FIELDS.map(({ key, label, ph, note }) => (
        <div className="form-row" key={key}>
          <label className="form-label">
            {label}
            {note && <span className="note">{note}</span>}
          </label>
          <input
            className="form-input"
            value={fields[key]}
            onChange={set(key)}
            placeholder={ph}
          />
          {errors[key] && <span className="err">{errors[key]}</span>}
        </div>
      ))}

      <div className="captcha-row">
        <span className="captcha-lbl">Security Pin :</span>
        <div className="captcha-box">{captcha}</div>
        <button className="refresh" onClick={() => setCaptcha(genCaptcha())} title="Refresh">
          ⟳
        </button>
      </div>

      <div className="btn-row">
        <button className="btn-sub" onClick={handleSubmit}>Submit</button>
        <button className="btn-res" onClick={handleReset}>Reset</button>
      </div>

      <div className="disclaimer">
        <strong>Disclaimer :</strong> Neither NIC nor CBSE is responsible for any inadvertent
        error that may have crept in the results being published on NET. The results published
        on net are for Immediate information to the examinees. These cannot be treated as
        original mark sheets. Original mark sheets have been issued by the Board separately.
      </div>
    </div>
  );
}
