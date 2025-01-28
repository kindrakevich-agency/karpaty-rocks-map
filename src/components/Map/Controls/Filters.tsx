import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePinStore } from '@/stores/pins';
import { useShallow } from 'zustand/react/shallow';

export const Filters = () => {
  const { filters, selectedFilter, setSelectedFilter } = usePinStore(
    useShallow((state) => ({
      filters: state.filters,
      selectedFilter: state.selectedFilter,
      setSelectedFilter: state.setSelectedFilter
    }))
  );

  return (
    <Select value={selectedFilter} onValueChange={(value) => setSelectedFilter(value)}>
      <SelectTrigger className="w-[104px] pointer-events-auto">
        <SelectValue placeholder="Select a date" />
      </SelectTrigger>
      <SelectContent className="pointer-events-auto" style={{ zIndex: 99999 }}>
        {filters.map((filter) => (
          <SelectItem key={filter.filter} value={filter.filter}>
            {filter.filter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
