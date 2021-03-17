import styled from 'styled-components';

export const Xml = styled('xml')`
  background-color: red;
`;
export const Div = styled.div`
  padding-left: 5vw;
  padding-right: 5vw;
`;
export const BlocklyDiv = styled.div`
  padding-top: 70px;
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: none;
  animation: none;

  * {
    transition: none;
    animation: none;
  }

  .blocklyFlyout {
    transition: none;
    animation: none;
  }

  .blocklyBlockDragSurface {
    transition: none;
    animation: none;
  }

  .blocklyScrollbarHorizontal,
  .blocklyScrollbarVertical {
    transition: none;
    animation: none;
  }

  .blocklyText {
    font-family: 'Roboto';
  }

  .blocklyText.blockType1 {
    font-size: 28pt;
  }

  .blocklyText.blockType2 {
    font-size: 18pt;
    transform: translateY(4px);
  }

  .svgCanvas,
  .blocklyComputeCanvas {
    transition: none;
    animation: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    padding-left: 140px;
    box-sizing: border-box;
    background-color: rgb(152, 234, 224);
  }

  .background {
    /* background-color: rgb(152, 234, 224); */
    z-index: -1000;
  }
`;
