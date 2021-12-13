import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Sidebar = (props) => {
	return (
		<div style={{ height: props.height ? props.height : "800px" }} className="sidebar">
			<ul>
				<Link className="link" to="/subadmin">
					<li>Dashboard</li>
				</Link>
				<Link className="link" to="/subadmin/userrequests">
					<li>User Requests</li>
				</Link>
				<Link className="link" to="/subadmin/hospitals">
					<li>Hospitals</li>
				</Link>
				<Link className="link" to="/subadmin/vaccinecenters">
					<li>Vaccine Centers</li>
				</Link>
				<Link className="link" to="/subadmin/vaccines">
					<li>Vaccine Stock</li>
				</Link>
				<Link className="link" to="/subadmin/vaccinerequests">
					<li>Vaccine Stock Requests</li>
				</Link>
				<Link className="link" to="/subadmin/children">
					<li>Children</li>
				</Link>
				<Link className="link" to="/subadmin/reports">
					<li>Reports</li>
				</Link>
				<Link className="link" to="/subadmin/settings">
					<li>Settings</li>
				</Link>
			</ul>
		</div>
	);
};

export default Sidebar;
