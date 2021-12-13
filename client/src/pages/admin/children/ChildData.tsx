import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button, Input } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";

const ChildData = () => {
	const [hospitalName, setHospitalName] = useState<any>([]);
	const alert = useAlert();
	const location = useLocation();
	const { id } = useParams<{ id: string }>();

	const child: any = location.state ? location.state : "";
	// console.log("Child in vc: ", child.data.hospitalName);
	const [data, setData] = useState<any>(child.data?.vaccination[0]);
	const [schedule, setSchedule] = useState([]);

	const getVaccineSchedule = () => {
		axios
			.get(`/admin/childvaccineschedule/${id}`)
			.then((res) => {
				console.log("Schedule: ", res.data.data[0]);
				setSchedule(res.data.data[0]);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccination schedule", {
					type: "error",
				})
			);
	};

	const getHospital = async () => {
		axios
			.get(`/admin/hospitals/${child.data?.hospitalName}`)
			.then((res) => {
				console.log("Hospital", res.data.data);
				setHospitalName(res.data.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch hospitals", {
					type: "error",
				})
			);
	};

	const changeCheck: any = (name, i) => {
		setData({
			...data,
			[name]: {
				noOfDoses: i,
			},
		});
	};

	useEffect(() => {
		getHospital();
		getVaccineSchedule();
	}, []);

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="9">
					<h3>Details of Child ID: {child.data.childID}</h3>
				</Col>
				<Col lg="3">
					<button className="default-btn">
						<Link
							to={{
								pathname: `/admin/vaccineschedule/${id}`,
								state: {
									data: schedule,
								},
							}}
							style={{ color: "#fff" }}
						>
							Vaccination Schedule
						</Link>
					</button>
					{/* <h3>Details of Child ID: {child.data.childID}</h3> */}
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col>
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Child ID</th>
								<td>{child.data.childID}</td>
							</tr>
							<tr>
								<th>Parent Name</th>
								<td>{child.data.parentName}</td>
							</tr>
							<tr>
								<th>Parent CNIC</th>
								<td>{child.data.parentCNIC}</td>
							</tr>
							<tr>
								<th>Contact No</th>
								<td>{child.data.contactNo}</td>
							</tr>
							<tr>
								<th>Date of Birth</th>
								<td>{new Date(child.data.dateOfBirth).toDateString()}</td>
							</tr>
							<tr>
								<th>Gender</th>
								<td>{child.data.gender}</td>
							</tr>
							<tr>
								<th>Sibling Number</th>
								<td>{child.data.siblingNo}</td>
							</tr>
							<tr>
								<th>Gender</th>
								<td>{child.data.gender}</td>
							</tr>
							<tr>
								<th>City</th>
								<td>{child.data.birthPlace}</td>
							</tr>
							<tr>
								<th>Hospital where born</th>
								<td>{hospitalName?.name}</td>
							</tr>
							<tr>
								<th>Address</th>
								<td>
									{child.data.address.addr}, {child.data.address.area}, {child.data.address.city}
								</td>
							</tr>
						</thead>
					</Table>
				</Col>
			</Row>

			<Row className="subadmin-admin">
				<Col lg="12">
					<h4>Vaccination Details</h4>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col>
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Vaccine Name</th>
								<th>Number of doses</th>
							</tr>
							<tr>
								<th>OPV (Polio)</th>
								<td>
									{[...Array(4)].map((x, i) => {
										if (data.opv.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("opv", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>Pentavalent</th>
								<td>
									{[...Array(3)].map((x, i) => {
										if (data.pentavalent.noOfDoses >= i + 1) {
											return (
												<input
													checked
													disabled
													style={{ backgroundColor: "green" }}
													className="checkbox"
													type="checkbox"
												></input>
											);
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													value={i + 1}
													onChange={() => changeCheck("pentavalent", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>PCV (Pneumonia)</th>
								<td>
									{[...Array(3)].map((x, i) => {
										if (data.pcv.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("pcv", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>Measles</th>
								<td>
									{[...Array(2)].map((x, i) => {
										if (data.measles.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("measles", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>BCG (Children's TB)</th>
								<td>
									{[...Array(1)].map((x, i) => {
										if (data.bcg.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("bcg", i + 1)}
												></input>
											);
										}
									})}
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

export default ChildData;
