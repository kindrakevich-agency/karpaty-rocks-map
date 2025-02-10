import { useMobile } from '@/hooks/useMobile';
import { Pin, Trail } from '@/api/data';
import { usePinStore } from '@/stores/pins';
import { DrawerSnapPoint, useMapStore } from '@/stores/map';
import { BLUE, RED, YELLOW, GREEN } from '@/constants/colors';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getItemColor } from '@/utils/helpers';
import { useShallow } from 'zustand/react/shallow';
import { getTrailLength } from '@/utils/helpers';

export const List = () => {
  const pins = usePinStore((state) => state.pins);
  const trails = usePinStore((state) => state.trails);
  const activePin = usePinStore((state) => state.activePin);
  const activeTrail = usePinStore((state) => state.activeTrail);
  const setActivePin = usePinStore((state) => state.setActivePin);
  const setActiveTrail = usePinStore((state) => state.setActiveTrail);
  const removeActivePin = usePinStore((state) => state.removeActivePin);
  const removeActiveTrail = usePinStore((state) => state.removeActiveTrail);
  const location = usePinStore((state) => state.location);

  const { drawerSnapPoint, setDrawerSnapPoint } = useMapStore(
    useShallow((state) => ({ drawerSnapPoint: state.drawerSnapPoint, setDrawerSnapPoint: state.setDrawerSnapPoint }))
  );

  const isMobile = useMobile();

  const snapPoint = () => {
    let point = '40px';
    if (pins.length) {
      point = '105px';
    }
    if (activePin || activeTrail) {
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

  const svgConvert = (svgString: string) => {
    const base64Svg = btoa(svgString);
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
    return dataUrl;
  };

  return (
    <>
      {activePin && (
        <div key={`activePin`} className="relative grid gap-10 bg-white p-4 pt-0 dark:bg-gray-950">
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
            {!isMobile && <span className="font-medium text-gray-500 dark:text-gray-500">{activePin.subcategory}</span>}
            <div className="grid grid-cols-1 gap-2">
              <div>
                {!isMobile && (
                  <>
                    <span className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">{activePin.name}</span>
                    <span className="flex">
                      <span className="text-gray-500">{activePin.location.street}</span>
                    </span>
                  </>
                )}
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
              {activePin.body && (
                <p className="mt-1 text-sm/6 text-gray-600 dark:text-white">
                  {activePin.body}
                  <a href={activePin.url} target="_blank" className="pl-1 text-blue-600 dark:text-blue-500">
                    Читати повністю
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {activeTrail && (
        <div key={`activeTrail`} className="relative grid gap-10 bg-white p-4 pt-0 dark:bg-gray-950">
          <div className="flex flex-1 flex-col">
            <div className="relative mb-4 overflow-hidden rounded-sm">
              {activeTrail.image && (
                <Image
                  src={activeTrail.image}
                  width={300}
                  height={200}
                  alt={activeTrail.name}
                  className="h-48 w-full rounded-sm object-cover"
                />
              )}
            </div>
            {!isMobile && <span className="font-medium text-gray-500 dark:text-gray-500">{activeTrail.category}</span>}
            <div className="grid grid-cols-1 gap-2">
              <div>
                {!isMobile && (
                  <span className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">{activeTrail.name}</span>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-primary-600">Довжина:</p>
                  <span className="text-primary-600">{getTrailLength(activeTrail.trail_length)}км</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-primary-600">Максимальна висота:</p>
                  <span className="text-primary-600">{activeTrail.trail_max_elevation}м</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-primary-600">Загальний підйом:</p>
                  <span className="text-primary-600">{activeTrail.trail_ascent}м</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-primary-600">Загальний спуск:</p>
                  <span className="text-primary-600">{activeTrail.trail_descent}м</span>
                </div>
              </div>
              {activeTrail.elevation_svg && (
                <div className="relative mb-4 overflow-hidden">
                  <Image
                    src={svgConvert(activeTrail.elevation_svg)}
                    width={300}
                    height={200}
                    alt={activeTrail.name}
                    className="w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <Button className="mt-2" size="sm" variant="secondary">
                <a href={activeTrail.url} target="_blank" className="pl-1 text-blue-600 dark:text-white">
                  Дослідити маршрут
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
      <div key={`listWrapper`} className="space-y-7">
        {(activePin || activeTrail) && (pins.length > 1 || trails.length > 1) && (
          <p key={`listTitle`} className="pl-4 text-left text-2xl">
            Навколо:
          </p>
        )}
        {trails?.map((trail) => (
          <>
            {activeTrail?.id !== trail.id && (
              <div
                key={trail.id}
                className="flex flex-row items-start border-l-[6px] pl-6 mx-4 cursor-pointer relative"
                style={{ borderColor: RED }}
                onClick={() => onClickTrail(trail)}
              >
                {trail.image && (
                  <Image src={trail.image} width={80} height={80} alt={trail.name} className="mr-4 rounded-in-list" />
                )}
                <div>
                  <p className="m-0 leading-1">{trail.name}</p>
                  {trail.trail_max_elevation && (
                    <p className="text-sm">Максимальна висота: {trail.trail_max_elevation}м</p>
                  )}
                  {trail.trail_length && <p className="text-sm">Довжина: {getTrailLength(trail.trail_length)}км</p>}
                </div>
              </div>
            )}
          </>
        ))}
        {pins?.map((pin) => (
          <>
            {activePin?.id !== pin.id && (
              <div
                key={pin.id}
                className="flex flex-row items-start border-l-[6px] pl-6 mx-4 cursor-pointer relative"
                style={{ borderColor: getItemColor(pin) }}
                onClick={() => onClickPin(pin)}
              >
                {pin.image && (
                  <Image src={pin.image} width={80} height={80} alt={pin.name} className="mr-4 rounded-in-list" />
                )}
                <div className="space-y-1.5">
                  <p className="m-0 leading-1">{pin.name}</p>
                  {pin.price && (
                    <p className="text-sm">
                      {pin.pricetext} {pin.price}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">{pin.location.street}</p>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};
