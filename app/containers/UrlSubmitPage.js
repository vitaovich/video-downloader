// @flow
import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';

import FormUrlSubmit from '../components/FormUrlSubmit';
import { downloadVideo } from '../utils/youtube-dl-utils';

type Props = {
  downloadLocation: string
};

type State = {
  open: boolean
};

export default class UrlSubmitPage extends Component<Props, State> {
  props: Props;

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  submit = (values: any) => {
    const { downloadLocation } = this.props;
    const { url, mp3 } = values;
    downloadVideo(url, mp3, downloadLocation);
    this.handleClose();
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <RaisedButton label="Download" onClick={this.handleOpen} />
        <FormUrlSubmit
          open={open}
          onSubmit={this.submit}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}
