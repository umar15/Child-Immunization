import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner, Button, ListGroup, ListGroupItem } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const VaccineRequests = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();
	const history = useHistory();

	const getRequests = async () => {
		axios
			.get("/subadmin/vaccinerequests")
			.then((res) => {
				console.log(res.data.data);
				setRequests(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch requests", {
					type: "error",
				})
			);
	};

	// const handleDelete = (id) => {
	// 	axios
	// 		.delete(`/admin/subadmins/${id}`)
	// 		.then((res) => {
	// 			alert.show("Subadmin deleted successfully!", {
	// 				type: "success",
	// 			});
	// 			setSubadmins(subadmins.filter((item: any) => item._id !== id));
	// 		})
	// 		.catch((err) => {
	// 			alert.show("Failed to delete subadmin. Try again later", {
	// 				type: "error",
	// 			});
	// 		});
	// };

	useEffect(() => {
		getRequests();
	}, []);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>Vaccine Stock Requests</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
					<ListGroup>
						{requests.reverse().map((request: any) => {
							return (
								<Link
									key={request._id}
									className="notification"
									to={{
										pathname: `/subadmin/assignvaccine/${request.organization}`,
									}}
								>
									<ListGroupItem className="notification-item">
										<IoMdArrowDropright size={30} />
										<b>{request.orgName} </b>
										requested for the vaccine stock of <b>{request.vaccine} </b> quantity{" "}
										<b>{request.quantity}</b>
									</ListGroupItem>
								</Link>
							);
						})}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default VaccineRequests;
