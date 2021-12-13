import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "./../Sidebar";
import Settings from "./Settings";

const SettingsPage = () => {
	return (
		<>
			<AdminHeader userType="Vaccine center" />
			<Container className="admin-container">
				<Row>
					<Col lg="3">
						<Sidebar className="sidebar-row" />
					</Col>
					<Col lg="9">
						<Settings />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default SettingsPage;
