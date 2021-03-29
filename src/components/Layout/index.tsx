import React, { useState, useEffect } from 'react';

import LanguageContext from '../../language/context';
import TokenContext from '../../token/context';

import { default as langBR } from '../../language/langBR.json';
import { default as langEN } from '../../language/langEN.json';

import { ThemeProvider } from 'styled-components';
import { default as lightTheme } from '../../styles/themes/light.json';
import { default as darkTheme } from '../../styles/themes/dark.json';

import Header from '../../components/Header';

import { LayoutWrapper } from './styles';

// eslint-disable-next-line no-unused-vars
const Layout = ({ language, children, getGame, setGame, getPlay, ...rest }) => {
  const [token, setToken] = useState();
  const [currentLanguage, setCurrentLanguage] = useState(langBR);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const [currentMenu /*, setCurrentMenu*/] = useState(0);

  useEffect(() => {
    let systemTheme = lightTheme;
    if (
      typeof window !== 'undefined' &&
      window &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
      systemTheme = darkTheme;
    setCurrentTheme(systemTheme);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const detectBrowserLanguage = require('detect-browser-language');
    if (
      detectBrowserLanguage() &&
      (detectBrowserLanguage().toLowerCase().includes('en') ||
        detectBrowserLanguage().toLowerCase().includes('us'))
    )
      setCurrentLanguage(langEN);
    else setCurrentLanguage(langBR);
  }, []);

  const handleLanguage = () => {
    switch (currentLanguage) {
      case langEN:
        setCurrentLanguage(langBR);
        break;
      case langBR:
        setCurrentLanguage(langEN);
        break;
      default:
        break;
    }
    return currentLanguage;
  };

  const handleToken = (newToken) => {
    setToken(newToken);
    return token;
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      theme: currentTheme,
      handleToken,
      setGame,
      getGame,
      getPlay,
    });
  });

  // console.log(childrenWithProps);

  return (
    <ThemeProvider theme={currentTheme}>
      <LanguageContext.Provider value={currentLanguage}>
        <TokenContext.Provider value={token}>
          <Header
            handleToken={handleToken}
            handleLanguage={handleLanguage}
            setGame={setGame}
            getGame={getGame}
            getPlay={getPlay}
            theme={currentTheme}
            menu={currentMenu}
          />

          <LayoutWrapper
            id="mainLayoutWrapper"
            language={currentLanguage}
            setGame={setGame}
            getGame={getGame}
            theme={currentTheme}
            {...rest}
          >
            {childrenWithProps}
          </LayoutWrapper>
        </TokenContext.Provider>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
};

export default Layout;
