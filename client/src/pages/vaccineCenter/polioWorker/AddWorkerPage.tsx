import React from "react";
import { Container, Col, Row } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import FooterBottom from "../../../components/footer/FooterBottom";
import AdminHeader from "../../../components/header/AdminHeader";
import "../../../index.css";
import Sidebar from "../Sidebar";
import AddSubadmin from "./AddSubadmin";
import AddWorker from "./AddWorker";

const AddWorkerPage = () => {
	return (
		<>
			<AdminHeader userType="Vaccine center" />
			<Container className="admin-container">
				<Row>
					<Col className="sidebar-row" lg="3">
						<Sidebar />
					</Col>
					<Col lg="9" style={addSubadminStyles}>
						<AddWorker />
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

export default AddWorkerPage;
