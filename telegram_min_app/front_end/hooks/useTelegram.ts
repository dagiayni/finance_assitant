import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram: any;
  }
}

export function useTelegram() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  return {
    user,
    tg: typeof window !== 'undefined' ? window.Telegram?.WebApp : null,
    userId: user?.id?.toString() || 'anonymous',
    initData: typeof window !== 'undefined' ? window.Telegram?.WebApp?.initData : '',
  };
}
