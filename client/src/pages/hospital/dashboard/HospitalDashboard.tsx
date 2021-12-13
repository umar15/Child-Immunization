import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
// import "../../index.css";
import Sidebar from "../Sidebar";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics";

const HospitalDashboard = () => {
	return (
		<>
			<AdminHeader userType="Hospital" />
			<Container className="admin-container">
				<Row>
					<Col lg="3">
						<Sidebar />
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

export default HospitalDashboard;
