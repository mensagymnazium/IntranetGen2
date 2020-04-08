import React, { Component } from "react";
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
import { Link } from "react-router-dom";
import "./../styles/NavMenu.css";
import { Role } from "../helpers/Enums";

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
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              Mensa Intranet
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Hlavní stránka
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/subjects-sign">
                    Předměty
                  </NavLink>
                </NavItem>
                {roles &&
                roles.some(x => this.state.haveRoles.indexOf(x) === -1) ===
                  false ? null : (
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="text-dark"
                      to="/subject-edit"
                    >
                      Správa předmětů
                    </NavLink>
                  </NavItem>
                )}
                {roles &&
                roles.some(x => this.state.haveRoles.indexOf(x) === -1) ===
                  false ? null : (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/students">
                      Žáci a zápisy
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/graph-data">
                    Get Graph data
                  </NavLink>
                </NavItem>
                <UserLogin {...this.props} />
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
