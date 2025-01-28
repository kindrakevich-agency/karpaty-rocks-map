'use client';

import { useMobile } from '@/hooks/useMobile';
import { usePinStore } from '@/stores/pins';
import { DrawerSnapPoint, useMapStore } from '@/stores/map';
import { useShallow } from 'zustand/react/shallow';
import { List } from '../List';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { Separator } from '../ui/separator';

export const MobileDrawer = () => {
  const pins = usePinStore((state) => state.pins);
  const location = usePinStore((state) => state.location);

  const { drawerSnapPoint, setDrawerSnapPoint } = useMapStore(
    useShallow((state) => ({ drawerSnapPoint: state.drawerSnapPoint, setDrawerSnapPoint: state.setDrawerSnapPoint }))
  );
  const isMobile = useMobile();

  return (
    <Drawer
      open={isMobile}
      snapPoints={pins.length && location ? ['40px', '105px', 1] : ['40px']}
      activeSnapPoint={pins.length && location ? drawerSnapPoint : '40px'}
      setActiveSnapPoint={(point) => setDrawerSnapPoint(point as DrawerSnapPoint)}
      dismissible={false}
      modal={false}
    >
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between mb-1.5">
          <div className="flex flex-col space-y-2">
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
        </DrawerHeader>

        <Separator />

        <div data-vaul-no-drag className="mt-6 overflow-y-auto flex-1 space-y-4">
          <List />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
