import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const Vaccines = () => {
	const [vaccines, setVaccines] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();
	const history = useHistory();

	const getVaccines = async () => {
		axios
			.get("/admin/vaccines")
			.then((res) => {
				console.log(res.data.data);
				setVaccines(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccines", {
					type: "error",
				})
			);
	};

	const handleDelete = (id) => {
		axios
			.delete(`/admin/vaccines/${id}`)
			.then((res) => {
				alert.show("Vaccine deleted successfully!", {
					type: "success",
				});
				setVaccines(vaccines.filter((item: any) => item._id !== id));
			})
			.catch((err) => {
				alert.show("Failed to delete vaccine. Try again later", {
					type: "error",
				});
			});
	};

	useEffect(() => {
		getVaccines();
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
				<Col lg="9">
					<h3>Vaccines</h3>
				</Col>
				<Col lg="3">
					<button className="default-btn">
						<a href="/admin/vaccines/add" style={linkStyles}>
							Add vaccine
						</a>
					</button>
				</Col>
			</Row>
			{/* <Row>
				<Col>
					<h3>Sub Admins</h3>
				</Col>
			</Row> */}
			<Row className="subadmin-table">
				<Col lg="12">
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Manufacturer</th>
								<th>Quantity</th>
								<th>Date</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{vaccines &&
								vaccines.map((vaccine: any, index) => (
									<tr key={vaccine._id}>
										<th scope="row">{index + 1}</th>
										<td>{vaccine.name}</td>
										<td>{vaccine.manufacturer}</td>
										<td>{vaccine.quantity}</td>
										<td>{new Date(vaccine.expiryDate).toDateString()}</td>
										<td>
											<Link
												to={{
													pathname: `/admin/vaccines/${vaccine._id}`,
													state: {
														vaccine: vaccine,
													},
												}}
											>
												<BiEdit style={editStyles} size="20" />
											</Link>
										</td>
										<td>
											<AiFillDelete
												onClick={() => handleDelete(vaccine._id)}
												style={deleteStyles}
												size="20"
											/>
										</td>
									</tr>
								))}
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

export default Vaccines;
