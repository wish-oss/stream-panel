import { headers } from 'next/headers';

export default async function Sitemap() {
  const domain = headers().get('host');

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
  ];
}
