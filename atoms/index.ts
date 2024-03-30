import { atom } from 'jotai';

export const columnFiltersAtom = atom<Record<string, string[]>>({});
export const globalFilterAtom = atom<string>('');
