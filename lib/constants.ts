import { Plan } from '@/types';

export const STRIPE_API_VERSION = '2023-10-16';
export const STRIPE_APP_NAME = 'Steam Panel';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const TEAM_ID = process.env.TEAM_ID_VERCEL ?? '';
export const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? '';
export const BASE_URL = process.env.NEXTAUTH_URL ?? '';
export const EASYPANEL_URL = process.env.EASYPANEL_URL ?? '';

export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const ROW_HEIGHT = 53;
export const MAX_PROJECTS = Number(process.env.MAX_PROJECTS ?? 1);

export const LISTMONK_API = process.env.LISTMONK_API ?? '';
export const LISTMONK_SECRET = `${process.env.LISTMONK_ADMIN_USERNAME}:${process.env.LISTMONK_ADMIN_PASSWORD}`;

export const RESERVED_SLUGS = ['sang', 'aiei'];

type Pricing = {
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  description?: string;
  ctaText?: string;
  features: string[];
  quota: {
    projects: number;
    rows: number;
  };
};

export const FEATURES: Record<keyof typeof Plan, Pricing> = {
  [Plan.HOBBY]: {
    price: {
      monthly: 9,
      yearly: 5,
    },
    description: 'Unlock key features and higher usage limits',
    features: [
      'Up to 3 team members',
      'Up to 3 projects',
      'Intuitive, fast and privacy-friendly dashboard',
    ],
    quota: {
      projects: 3,
      rows: 10,
    },
  },
  [Plan.PRO]: {
    price: {
      monthly: 62,
      yearly: 59,
    },
    description: 'Enjoy higher limits and extra features with our Pro plan.',
    features: [
      `Everything in ${Plan.HOBBY}`,
      'Up to 10 team members',
      'Up to 10 projects',
      'Lorem ipsum plan dono',
      'Something else longer so it will make two lines',
    ],
    quota: {
      projects: 10,
      rows: 100,
    },
  },
  [Plan.ENTERPRISE]: {
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'Elevate with exclusive features and limitless potential.',
    ctaText: 'Contact Us',
    features: [
      `Everything in ${Plan.PRO}`,
      'Unlimited team members',
      'Unlimited projects',
      'Technical onboarding',
    ],
    quota: {
      projects: 999,
      rows: 1000,
    },
  },
};
