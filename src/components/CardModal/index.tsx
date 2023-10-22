import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { Transition } from 'react-transition-group';

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

  useEffect(() => {
    const clientWidth = window.innerWidth;
    console.log(clientWidth, clientWidth/2, clientX);
    
    if (clientWidth / 2 > clientX) {
      setModalPosition('right');
    } else {
      setModalPosition('left');
    }
  }, [clientX]);

  return(
    <Transition nodeRef={nodeRef} in={isVisible} timeout={duration} unmountOnExit>
      {state => (
        <div
          ref={nodeRef}
          style={{
            ...transitionStyles[state]
          }}
          className={cx('card-modal', `card-modal--${modalPosition}` )}
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
    </Transition>
  );
};
