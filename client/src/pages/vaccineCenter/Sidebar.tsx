import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Sidebar = (props) => {
	return (
		<div style={{ height: props.height ? props.height : "900px" }} className="sidebar">
			<ul>
				<Link className="link" to="/vaccinecenter">
					<li>Children</li>
				</Link>
				<Link className="link" to="/vaccinecenter/vaccines">
					<li>Vaccine Stock</li>
				</Link>
				<Link className="link" to="/vaccinecenter/campaigns">
					<li>Campaigns</li>
				</Link>
				<Link className="link" to="/vaccinecenter/workers">
					<li>Polio Workers</li>
				</Link>
				<Link className="link" to="/vaccinecenter/reports">
					<li>Reports</li>
				</Link>
				<Link className="link" to="/vaccinecenter/settings">
					<li>Settings</li>
				</Link>
			</ul>
		</div>
	);
};

export default Sidebar;
