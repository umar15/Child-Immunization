import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, NavbarText } from "reactstrap";
import "../../index.css";
import { signOut, useUserDispatch } from "../../context/userContext";
import { withRouter, useHistory } from "react-router-dom";
import logo from "../../assets/images/logoo.png";
import { sign } from "crypto";
import { HiDatabase } from "react-icons/hi";

const AdminHeader = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const history = useHistory();
	const userDispatch = useUserDispatch();

	return (
		<div className="header">
			<Navbar className="nav-bar" light expand="md">
				<NavbarBrand href="/" className="logo">
					<img src={logo} style={{ marginLeft: "-150px" }} width="60px" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink className="nav-link" href="/">
								<h6>{`${props.userType} Dashboard` || "Child Immunization"}</h6>
							</NavLink>
						</NavItem>
					</Nav>
					<NavbarText>
						<button className="default-btn" onClick={() => signOut(userDispatch, history)}>
							Logout
						</button>
					</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default AdminHeader;
