'use client';

import { usePinStore } from '@/stores/pins';
import { FaHouse } from 'react-icons/fa6';
import { List } from '../List';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export const Sidebar = () => {
  const pins = usePinStore((state) => state.pins);
  const trails = usePinStore((state) => state.trails);

  return (
    <div className="flex-1 flex flex-col animate-in slide-in-from-right">
      <div>
        <div className="flex items-center justify-between py-7 px-8">
          <h1 className="text-2xl">Путівник Карпатами</h1>

          <Button variant="outline" size="icon" asChild>
            <a href="https://karpaty.rocks" target="_blank" rel="noopener noreferrer">
              <FaHouse className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <Separator />
      </div>
      {pins.length || trails.length ? (
        <>
          <div className="flex-1 overflow-y-auto py-8">
            <List />
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>Результати відсутні.</p>
        </div>
      )}
    </div>
  );
};
