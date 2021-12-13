import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "../../../config/AxiosOptions";
import { Container, Row, Col, Table } from "reactstrap";
import "../../../index.css";
import { useAlert } from "react-alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssignVaccine = () => {
	const subadminID: any = useParams();
	const [vaccines, setVaccines] = useState([]);
	const [subAdminVaccines, setSubAdminVaccines] = useState([]);
	const [data, setData] = useState<any>({
		vaccine: "",
		quantity: 0,
		date: new Date(),
	});
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();
	const vaccineRequest: any = location.state ? location.state : "";
	console.log("VAccinr : ", vaccineRequest.data);

	const getVaccines = () => {
		axios
			.get("/admin/vaccines")
			.then((res) => {
				console.log("vaccines: ", res.data.data);
				setVaccines(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				alert.show("Failed to add vaccine.", {
					type: "error",
				});
			});
	};

	const getSubadminVaccines = () => {
		axios
			.get(`/admin/usersvaccines/${vaccineRequest.data.organization}`)
			.then((res) => {
				console.log("SUb admin Vaccines: ", res.data?.data.uservaccines[0].vaccines);
				setSubAdminVaccines(res.data?.data.uservaccines[0].vaccines);
			})
			.catch((err) => {
				console.log(err);
				alert.show("Failed to get subadmin vaccine stock info.", {
					type: "error",
				});
			});
	};

	const handleDateChange = (date: any) => {
		setData({
			...data,
			date,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("data: ", data);
		console.log("subadmin id: ", subadminID);

		vaccines?.map((vaccine: any) => {
			if (vaccine.name === data.vaccine) {
				if (vaccine.quantity > data.quantity) {
					axios
						.post(`/admin/subadmins/assignvaccine/${subadminID.id}`, data)
						.then((res) => {
							console.log("add: ", res);
							alert.show("Vaccine assigned successfully!", {
								type: "success",
							});
							history.push(`/admin/subadmins/`);
						})
						.catch((err) => {
							console.log(err);
							alert.show("Failed to assign vaccine. Please try again later.", {
								type: "error",
							});
						});
				} else {
					alert.show("Vaccine not available. Please try again later or reduce your quantity.", {
						type: "error",
					});
				}
			}
		});
	};

	useEffect(() => {
		getVaccines();
		vaccineRequest?.data && getSubadminVaccines();
	}, []);

	// const { orgName, vaccine, quantity } = vaccineRequest?.data;
	return (
		<>
			{vaccineRequest?.data && (
				<Container>
					<Row>
						<Col lg="12">
							<h3>Vaccine Request Details</h3>
						</Col>
						<Col>
							<Table style={tableStyles} bordered hover>
								<thead>
									<tr>
										<th>Sub admin name</th>
										<td>{vaccineRequest?.data.orgName}</td>
									</tr>
									<tr>
										<th>Requested Vaccine</th>
										<td>{vaccineRequest?.data.vaccine}</td>
									</tr>
									<tr>
										<th>Requested Quantity</th>
										<td>{vaccineRequest?.data.quantity}</td>
									</tr>
									<tr>
										<th>Available quantity of requested vaccine at SUB ADMIN</th>
										<td>
											{Object.keys(subAdminVaccines).map((item) => {
												if (item === vaccineRequest?.data.vaccine) {
													return subAdminVaccines[item].quantity;
												}
											})}
										</td>
									</tr>
									<tr>
										<th>Available qunatity of requested vaccine at ADMIN</th>
										<td>
											{vaccines.map((item: any) => {
												if (item.name === vaccineRequest?.data.vaccine) {
													return item.quantity;
												}
											})}
										</td>
									</tr>
								</thead>
							</Table>
						</Col>
					</Row>
				</Container>
			)}
			<Container>
				{/* {console.log("subadmin", props.location)} */}
				<Row>
					<Col>
						<div className="signup-form" style={formStyles}>
							<form onSubmit={handleSubmit}>
								<Row>
									<Col md="12" sm="12">
										<h3 style={headerStyles}>Assign Vaccine</h3>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Vaccine name</label>
											<select
												required
												value={data.vaccine}
												onChange={(e) => setData({ ...data, vaccine: e.target.value })}
												className="form-control"
											>
												<option>Select vaccine</option>
												{vaccines.map(
													(vaccine: any) =>
														vaccine.quantity > 0 && (
															<option value={vaccine.name} key={vaccine._id}>
																{vaccine.name}
															</option>
														)
												)}
											</select>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Quantity</label>
											<input
												required
												min={1}
												type="number"
												className="form-control"
												name="quantity"
												placeholder="Quantity"
												value={data.quantity}
												onChange={(e) => setData({ ...data, quantity: e.target.value })}
											/>
										</div>
									</Col>

									<Col md="12" sm="12" lg="12">
										<label>Date</label>
										<div className="form-group">
											<DatePicker
												className="form-control"
												selected={data.date}
												onChange={handleDateChange}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<button type="submit" className="default-btn signup-btn">
											Assign
										</button>
									</Col>
								</Row>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

const headerStyles = {
	marginBottom: "20px",
	marginLeft: "30%",
};

const formStyles = {
	marginLeft: "20%",
	height: "500px",
	marginBottom: "20px",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
	marginBottom: "20px",
};

export default AssignVaccine;
