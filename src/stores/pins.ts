import { Pin, Filter, Trail, Location, Search } from '@/api/data';
import { LatLngBounds } from 'leaflet';
import { create } from 'zustand';
import { useMapStore } from './map';
import { initSearch } from '@/components/Map/constants';

interface PinState {
  filters: Filter[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  pins: Pin[];
  updatePins: (bounds: LatLngBounds, date?: string) => void;
  trails: Trail[];
  activePin: Pin | null;
  setActivePin: (pin: Pin) => void;
  removeActivePin: (pin: null) => void;
  activeTrail: Trail | null;
  setActiveTrail: (trail: Trail) => void;
  removeActiveTrail: (trail: null) => void;
  location: Location | null;
  searchOpen: boolean;
  setSearchOpen: (searchOpen: boolean) => void;
  searchResults: Search | [];
  setSearchResults: (query: string) => void;
}

export const usePinStore = create<PinState>((set, get) => ({
  location: null,
  filters: [],
  selectedFilter: '',
  setSelectedFilter: (filter) => {
    get().updatePins(useMapStore.getState().map?.getBounds() as LatLngBounds, filter);
    set({ selectedFilter: filter });
  },
  pins: [],
  activePin: null,
  setActivePin: (pin: Pin) => {
    set({ activePin: pin });
  },
  removeActivePin: () => set({ activePin: null }),
  activeTrail: null,
  setActiveTrail: (trail: Trail) => {
    set({ activeTrail: trail });
  },
  removeActiveTrail: () => set({ activeTrail: null }),
  searchOpen: false,
  setSearchOpen: (searchOpen: boolean) => {
    set({ searchOpen: searchOpen });
  },
  searchResults: [],
  setSearchResults: async (query: string) => {
    const result = await fetch(`/api/search?value=${query}`);
    const searchResults = await result.json();
    set({ searchResults });
  },
  trails: [],
  updatePins: async (bounds: LatLngBounds, filter?: string) => {
    const result = await fetch(
      `/api/bounds?NorthEast_lat=${bounds.getNorthEast().lat}&NorthEast_lon=${bounds.getNorthEast().lng}&SouthWest_lat=${bounds.getSouthWest().lat}&SouthWest_lon=${bounds.getSouthWest().lng}&filter=${filter}`
    );
    const data = await result.json();
    const trails = data.trails;
    set({ trails });
    const pins = data.objects;
    set({ pins });

    let location = {
      title: data.title,
      subtitle: data.subtitle
    };
    set({ location });
  }
}));

const initStore = async () => {
  const filters = [
    {
      filter: 'Фільтр'
    },
    {
      filter: 'Житло'
    },
    {
      filter: 'Цікаве'
    },
    {
      filter: 'Маршрути'
    }
  ];
  const searchResults = initSearch;

  return {
    filters,
    searchResults
  };
};

initStore()
  .then((values) =>
    usePinStore.setState({
      filters: values.filters,
      selectedFilter: values.filters[0].filter,
      searchResults: values.searchResults
    })
  )
  .catch((err) => console.error(err));
