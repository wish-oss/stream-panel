import { Input, ServiceTemplate } from '@/types';

export const generate = ({ projectName }: Input) => {
  const services: ServiceTemplate[] = [];

  services.push({
    type: 'app',
    data: {
      projectName,
      serviceName: 'vscode',
      env: [
        `PASSWORD=PASSWORD`,
      ].join('\n'),
      source: {
        type: 'image',
        image: 'ghcr.io/coder/code-server:latest',
      },
      deploy: {
        replicas: 1,
        command: null,
        zeroDowntime: true,
        capAdd: [
          'SYS_ADMIN'
        ]
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
