import React from 'react';

import * as Comp from './index.styled';

export default function View() {
  return (
    <Comp.Container>
      <Comp.MainContainer>
        <Comp.SidebarContainer>{/* TODO: Sidebar */}</Comp.SidebarContainer>
        <Comp.IDEContainer>{/* TODO:IDE */}</Comp.IDEContainer>
        <Comp.PreviewContainer>{/* TODO:Preview */}</Comp.PreviewContainer>
      </Comp.MainContainer>
      <Comp.Footer>{/* TODO: Footer */}</Comp.Footer>
    </Comp.Container>
  );
}
