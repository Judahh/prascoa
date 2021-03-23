import { GetStaticProps } from 'next';
import React from 'react';
import Home from '../components/Home';

const App = (props) => {
  // console.log('APP:', props);

  return <Home google={props.google} host={props.host} />;
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
