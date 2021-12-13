import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { validEmail, validPassword, validString, validMobileNumber } from "../../../config/regex";
import { selectCity } from "../../../config/cities";

const AddWorker = (props) => {
	const workerID: any = useParams();
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();

	const [error, setError] = useState<any>({
		email: false,
		name: false,
		cnic: false,
		userType: false,
		password: false,
		phoneNo: false,
		address: {
			addr: false,
			area: false,
			city: false,
		},
	});

	const [data, setData] = useState<any>({
		email: "",
		name: "",
		cnic: "",
		userType: "worker",
		password: "",
		parentOrg: "",
		phoenNo: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
	});
	const [confirmPass, setConfirmPass] = useState("");
	const worker: any = location.state ? location.state : "";
	console.log("Worker a: ", worker);

	const handleChange = (name, value, regex) => {
		if (name === "addr" || name === "area" || name === "city") {
			setData({
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
			setData({
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

	const getCurrentUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				console.log("user: ", res.data.data.user);
				setData({
					...data,
					parentOrg: res.data.data.user._id,
				});
			})
			.catch((err) => console.log("Error: ", err));
	};

	// const { worker } = location.state;
	console.log("id", workerID.id);

	React.useEffect(() => {
		getCurrentUser();
		if (workerID.id === "add") {
			return;
		} else {
			workerID.id !== "add" &&
				setData({
					email: worker ? worker.worker.email : "",
					name: worker ? worker.worker.name : "",
					cnic: worker ? worker.worker.cnic : "",
					phoneNo: worker ? worker.worker.phoneNo : "",
					userType: "worker",
					parentOrd: worker ? worker.worker.parentOrg : "",
					password: worker ? worker.worker.password : "",
					address: {
						addr: worker ? worker.worker.address.addr : "",
						area: worker ? worker.worker.address.area : "",
						city: worker ? worker.worker.address.city : "",
					},
				});
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);

		if (workerID.id === "add") {
			if (data.password === confirmPass) {
				axios
					.post("/vaccinecenter/workers/add", data)
					.then((res) => {
						console.log(res);
						alert.show("worker added successfully!", {
							type: "success",
						});
						history.push("/vaccinecenter/workers");
					})
					.catch((err) => {
						console.log(err);
						alert.show("Failed to add worker", {
							type: "error",
						});
					});
			} else {
				alert.show("Password donot match with confirm password", {
					type: "error",
				});
			}
		} else {
			axios
				.put(`/vaccinecenter/workers/${workerID.id}`, data)
				.then((res) => {
					console.log(res);
					alert.show("worker updated successfully!", {
						type: "success",
					});
					history.push("/vaccinecenter/workers");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to update worker", {
						type: "error",
					});
				});
		}
	};

	return (
		<Container>
			{/* {console.log("worker", props.location)} */}
			<Row>
				<Col>
					<div className="signup-form" style={formStyles}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col md="12" sm="12">
									<h3 style={headerStyles}>{workerID.id == "add" ? "Add worker" : "Update worker"}</h3>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											required
											type="text"
											className="form-control"
											name="name"
											placeholder="Name"
											value={data.name}
											onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
											// onChange={(e) => setData({ ...data, name: e.target.value })}
											// pattern="[a-zA-Z]+"
											// title="Enter alphabets only."
										/>
										{error.name && <p className="err">Invalid Name!</p>}
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											required
											type="email"
											title="i.e abc@mail.com"
											className="form-control"
											name="email"
											placeholder="Email Address"
											value={data.email}
											onChange={(e) => handleChange(e.target.name, e.target.value, validEmail)}
										/>
										{error.email && <p className="err">Your email is invalid</p>}
									</div>
								</Col>
								<Col md="6" sm="12">
									<div className="form-group">
										<input
											required
											type="password"
											className="form-control"
											name="password"
											placeholder="Password"
											value={data.password}
											onChange={(e) => handleChange(e.target.name, e.target.value, validPassword)}
											title="Mininmum 8 characters, Atleast 1 small letter, Alteast 1 capital letter, Atleast 1 number"
										/>
										{error.password && <p className="err">Invalid password!</p>}
									</div>
								</Col>
								<Col md="6" sm="12">
									<div className="form-group">
										<input
											type="password"
											className="form-control"
											name="confirnPassword"
											placeholder="Confirm Password"
											value={confirmPass}
											onChange={(e) => setConfirmPass(e.target.value)}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											required
											type="text"
											className="form-control"
											name="phoneNo"
											placeholder="Phone Number +923151234569"
											value={data.phoneNo}
											title="e.g +923151234567"
											onChange={(e) => handleChange(e.target.name, e.target.value, validMobileNumber)}
											// onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
										/>
										{error.phoneNo && <p className="err">Invalid phone number!</p>}
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
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
								<Col md="12" sm="12">
									<button type="submit" className="default-btn signup-btn">
										{workerID.id === "add" ? "Add" : "Update"}
									</button>
								</Col>
							</Row>
						</form>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

const headerStyles = {
	marginBottom: "20px",
	marginLeft: "30%",
};

const formStyles = {
	marginLeft: "20%",
	height: "700px",
};

export default AddWorker;
