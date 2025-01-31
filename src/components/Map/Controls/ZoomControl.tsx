import { FaEarthAmericas, FaMinus, FaPlus } from 'react-icons/fa6';
import { mapTiles } from '@/components/Map/constants';
import { Button } from '@/components/ui/button';
import { useMapStore } from '@/stores/map';
import { MapTiles } from '@/api/data';

export const ZoomControl = () => {
  const map = useMapStore((state) => state.map);
  const currentTile = useMapStore((state) => state.tile);
  const setTile = useMapStore((state) => state.setTile);
  const tiles = mapTiles;

  const onClickZoomIn = () => map?.zoomIn();

  const onClickZoomOut = () => map?.zoomOut();

  const tileSwitch = () => {
    (tiles as MapTiles).map((tile) => {
      if (currentTile?.name !== tile.name) setTile(tile);
    });
  };

  return (
    <div className="flex flex-col space-y-3">
      <Button size="icon" variant="outline" onClick={onClickZoomIn}>
        <FaPlus className="h-4 w-4" />
      </Button>

      <Button size="icon" variant="outline" onClick={onClickZoomOut}>
        <FaMinus className="h-4 w-4" />
      </Button>

      <Button size="icon" variant="outline" onClick={tileSwitch}>
        <FaEarthAmericas className="h-4 w-4" />
      </Button>
    </div>
  );
};
