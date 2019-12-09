import * as React from 'react';
import './App.scss';

import logo from '../logo.svg';

class App extends React.Component {
  public render() {
    console.log(logo);
    return (
      <div styleName="App">
        <header styleName="App-header">
          <img src={logo} styleName="App-logo" alt="logo" />
          <h1 styleName="App-title">Welcome to React</h1>
        </header>
        <div styleName="App-intro">
          <i styleName="test-jpg"></i>
          <i styleName="test-img"></i>
          <i styleName="test-png"></i>
        </div>
      </div>
    );
  }
}

export default App;
