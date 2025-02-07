import { CloudflareProduct } from '../types';

export const CLOUDFLARE_CATEGORIES = {
  SECURITY: 'Security',
  PERFORMANCE: 'Performance',
  RELIABILITY: 'Reliability',
  DEVELOPER: 'Developer Tools',
  NETWORK: 'Network Services',
} as const;

export const CLOUDFLARE_PRODUCTS: CloudflareProduct[] = [
  {
    id: 'waf',
    name: 'WAF',
    category: CLOUDFLARE_CATEGORIES.SECURITY,
    description: 'Web Application Firewall',
    icon: 'waf',
  },
  {
    id: 'ddos-protection',
    name: 'DDoS Protection',
    category: CLOUDFLARE_CATEGORIES.SECURITY,
    description: 'DDoS mitigation',
    icon: 'ddos-protection',
  },
  {
    id: 'bots',
    name: 'Bot Management',
    category: CLOUDFLARE_CATEGORIES.SECURITY,
    description: 'Bot detection and mitigation',
    icon: 'bots',
  },
  {
    id: 'cache',
    name: 'CDN',
    category: CLOUDFLARE_CATEGORIES.PERFORMANCE,
    description: 'Content Delivery Network',
    icon: 'cache',
  },
  {
    id: 'workers',
    name: 'Workers',
    category: CLOUDFLARE_CATEGORIES.DEVELOPER,
    description: 'Serverless computing platform',
    icon: 'workers',
  },
  {
    id: 'pages',
    name: 'Pages',
    category: CLOUDFLARE_CATEGORIES.DEVELOPER,
    description: 'JAMstack platform',
    icon: 'pages',
  },
  {
    id: 'r2',
    name: 'R2',
    category: CLOUDFLARE_CATEGORIES.DEVELOPER,
    description: 'Object storage',
    icon: 'r2',
  },
  {
    id: 'dns',
    name: 'DNS',
    category: CLOUDFLARE_CATEGORIES.NETWORK,
    description: 'Managed DNS service',
    icon: 'dns',
  },
  {
    id: 'spectrum',
    name: 'Spectrum',
    category: CLOUDFLARE_CATEGORIES.NETWORK,
    description: 'TCP/UDP proxy',
    icon: 'spectrum',
  },
  {
    id: 'load-balancing',
    name: 'Load Balancing',
    category: CLOUDFLARE_CATEGORIES.RELIABILITY,
    description: 'Global load balancer',
    icon: 'load-balancing',
  },
  {
    id: 'access',
    name: 'Access',
    category: CLOUDFLARE_CATEGORIES.SECURITY,
    description: 'Zero Trust access management',
    icon: 'access',
  },
  {
    id: 'cloudflare-one',
    name: 'Teams',
    category: CLOUDFLARE_CATEGORIES.SECURITY,
    description: 'Secure enterprise network',
    icon: 'cloudflare-one',
  },
  {
    id: 'd1',
    name: 'D1',
    category: CLOUDFLARE_CATEGORIES.DEVELOPER,
    description: 'SQL Database',
    icon: 'd1',
  },
  {
    id: 'kv',
    name: 'KV',
    category: CLOUDFLARE_CATEGORIES.DEVELOPER,
    description: 'Key-value storage',
    icon: 'kv',
  },
  {
    id: 'durable-objects',
    name: 'Durable Objects',
    category: CLOUDFLARE_CATEGORIES.DEVELOPER,
    description: 'Distributed computing',
    icon: 'durable-objects',
  },
];

export const getProductsByCategory = (category: string): CloudflareProduct[] => {
  return CLOUDFLARE_PRODUCTS.filter(product => product.category === category);
};

export const getProductById = (id: string): CloudflareProduct | undefined => {
  return CLOUDFLARE_PRODUCTS.find(product => product.id === id);
};
