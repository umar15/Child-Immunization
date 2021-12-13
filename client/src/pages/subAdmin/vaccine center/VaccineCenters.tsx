import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const VaccineCenters = () => {
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>([]);
	const alert = useAlert();
	const history = useHistory();

	const getVaccineCenters = async () => {
		axios
			.get("/subadmin/vaccinecenters")
			.then((res) => {
				console.log(res.data.data);
				setVaccineCenters(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccine centers", {
					type: "error",
				})
			);
	};

	const getCurrentUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				console.log("user: ", res.data.data.user.address.city);
				setUser(res.data.data.user);
			})
			.catch((err) => console.log("Error: ", err));
	};

	useEffect(() => {
		getVaccineCenters();
		getCurrentUser();
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
					<h3>Vaccine Centers</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>City</th>
								<th>Assign vaccine</th>
								<th>View Details</th>
							</tr>
						</thead>
						<tbody>
							{vaccineCenters &&
								vaccineCenters.map((vc: any, index) => {
									if (vc.address.city === user.address?.city) {
										return (
											<tr key={vc._id}>
												<th scope="row">{index + 1}</th>
												<td>{vc.name}</td>
												<td>{vc.email}</td>
												<td>{vc.address.city}</td>
												<td>
													<Link
														to={{
															pathname: `/subadmin/assignvaccine/${vc._id}`,
														}}
													>
														assign
													</Link>
												</td>
												<td>
													<Link
														to={{
															pathname: `/subadmin/vaccinecenters/details/${vc._id}`,
															state: {
																vc,
															},
														}}
													>
														view
													</Link>
												</td>
											</tr>
										);
									}
								})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const editStyles = {
	cursor: "pointer",
	color: "green",
};
const deleteStyles = {
	cursor: "pointer",
	color: "red",
};

const linkStyles = {
	color: "white",
	listStyleType: "none",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default VaccineCenters;
