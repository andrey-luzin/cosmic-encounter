import { useMemo } from 'react';
import { useStore } from '@/store';
import en from './locales/en';
import ru from './locales/ru';

export type Dict = Record<string, string>;

const dictionaries: Record<string, Dict> = { ru, en };

export const useI18n = () => {
  const { state } = useStore();
  const dict = useMemo(() => dictionaries[state.settings.language] || en, [state.settings.language]);
  const t = useMemo(() => (key: string) => dict[key] || key, [dict]);
  return { t, lang: state.settings.language };
};
