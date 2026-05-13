import React from 'react';

export default function Header() {
  return (
    <div className="hdr">
      <div className="hdr-left">
        <img
          className="cbse-mark"
          src="https://cbseresults.nic.in/2025/Images/cbseResult.jpg"
          alt="Logo"
        />
      </div>
      <div className="hdr-right">
        <div className="url">https://cbseresults.nic.in</div>
        <div className="tag">Examination Results 2026</div>
      </div>
    </div>
  );
}
