import React, { useState } from 'react';
import { footerLinks } from './footerTexts';

export default function FooterLegal() {
  const [modal, setModal] = useState(null);
  return (
    <>
      <footer style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#f8fafc', borderTop: '1px solid #e0e7ef',
        display: 'flex', justifyContent: 'center', gap: 24, padding: '12px 0', zIndex: 9999, fontSize: 15, color: '#6366f1',
        boxShadow: '0 -2px 12px rgba(99,102,241,0.03)', flexWrap: 'wrap'
      }}>
        {footerLinks.map(link => (
          <button
            key={link.key}
            onClick={() => setModal(link)}
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, fontWeight: 600 }}
          >
            {link.label}
          </button>
        ))}
      </footer>
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,59,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }} onClick={() => setModal(null)}>
          <div style={{
            background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)',
            padding: 32, maxWidth: 440, width: '90vw', position: 'relative', color: '#334155',
            fontSize: 16, lineHeight: 1.6
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#6366f1', fontWeight: 900, fontSize: 22, marginBottom: 16 }}>{modal.label}</h3>
            <div style={{ whiteSpace: 'pre-line' }}>{modal.content}</div>
            <button style={{ position: 'absolute', top: 10, right: 18, background: 'none', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer' }} onClick={() => setModal(null)}>&#10005;</button>
          </div>
        </div>
      )}
    </>
  );
}
