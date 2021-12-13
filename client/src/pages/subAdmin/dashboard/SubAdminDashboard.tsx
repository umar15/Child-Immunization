import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import Sidebar from "../Sidebar";
import Dashboard from "./Dashboard";

const SubAdminDashboard = () => {
	return (
		<>
			<AdminHeader userType="Sub Admin" />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar height="1500px" />
					</Col>
					<Col lg="9">
						<Dashboard />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default SubAdminDashboard;
