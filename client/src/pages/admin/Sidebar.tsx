import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import { Collapse, NavbarToggler, Nav } from "reactstrap";

const Sidebar = (props) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const toggle = () => setIsOpen(!isOpen);
	return (
		// <Collapse isOpen={isOpen} navbar>
		// <NavbarToggler onClick={toggle} />
		<div style={{ height: props.height ? props.height : "800px" }} className="sidebar">
			<ul>
				<Link className="link" to="/admin">
					<li>Dashboard</li>
				</Link>
				<Link className="link" to="/admin/subadmins">
					<li>Sub Admins</li>
				</Link>
				<Link className="link" to="/admin/hospitals">
					<li>Hospitals</li>
				</Link>
				<Link className="link" to="/admin/vaccinecenters">
					<li>Vaccine Centers</li>
				</Link>
				<Link className="link" to="/admin/vaccines">
					<li>Vaccine Stock</li>
				</Link>
				<Link className="link" to="/admin/vaccinesrequests">
					<li>Vaccine Stock Requests</li>
				</Link>
				<Link className="link" to="/admin/children">
					<li>Children</li>
				</Link>
				<Link className="link" to="/admin/reports">
					<li>Reports</li>
				</Link>
				<Link className="link" to="/admin/settings">
					<li>Settings</li>
				</Link>
			</ul>
		</div>
		// </Collapse>
	);
};

export default Sidebar;
