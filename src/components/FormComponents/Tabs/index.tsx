import React, { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Button } from '../Button';

import './index.scss';

type TabsComponent = {
  Panel: typeof Panel,
};

type PanelProps = {
  title: string;
  disabled?: boolean;
  children?: React.ReactNode[] | React.ReactNode;
};

type TabsProps = {
  activeTabIndex?: number;
  children: ({ props: PanelProps } & ReactNode)[];
};

export const Panel: FC<PropsWithChildren<PanelProps>> = ({ children }) => children;

export const Tabs: FC<TabsProps> & TabsComponent = ({ activeTabIndex, children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if (activeTabIndex) {
      setActiveTab(activeTabIndex);
    }
  }, [activeTabIndex]);

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  return(
    <div className="tabs">
      <nav className='tabs__nav'>
        {
          children.map((child, index) => {
            return (
              <Button
                className='tabs__button'
                onClick={() => handleTabClick(index)}
                view={index === activeTab ? "filled" : 'default'}
                disabled={child.props.disabled}
                key={index}
              >{child.props.title}</Button>
            );
          })
        }
      </nav>
      {children[activeTab]}
    </div>
  );
};

Tabs.Panel = Panel;
