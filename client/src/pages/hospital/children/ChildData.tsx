import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button, Input } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import OtpInput from "react-otp-input";

const ChildData = () => {
	const [hospitalName, setHospitalName] = useState<any>([]);
	const alert = useAlert();
	const location = useLocation();
	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	const child: any = location.state ? location.state : "";
	const [data, setData] = useState<any>(child.data?.vaccination[0]);
	const [otp, setOtp] = useState("");
	const [otpBackend, setOtpBackend] = useState("");
	const [flag, setFlag] = useState(false);
	const [otpResend, setOtpResend] = useState(false);
	const [schedule, setSchedule] = useState([]);

	const handleOTPChange = (otp) => {
		setOtp(otp);
		console.log(otp);
	};

	const getVaccineSchedule = () => {
		axios
			.get(`/hospital/vaccineschedule/${id}`)
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
			.get("/users/current")
			.then((res) => {
				// console.log(res.data.data);
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

	const otpFlag = () => {
		setFlag(true);
		setOtpResend(true);
		sendOTP();
	};

	const sendOTP = () => {
		axios
			.get(`/hospital/otp/${id}`)
			.then((res) => {
				console.log("otp: ", res.data.data);
				setOtpBackend(res.data?.data?.otp);
				alert.show("OTP has been to your phone number.", {
					type: "success",
				});
			})
			.catch((err) =>
				alert.show("Failed to send OTP. Please try again later.", {
					type: "error",
				})
			);
		setOtpResend(false);
	};

	const updateChild = () => {
		setOtpResend(true);
		if (otp === otpBackend) {
			const d = {
				vaccination: [data],
			};
			// console.log("data: ", d);
			axios
				.put(`/hospital/children/${id}`, d)
				.then((res) => {
					console.log("data from response: ", res.data);
					alert.show("Child updated successfully", {
						type: "success",
					});
					setFlag(false);
					history.push(`/hospital/children/`);
				})
				.catch((err) =>
					alert.show("Failed to update child.", {
						type: "error",
					})
				);
		} else {
			alert.show("Wrong OTP. Try again.", {
				type: "error",
			});
		}
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
								pathname: `/hospital/vaccineschedule/${id}`,
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
								<td>{hospitalName.user?.name}</td>
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
					{console.log("Data: ", data)}
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
											return <input checked disabled className="checkbox" type="checkbox"></input>;
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
			<Row>
				<Col md="12" sm="12">
					{flag === false && (
						<button className="default-btn signup-btn" type="submit" onClick={() => otpFlag()}>
							Update child
						</button>
					)}
				</Col>
			</Row>
			{flag && (
				<Row style={otpStyles}>
					<Col style={{ fontSize: "22px", marginLeft: "-10%" }}>
						Please enter the verification code sent to your mobile
					</Col>
					<Col md={12}>
						<OtpInput
							separator={
								<span>
									<strong>.</strong>
								</span>
							}
							inputStyle={{
								width: "3rem",
								height: "3rem",
								margin: "0.5rem 1rem",
								fontSize: "2rem",
								borderRadius: 4,
								border: "1px solid rgba(0,0,0,0.3)",
							}}
							value={otp}
							onChange={handleOTPChange}
							numInputs={4}
						/>
					</Col>
					<Col md="12" sm="12">
						<button
							style={{ marginLeft: "90px" }}
							className="default-btn signup-btn"
							type="submit"
							onClick={() => updateChild()}
						>
							Submit
						</button>
						{otpResend && (
							<button
								style={{ marginLeft: "90px" }}
								className="default-btn signup-btn"
								type="submit"
								onClick={() => sendOTP()}
							>
								Resend OTP
							</button>
						)}
					</Col>
				</Row>
			)}
		</Container>
	);
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

const otpStyles = {
	marginLeft: "25%",
};

export default ChildData;
