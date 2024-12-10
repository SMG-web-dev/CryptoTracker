import { Link } from 'react-router-dom';

interface LinkSection {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}

const sections: LinkSection[] = [
  {
    title: 'Products',
    links: [
      { label: 'Wallet Tracker', href: '/wallet-tracker' },
      { label: 'Crypto Explorer', href: '/explorer' },
      { label: 'Price Comparison', href: '/price-comparison' },
      { label: 'API Access', href: '/api', isExternal: true },
      { label: 'Premium Features', href: '/premium', isExternal: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs', isExternal: true },
      { label: 'Blog', href: '/blog', isExternal: true },
      { label: 'Support', href: '/support', isExternal: true },
      { label: 'Status', href: '/status', isExternal: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about', isExternal: true },
      { label: 'Careers', href: '/careers', isExternal: true },
      { label: 'Press Kit', href: '/press', isExternal: true },
      { label: 'Contact', href: '/contact', isExternal: true },
    ],
  },
];

export const FooterLinks = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h3 className="text-white font-semibold">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.label}>
                {link.isExternal ? (
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};