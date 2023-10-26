import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import Image from 'next/image';
import { Transition } from 'react-transition-group';
import { useClickAway } from 'react-use';

import './index.scss';

type CardModalProps = {
  src: string,
  isVisible: boolean,
  clientX: number,
};

const duration = 300;

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
  unmounted:  { opacity: 0 },
};

export const CardModal: FC<CardModalProps> = ({ src, isVisible, clientX }) => {
  const nodeRef = useRef(null);
  const [modalPosition, setModalPosition] = useState<'left' | 'right'>('right');
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(isVisible);

  useEffect(() => {
    setModalIsVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    const clientWidth = window.innerWidth;

    if (clientWidth / 2 > clientX) {
      setModalPosition('right');
    } else {
      setModalPosition('left');
    }
  }, [clientX]);

  useClickAway(nodeRef, () => {
    setModalIsVisible(false);
  });

  const handleOnClick = () => {
    setModalIsVisible(false);
  };

  return(
    createPortal(
      <Transition nodeRef={nodeRef} in={modalIsVisible} timeout={duration} unmountOnExit>
        {state => (
          <div
            ref={nodeRef}
            style={{
              ...transitionStyles[state]
            }}
            className={cx('card-modal', `card-modal--${modalPosition}` )}
            onClick={handleOnClick}
          >
            {
              src &&
              <Image
                  fill
                  alt=''
                  src={src}
                  style={{
                    objectFit: 'contain',
                  }}
                  className='card-modal__image'
              />
            }
          </div>
        )}
      </Transition>,
      document.body
    )
  );
};
