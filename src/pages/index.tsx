/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetStaticProps } from 'next';
import React from 'react';
/* @ts-ignore*/
import Home from '../components/Home';

const App = (props) => {
  /* @ts-ignore*/
  return <Home theme={props.theme} google={props.google} host={props.host} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      google: { clientId: process.env.GOOGLE_CLIENT_ID || '' },
      host: {
        address: process.env.HOST || '',
        gamePath: process.env.GAME || '',
      },
    },
  };
};
export default App;
