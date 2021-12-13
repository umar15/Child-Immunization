import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";

const UserRequests = () => {
	const [userRequests, setUserRequests] = useState([]);
	const alert = useAlert();

	const getUserRequests = async () => {
		axios
			.get(`/subadmin/userrequests`)
			.then((res) => {
				console.log("User requests: ", res.data.data);
				setUserRequests(res.data?.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch user request", {
					type: "error",
				})
			);
	};

	useEffect(() => {
		getUserRequests();
	}, []);

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>User Requests</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>User Type</th>
								<th>Name</th>
								<th>Email</th>
								<th>View Request</th>
							</tr>
						</thead>
						<tbody>
							{userRequests &&
								userRequests.map((ur: any, index) => {
									return (
										<tr key={ur._id}>
											<th scope="row">{ur.userType}</th>
											<td>{ur.name}</td>
											<td>{ur.email}</td>
											<td>
												<Link
													to={{
														pathname: `/subadmin/userrequests/${ur._id}`,
														state: {
															data: ur,
														},
													}}
												>
													view
												</Link>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default UserRequests;
