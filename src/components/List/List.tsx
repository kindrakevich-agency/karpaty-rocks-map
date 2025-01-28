import { Pin, Trail } from '@/api/data';
import { usePinStore } from '@/stores/pins';
import { useMapStore } from '@/stores/map';
import { BLUE, RED, YELLOW, GREEN } from '@/constants/colors';
import Image from 'next/image';
import { getItemColor } from '@/utils/helpers';

export const List = () => {
  const pins = usePinStore((state) => state.pins);
  const trails = usePinStore((state) => state.trails);
  const setActivePin = usePinStore((state) => state.setActivePin);
  const setActiveTrail = usePinStore((state) => state.setActiveTrail);
  const removeActivePin = usePinStore((state) => state.removeActivePin);
  const removeActiveTrail = usePinStore((state) => state.removeActiveTrail);

  const onClickPin = (pin: Pin) => {
    removeActiveTrail(null);
    setActivePin(pin);
  };

  const onClickTrail = (trail: Trail) => {
    removeActivePin(null);
    setActiveTrail(trail);
  };

  return (
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
  );
};
