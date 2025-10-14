import React, { FC, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useClickAway } from 'react-use';
import {useFullscreen, useToggle} from 'react-use';
import CloseIcon from '../../../public/icons/x-marks.svg';
import { useStore } from "@/store";
import { Checkbox } from '../FormComponents/Checkbox';

import './index.scss';
import { ActionTypes } from '@/store/types';
import { Button } from '../FormComponents/Button';
import { songs } from '@/data/songs';
import { NewGameModal } from '@/features/NewGame/NewGameModal';
import { Modal } from '../Modal';
import { useGameState } from '@/hooks/useGameState';
import { useI18n } from '@/i18n';
import { ISelectOption, Select } from '@/components/FormComponents/Select';

type SettingsMenuProps = {
  isVisible: boolean,
  onClose: () => void,
};

const duration = 240;
const activeStyle = { transform: 'translateX(100%)' };
const disableStyle = { transform: 'translateX(0)' };

const transitionStyles = {
  entering: disableStyle,
  entered: disableStyle,
  exiting: activeStyle,
  exited: activeStyle,
  unmounted: activeStyle,
};

export const SettingsMenu: FC<SettingsMenuProps> = ({ isVisible, onClose }) => {
  const { state, dispatch } = useStore();
  const { deleteGame } = useGameState();
  const { t } = useI18n();

  const settingModalRef = useRef(null);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(isVisible);
  const [showFullScreen, toggleShowFullScreen] = useToggle(false);
  const [newGameModalIsVisible, setNewGameModalIsVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { gameState } = state;

  const handleFullScreen = useCallback((val?: boolean) => {
    toggleShowFullScreen(val || !showFullScreen);
  }, [showFullScreen, toggleShowFullScreen]);

  const isFullscreen = useFullscreen(
    state.layoutRef as RefObject<Element>,
    showFullScreen,
    { onClose: () => handleFullScreen(false)}
  );

  useEffect(() => {
    setModalIsVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (newGameModalIsVisible) {
      onClose();
    }
  }, [newGameModalIsVisible, onClose]);

  useClickAway(settingModalRef, () => {
    setModalIsVisible(false);
    onClose();
  });

  const handleOnClose = () => {
    setModalIsVisible(false);
    onClose();
  };

  const changeAnimation = useCallback(() => {
    dispatch({
      type: ActionTypes.SET_SETTINGS,
      payload: {
        ...state.settings,
        animation: !state.settings.animation
      }
    });
  }, [dispatch, state]);

  const handleNewGameClick = (isVisible: boolean) => {
    if (gameState?.gameIsStarted) {
      setShowAlert(true);
    } else {
      setNewGameModalIsVisible(isVisible);
    }
  };

  const turnMusic = useCallback(() => {
    dispatch({
      type: ActionTypes.SET_SETTINGS,
      payload: {
        ...state.settings,
        musicIsOn: !state.settings.musicIsOn
      }
    });
  }, [dispatch, state]);

  const handleVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);

    dispatch({
      type: ActionTypes.SET_SETTINGS,
      payload: {
        ...state.settings,
        volume: newVolume
      }
    });
  }, [dispatch, state.settings]);

  const currentSong = useMemo(() => {
    return songs.find(song => song.id === state.settings.musicSongIndex);
  }, [state.settings.musicSongIndex]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleResetGameState = useCallback(() => {
    deleteGame().then(() => {
      handleCloseAlert();
    });
  }, [deleteGame]);

  const handleLanguageChange = useCallback((opt: ISelectOption | null) => {
    if (!opt) return;
    dispatch({
      type: ActionTypes.SET_SETTINGS,
      payload: { ...state.settings, language: String(opt.value) },
    });
  }, [dispatch, state.settings]);

  console.log('state', state);
  
  return(
    <>
      <Transition settingModalRef={settingModalRef} in={modalIsVisible} timeout={duration} unmountOnExit>
        {transitionState => (
          <div
            className="settings-menu"
            ref={settingModalRef}
            style={{
              ...transitionStyles[transitionState]
            }}
          >
            <header className="settings-menu__header">
              <h2>{t('settings.title')}</h2>
              <button className="settings-menu__close-btn" onClick={handleOnClose}>
                <CloseIcon />
              </button>
            </header>
            <div className="settings-menu__children">
              <Checkbox checked={isFullscreen} onChange={() => handleFullScreen()}>{t('settings.fullscreen')}</Checkbox>
              <Checkbox checked={state.settings.animation} onChange={changeAnimation}>{t('settings.animations')}</Checkbox>
              <Checkbox checked={state.settings.musicIsOn} onChange={turnMusic}>{t('settings.sounds')}</Checkbox>
              <Select
                label={t('settings.language')}
                options={[
                  { label: 'English', value: 'en' },
                  { label: 'Русский', value: 'ru' },
                ] as ISelectOption[]}
                value={{ label: state.settings.language === 'ru' ? 'Русский' : 'English', value: state.settings.language } as ISelectOption}
                onChange={(e) => handleLanguageChange(e as ISelectOption | null)}
              />
              {
                state.settings.musicIsOn &&
                <>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={state.settings.volume}
                    onChange={handleVolumeChange}
                    className='settings-menu__volume-input'
                  />
                  {
                    state.settings.musicSongIndex &&
                    <div className='settings-menu__song-wrapper'>
                      <span className='settings-menu__song-source'>{t('settings.source')}</span>
                      <a className='settings-menu__song-name link' target='_blank' href={currentSong?.link}>{currentSong?.name}</a>
                    </div>
                  }
                </>
              }
              <Button className='settings-menu__new-game-btn' onClick={() => handleNewGameClick(true)}>{t('settings.newGame')}</Button>
            </div>
          </div>
        )}
      </Transition>
      <NewGameModal 
        isVisible={newGameModalIsVisible}
        onClose={() => setNewGameModalIsVisible(false)}
      />
      <Modal
        isVisible={showAlert}
        onClose={() => handleCloseAlert()}
        title={t('modal.confirmTitle')}
      >
        <h2>{t('modal.progressReset')}</h2>
        <div className='new-game-modal__cancel-info'>
          <Button size="l" onClick={handleResetGameState}>{t('common.yes')}</Button>
          <Button size="l" onClick={() => handleCloseAlert()}>{t('common.no')}</Button>
        </div>
      </Modal>
    </>
  );
};
