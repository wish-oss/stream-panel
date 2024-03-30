import { format, formatRelative as formatRelativeFn } from 'date-fns';
import { HttpMethod } from '@/types';
import deepmerge from 'deepmerge';

export { default as isEqual } from 'fast-deep-equal';

export const swrConfigs = {
  fetcher,
  suspend: true,
};

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<JSON> {
  const options = deepmerge(
    {
      cache: 'no-store',
      method: HttpMethod.GET,
      headers: { 'Content-Type': 'application/json' },
    },
    init
  );

  const response = await fetch(input, options);

  if (response.status === 204 || response.statusText === 'No Content') {
    return JSON.parse('{}');
  }

  return await response.json();
}

export function capitalize(s: string) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function truncate(str: string, num: number) {
  if (!str) return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }
  try {
    const response = await fetch(`https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }
};

export const placeholderBlurhash =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==';

export const toDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// This helper mostly uses for pagination query: skip, take etc
export const parseQuery = (query?: string | string[] | number) => {
  if (Array.isArray(query)) {
    throw new Error('We do not use Array of string in query');
  }

  if (typeof query === 'number') {
    return query;
  }

  if (typeof query === 'string' && query.length > 0) {
    const parsed = parseInt(query, 10);

    if (Number.isNaN(parsed)) {
      throw new Error('Query contains invalid characters');
    } else {
      return parsed;
    }
  }

  return undefined;
};

export function isTimezoneAwareTimestamp(timestamp: string) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,6}(Z$|[+-]\d{2}:\d{2}$)/.test(
    timestamp
  );
}

export const formatTime = (
  timestamp?: string | number | Date | null,
  formatType = 'dd.MM.yyyy HH:mm'
) => {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return format(timestamp, formatType);
  }

  return format(new Date(timestamp), formatType);
};

export const formatRelative = (timestamp?: string | number | Date | null) => {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return formatRelativeFn(timestamp, new Date());
  }

  return formatRelativeFn(new Date(timestamp), new Date());
};

export const delayAsync = async (amountMs = 500): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, amountMs);
  });
};
