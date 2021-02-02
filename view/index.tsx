import React from 'react';
import Ide from './ide';
import * as Comp from './index.styled';

export default function View() {
  return (
    <Comp.Container>
      <Comp.MainContainer>
        <Comp.SidebarContainer />
        <Comp.IDEContainer>
          <Ide />
        </Comp.IDEContainer>
        <Comp.PreviewContainer>{/* TODO:Preview */}</Comp.PreviewContainer>
      </Comp.MainContainer>
      <Comp.Footer>{/* TODO: Footer */}</Comp.Footer>
    </Comp.Container>
  );
}
