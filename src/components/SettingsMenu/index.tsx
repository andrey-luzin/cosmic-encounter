import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useClickAway } from 'react-use';

import CloseIcon from '../../../public/icons/x-marks.svg';

import './index.scss';

type SettingsMenuProps = {
  isVisible: boolean,
  onClose: () => void,
};

const duration = 240;

const transitionStyles = {
  entering: { transform: 'translateX(0)' },
  entered:  { transform: 'translateX(0)' },
  exiting:  { transform: 'translateX(100%)' },
  exited:  { transform: 'translateX(100%)' },
  unmounted:  { transform: 'translateX(100%)' },
};

export const SettingsMenu: FC<PropsWithChildren<SettingsMenuProps>> = ({
  isVisible,
  onClose,
  children,
}) => {
  const nodeRef = useRef(null);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(isVisible);

  useEffect(() => {
    setModalIsVisible(isVisible);
  }, [isVisible]);

  useClickAway(nodeRef, () => {
    setModalIsVisible(false);
    onClose();
  });

  const handleOnClose = () => {
    setModalIsVisible(false);
    onClose();
  };

  return(
    <Transition nodeRef={nodeRef} in={modalIsVisible} timeout={duration} unmountOnExit>
      {state => (
        <div
          className="settings-menu"
          ref={nodeRef}
          style={{
            ...transitionStyles[state]
          }}
        >
          <header className="settings-menu__header">
            <h2>Settings</h2>
            <button className="settings-menu__close-btn" onClick={handleOnClose}>
              <CloseIcon />
            </button>
          </header>
          {children}
        </div>
      )}
    </Transition>
  );
};
