import { randomBytes } from 'crypto';
import slugify from 'slugify';

export function toSlugWithSuffix(name: string) {

  const random = randomBytes(5).toString('hex');

  const slug = slugify(name);

  return `${slug}-${random}`;

}