import { useEffect, useState } from "react";
import { RACES_COUNT, TEXTURES_COUNT, CARDS_COUNT } from '@/const';

interface Image {
  src: string;
  loaded: boolean;
}

export interface PreloadState {
  images: Image[];
  loading: boolean;
  progress: number;
}

export const usePreload = () => {
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [state, setState] = useState<PreloadState>({
    images: imagesList.map(src => ({ src, loaded: false })),
    loading: true,
    progress: 0,
  });

  useEffect(() => {
    const list: string[] = [];
    list.push(`/images/warp.webp`);
    [...Array(TEXTURES_COUNT)].forEach((_, index) => {
      list.push(`/images/textures/texture${index + 1}.webp`);
    });
    [...Array(CARDS_COUNT)].forEach((_, index) => {
      list.push(`/images/cards/${index + 1}.webp`);
    });
    [...Array(RACES_COUNT)].forEach((_, index) => {
      list.push(`/images/races/${index + 1}.webp`);
      list.push(`/images/races_preview/${index + 1}.webp`);
    });
    setImagesList(list);
  }, []);

  useEffect(() => {
    let loadedImagesCount = 0;

    const onLoad = (src: string) => () => {
      loadedImagesCount = loadedImagesCount + 1;
      const progress = (loadedImagesCount / imagesList.length) * 100;
      
      setState((prevState) => ({
        ...prevState,
        images: prevState.images.map(image => {
          return image.src === src ? { ...image, loaded: true } : image;
        }),
        progress,
      }));

      if (loadedImagesCount === imagesList.length) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    const onError = (_src: string) => () => {
      loadedImagesCount = loadedImagesCount + 1;
      const progress = (loadedImagesCount / imagesList.length) * 100;

      if (loadedImagesCount === imagesList.length) {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          progress,
        }));
      }
    };

    imagesList.forEach(src => {
      const img = new Image();
      img.onload = onLoad(src);
      img.onerror = onError(src);
      img.src = src;
    });
  }, [imagesList]);

  return state;
};
