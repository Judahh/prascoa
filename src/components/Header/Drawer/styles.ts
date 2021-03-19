import styled from 'styled-components';

export const ItemHolder = styled.a`
  margin: 0;
  height: 70px;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.holder};
  border-bottom: 1px solid ${(props) => props.theme.holder};
  background: ${(props) => props.theme.menu};
  color: ${(props) => props.theme.text};
  transition: none;

  &:visited {
    color: ${(props) => props.theme.text};
  }

  & + a {
    border-top: 0;
  }

  &: hover {
    background: ${(props) => props.theme.menu};
    font-weight: bold;
    color: ${(props) => props.theme.bright};
  }

  span {
    margin-top: 25px;
    display: inline-block;
  }
`;

export const Item = styled.div`
  display: inline-block;
  flex-direction: column;
  text-align: center;
  margin: 15px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  fill: ${(props) => props.theme.text};
`;

export const DrawerMenu = styled.div`
  position: relative;
  left: -100%;
  display: node;
  animation: all 1s ease;
  transition: all 0.5s ease;
  // z-index: -10;
  // opacity: 0;

  &.open {
    display: block;
    left: 0px;
    animation: all 1s ease;
    transition: all 0.5s ease;
    opacity: 1;
  }

  &.closed {
    display: none;
    left: -100%;
    animation: all 1s ease;
    transition: all 0.5s ease;
    opacity: 0;
  }
`;

export const DrawerWrapper = styled.div`
  width: 100%;
  left: 0;
  display: block;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  right: 5px;
  height: 100%;
`;

export const Toggle = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  float: right;
  outline: none;
  padding: 0;
  pointer-events: initial;
  position: relative;
  vertical-align: middle;
  z-index: 1110;
  transform: rotate(90deg);

  span {
    color: ${(props) => props.theme.primary};
    display: block;
    font-family: 'Circular-Loom';
  }

  &.active span {
    transform: rotate(90deg);
  }
`;
