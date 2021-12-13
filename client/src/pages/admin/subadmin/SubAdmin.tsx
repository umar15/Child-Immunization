import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const SubAdmin = () => {
	const [subadmins, setSubadmins] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();
	const history = useHistory();

	const getSubadmins = async () => {
		axios
			.get("/admin/subadmins")
			.then((res) => {
				console.log(res.data.data);
				setSubadmins(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch subadmins", {
					type: "error",
				})
			);
	};

	const handleDelete = (id) => {
		axios
			.delete(`/admin/subadmins/${id}`)
			.then((res) => {
				alert.show("Subadmin deleted successfully!", {
					type: "success",
				});
				setSubadmins(subadmins.filter((item: any) => item._id !== id));
			})
			.catch((err) => {
				alert.show("Failed to delete subadmin. Try again later", {
					type: "error",
				});
			});
	};

	const handleEdit = (id) => {
		history.push(`/admins/subadmins/${id}`);
	};

	useEffect(() => {
		getSubadmins();
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
					<h3>Sub Admins</h3>
				</Col>
				<Col lg="3">
					<button className="default-btn">
						<a href="/admin/subadmins/add" style={linkStyles}>
							Add sub admin
						</a>
					</button>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
					<Table style={tableStyles} bordered hover responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>City</th>
								<th>Assign vaccine</th>
								<th>View Details</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{subadmins &&
								subadmins.map((subadmin: any, index) => (
									<tr key={subadmin._id}>
										<th scope="row">{index + 1}</th>
										<td>{subadmin.name}</td>
										<td>{subadmin.email}</td>
										<td>{subadmin.address.city}</td>
										<td>
											<Link
												to={{
													pathname: `/admin/subadmins/assignvaccine/${subadmin._id}`,
												}}
											>
												assign
											</Link>
										</td>
										<td>
											<Link
												to={{
													pathname: `/admin/subadmins/details/${subadmin._id}`,
													state: {
														subadmin,
													},
												}}
											>
												view
											</Link>
										</td>
										<td>
											<Link
												to={{
													pathname: `/admin/subadmins/${subadmin._id}`,
													state: {
														subadmin: subadmin,
													},
												}}
											>
												<BiEdit style={editStyles} size="20" />
											</Link>
										</td>
										<td>
											<AiFillDelete
												onClick={() => handleDelete(subadmin._id)}
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

export default SubAdmin;
