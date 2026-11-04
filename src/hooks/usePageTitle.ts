import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · Alpha4 / Soul Up`;
  }, [title]);
}
