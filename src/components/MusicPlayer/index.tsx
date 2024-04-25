import { useCallback, useEffect, useState } from 'react';
import { Howl } from 'howler';
import { SONGS_COUNT, SONGS_PATHS } from '@/const';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

type MusicPlayerProps = unknown;

const audioFiles = [...Array(SONGS_COUNT)].map((_, index) => {
  return `/${SONGS_PATHS}/${index + 1}.mp3`;
});
const BASE_PAUSE_BETWEEN_SONGS = 7;

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const { state, dispatch } = useStore();
  const [audioPlayer, setAudioPlayer] = useState<Howl>();
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number | null>(null);

  const playNextAudio = useCallback(() => {
    // new uniq random;
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    setCurrentAudioIndex(randomIndex);
    
    dispatch({
      type: ActionTypes.SET_SETTINGS,
      payload: {
        ...state.settings,
        musicSongIndex: randomIndex + 1,
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    playNextAudio();
  }, [playNextAudio]);

  useEffect(() => {
    if (currentAudioIndex) {
      const audio = new Howl({
        src: [audioFiles[currentAudioIndex]],
        volume: state.settings.volume,
        onend: () => {
          const randomPause = Math.floor(Math.random() * 1) + BASE_PAUSE_BETWEEN_SONGS;
          setTimeout(() => {
            playNextAudio();
          }, randomPause * 1000);
        },
      });
      if (audio) {
        setAudioPlayer(audio);
      };

      audio.play();

      return () => {
        audio.unload();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudioIndex, playNextAudio, state.settings.volume]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.volume(state.settings.volume);
    }
  }, [audioPlayer, state.settings.volume]);

  return null;
};

export default MusicPlayer;
