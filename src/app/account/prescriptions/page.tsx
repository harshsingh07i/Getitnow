"use client";

import React from 'react';

export default function PrescriptionsPage() {
  return (
    <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>My Prescriptions</h1>
      <p style={{ color: 'var(--text-secondary)' }}>You have no saved prescriptions.</p>
    </div>
  );
}
