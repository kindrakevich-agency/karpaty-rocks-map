'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden " />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
