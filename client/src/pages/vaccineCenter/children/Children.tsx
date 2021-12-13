import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const Children = () => {
	const [children, setChildren] = useState([]);
	const [allChildren, setAllChildren] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();

	const getChildren = async () => {
		axios
			.get("/vaccinecenter/children")
			.then((res) => {
				console.log(res.data.data);
				setChildren(res.data?.data);
				setAllChildren(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	const searchChild = (e) => {
		const filtered = children.filter((child: any) => {
			return child.childID.toLowerCase().includes(e.target.value.toLowerCase());
		});
		setAllChildren(filtered);
	};

	useEffect(() => {
		getChildren();
	}, []);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<>
			<Container>
				<Row className="subadmin-admin">
					<Col lg="12">
						<h3>Children</h3>
					</Col>
				</Row>
				<Row>
					<Col md="12" sm="12">
						<div className="form-group">
							<input
								type="text"
								className="form-control search-field"
								name="name"
								placeholder="Enter child ID to search child"
								onChange={searchChild}
								style={{ marginBottom: "-30px" }}
							/>
						</div>
					</Col>
				</Row>

				<Row className="subadmin-table">
					<Col lg="12">
						<Table style={tableStyles} bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Child ID</th>
									<th>Parent Name</th>
									<th>Parent CNIC</th>
									<th>Contact No</th>
									<th>Gender</th>
									<th>View Details</th>
								</tr>
							</thead>
							<tbody>
								{children &&
									allChildren
										.slice(Math.max(allChildren.length - 7, 1))
										.reverse()
										.map((child: any, index) => (
											<tr key={child._id}>
												<th scope="row">{index + 1}</th>
												<td>{child.childID}</td>
												<td>{child.parentName}</td>
												<td>{child.parentCNIC}</td>
												<td>{child.contactNo}</td>
												<td>{child.gender}</td>
												<td>
													<Link
														to={{
															pathname: `/vaccinecenter/children/${child._id}`,
															state: {
																data: child,
															},
														}}
													>
														view
													</Link>
												</td>
											</tr>
										))}
							</tbody>
						</Table>
						{allChildren.length === 0 && (
							<div style={{ margin: "10% 50%" }}>
								<h4>No child available.</h4>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</>
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

const rowStyles = {
	cursor: "pointer",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Children;
