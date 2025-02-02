import { Pin, Route } from '@/api/data';
import { BLUE, RED, YELLOW, GREEN } from '@/constants/colors';

export const getItemColor = (pin: Pin) => {
  switch (pin.subcategory) {
    case 'Вершини':
      return RED;
  }
  switch (pin.category) {
    case 'Проживання':
      return BLUE;
    case 'Пішохідні маршрути':
      return RED;
    case "Пам'ятки культури":
      return GREEN;
    default:
      return YELLOW;
  }
};

export const getTrailLength = (length: number) => {
  return (length / 1000).toFixed(1);
};

export const getCategoryName = (group: string) => {
  switch (group) {
    case 'places':
      return 'Локації';
    case 'trails':
      return 'Пішохідні маршрути';
    case 'culture':
      return "Пам'ятки культури";
    case 'rocks':
      return 'Вершини';
    case 'hotels':
      return 'Проживання';
    default:
      return '';
  }
};

export const generateGPX = async (filename: string, coords: Route) => {
  const coordinates = await Promise.all(
    coords.map(async (point) => `<trkpt lat="${point[0]}" lon="${point[1]}"></trkpt>`)
  );

  let routeString = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://karpaty.rocks/map">
      <metadata>
        <name>${filename}</name>
        <author>
          <name>Karpaty.rocks</name>
          <link href="https://karpaty.rocks/map"></link>
        </author>
      </metadata>
      <trk>
        <name>${filename}</name>
        <type>Walking</type>
        <trkseg>
          ${coordinates.join('\n\t')}
        </trkseg>
      </trk>
    </gpx>`;

  return routeString;
};
