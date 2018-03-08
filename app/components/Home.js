// @flow
import {IconMenu, MenuItem, IconButton, AppBar} from 'material-ui';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {donwloadVideoByUrl, downloadMp3ByUrl} from '../utils/youtube-dl-utils';
import styles from './Home.css';
import FormUrlSubmit from './FormUrlSubmit';
import TopMenu from './TopMenu';
import AddIcon from 'material-ui/svg-icons/content/add';

type Props = {};
type State = {
  open: boolean
}

export default class Home extends Component<Props, State> {
  props: Props;

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmitUrl = (url: string, mp3: boolean) => {
    const info = {url: url, mp3: mp3};
    console.log("Submitted a url");
    console.log(info);
    switch(info.mp3) {
      case false:
      console.log('DOWNLOAD VIDEO URL');
        donwloadVideoByUrl(info.url)
        break
      default:
        console.log('DOWNLOAD MP3 URL');
        downloadMp3ByUrl(info.url)
        break
    }
  }

  render() {
    const {open} = this.state;
    const menu = <IconMenu
                  iconButtonElement={<IconButton><AddIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText="Download" onClick={this.handleOpen} />
                </IconMenu>
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
        <Link to="/counter">to Counter</Link>
      </div>
    );
  }
}
