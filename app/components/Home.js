// @flow
import {IconMenu, MenuItem, IconButton, AppBar, FlatButton, TextField} from 'material-ui';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {donwloadVideoByUrl, downloadMp3ByUrl} from '../utils/youtube-dl-utils';
import styles from './Home.css';
import FormUrlSubmit from './FormUrlSubmit';
import TopMenu from './TopMenu';
import AddIcon from 'material-ui/svg-icons/content/add';

type Props = {};
type State = {
  open: boolean,
  downloadLocation: string,
  log: string[],
}

export default class Home extends Component<Props, State> {
  props: Props;

  state = {
    open: false,
    downloadLocation: '',
    log: [],
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmitUrl = (url: string, mp3: boolean) => {
    const info = {url: url, mp3: mp3};
    const {downloadLocation} = this.state;
    console.log("Submitted a url");
    console.log(info);
    switch(info.mp3) {
      case false:
      console.log('DOWNLOAD VIDEO URL');
        donwloadVideoByUrl(info.url, downloadLocation, this.pushLog)
        break
      default:
        console.log('DOWNLOAD MP3 URL');
        downloadMp3ByUrl(info.url, downloadLocation, this.pushLog)
        break
    }
  }

  pushLog = (input: string) => {
    console.log('Push log:' + input);
    this.setState(prevState => ({log: [...prevState.log, input]}))
  }

  selectDownloadFolder = () => {
    const {dialog} =  require('electron').remote;
    console.log('location:');
    dialog.showOpenDialog({
      properties: ['openDirectory']
    },(files: string[]) => {
      console.log('files:');
      console.log(files);
      this.setState({downloadLocation: files[0] + '/%(title)s.%(ext)s'})
    })
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState(prevState => ({downloadLocation: value}));
  }


  render() {
    const {open, downloadLocation, log} = this.state;
    const menu = <IconMenu
                  iconButtonElement={<IconButton><AddIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText="Download" onClick={this.handleOpen} />
                </IconMenu>
    const logs = log.map(x => <p>{x}</p>);
    return (
      <div data-tid="container">
        <AppBar
          title="Anything Downloader"
          iconElementLeft={menu}
        />
        <FormUrlSubmit
          open={open}
          handleClose={this.handleClose}
          handleSubmitUrl={this.handleSubmitUrl}
        />
        <FlatButton
          label="Set Download Location"
          primary={true}
          onClick={this.selectDownloadFolder}
        />
        <TextField
          hintText="Enter Download Location"
          floatingLabelText="Download Location"
          value={this.state.downloadLocation}
          onChange={this.handleChange}
        />
        <h1>LOG</h1>
        {logs}
      </div>
    );
  }
}
