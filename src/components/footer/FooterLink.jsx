import React from 'react';

export default function FooterLink({ title, links }) {
  return (
    <div>
      <h5 className="font-bold text-white text-xs tracking-widest uppercase mb-4">{title}</h5>
      <ul className="space-y-2.5 text-sm">
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
