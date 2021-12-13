import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const Workers = () => {
	const [workers, setWorkers] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();
	const history = useHistory();

	const getWorkers = async () => {
		axios
			.get("/vaccinecenter/workers")
			.then((res) => {
				console.log(res.data.data);
				setWorkers(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch worker", {
					type: "error",
				})
			);
	};

	const handleDelete = (id) => {
		axios
			.delete(`/vaccinecenter/workers/${id}`)
			.then((res) => {
				alert.show("Worker deleted successfully!", {
					type: "success",
				});
				setWorkers(workers.filter((item: any) => item._id !== id));
			})
			.catch((err) => {
				alert.show("Failed to delete worker. Try again later", {
					type: "error",
				});
			});
	};

	useEffect(() => {
		getWorkers();
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
					<h3>Polio Workers</h3>
				</Col>
				<Col lg="3">
					<button className="default-btn">
						<a href="/vaccinecenter/workers/add" style={linkStyles}>
							Add polio worker
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
								<th>Email</th>
								<th>City</th>
								<th>Assign vaccine</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{workers &&
								workers.map((worker: any, index) => (
									<tr key={worker._id}>
										<th scope="row">{index + 1}</th>
										<td>{worker.name}</td>
										<td>{worker.email}</td>
										<td>{worker.address.city}</td>
										<td>
											<Link
												to={{
													pathname: `/vaccinecenter/assignvaccine/${worker._id}`,
												}}
											>
												assign
											</Link>
										</td>
										<td>
											<Link
												to={{
													pathname: `/vaccinecenter/workers/${worker._id}`,
													state: {
														worker,
													},
												}}
											>
												<BiEdit style={editStyles} size="20" />
											</Link>
										</td>
										<td>
											<AiFillDelete
												onClick={() => handleDelete(worker._id)}
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

export default Workers;
