import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Sidebar = (props) => {
	return (
		<div style={{ height: props.height ? props.height : "850px" }} className="sidebar">
			<ul>
				<Link className="link" to="/hospital/">
					<li>Dashboard</li>
				</Link>
				<Link className="link" to="/hospital/children">
					<li>Children</li>
				</Link>
				<Link className="link" to="/hospital/vaccines">
					<li>Vaccine Stock</li>
				</Link>
				<Link className="link" to="/hospital/reports">
					<li>Reports</li>
				</Link>
				<Link className="link" to="/hospital/settings">
					<li>Settings</li>
				</Link>
			</ul>
		</div>
	);
};

export default Sidebar;
