import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "../Sidebar";
import AddVaccine from "./AddVaccine";

const AddVaccinePage = () => {
	return (
		<>
			<AdminHeader userType="Admin" />

			<Container className="admin-container">
				<Row>
					<Col lg="3">
						<Sidebar className="sidebar-row" />
					</Col>
					<Col lg="9" style={addSubadminStyles}>
						<AddVaccine />
					</Col>
				</Row>
			</Container>
			<Footer />
			<FooterBottom />
		</>
	);
};

const addSubadminStyles = {
	marginTop: "30px",
};

export default AddVaccinePage;
