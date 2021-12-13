import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { validMobileNumber, validString, validCNIC } from "../../../config/regex";
import { selectCity } from "../../../config/cities";

const AddChild = () => {
	const makeChildID = () => {
		let childID = "CH-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
		for (let i = 0; i <= 5; i++) childID += possible.charAt(Math.floor(Math.random() * possible.length));
		return childID;
	};

	React.useEffect(() => {
		getUser();
	}, []);

	const [user, setUser] = useState<any>([]);
	const [schedule, setSchedule] = useState<any>([]);

	const [data, setdata] = useState<any>({
		childID: makeChildID(),
		parentName: "",
		parentCNIC: "",
		contactNo: "",
		emergencyContact: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
		dateOfBirth: new Date(),
		gender: "",
		birthPlace: "",
		siblingNo: 1,
		hospitalName: "",
		vaccination: [
			{
				opv: { noOfDoses: 1 }, // polio
				measles: { noOfDoses: 0 },
				bcg: { noOfDoses: 1 }, // children TB
				pentavalent: { noOfDoses: 0 },
				pcv: { noOfDoses: 0 },
			},
		],
	});

	const [error, setError] = useState<any>({
		parentName: false,
		parentCNIC: false,
		contactNo: false,
		emergencyContact: false,
		address: {
			addr: false,
			area: false,
			city: false,
		},
		gender: false,
		birthPlace: false,
		siblingNo: false,
	});

	const handleChange = (name, value, regex) => {
		if (name === "addr" || name === "area" || name === "city") {
			setdata({
				...data,
				address: {
					...data.address,
					[name]: value,
				},
			});
			if (!regex.test(data.address[name])) {
				setError({
					...error,
					address: {
						...error.address,
						[name]: true,
					},
				});
			} else {
				setError({
					...error,
					address: {
						...error.address,
						[name]: false,
					},
				});
			}
		} else {
			setdata({
				...data,
				[name]: value,
			});
			if (!regex.test(data[name])) {
				setError({
					...error,
					[name]: true,
				});
			} else {
				setError({
					...error,
					[name]: false,
				});
			}
		}
	};

	const alert = useAlert();
	const history = useHistory();

	const getUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				setUser(res.data?.data.user);
				setdata({
					...data,
					hospitalName: res.data.data.user._id,
				});
				// setTimeout(() => {
				// 	axios
				// 		.get("/hospital/reminders")
				// 		.then((res) => console.log("reminder: ", res))
				// 		.catch((err) => console.log(err));
				// }, 50000);
			})
			.catch((err) =>
				alert.show("Failed to fetch user!", {
					type: "error",
				})
			);
	};

	const handleDateChange = (date: any) => {
		setdata({
			...data,
			dateOfBirth: date,
		});
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		console.log("data: ", data);
		axios
			.post("/hospital/children/add", data)
			.then((res) => {
				alert.show("Child added successfull!", {
					type: "success",
				});
				console.log("response: ", res.data);
				setSchedule(res.data?.data?.vaccineSchedule);

				history.push({
					pathname: "/hospital/children/printables",
					state: {
						data,
						schedule: res.data?.data?.vaccineSchedule,
					},
				});
			})
			.catch((err) =>
				alert.show("Failed to add child!", {
					type: "error",
				})
			);
	};

	return (
		<div className="add-form">
			<Container>
				<div className="section-title">
					<h2>Add Child Details</h2>
				</div>
				<Row>
					<Col>
						<div className="add-campaign">
							<form method="post" onSubmit={handleFormSubmit}>
								<Row>
									<Col md="6" sm="12">
										<div className="form-group">
											<label>Gender</label>
											<select
												value={data.gender}
												onChange={(e) => setdata({ ...data, gender: e.target.value })}
												className="form-control"
												required
											>
												<option value="0">Gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
										</div>
									</Col>
									<Col md="6" sm="12">
										<div className="form-group">
											<label>Date of Birth</label>
											<br />
											<DatePicker
												className="form-control"
												selected={data.dateOfBirth}
												onChange={handleDateChange}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Parent name</label>
											<input
												type="text"
												className="form-control"
												name="parentName"
												placeholder="Parent Name"
												value={data.parentName}
												onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
												// onChange={(e) => setdata({ ...data, parentName: e.target.value })}
											/>
											{error.parentName && <p className="err">Invalid string!</p>}
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Parent CNIC</label>
											<input
												type="text"
												className="form-control"
												name="parentCNIC"
												placeholder="Parent CNIC i.e 12345-1234567-1"
												value={data.parentCNIC}
												onChange={(e) => handleChange(e.target.name, e.target.value, validCNIC)}
												// onChange={(e) => setdata({ ...data, parentCNIC: e.target.value })}
											/>
										</div>
										{error.parentCNIC && <p className="err">Invalid CNIC!</p>}
									</Col>

									<Col md="6" sm="12">
										<div className="form-group">
											<label>Contact Number</label>
											<input
												required
												type="text"
												className="form-control"
												name="contactNo"
												placeholder="Contact Number i.e +923159489878"
												value={data.contactNo}
												// onChange={(e) => setdata({ ...data, contactNo: e.target.value })}
												onChange={(e) => handleChange(e.target.name, e.target.value, validMobileNumber)}
											/>
											{error.contactNo && <p className="err">Invalid phone number!</p>}
										</div>
									</Col>
									<Col md="6" sm="12">
										<div className="form-group">
											<label>Emergency Contact</label>
											<input
												required
												type="text"
												className="form-control"
												name="emergencyContact"
												placeholder="Emergency Contact i.e +923159999371"
												value={data.emergencyContact}
												onChange={(e) => handleChange(e.target.name, e.target.value, validMobileNumber)}
												// onChange={(e) => setdata({ ...data, emergencyContact: e.target.value })}
											/>
											{error.emergencyContact && <p className="err">Invalid phone number!</p>}
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>City</label>
											<input
												required
												type="text"
												className="form-control"
												name="addr"
												placeholder="Address"
												value={data.address.addr}
												onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
												// onChange={(e) =>
												// 	setData({ ...data, address: { ...data.address, addr: e.target.value } })
												// }
											/>
											{error.address.addr && <p className="err">Invalid address!</p>}
										</div>
									</Col>
									<Col md="6" sm="12">
										<div className="form-group">
											<label>City</label>

											<input
												required
												type="text"
												className="form-control"
												name="area"
												placeholder="Area"
												value={data.address.area}
												onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
												// onChange={(e) =>
												// 	setData({ ...data, address: { ...data.address, area: e.target.value } })
												// }
											/>
											{error.address.area && <p className="err">Invalid address!</p>}
										</div>
									</Col>
									<Col md="6" sm="12">
										<div className="form-group">
											<label>City</label>
											<select
												required
												className="form-control"
												name="city"
												placeholder="City"
												value={data.address.city}
												onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
											>
												<option value="">City</option>
												{selectCity()}
											</select>
										</div>
									</Col>

									<Col md="6" sm="12">
										<div className="form-group">
											<label>Place of Birth</label>
											<select
												required
												className="form-control"
												name="birthPlace"
												placeholder="Birth Place"
												value={data.birthPlace}
												onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
											>
												<option value="">Birth Place</option>
												{selectCity()}
											</select>
										</div>
									</Col>
									<Col md="6" sm="12">
										<div className="form-group">
											<label>Sibling No.</label>
											<input
												type="number"
												className="form-control"
												name="cnic"
												placeholder="Sibling number"
												value={data.siblingNo}
												onChange={(e) => setdata({ ...data, siblingNo: e.target.value })}
											/>
										</div>
									</Col>

									<Col md="12" sm="12">
										<button className="default-btn signup-btn" type="submit">
											Add child
										</button>
									</Col>
								</Row>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AddChild;
