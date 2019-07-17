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
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      registerModal: false,
    };
  }

  componentWillMount() {
    this.setState({isOpen: false});
  }

  toggleLoginModal = () => {
    this.setState({loginModal: true});
  }

  toggleRegisterModal = () => {
    this.setState({registerModal: true});
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
              <DropdownItem color="dark" onClick={this.toggleLoginModal}>
                Sign in
              </DropdownItem>
              <DropdownItem color="dark" onClick={this.toggleRegisterModal}>
                Sign up
              </DropdownItem>
              {
                /*
                <DropdownItem>
                  Recent
                </DropdownItem>
                */
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        </Navbar>
        <LoginModal modal={this.state.loginModal} />
        <RegisterModal modal={this.state.registerModal} />
      </div>
    )
  }
}