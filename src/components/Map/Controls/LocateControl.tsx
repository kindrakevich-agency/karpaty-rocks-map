import { FaLocationCrosshairs } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { useMapStore } from '@/stores/map';

export const LocateControl = () => {
  const map = useMapStore((state) => state.map);

  const onClick = () => map?.locate({ setView: false, enableHighAccuracy: true });

  return (
    <Button size="icon" variant="outline" onClick={onClick}>
      <FaLocationCrosshairs className="h-4 w-4" />
    </Button>
  );
};
