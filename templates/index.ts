import { generate as generate_blender } from './blender';
import { generate as generate_krita } from './krita';
import { generate as generate_ubmate } from './ubuntu-mate';

const templates = [
  {
    slug: 'blender',
    title: 'Blender',
    generate: generate_blender,
  },
  {
    slug: 'krita',
    title: 'Krita',
    generate: generate_krita,
  },
  {
    slug: 'ubuntu-mate',
    title: 'Ubuntu-mate',
    generate: generate_ubmate,
  },
];

export { templates };
