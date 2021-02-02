import React from 'react';
import Webview from 'react-native-webview';
const renderHTMLFile = require('../assets/render/ide.html');

const initialStyle = {
  backgroundColor: 'transparent',
};

export default function Ide() {
  return <Webview source={renderHTMLFile} style={initialStyle} />;
}
