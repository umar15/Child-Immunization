import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { baseURL, BE_PORT } from "../../../config/constants";

const USerRequestsDetails = () => {
	const alert = useAlert();
	const history = useHistory();
	const location = useLocation();
	const req: any = location.state ? location.state : "";
	console.log("Request: ", req.data);

	const approveRequest = () => {
		axios
			.post(`/subadmin/userrequests/${req.data._id}`)
			.then((res) => {
				alert.show("User signup request approved successfully!", {
					type: "success",
				});
				history.push("/subadmin/userrequests");
			})
			.catch((err) =>
				alert.show("Failed to approve user request", {
					type: "error",
				})
			);
	};

	const rejectRequest = () => {
		axios
			.delete(`/subadmin/userrequests/${req.data._id}`)
			.then((res) => {
				alert.show("User signup request deleted successfully!.", {
					type: "success",
				});
				history.push("/subadmin/userrequests");
			})
			.catch((err) =>
				alert.show("Failed to delete user request", {
					type: "error",
				})
			);
	};

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>SIgnup request from: {req.data.name}</h3>
				</Col>
			</Row>
			<Row style={{ marginTop: "20px" }}>
				<Col lg="2">
					<button
						onClick={() => approveRequest()}
						style={{ backgroundColor: "green", color: "#fff" }}
						className="default-btn"
					>
						Approve
					</button>
				</Col>
				<Col lg="2">
					<button
						onClick={() => rejectRequest()}
						style={{ backgroundColor: "red", color: "#fff" }}
						className="default-btn"
					>
						Reject
					</button>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col>
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<td>{req.data.name}</td>
							</tr>
							<tr>
								<th>Email</th>
								<td>{req.data.email}</td>
							</tr>
							<tr>
								<th>User Type</th>
								<td>{req.data.userType}</td>
							</tr>
							<tr>
								<th>Contact No</th>
								<td>{req.data.phoneNo}</td>
							</tr>
							<tr>
								<th>Address</th>
								<td>
									{req.data.address.addr}, {req.data.address.area}, {req.data.address.city}
								</td>
							</tr>
							<tr>
								<th>Permit</th>
								<td>
									<a href={`${baseURL}:${BE_PORT}/permits/${req.data.permit}`} target="_blank" download>
										View Permit
									</a>
								</td>
							</tr>
						</thead>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default USerRequestsDetails;
