import { Pin, Trail } from '@/api/data';
import { usePinStore } from '@/stores/pins';
import { DrawerSnapPoint, useMapStore } from '@/stores/map';
import { BLUE, RED, YELLOW, GREEN } from '@/constants/colors';
import Image from 'next/image';
import { getItemColor } from '@/utils/helpers';
import { useShallow } from 'zustand/react/shallow';

export const List = () => {
  const pins = usePinStore((state) => state.pins);
  const trails = usePinStore((state) => state.trails);
  const activePin = usePinStore((state) => state.activePin);
  const setActivePin = usePinStore((state) => state.setActivePin);
  const setActiveTrail = usePinStore((state) => state.setActiveTrail);
  const removeActivePin = usePinStore((state) => state.removeActivePin);
  const removeActiveTrail = usePinStore((state) => state.removeActiveTrail);
  const location = usePinStore((state) => state.location);

  const { drawerSnapPoint, setDrawerSnapPoint } = useMapStore(
    useShallow((state) => ({ drawerSnapPoint: state.drawerSnapPoint, setDrawerSnapPoint: state.setDrawerSnapPoint }))
  );

  const snapPoint = () => {
    let point = '40px';
    if (pins.length) {
      point = '105px';
    }
    if (activePin) {
      point = '205px';
    }
    return point as DrawerSnapPoint;
  };

  const onClickPin = (pin: Pin) => {
    removeActiveTrail(null);
    setActivePin(pin);
    setDrawerSnapPoint(snapPoint());
  };

  const onClickTrail = (trail: Trail) => {
    removeActivePin(null);
    setActiveTrail(trail);
    setDrawerSnapPoint(snapPoint());
  };

  return (
    <>
      {activePin && (
        <div className="relative grid gap-10 rounded-t-2xl bg-white p-6 pt-0 ring ring-gray-950/5 @min-[theme(--breakpoint-lg)]:grid-cols-2 @min-[theme(--breakpoint-lg)]:px-20 @min-[theme(--breakpoint-lg)]:py-8 @min-[theme(--breakpoint-lg)]:pb-10 dark:bg-gray-950">
          <div className="flex flex-1 flex-col">
            <div className="relative mb-4 overflow-hidden rounded-sm">
              {activePin.image && (
                <Image
                  src={activePin.image}
                  width={300}
                  height={200}
                  alt={activePin.name}
                  className="h-48 w-full rounded-sm object-cover"
                />
              )}
            </div>
            <span className="font-medium text-gray-500 dark:text-gray-500">{activePin.subcategory}</span>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <span className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">{activePin.name}</span>
                <span className="flex">
                  <span className="text-sm/6 text-gray-500">{activePin.location.street}</span>
                </span>
              </div>
              {activePin.price && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-primary-600 font-bold">{activePin.price}</p>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">{activePin.pricetext}</span>
                  </div>
                  <div className="flex text-center">
                    <a
                      href={activePin.url}
                      target="_blank"
                      className="w-full rounded-sm bg-blue-500 px-3 py-2 text-sm/6 font-bold text-white"
                    >
                      Бронювати
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div>
              {activePin.body && <p className="mt-1 text-sm/6 text-gray-600 dark:text-white">{activePin.body}</p>}
              <a
                href={activePin.url}
                target="_blank"
                className="mt-3 inline-block shrink-0 text-sm/6 font-semibold text-blue-600 dark:text-blue-500"
              >
                Читати повністю
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-10">
        {trails.map((trail) => (
          <div
            key={trail.id}
            className="flex flex-row items-start border-l-[6px] pl-6 mx-4 xl:mx-8 cursor-pointer relative"
            style={{ borderColor: RED }}
            onClick={() => onClickTrail(trail)}
          >
            {trail.image && (
              <Image src={trail.image} width={80} height={80} alt={trail.name} className="mr-4 rounded-in-list" />
            )}
            <div>
              <p className="m-0 leading-1">{trail.name}</p>
              {trail.trail_max_elevation && <p className="text-xs">Максимальна висота: {trail.trail_max_elevation}м</p>}
              {trail.trail_length && <p className="text-sm">Довжина: {trail.trail_length}м</p>}
            </div>
          </div>
        ))}
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="flex flex-row items-start border-l-[6px] pl-6 mx-4 xl:mx-8 cursor-pointer relative"
            style={{ borderColor: getItemColor(pin) }}
            onClick={() => onClickPin(pin)}
          >
            {pin.image && (
              <Image src={pin.image} width={80} height={80} alt={pin.name} className="mr-4 rounded-in-list" />
            )}
            <div className="space-y-1.5">
              <p className="m-0">{pin.name}</p>
              <p className="text-xs">{pin.location.street}</p>
              {pin.pricetext && <p className="text-sm">{pin.pricetext}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
