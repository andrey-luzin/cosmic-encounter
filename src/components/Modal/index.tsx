import React, { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { useStore } from '@/store';

import CloseIcon from '../../../public/icons/x-marks.svg';

import './index.scss';

export type ModalProps = {
  isVisible: boolean;
  title?: string | JSX.Element;
  onClose: () => void,
  className?: string,
  withoutPadding?: boolean,
  canClose?: boolean,
  // modifier?: 'large',
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
  className,
  withoutPadding,
  canClose = true,
  children,
}) => {
  const { state } = useStore();
 
  useEffect(() => {
    if (canClose) {
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isVisible) {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyUp);
      };
    }
  }, [onClose, isVisible, canClose]);

  const handleOnClick = useCallback(() => {
    if (canClose) {
      onClose();
    }
  }, [onClose, canClose]);

  if (typeof window === 'undefined' && !isVisible) {
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
            className={cx("modal", className)}
          >
            <div className="modal__overlay" onClick={handleOnClick}/>
            <div className="modal__body">
              {
                canClose &&
                <button className="modal__close" onClick={handleOnClick}><CloseIcon/></button>
              }
              <div className={cx(
                "modal__body-inner",
                { "modal__body-inner--without-padding": withoutPadding }
              )}>
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
