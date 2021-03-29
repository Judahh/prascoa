import styled from 'styled-components';
export const Background = styled.div`
  width: calc(100% - 130px);
  height: calc(100% - 70px);
  z-index: -1;
  background-color: ${(props) => props.theme.background};
  right: 0px;
  bottom: 0px;
  position: absolute;
`;

export const Background2 = styled.div`
  width: calc(100% - 130px);
  height: calc(100% - 70px);
  z-index: -1;
  background-color: transparent;
  right: 0px;
  bottom: 0px;
  position: absolute;
`;

export const Background3 = styled.div`
  width: 100%;
  height: 100%;
  z-index: -1000;
  background-color: rgb(152, 234, 224);
  right: 0px;
  bottom: 0px;
  position: absolute;
`;

export const Text = styled.span`
  font-size: x-large;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-align: center;
  font-size: 500px;
  font-weight: bolder;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
export const Score = styled.div`
  position: absolute;
  top: 70px;
  margin: 25px;
  right: 0px;
  color: ${(props) => props.theme.menu};
  font-size: x-large;
`;

export const Play = styled.div`
  width: 100%;
  height: 100vh;
  cursor: pointer;
  position: relative;
  color: ${(props) => props.theme.text};
  font-size: x-large;
  justify-content: center;
  text-align: center;
`;

export const SvgCanvas = styled.canvas`
  // transition: none;
  // animation: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(152, 234, 224);

  width: 100%;
  height: 100%;
  @media all and (orientation: portrait) {
    width: 100%;
    height: calc(100vw - 130px);
  }

  @media all and (orientation: landscape) {
    width: calc(100vh - 70px);
    height: 100%;
    // padding-left: 140px;
    @media (max-width: 1000px) {
      padding-left: 140px;
    }

    @media (min-width: 1000px) {
      padding: 10px;
    }

    @media (min-width: 1100px) {
      padding: 0px;
      margin-right: calc(calc(100% - 100vh) / 2);
      // margin-left: calc(calc(100% - 100vh) / 2);
    }
  }
`;

export const SvgCanvas2 = styled.canvas`
  // transition: none;
  // animation: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  @media all and (orientation: portrait) {
    width: 100%;
    height: calc(100vw - 130px);
  }

  @media all and (orientation: landscape) {
    width: calc(100vh - 70px);
    height: 100%;
    // padding-left: 140px;
    @media (max-width: 1000px) {
      padding-left: 140px;
    }

    @media (min-width: 1000px) {
      padding: 10px;
    }

    @media (min-width: 1100px) {
      padding: 0px;
      margin-right: calc(calc(100% - 100vh) / 2);
      // margin-left: calc(calc(100% - 100vh) / 2);
    }
  }
`;
