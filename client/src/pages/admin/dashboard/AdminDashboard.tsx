import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
// import "../../index.css";
import Sidebar from "../Sidebar";
import Dashboard from "./Dashboard";

const AdminDashboard = () => {
	return (
		<>
			<AdminHeader userType="Admin" />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" xl="3" md="12">
						<Sidebar height="1500px" />
					</Col>
					<Col xl="9" md="12">
						<Dashboard />
					</Col>
				</Row>
			</Container>
			{/* <Footer /> */}
			<FooterBottom />
		</>
	);
};

export default AdminDashboard;
