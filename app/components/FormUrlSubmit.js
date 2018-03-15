// @flow
import React, { Component } from 'react';
import { TextField, Checkbox, FlatButton, Dialog } from 'material-ui';

// prop types
type Props = {
  handleClose: () => void,
  handleSubmitUrl: (url: string, mp3: boolean) => void,
  open: boolean
};

// state types
type State = {
  value: string,
  mp3: boolean
};

export default class FormUrlSubmit extends Component<Props, State> {
  // default state values
  state = {
    value: '',
    mp3: true,
  }

  mp3Toggle = () => {
    this.setState(prevState => ({ mp3: !prevState.mp3 }));
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({ value });
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const { value, mp3 } = this.state;
    const { handleSubmitUrl, handleClose } = this.props;
    handleSubmitUrl(value, mp3);
    handleClose();
    event.preventDefault();
  }

  render() {
    const { mp3 } = this.state;
    const { handleClose, open } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title="Download"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        <TextField
          hintText="Video Url"
          floatingLabelText="Enter URL"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Checkbox
          label="MP3"
          checked={mp3}
          onCheck={this.mp3Toggle}
        />
      </Dialog>
    );
  }
}
