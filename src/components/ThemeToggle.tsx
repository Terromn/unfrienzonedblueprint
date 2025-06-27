import { useStore } from '@nanostores/react';
import { themeStore, setTheme, type Theme } from '../stores/theme';

const ThemeToggle = () => {
  const currentTheme = useStore(themeStore);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getIcon = () => {
    switch (currentTheme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '🌙';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
      title={`Current theme: ${currentTheme}`}
      aria-label="Toggle theme"
    >
      <span className="text-xl">{getIcon()}</span>
    </button>
  );
};

export default ThemeToggle; 