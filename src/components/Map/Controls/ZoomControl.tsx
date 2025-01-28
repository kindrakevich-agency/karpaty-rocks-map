import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useMapStore } from '@/stores/map';

export const ZoomControl = () => {
  const map = useMapStore((state) => state.map);

  const onClickZoomIn = () => map?.zoomIn();

  const onClickZoomOut = () => map?.zoomOut();

  return (
    <div className="flex flex-col space-y-3">
      <Button size="icon" variant="outline" onClick={onClickZoomIn}>
        <Plus className="h-4 w-4" />
      </Button>

      <Button size="icon" variant="outline" onClick={onClickZoomOut}>
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
};
