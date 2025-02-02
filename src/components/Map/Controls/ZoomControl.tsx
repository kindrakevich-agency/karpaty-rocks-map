import { FaEarthAmericas, FaMinus, FaPlus, FaRoute, FaDownload } from 'react-icons/fa6';
import { mapTiles } from '@/components/Map/constants';
import { Button } from '@/components/ui/button';
import { useMapStore } from '@/stores/map';
import { MapTiles } from '@/api/data';
import toast from 'react-hot-toast';
import downloadjs from 'downloadjs';
import { generateGPX } from '@/utils/helpers';

export const ZoomControl = () => {
  const map = useMapStore((state) => state.map);
  const currentTile = useMapStore((state) => state.tile);
  const setTile = useMapStore((state) => state.setTile);
  const setDrawRoute = useMapStore((state) => state.setDrawRoute);
  const drawRoute = useMapStore((state) => state.drawRoute);
  const setRouteStart = useMapStore((state) => state.setRouteStart);
  const setRouteEnd = useMapStore((state) => state.setRouteEnd);
  const setRoute = useMapStore((state) => state.setRoute);
  const route = useMapStore((state) => state.route);
  const tiles = mapTiles;

  const onClickZoomIn = () => map?.zoomIn();

  const onClickZoomOut = () => map?.zoomOut();

  const tileSwitch = () => {
    (tiles as MapTiles).map((tile) => {
      if (currentTile?.name !== tile.name) setTile(tile);
    });
  };

  const notify = () =>
    toast('Клікніть на карту і встановіть старт та фініш маршруту', {
      icon: '👏',
      style: {
        borderRadius: '4px',
        background: '#333',
        color: '#fff'
      }
    });

  const onClickStartRoute = () => {
    setRouteStart(null);
    setRouteEnd(null);
    useMapStore.setState({ route: [] });
    setDrawRoute(true);
    notify();
  };

  const onClickStopRoute = () => {
    setRouteStart(null);
    setRouteEnd(null);
    useMapStore.setState({ route: [] });
    setDrawRoute(false);
  };

  const date = new Date().valueOf();
  const filename = `route_${date}`;

  const downloadRoute = async () => {
    if (route.length > 0) {
      const routeFile = await generateGPX(filename, route);
      if (routeFile) {
        downloadjs(routeFile, `${filename}.gpx`, `application/'application/gpx+xml`);
      }
    }
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
      {drawRoute ? (
        <Button size="icon" variant="destructive" onClick={onClickStopRoute}>
          <FaRoute className="h-4 w-4" />
        </Button>
      ) : (
        <Button size="icon" variant="outline" onClick={onClickStartRoute}>
          <FaRoute className="h-4 w-4" />
        </Button>
      )}
      {route.length > 0 && (
        <Button size="icon" variant="outline" onClick={downloadRoute}>
          <FaDownload className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
