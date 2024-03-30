import { Client } from 'easypanel.js';

const easypanel = new Client({
  endpoint: process.env.EASYPANEL_URL ?? '',
  token: process.env.EASYPANEL_API_KEY ?? '',
});

export { easypanel };
