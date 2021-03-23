// file deepcode ignore no-any: any needed
import React, { useContext } from 'react';
import { default as shareIcon } from '../../../language/share.json';
import { ModalPageWrapper } from '../styles';
import LanguageContext from '../../../language/context';
import { SocialIcon } from 'react-social-icons';
import { FaRegClone } from 'react-icons/fa';

const Share = (props) => {
  const { share } = useContext(LanguageContext);

  const navItems: JSX.Element[] = [];

  const copy = (text) => {
    const temp: HTMLInputElement = document.createElement(
      'INPUT'
    ) as HTMLInputElement;
    document.body.appendChild(temp);
    temp.value = text;
    temp.select();
    document.execCommand('copy');
    temp.remove();
  };

  for (const key in shareIcon) {
    if (shareIcon.hasOwnProperty(key)) {
      const element = shareIcon[key];
      console.log(element);
      console.log(share[key]);
      if (key !== 'clone')
        navItems.push(
          <SocialIcon
            // prefix={element[0]}
            network={key}
            bgColor="transparent"
            fgColor="#fff"
            url={share[key]}
          />
        );
      else
        navItems.push(
          <FaRegClone
            onClick={() => {
              copy(share[key]);
            }}
            style={{
              height: '25px',
              width: '25px',
              display: 'inline-block',
              verticalAlign: 'middle',
              margin: '10px',
            }}
          />
        );
    }
  }
  return <ModalPageWrapper>{navItems}</ModalPageWrapper>;
};

export default Share;
