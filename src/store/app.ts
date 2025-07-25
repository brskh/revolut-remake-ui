import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr' | 'de';
  currency: 'USD' | 'EUR' | 'GBP' | 'CHF';
  notificationsEnabled: boolean;
  biometricsEnabled: boolean;
  toggleTheme: () => void;
  setLanguage: (language: 'en' | 'es' | 'fr' | 'de') => void;
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP' | 'CHF') => void;
  toggleNotifications: () => void;
  toggleBiometrics: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'en',
      currency: 'USD',
      notificationsEnabled: true,
      biometricsEnabled: false,

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },

      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      toggleNotifications: () => set({ notificationsEnabled: !get().notificationsEnabled }),
      toggleBiometrics: () => set({ biometricsEnabled: !get().biometricsEnabled }),
    }),
    {
      name: 'revolut-app-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);