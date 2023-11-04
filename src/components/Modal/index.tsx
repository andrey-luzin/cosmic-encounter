import React, { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { useClickAway } from 'react-use';
import { useStore } from '@/store';

import CloseIcon from '../../../public/icons/x-marks.svg';

import './index.scss';

type ModalProps = {
  isVisible: boolean;
  title?: string;
  onClose: () => void,
};

const duration = 300;

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
  unmounted:  { opacity: 0 },
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isVisible,
  title,
  onClose,
  children,
}) => {
  const { state } = useStore();
  // const [modalIsVisible, setModalIsVisible] = useState<boolean>(isVisible);

  // useEffect(() => {
  //   setModalIsVisible(isVisible);
  // }, [isVisible]);

  // useClickAway(nodeRef, () => {
  //   setModalIsVisible(false);
  // });

  const handleOnClick = useCallback(() => {
    onClose();
    // setModalIsVisible(false);
  }, [onClose]);

  if (typeof window === 'undefined') {
    return null;
  }

  return(
    createPortal(
      <Transition in={isVisible} timeout={duration} unmountOnExit>
        {state => (
          <div
            style={{
              ...transitionStyles[state]
            }}
            className="modal"
          >
            <div className="modal__overlay" onClick={handleOnClick}/>
            <div className="modal__body">
              <button className="modal__close" onClick={handleOnClick}><CloseIcon/></button>
              <div className="modal__body-inner">
                {title && <h2 className="modal__title">{title}</h2>}
                {children}
              </div>
            </div>
          </div>
        )}
      </Transition>,
      state.layoutRef?.current || document?.body
    )
  );
};
