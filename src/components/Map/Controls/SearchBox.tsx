'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { FaLocationDot, FaBed, FaBuildingColumns, FaSignsPost, FaMountainSun, FaXmark } from 'react-icons/fa6';
import { usePinStore } from '@/stores/pins';
import { useMapStore } from '@/stores//map';
import { BLUE, RED, YELLOW, GREEN } from '@/constants/colors';
import { MAX_CITY_ZOOM } from '@/components/Map/constants';
import { Pin, Trail } from '@/api/data';
import { getTrailLength, getCategoryName } from '@/utils/helpers';
import { useShallow } from 'zustand/react/shallow';
import './style.css';

export const SearchBox = () => {
  const map = useMapStore((state) => state.map);
  const searchOpen = usePinStore((state) => state.searchOpen);
  const setSearchOpen = usePinStore((state) => state.setSearchOpen);
  const searchResults = usePinStore((state) => state.searchResults);
  const setSearchResults = usePinStore((state) => state.setSearchResults);
  const setActivePin = usePinStore((state) => state.setActivePin);
  const setActiveTrail = usePinStore((state) => state.setActiveTrail);
  const [searchValue, setSearchValue] = useState('');
  const { drawerSnapPoint, setDrawerSnapPoint } = useMapStore(
    useShallow((state) => ({ drawerSnapPoint: state.drawerSnapPoint, setDrawerSnapPoint: state.setDrawerSnapPoint }))
  );
  useEffect(() => {
    if (searchValue.length > 3) {
      setSearchResults(searchValue);
    }
  }, [searchValue, setSearchResults]);
  const matchEntries = Object.entries(searchResults);
  return (
    <form className={`searchbox ${searchOpen ? 'open' : 'hidden'}`}>
      <div className={`backdrop ${searchOpen ? 'open' : 'hidden'}`} onClick={() => setSearchOpen(false)}></div>
      <div className={`dialog pointer-events-auto ${searchOpen ? 'open' : 'hidden'}`}>
        <div className="combobox-wrapper">
          <Input
            placeholder="Введіть текст для пошуку..."
            className="combobox focus-visible:outline-none text-base"
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={(e) => setDrawerSnapPoint('40px')}
          />
          <Button type="button" className="button secondary escape" onClick={() => setSearchOpen(false)}>
            <FaXmark />
          </Button>
        </div>
        <div className="list text-base">
          {!matchEntries.length && <div className="no-results text-center p-3">Результати відсутні</div>}
          {matchEntries.map(([group, items]) => (
            <div key={group} className="group">
              {group == 'trails' && (
                <>
                  {items?.length !== 0 && <div className="group-label">{getCategoryName(group)}</div>}
                  {(items as Trail[]).map((item) => (
                    <div
                      className="list-item"
                      key={item.id}
                      onClick={(e) => {
                        setSearchOpen(false);
                        setActiveTrail(item);
                      }}
                    >
                      <span className="item-icon" aria-hidden>
                        <FaSignsPost color={RED} />
                      </span>
                      <span className="item-title" aria-hidden>
                        {item.name}
                      </span>
                      {item.trail_length && (
                        <span className="item-type" aria-hidden>
                          {getTrailLength(item.trail_length)}км
                        </span>
                      )}
                    </div>
                  ))}
                </>
              )}
              {group != 'trails' && (
                <>
                  {items?.length !== 0 && <div className="group-label">{getCategoryName(group)}</div>}
                  {(items as Pin[]).map((item) => (
                    <div
                      className="list-item"
                      key={item.id}
                      onClick={(e) => {
                        setSearchOpen(false);
                        if (item.category == 'Локація') {
                          map?.flyTo([Number(item.location.latitude), Number(item.location.longitude)], MAX_CITY_ZOOM, {
                            animate: true
                          });
                        } else {
                          setActivePin(item);
                        }
                      }}
                    >
                      {item.category == 'Локація' && (
                        <span className="item-icon" aria-hidden>
                          <FaLocationDot color={YELLOW} />
                        </span>
                      )}
                      {item.category == 'Проживання' && (
                        <span className="item-icon" aria-hidden>
                          <FaBed color={BLUE} />
                        </span>
                      )}
                      {item.category == "Пам'ятки культури" && (
                        <span className="item-icon" aria-hidden>
                          <FaBuildingColumns color={GREEN} />
                        </span>
                      )}
                      {item.category == 'Вершини' && (
                        <span className="item-icon" aria-hidden>
                          <FaMountainSun color={GREEN} />
                        </span>
                      )}
                      <span className="item-title" aria-hidden>
                        {item.name}
                      </span>
                      {item.price && (
                        <span className="item-type" aria-hidden>
                          від {item.price}
                        </span>
                      )}
                      {item.category == 'Вершини' && item.height && (
                        <span className="item-type" aria-hidden>
                          {item.height}м
                        </span>
                      )}
                      {item.category == "Пам'ятки культури" && item.subcategory && (
                        <span className="item-type" aria-hidden>
                          {item.subcategory}
                        </span>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
