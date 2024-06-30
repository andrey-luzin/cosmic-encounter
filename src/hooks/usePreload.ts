import { useEffect, useState } from "react";
import {
  RACES_COUNT,
  TEXTURES_COUNT,
  COSMIC_CARDS_COUNT,
  COSMIC_CARDS_PATH,
  RACES_PATH,
  RACES_PREVIEW_PATH,
  TEXTURES_PATH,
  FLARES_PATH,
  SONGS_COUNT,
  SONGS_PATHS,
  DESTINIES_COUNT,
  DESTINIES_PATH,
} from '@/const';

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
    [...Array(TEXTURES_COUNT)].forEach((_, index) => {
      list.push(`/images/${TEXTURES_PATH}/texture${index + 1}.webp`);
    });
    [...Array(COSMIC_CARDS_COUNT)].forEach((_, index) => {
      list.push(`/images/${COSMIC_CARDS_PATH}/${index + 1}.webp`);
    });
    [...Array(RACES_COUNT)].forEach((_, index) => {
      list.push(`/images/${RACES_PATH}/${index + 1}.webp`);
      list.push(`/images/${RACES_PREVIEW_PATH}/${index + 1}.webp`);
      list.push(`/images/${FLARES_PATH}/${index + 1}.webp`);
    });
    [...Array(SONGS_COUNT)].forEach((_, index) => {
      list.push(`/${SONGS_PATHS}/${index + 1}.mp3`);
    });
    [...Array(DESTINIES_COUNT)].forEach((_, index) => {
      list.push(`/images/${DESTINIES_PATH}/${index + 1}.webp`);
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
