import clsx from 'clsx';
import React, { useState } from 'react';
import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';

export const DefaultLayout: React.FC = (props) => {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  return (
    <div className="flex flex-no-wrap h-screen bg-gray-100">
      <Sidebar showMenuMobile={showMenuMobile} onToggleMenuMobile={() => setShowMenuMobile(!showMenuMobile)} />
      <div
        className={clsx(
          'main-content flex flex-1 flex-col overflow-x-hidden z-10 bg-gray-100',
          'flex flex-col h-screen justify-between',
        )}
      >
        <div className="app-shell-container">
          <Header onToggleMenuMobile={() => setShowMenuMobile(!showMenuMobile)} />
          <div className="p-4 md:p-8 mx-auto bg-gray-100">{props.children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
