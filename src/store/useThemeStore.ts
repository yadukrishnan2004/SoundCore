import { create } from 'zustand';

export type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('soundcore-theme') as Theme | null;
  if (saved === 'dark' || saved === 'light') return saved;
  return 'dark'; // Signature SoundCore dark theme default
};

const applyThemeToDOM = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),

  initTheme: () => {
    const currentTheme = get().theme;
    applyThemeToDOM(currentTheme);
  },

  setTheme: (theme: Theme) => {
    localStorage.setItem('soundcore-theme', theme);
    applyThemeToDOM(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const nextTheme: Theme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(nextTheme);
  }
}));
