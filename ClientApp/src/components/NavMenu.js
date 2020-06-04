import React, { Component } from "react";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { UserLogin } from "./UserLogin";
import "./../styles/NavMenu.css";
import { Role } from "../helpers/Enums";
import Logo from "../resources/Logo.png";
import Header from "../resources/Header.png";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      haveRoles: props.auth.user.idToken.roles,
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const roles = [Role.Admin, Role.Teacher];
    const style = {
      backgroundImage: `url(${Header}`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: "transparent"
    };
    const highLightStyle = {
      color: "black",
      fontWeight: "bold"
    };

    return (
      <header>
        <Navbar
          style={style}
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img src={Logo} alt="Mensa Intranet" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink
                    activeStyle={highLightStyle}
                    tag={RRNavLink}
                    exact
                    to="/"
                  >
                    Hlavní stránka
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    activeStyle={highLightStyle}
                    tag={RRNavLink}
                    to="/subjects-sign"
                  >
                    Předměty
                  </NavLink>
                </NavItem>
                {this.state.haveRoles &&
                this.state.haveRoles.indexOf(Role.Admin) === -1 ? null : (
                  <NavItem>
                    <NavLink
                      activeStyle={highLightStyle}
                      tag={RRNavLink}
                      to="/subject-edit"
                    >
                      Správa předmětů
                    </NavLink>
                  </NavItem>
                )}
                {roles &&
                this.state.haveRoles &&
                roles.some(x => this.state.haveRoles.indexOf(x) === -1) ===
                  false ? null : (
                  <NavItem>
                    <NavLink
                      activeStyle={highLightStyle}
                      tag={RRNavLink}
                      to="/students"
                    >
                      Žáci a zápisy
                    </NavLink>
                  </NavItem>
                )}
                <UserLogin {...this.props} />
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
