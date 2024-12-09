import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Github className="w-5 h-5" />,
    href: 'https://github.com',
    label: 'GitHub'
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: 'https://twitter.com',
    label: 'Twitter'
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: 'https://linkedin.com',
    label: 'LinkedIn'
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: 'mailto:contact@cryptotracker.com',
    label: 'Email'
  }
];

export const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};