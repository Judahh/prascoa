import React, { Fragment, useContext } from 'react';
import Head from 'next/head';
import LanguageContext from '../../language/context';

import Main from './Main';
import Layout from '../Layout';

const Home = (props) => {
  const lang = useContext(LanguageContext);

  return (
    <Fragment>
      <Head>
        <title>PRÁSCOA</title>
      </Head>
      <Layout theme={props.theme} language={lang}>
        <Main
          theme={props.theme}
          handleToken={props.handleToken}
          google={props.google}
          host={props.host}
        />
      </Layout>
    </Fragment>
  );
};

export default Home;
