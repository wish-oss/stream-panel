import { Stripe } from 'stripe';

import { STRIPE_API_VERSION, STRIPE_APP_NAME, STRIPE_SECRET_KEY } from './constants';

const stripeClient = () => {
  if (!STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY needs to be set in environment variables.');
  }

  return new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
    appInfo: { name: STRIPE_APP_NAME },
    typescript: true,
  });
};

export default stripeClient;
