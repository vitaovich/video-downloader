// @flow
import { AppBar, FlatButton, TextField } from 'material-ui';
import React, { Component } from 'react';
import UrlSubmitPage from '../containers/UrlSubmitPage';

type Props = {};

type State = {
  downloadLocation: string
};

export default class Home extends Component<Props, State> {
  state = {
    downloadLocation: '',
  };

  selectDownloadFolder = () => {
    // eslint-disable-next-line
    const { dialog } = require('electron').remote;
    console.log('location:');
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (files: string[]) => {
      console.log('files:');
      console.log(files);
      this.setState({ downloadLocation: `${files[0]}/%(title)s.%(ext)s` });
    });
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({ downloadLocation: value });
  }

  render() {
    const { downloadLocation } = this.state;
    const menu = (
      <UrlSubmitPage downloadLocation={downloadLocation} />
    );
    return (
      <div data-tid="container">
        <AppBar
          title="Anything Downloader"
          iconElementLeft={menu}
        />

        <FlatButton
          label="Set Download Location"
          primary
          onClick={this.selectDownloadFolder}
        />
        <TextField
          hintText="Enter Download Location"
          floatingLabelText="Download Location"
          value={downloadLocation}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
