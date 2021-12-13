import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "../Sidebar";
import SubAdmin from "./SubAdmin";

const SubAdminsPage = () => {
	return (
		<>
			<AdminHeader userType="Admin" />

			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar />
					</Col>
					<Col lg="9">
						<SubAdmin />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default SubAdminsPage;
