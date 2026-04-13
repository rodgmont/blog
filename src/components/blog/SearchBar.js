'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = 'Search…' }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <label htmlFor="search-articles" className="article-byline-stat__sr-only">
        {placeholder}
      </label>
      <Search size={16} aria-hidden="true" style={{
        position: 'absolute', left: '14px', top: '50%',
        transform: 'translateY(-50%)', color: 'var(--muted)',
      }} />
      <input
        id="search-articles"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={{
          width: '100%', padding: '12px 12px 12px 42px',
          background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)', borderRadius: 'var(--radius)',
          color: 'var(--foreground)', fontSize: '0.9rem',
          outline: 'none', transition: 'border-color 0.2s ease',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--muted)'}
        onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
      />
    </div>
  );
}
