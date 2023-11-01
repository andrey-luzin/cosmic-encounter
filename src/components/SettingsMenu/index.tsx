import React, { FC, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useClickAway } from 'react-use';
import {useFullscreen, useToggle} from 'react-use';
import CloseIcon from '../../../public/icons/x-marks.svg';
import { useStore } from "@/store";
import { Checkbox } from '../FormComponents/Checkbox';

import './index.scss';
import { ActionTypes } from '@/store/types';

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
  const settingModalRef = useRef(null);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(isVisible);
  const [showFullScreen, toggleShowFullScreen] = useToggle(false);

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
        animation: !state.settings.animation
      }
    });
  }, [dispatch, state]);

  return(
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
            <h2>Settings</h2>
            <button className="settings-menu__close-btn" onClick={handleOnClose}>
              <CloseIcon />
            </button>
          </header>
          <div className="settings-menu__children">
            <Checkbox checked={isFullscreen} onChange={() => handleFullScreen()}>Full Screen</Checkbox>
            <Checkbox checked={state.settings.animation} onChange={changeAnimation}>Animation</Checkbox>
          </div>
        </div>
      )}
    </Transition>
  );
};
