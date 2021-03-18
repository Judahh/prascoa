import React from 'react';
import { HeaderWrapper } from './styles';
import Drawer from './Drawer/index';
import Scroll from '../../components/Scroll';

const Header = (props) => {
  return (
    <HeaderWrapper menu={props.menu}>
      <Drawer
        theme={props.theme}
        handleLanguage={props.handleLanguage}
        menu={props.menu}
      />

      <Scroll />
    </HeaderWrapper>
  );
};
export default Header;
