import styled from 'styled-components';
export const Background = styled.div`
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: ${(props) => props.theme.background};
  padding-left: 140px;
  position: absolute;
`;
export const SvgCanvas = styled.canvas`
  // transition: none;
  // animation: none;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0px;
  padding-right: 0px;

  width: 100%;
  height: 100%;
  @media all and (orientation: portrait) {
    width: 100%;
    padding-left: 140px;
    height: 100vw;
  }
  @media all and (orientation: landscape) {
    width: 100vh;
    height: 100%;
    @media (max-width: 1140px) {
      padding-left: 140px;
    }

    @media (min-width: 1280px) {
      padding-right: 140px;
    }

    @media (min-width: 1400px) {
      right: 15%;
      left: 15%;
      padding-left: 0;
      padding-right: 0;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

    @media (min-width: 1700px) {
      right: 25%;
      left: 25%;
      padding-left: 0;
      padding-right: 0;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }
  // z-index: -1;
  // margin-left: 140px;
  box-sizing: border-box;
  background-color: rgb(152, 234, 224);
`;
