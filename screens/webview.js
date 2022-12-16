import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

// ...
class MyWeb extends Component {
  render() {
    return (
      <WebView source={{uri: 'https://truyenhdx.com/tom-tat-do-hu-lang/'}} />
    );
  }
}
export default MyWeb;
