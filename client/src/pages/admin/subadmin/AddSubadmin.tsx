import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { validEmail, validPassword, validString, validMobileNumber } from "../../../config/regex";
import { selectCity } from "../../../config/cities";

const AddSubadmin = (props) => {
	const subadminID: any = useParams();
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
		userType: "subadmin",
		phoneNo: "",
		password: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
	});
	const [confirmPass, setConfirmPass] = useState("");
	const subadmin: any = location.state ? location.state : "";

	// const { subadmin } = location.state;
	console.log("object", subadmin.subadmin);
	console.log("id", subadminID.id);

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

	React.useEffect(() => {
		if (subadminID.id === "add") {
			return;
		} else {
			subadminID.id !== "add" &&
				setData({
					email: subadmin ? subadmin.subadmin.email : "",
					name: subadmin ? subadmin.subadmin.name : "",
					cnic: subadmin ? subadmin.subadmin.cnic : "",
					phoneNo: subadmin ? subadmin.subadmin.phoneNo : "",
					userType: "subadmin",
					password: subadmin ? subadmin.subadmin.password : "",
					address: {
						addr: subadmin ? subadmin.subadmin.address.addr : "",
						area: subadmin ? subadmin.subadmin.address.area : "",
						city: subadmin ? subadmin.subadmin.address.city : "",
					},
				});
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subadminID.id === "add") {
			if (data.password === confirmPass) {
				axios
					.post("/admin/subadmins/add", data)
					.then((res) => {
						console.log(res);
						alert.show("Subadmin added successfully!", {
							type: "success",
						});
						history.push("/admin/subadmins");
					})
					.catch((err) => {
						console.log(err);
						alert.show("Failed to add subadmin", {
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
				.put(`/admin/subadmins/${subadminID.id}`, data)
				.then((res) => {
					console.log(res);
					alert.show("Subadmin updated successfully!", {
						type: "success",
					});
					history.push("/admin/subadmins");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to update subadmin", {
						type: "error",
					});
				});
		}

		console.log(data);
	};

	return (
		<Container>
			{/* {console.log("subadmin", props.location)} */}
			<Row>
				<Col>
					<div className="signup-form" style={formStyles}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col md="12" sm="12">
									<h3 style={headerStyles}>{subadminID.id == "add" ? "Add Subadmin" : "Update Subadmin"}</h3>
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
										{subadminID.id === "add" ? "Add" : "Update"}
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

export default AddSubadmin;
