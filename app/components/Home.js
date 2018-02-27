// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Button } from 'semantic-ui-react';
import FormUrlSubmit from './FormUrlSubmit';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Link to="/counter">to Counter</Link>
          <h2>Video Downloader</h2>
          <FormUrlSubmit/>
        </div>
      </div>
    );
  }
}
