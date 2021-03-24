// file deepcode ignore no-any: any needed
import React, { useContext, useRef } from 'react';
import { ModalPageWrapper } from '../styles';
import LanguageContext from '../../../language/context';
import { SocialIcon } from 'react-social-icons';
import { FaRegClone } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const Share = (): JSX.Element => {
  const { share } = useContext(LanguageContext);
  const tooltipRef = useRef<HTMLParagraphElement>(null);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ReactTooltip.show(tooltipRef.current);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => ReactTooltip.hide(tooltipRef.current), 1500);
  };

  for (const key in share) {
    if (share.hasOwnProperty(key)) {
      if (key === 'clone')
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
      else
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
    }
  }
  return <ModalPageWrapper>{navItems}</ModalPageWrapper>;
};

export default Share;
