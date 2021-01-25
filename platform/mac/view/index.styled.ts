import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const window = Dimensions.get('window');

export const Container = styled.View`
  flex-direction: column;
  flex: 1;
  min-width: ${window.width / 2}px;
  min-height: ${window.height / 2}px;
`;

export const MainContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const IDEContainer = styled.View`
  flex: 1;
  overflow: hidden;
  background: #ebeef5;
`;

export const PreviewContainer = styled.View`
  flex: 1;
  overflow: hidden;
  background: #fff;
`;

export const SidebarContainer = styled.View`
  flex-direction: row;
`;

export const Footer = styled.View`
  flex-direction: row;
  height: 20px;
  background: #f9f9f9;
`;
