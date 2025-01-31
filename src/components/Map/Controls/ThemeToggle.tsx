'use client';

import { FaMoon, FaBahai } from 'react-icons/fa6';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <FaBahai className="h-[1.2rem] w-[1.2rem] hidden dark:block " />
      <FaMoon className="absolute h-[1.2rem] w-[1.2rem] dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
