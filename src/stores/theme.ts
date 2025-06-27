import { atom } from 'nanostores';

export type Theme = 'light' | 'dark' | 'system';

export const themeStore = atom<Theme>('dark'); // Default theme is dark as per memory

export function setTheme(theme: Theme) {
  themeStore.set(theme);
  
  if (typeof document !== 'undefined') {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    
    localStorage.setItem('theme', theme);
  }
}

export function initTheme() {
  if (typeof document !== 'undefined') {
    const stored = localStorage.getItem('theme') as Theme || 'dark';
    setTheme(stored);
  }
}

// Helper functions for theme-aware styling as mentioned in memory
export function addSelectedClasses(element: HTMLElement, isDark: boolean) {
  if (isDark) {
    element.classList.add('bg-yellow', 'text-blue-dark', 'border-yellow');
  } else {
    element.classList.add('bg-primary-500', 'text-white', 'border-primary-500');
  }
}

export function removeSelectedClasses(element: HTMLElement) {
  element.classList.remove(
    'bg-yellow', 'text-blue-dark', 'border-yellow',
    'bg-primary-500', 'text-white', 'border-primary-500'
  );
} 