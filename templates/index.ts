import { generate as generate_blender } from './blender';
import { generate as generate_krita } from './krita';
import { generate as generate_ubmate } from './ubuntu-mate';
import { generate as generate_vscode } from './vscode';

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
    slug: 'vscode',
    title: 'VS-code',
    generate: generate_vscode,
  },
  {
    slug: 'ubuntu-mate',
    title: 'Ubuntu-mate',
    generate: generate_ubmate,
  },
];

export { templates };
