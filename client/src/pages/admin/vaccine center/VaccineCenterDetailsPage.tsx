import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "../Sidebar";
import VaccineCenterDetails from "./VaccineCenterDetails";

const VaccineCenterDetailsPage = () => {
	return (
		<>
			<AdminHeader userType="Admin" />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar height="900px" />
					</Col>
					<Col lg="9">
						<VaccineCenterDetails />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default VaccineCenterDetailsPage;
