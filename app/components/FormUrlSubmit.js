// @flow
import React, { Component } from 'react';
import {TextField, RaisedButton} from 'material-ui';

// prop types
type Props = {
}

// state types
type State = {
  value: string
};


export default class FormUrlSubmit extends Component<Props, State> {
  // default state values
  state =  {
    value: '',
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState(prevState => ({value: value}));
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const { value } = this.state;
    console.log('Submitting url: ' + value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <TextField
            hintText="Video Url"
            floatingLabelText="Enter URL"
            value={this.state.value}
            onChange={this.handleChange}/>
        </label>
        <br />
        <RaisedButton type="submit" label="Submit"/>
      </form>
    );
  }
}
