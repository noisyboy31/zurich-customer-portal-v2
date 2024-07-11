import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {  
    ListItemStyled, AvatarStyled, DetailsStyled, 
    ToolbarStyled, FullScreenContainer, StyledBox, StyledFooter  
} from '../../styles/useStyles';


describe('Styles Components', () => {
  it('renders ListItemStyled with correct styles', () => {
    const { container } = render(<ListItemStyled />);
    expect(container.firstChild).toHaveStyle('display: flex');
    expect(container.firstChild).toHaveStyle('flex-direction: row');
  });

  it('renders AvatarStyled with correct styles', () => {
    const { container } = render(<AvatarStyled />);
    expect(container.firstChild).toHaveStyle('margin: 8px'); // theme.spacing(1) usually equals 8px
  });

  it('renders DetailsStyled with correct styles', () => {
    const { container } = render(<DetailsStyled />);
    expect(container.firstChild).toHaveStyle('margin: 8px'); // theme.spacing(1) usually equals 8px
  });

  it('renders ToolbarStyled with correct styles', () => {
    const { container } = render(<ToolbarStyled />);
    expect(container.firstChild).toHaveStyle('justify-content: space-between');
  });

  it('renders FullScreenContainer with correct styles', () => {
    const { container } = render(<FullScreenContainer />);
    expect(container.firstChild).toHaveStyle('width: 100vw');
    expect(container.firstChild).toHaveStyle('height: 100vh');
    expect(container.firstChild).toHaveStyle('display: flex');
    expect(container.firstChild).toHaveStyle('justify-content: center');
    expect(container.firstChild).toHaveStyle('align-items: center');
    expect(container.firstChild).toHaveStyle('background-color: #ffffff'); // Example background.default color
  });

  it('renders StyledBox with correct styles', () => {
    const { container } = render(<StyledBox />);
    expect(container.firstChild).toHaveStyle('padding: 0.5rem');
    expect(container.firstChild).toHaveStyle('justify-content: center');
    expect(container.firstChild).toHaveStyle('align-items: center');
    expect(container.firstChild).toHaveStyle('height: 4rem');
    expect(container.firstChild).toHaveStyle('display: flex');
    expect(container.firstChild).toHaveStyle('margin-left: auto');
    expect(container.firstChild).toHaveStyle('margin-right: auto');
    expect(container.firstChild).toHaveStyle('width: 100%');
  });

  it('renders StyledFooter with correct styles', () => {
    const { container } = render(<StyledFooter />);
    expect(container.firstChild).toHaveStyle('bottom: 0px');
    expect(container.firstChild).toHaveStyle('position: fixed');
    expect(container.firstChild).toHaveStyle('width: 100%');
    expect(container.firstChild).toHaveStyle('right: 0px');
    expect(container.firstChild).toHaveStyle('left: 0px');
  });
});
