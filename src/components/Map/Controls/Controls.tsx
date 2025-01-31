import { usePinStore } from '@/stores/pins';

import { Filters } from './Filters';
import { LocateControl } from './LocateControl';
import { ThemeToggle } from './ThemeToggle';
import { ZoomControl } from './ZoomControl';
import { Button } from '@/components/ui/button';

export const Controls = () => {
  const pins = usePinStore((state) => state.pins);
  const location = usePinStore((state) => state.location);
  const setSearchOpen = usePinStore((state) => state.setSearchOpen);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 m-4 lg:m-6 pointer-events-none" style={{ zIndex: 9999 }}>
      <div className="flex justify-end xl:justify-between xl:space-x-4">
        <div className="hidden xl:flex flex-col space-y-2.5">
          {location?.title && (
            <div className="mr-auto !py-0">
              <p className="text-base font-semibold leading-none text-left xl:text-2xl">{location?.title}</p>
            </div>
          )}
          {location?.subtitle && (
            <div className="mr-auto !py-0">
              <p className="text-sm text-left">{location?.subtitle}</p>
            </div>
          )}
        </div>
        <div className="flex space-x-3 xl:space-x-4">
          <Button variant="outline" className="pointer-events-auto text-sm" onClick={() => setSearchOpen(true)}>
            Пошук
          </Button>
          <Filters />

          <div className="flex flex-col-reverse space-y-3 space-y-reverse xl:flex-row xl:space-y-0 xl:space-x-4 [&>*]:pointer-events-auto">
            <ThemeToggle />
            <LocateControl />
            <ZoomControl />
          </div>
        </div>
      </div>
    </div>
  );
};
