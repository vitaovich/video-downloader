// @flow
import React, { Component } from 'react';
import { TextField, Checkbox, FlatButton, Dialog } from 'material-ui';
import { Field, reduxForm } from 'redux-form';

// prop types
type Props = {
  handleClose: () => void,
  handleSubmit: () => void,
  open: boolean
};

class FormUrlSubmit extends Component<Props> {
  renderTextField = ({
    input,
    label,
    hintText,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      hintText={hintText}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  renderCheckbox = ({ input, label }) => (
    <Checkbox
      label={label}
      checked={input.value}
      onCheck={input.onChange}
    />
  )

  render() {
    const { handleClose, handleSubmit, open } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        type="submit"
        form="video-url-id"
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
        <form id="video-url-id" onSubmit={handleSubmit}>
          <Field name="url" component={this.renderTextField} label="Enter Url" hintText="Video URL" />
          <Field name="mp3" component={this.renderCheckbox} label="MP3" />
        </form>
      </Dialog>
    );
  }
}

FormUrlSubmit = reduxForm({ // eslint-disable-line
  form: 'download-url-form'
})(FormUrlSubmit);

export default FormUrlSubmit;
