import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Menu extends Component {

  componentWillMount() {
    this.setState({isOpen: false});
  }

  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/">Pastie</NavbarBrand>
          <UncontrolledDropdown className="ml-auto" inNavbar> 
            <DropdownToggle color="dark" lightnav="true" caret>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem color="dark">
                Sign in
              </DropdownItem>
              <DropdownItem>
                Recent
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Navbar>
      </div>
    )
  }
}