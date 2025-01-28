import { Pin } from '@/api/data';

import { BLUE, RED, YELLOW, GREEN } from '@/constants/colors';

export const getItemColor = (pin: Pin) => {
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
