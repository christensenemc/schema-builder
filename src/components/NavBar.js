import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Navbar as bsNavbar,
  Container as bsContainer,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form
} from '@bootstrap-styled/v4';

const Navbar = styled(bsNavbar)`
  z-index: 50;
`;

const Container = styled(bsContainer)`
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: inline-block;
  padding-right: 2rem;
`;

function NavBar(props) {
  const { onAddTableClick, onSaveClick } = props;

  return (
    <Navbar light color="faded" toggleable={false}>
      <Container fluid>
        <NavbarBrand>Schema Builder</NavbarBrand>
        <Buttons>
          <Button type="button" color="success" onClick={onAddTableClick}>
            Add Table
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="button" color="secondary" onClick={onSaveClick}>
            Save
          </Button>
        </Buttons>
      </Container>
    </Navbar>
  );
}

export default NavBar;
