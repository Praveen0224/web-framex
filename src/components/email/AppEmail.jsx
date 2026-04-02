import * as React from 'react';

export const AppEmail = ({ fullName, type, category }) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#050505',
    color: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  }}>
    <div style={{ marginBottom: '32px' }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '300', 
        letterSpacing: '-0.02em',
        margin: '0 0 8px 0'
      }}>
        Application <span style={{ color: '#ea580c', fontWeight: '500' }}>Confirmed</span>
      </h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.4', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
        FrameX-Tech Farm Talent Acquisition
      </p>
    </div>

    <div style={{ marginBottom: '32px' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
        Hi <strong>{fullName}</strong>,
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
        Thank you for applying for our <strong style={{ color: '#ea580c', textTransform: 'capitalize' }}>{type}</strong> program in <strong style={{ color: '#a855f7', textTransform: 'capitalize' }}>{category}</strong>. 
        We have successfully received your application and our team is currently reviewing your profile.
      </p>
    </div>

    <div style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.03)', 
      padding: '24px', 
      borderRadius: '16px', 
      marginBottom: '32px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <h2 style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px 0' }}>
        What's Next?
      </h2>
      <ul style={{ padding: '0 0 0 20px', margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.8' }}>
        <li>Initial profile screening (1-3 business days)</li>
        <li>Technical review of your portfolio/projects</li>
        <li>Shortlisted candidates will be contacted via email for an interview</li>
      </ul>
    </div>

    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '32px', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px', margin: '0 0 8px 0' }}>
        Connect with us on our social platforms for updates
      </p>
      <div style={{ color: '#ea580c', fontSize: '14px', fontWeight: '500' }}>
        FrameX-Tech Farm
      </div>
    </div>
  </div>
);

export default AppEmail;
