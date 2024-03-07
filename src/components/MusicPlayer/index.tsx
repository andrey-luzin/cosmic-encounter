import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { SONGS_COUNT, SONGS_PATHS } from '@/const';
import { useStore } from '@/store';

type MusicPlayerProps = unknown;

const audioFiles = [...Array(SONGS_COUNT)].map((_, index) => {
  return `/${SONGS_PATHS}/${index + 1}.mp3`;
});

const randomSong = Math.floor(Math.random() * audioFiles.length);

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const { state } = useStore();
  const [audioPlayer, setAudioPlayer] = useState<Howl>();
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(randomSong);

  const playNextAudio = () => {
    // new uniq random;
    setCurrentAudioIndex(Math.floor(Math.random() * audioFiles.length));
  };

  useEffect(() => {
    const audio = new Howl({
      src: [audioFiles[currentAudioIndex]],
      volume: state.settings.volume,
      onend: () => {
        const randomPause = Math.floor(Math.random() * 1) + 5;
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
  }, [currentAudioIndex]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.volume(state.settings.volume);
    }
  }, [audioPlayer, state.settings.volume]);

  return null;
};

export default MusicPlayer;
