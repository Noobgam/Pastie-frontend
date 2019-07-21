import React, { Component } from 'react'
import {
  Nav,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    let cookies = document.cookie.split(';').map(function(c) {
      return c.trim().split('=').map(decodeURIComponent);
    }).reduce(function(a, b) {
      try {
        a[b[0]] = JSON.parse(b[1]);
      } catch (e) {
        a[b[0]] = b[1];
      }
      return a;
    }, {});

    this.state = {
      loginModal: false,
      registerModal: false,
      Username: cookies.Username
    };
  }

  componentWillMount() {
    this.setState({...this.state,...{isOpen: false}})
  }

  toggleLoginModal = () => {
    this.setState(prevState => ({
      loginModal: !prevState.loginModal
    }));
  }

  toggleRegisterModal = () => {
    this.setState(prevState => ({
      registerModal: !prevState.registerModal
    }));
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            <img src='images/pastie.png'/>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            {(this.state.Username && (
              <NavbarBrand>
                Hello, {this.state.Username}!
              </NavbarBrand>
            ))}
            <UncontrolledDropdown> 
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
          </Nav>
        </Navbar>
        <LoginModal modal={this.state.loginModal} toggle={this.toggleLoginModal} />
        <RegisterModal modal={this.state.registerModal} toggle={this.toggleRegisterModal} />
      </div>
    )
  }
}