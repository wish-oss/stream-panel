import { Input, ServiceTemplate } from '@/types';

export const generate = ({ projectName }: Input) => {
  const services: ServiceTemplate[] = [];

  services.push({
    type: 'app',
    data: {
      projectName,
      serviceName: 'blender',
      source: {
        type: 'image',
        image: 'lscr.io/linuxserver/blender:latest',
      },
      mounts: [
        {
          type: 'volume',
          name: 'config',
          mountPath: '/config',
        },
      ],
      domains: [
        {
          host: '$(EASYPANEL_DOMAIN)',
          port: 3000,
        },
      ],
    },
  });

  return { services };
};
