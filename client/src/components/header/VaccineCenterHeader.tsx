import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, NavbarText } from "reactstrap";
import "../../index.css";
import logo from "../../assets/images/logo-two.png";

const VaccineCenterHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<div className="header vc-header">
			<Navbar className="nav-bar" light expand="md">
				<NavbarBrand href="/" className="logo">
					<img src={logo} width="60px" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink className="nav-link" href="/">
								<h6 style={{ color: "white" }}>Vaccine Center Name</h6>
							</NavLink>
						</NavItem>
						{/* <NavItem>
							<NavLink className="nav-link" href="/">
								<h6>Home</h6>
							</NavLink>
						</NavItem>
						<NavItem>
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
						{/* <a className="default-btn" href="/appointment">
							Join Us
						</a> */}
						<a className="default-btn" href="/login">
							Log out
						</a>
					</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default VaccineCenterHeader;
