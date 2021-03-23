// file deepcode ignore no-any: any needed
import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  DrawerWrapper,
  DrawerMenu,
  Toggle,
  Item,
  DrawerModal,
  Modal,
  DrawerModalHolder,
} from './styles';
import { Text } from '../../../components/Text';
import { NavHolder } from '../../../components/Header/Nav/styles';
import LanguageContext from '../../../language/context';
import { default as map } from '../../../pages/map.json';
import { ModalType } from './modalType';
import Share from '../../ModalPage/Share';
import Map from '../../ModalPage/Map';

const Drawer = (props) => {
  // console.log(props);

  const { nav, languageAcronym } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(ModalType.None);
  const [collapsed, setCollapsed] = useState(false);
  const navItems: Array<{ href: any; content: any; modal: ModalType }> = [];
  const wrapperRef = useRef(null);

  const svg = {
    map: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="17"
        viewBox="0 0 30 30"
      >
        <path d="M19.333 6.646L9.666 3.247v19.107l9.667 3.398V6.646zM29 .83v24.318c0 .353-.202.604-.604.755l-9.063 3.096L9.666 25.6l-8.609 3.324a.578.578 0 0 1-.226.074c-.504-.049-.782-.327-.832-.831V3.849c0-.402.202-.653.605-.755L9.666-.002l9.667 3.399 8.61-3.399h.226c.503.05.78.328.831.831z"></path>
      </svg>
    ),
    share: (
      <svg width="20" height="17" viewBox="0 0 29 34">
        <path d="M24.1 22.6c-1.3.1-2.3.5-3.2 1.2L9.4 17.2c.1-.4.2-.7.2-1.1 0-.4-.1-.8-.2-1.1l11.3-6.6c.9.9 2 1.3 3.4 1.3 1.3 0 2.5-.5 3.4-1.4.9-.9 1.4-2 1.4-3.4s-.5-2.5-1.4-3.4S25.4 0 24.1 0s-2.5.5-3.4 1.4-1.4 2.1-1.4 3.5c0 .4.1.7.2 1.1L8.1 12.5c-.9-.8-2-1.2-3.4-1.2s-2.5.5-3.4 1.4-1.3 2-1.3 3.4.5 2.5 1.4 3.4c.9.9 2 1.4 3.4 1.4s2.5-.4 3.4-1.2l11.4 6.6c-.1.4-.1.7-.1 1.1 0 1.4.5 2.5 1.4 3.4s2 1.3 3.3 1.3c1.3 0 2.4-.4 3.3-1.3s1.4-2 1.4-3.3-.5-2.4-1.4-3.3c-1-1.1-2.1-1.5-3.4-1.6z"></path>
      </svg>
    ),
  };

  for (const key in map.sections) {
    // console.log(key);
    if (map.sections.hasOwnProperty(key)) {
      const element = map.sections[key];
      // console.log(element);
      // console.log(nav[key]);
      if (key !== 'home')
        navItems.push({
          href: element,
          content: key !== 'home' ? nav[key] : '‏‏‎ ‎',
          modal: ModalType[key],
        });
    }
  }

  const handleOpen = () => {
    if (open) {
      setOpen(false);
      setCollapsed(false);
    } else {
      setOpen(true);
    }
  };

  const handleCollapsed = () => {
    if (open) {
      setCollapsed(true);
      setOpen(false);
    }
  };

  const setAndHandleCollapsed = (type: ModalType) => {
    handleCollapsed();
    set(type);
  };

  const set = (type: ModalType) => {
    if (modal !== type) {
      setModal(type);
    }
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef?.current?.contains(event.target)) {
        setModal(ModalType.None);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <DrawerWrapper>
      <NavHolder>
        <Toggle className={open ? 'active' : ''} onClick={handleOpen}>
          <Item>
            <span>•••</span>
          </Item>
        </Toggle>
        <DrawerMenu
          className={open ? 'open' : !open && collapsed ? 'closed' : ''}
        >
          {navItems.map((item, index) => {
            return (
              <Item
                key={index}
                href={item.href}
                onClick={() => {
                  setAndHandleCollapsed(item.modal);
                }}
                menu={props.menu}
              >
                {svg[item.content]}
              </Item>
            );
          })}

          <Item onClick={props.handleLanguage}>
            <Text>{languageAcronym}</Text>
          </Item>
        </DrawerMenu>

        <DrawerModalHolder
          className={modal !== ModalType.None ? 'open' : 'closed'}
        >
          <DrawerModal ref={wrapperRef}>
            <Modal className="open">
              {modal === ModalType.Share ? (
                <Share />
              ) : (
                <Map setGame={props.setGame} getGame={props.getGame} />
              )}
            </Modal>
          </DrawerModal>
        </DrawerModalHolder>
      </NavHolder>
    </DrawerWrapper>
  );
};

export default Drawer;
