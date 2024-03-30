import { Input, ServiceTemplate } from '@/types';

export const generate = ({ projectName }: Input) => {
  const services: ServiceTemplate[] = [];

  services.push({
    type: 'app',
    data: {
      projectName,
      serviceName: 'ubuntu-mate',
      env: [`TITLE=StreamPanel Client`].join('\n'),
      source: {
        type: 'image',
        image: 'lscr.io/linuxserver/webtop:ubuntu-mate',
      },
      deploy: {
        replicas: 1,
        command: null,
        zeroDowntime: true,
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
