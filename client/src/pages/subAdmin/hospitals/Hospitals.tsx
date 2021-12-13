import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const Hospitals = () => {
	const [hospitals, setHospitals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>([]);
	const alert = useAlert();
	const history = useHistory();

	const getHospitals = async () => {
		axios
			.get("/subadmin/hospitals")
			.then((res) => {
				console.log(res.data.data);
				setHospitals(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch hospitals", {
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
		getHospitals();
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
					<h3>Hospitals</h3>
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

								{/* <th>Edit</th>
								<th>Delete</th> */}
							</tr>
						</thead>
						<tbody>
							{hospitals &&
								hospitals.map((hospital: any, index) => {
									if (hospital.address.city === user.address?.city) {
										return (
											<tr key={hospital._id}>
												<th scope="row">{index + 1}</th>
												<td>{hospital.name}</td>
												<td>{hospital.email}</td>
												<td>{hospital.address.city}</td>
												<td>
													<Link
														to={{
															pathname: `/subadmin/assignvaccine/${hospital._id}`,
														}}
													>
														assign
													</Link>
												</td>
												<td>
													<Link
														to={{
															pathname: `/subadmin/hospitals/details/${hospital._id}`,
															state: {
																hospital,
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

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Hospitals;
