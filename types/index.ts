import { Prisma } from '@prisma/client';
import { Endpoints } from '@octokit/types';

export type { ChangeEvent, ReactNode } from 'react';

import type { Service, ServiceType, Project as EasyPanelProject } from 'easypanel.js';

export type { Service, ServiceType, EasyPanelProject };

export type * from './github';

// Do not know why export * will make nextjs complain about
// can not find module '@octokit/types'
export type { RequestParameters } from '@octokit/types';
export type { ToastId } from '@/components/chakra';

export * from '@prisma/client';

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

// For Listmonk
export type SubscribeResponse = {
  data: {
    id: number;
    created_at: string;
    updated_at: string;
    uuid: string;
    email: string;
    name: string;
    attribs: Record<string, unknown>;
    status: 'enabled' | 'disabled' | 'blocklisted';
    lists: number[];
  };
};

export type JsonObject = Prisma.JsonObject;

export type ReposResponse = Endpoints['GET /repos/{owner}/{repo}']['response'];

export type EnvironmentType = 'production' | 'preview';

export type EnvironmentVariables = {
  [key in EnvironmentType]: Record<string, string | undefined>;
};

export type Input = {
  projectName: string;
};

export type ServiceTemplate = {
  type: ServiceType;
  // TODO: try to reuse the types from @easypanel-io/templates
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};
