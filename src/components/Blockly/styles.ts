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
    background-color: #47baa4;
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

  .blocklyScrollbarHandle,
  .blocklyScrollbarBackground:hover + .blocklyScrollbarHandle {
    opacity: 1;
    fill: #fff;
    :hover {
      opacity: 1;
      fill: #98eae0;
    }
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

  .blocklySvg {
    background-color: transparent;
  }

  .background {
    z-index: -1000;
  }

  .blocklyMainBackground {
    stroke-width: 0;
    stroke: transparent;
  }

  .blocklyFlyoutBackground {
    fill: #47baa4;
    fill-opacity: 1;
  }
`;
