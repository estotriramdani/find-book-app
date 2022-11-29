import { createContext, ReactNode, useEffect, useState } from 'react';
import { VolumeInfo } from '../interfaces';

interface Ctx {
  favorites: {
    volumeInfo: VolumeInfo;
    id: string;
  }[];
  setFavorites: React.Dispatch<
    React.SetStateAction<
      {
        volumeInfo: VolumeInfo;
        id: string;
      }[]
    >
  >;
}

const AppContext = createContext<Ctx>({
  favorites: [],
  setFavorites: () => undefined,
});

export default AppContext;

export const LOCAL_ID = 'ajdh172e1wdjkasd';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<{ volumeInfo: VolumeInfo; id: string }[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem(LOCAL_ID);
    console.log('🚀 ~ file: AppContext.tsx ~ line 22 ~ useEffect ~ storage', storage);
    if (storage) {
      const parsed = JSON.parse(storage);
      setFavorites(parsed);
    }
  }, []);

  return <AppContext.Provider value={{ favorites, setFavorites }}>{children}</AppContext.Provider>;
};
