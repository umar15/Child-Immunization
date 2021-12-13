import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";

const AddSubadmin = (props) => {
	const subadminID: any = useParams();
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();

	const [data, setData] = useState<any>({
		email: "",
		name: "",
		cnic: "",
		userType: "sub admin",
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

	React.useEffect(() => {
		if (subadminID.id === "add") {
			return;
		} else {
			subadminID.id !== "add" &&
				setData({
					email: subadmin ? subadmin.subadmin.email : "",
					name: subadmin ? subadmin.subadmin.name : "",
					cnic: subadmin ? subadmin.subadmin.cnic : "",
					userType: "sub admin",
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
											type="text"
											className="form-control"
											name="name"
											placeholder="Name"
											value={data.name}
											onChange={(e) => setData({ ...data, name: e.target.value })}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											type="email"
											className="form-control"
											name="email"
											placeholder="Email Address"
											value={data.email}
											onChange={(e) => setData({ ...data, email: e.target.value })}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											type="password"
											className="form-control"
											name="password"
											placeholder="Password"
											value={data.password}
											onChange={(e) => setData({ ...data, password: e.target.value })}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											type="password"
											className="form-control"
											name="password"
											placeholder="Confirm Password"
											value={confirmPass}
											onChange={(e) => setConfirmPass(e.target.value)}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											name="name"
											placeholder="Address"
											value={data.address.addr}
											onChange={(e) =>
												setData({ ...data, address: { ...data.address, addr: e.target.value } })
											}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											name="name"
											placeholder="Area"
											value={data.address.area}
											onChange={(e) =>
												setData({ ...data, address: { ...data.address, area: e.target.value } })
											}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											name="name"
											placeholder="City"
											value={data.address.city}
											onChange={(e) =>
												setData({ ...data, address: { ...data.address, city: e.target.value } })
											}
										/>
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
