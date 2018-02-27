// @flow
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
