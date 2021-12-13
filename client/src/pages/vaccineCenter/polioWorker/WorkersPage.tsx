import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "./../Sidebar";
import Workers from "./Workers";

const WorkersPage = () => {
	return (
		<>
			<AdminHeader userType="Vaccine Center" />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar />
					</Col>
					<Col lg="9">
						<Workers />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default WorkersPage;
