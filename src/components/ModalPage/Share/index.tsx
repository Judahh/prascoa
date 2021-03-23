// file deepcode ignore no-any: any needed
import React, { useContext, useRef } from 'react';
import { default as shareIcon } from '../../../language/share.json';
import { ModalPageWrapper } from '../styles';
import LanguageContext from '../../../language/context';
import { SocialIcon } from 'react-social-icons';
import { FaRegClone } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const Share = (props) => {
  const { share } = useContext(LanguageContext);
  const tooltipRef = useRef<React.RefObject<HTMLElement>>(null);

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
    ReactTooltip.show(tooltipRef.current);
    setTimeout(() => ReactTooltip.hide(tooltipRef.current), 1500);
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
            key={key}
            network={key}
            bgColor="transparent"
            fgColor="#fff"
            url={share[key]}
            target="_blank"
          />
        );
      else
        navItems.push(
          <div
            key={key}
            onClick={() => {
              copy(share[key].text);
            }}
            style={{
              display: 'inline-block',
            }}
          >
            <p ref={tooltipRef} data-tip={share[key].tooltip}></p>
            <ReactTooltip />
            <FaRegClone
              style={{
                height: '25px',
                width: '25px',
                display: 'inline-block',
                verticalAlign: 'middle',
                margin: '10px',
              }}
            ></FaRegClone>
          </div>
        );
    }
  }
  return <ModalPageWrapper>{navItems}</ModalPageWrapper>;
};

export default Share;
