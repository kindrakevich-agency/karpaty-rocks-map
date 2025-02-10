'use client';

import { MobileDrawer } from '@/components/MobileDrawer/MobileDrawer';
import { Sidebar } from '@/components/Sidebar';
import { SearchBox } from '@/components/Map/Controls/SearchBox';
import { useMapStore } from '@/stores/map';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const HomePage = () => {
  const map = useMapStore((state) => state.map);
  const searchParams = useSearchParams();
  const initialTheme = searchParams.get('theme');

  return (
    <div className="h-full w-full flex overflow-hidden">
      {initialTheme === null && (
        <div className="hidden xl:flex w-[450px]">
          <Sidebar />
        </div>
      )}
      <div className="flex-1">
        <Map />
      </div>
      {map && initialTheme === null && <MobileDrawer />}
      <SearchBox />
    </div>
  );
};

export default HomePage;
