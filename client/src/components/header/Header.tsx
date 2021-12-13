import { logDOM } from "@testing-library/dom";
import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, NavbarText } from "reactstrap";
import "../../index.css";
import logo from "../../assets/images/logo-two.png";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<div className="header">
			<Navbar className="nav-bar" light expand="md">
				<NavbarBrand href="/" className="logo">
					<img src={logo} width="60px" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink className="nav-link" href="/">
								<h6>Child Immunization</h6>
							</NavLink>
						</NavItem>
						{/* <NavItem>
							<NavLink className="nav-link" href="/">
								<h6>About</h6>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="nav-link" href="/">
								<h6>Components</h6>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="nav-link" href="/">
								<h6>Services</h6>
							</NavLink>
						</NavItem> */}
					</Nav>
					<NavbarText>
						<a className="default-btn" href="/signup">
							Join Us
						</a>
						<a className="default-btn" href="/login">
							Log in
						</a>
					</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
