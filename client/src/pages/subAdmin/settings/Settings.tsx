import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";

const Settings = () => {
	const [id, setId] = useState("");
	const [data, setData] = useState<any>({
		email: "",
		name: "",
		cnic: "",
		userType: "subadmin",
		password: "",
		phoneNo: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
	});
	const alert = useAlert();
	const [confirmPass, setConfirmPass] = useState("");

	const getUser = () => {
		if (confirmPass === data.password) {
			axios
				.get("/users/current")
				.then((res) => {
					setId(res.data?.data.user._id);
					setData({
						email: res.data?.data.user.email,
						name: res.data?.data.user.name,
						cnic: res.data?.data.user.cnic,
						userType: res.data?.data.user.userType,
						phoneNo: res.data?.data.user.phoneNo,
						address: {
							addr: res.data?.data.user.address.addr,
							area: res.data?.data.user.address.area,
							city: res.data?.data.user.address.city,
						},
					});
				})
				.catch((err) =>
					alert.show("Failed to fetch user!", {
						type: "error",
					})
				);
		} else {
			alert.show("Password must match with confirm password!", {
				type: "error",
			});
		}
	};

	const handleSubmit = () => {
		console.log(data);
		axios
			.put(`/users/${id}`, data)
			.then((res) => {
				alert.show("Profile updated syccessfully!!", {
					type: "error",
				});
			})
			.catch((err) => {
				alert.show("Failed to update profile. Please try again later!", {
					type: "error",
				});
			});
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>Settings</h3>
				</Col>
			</Row>
			<Row>
				<form onSubmit={() => handleSubmit()}>
					<Row>
						<Col md="12" sm="12">
							<div className="form-group">
								<select
									value={data?.userType}
									onChange={(e) => setData({ ...data, userType: e.target.value })}
									className="form-control"
									disabled
								>
									<option value="">subadmin</option>
								</select>
							</div>
						</Col>
						<Col md="12" sm="12">
							<div className="form-group">
								<input
									required
									type="text"
									className="form-control"
									name="name"
									placeholder="Name"
									value={data?.name}
									onChange={(e) => setData({ ...data, name: e.target.value })}
									// pattern="[a-zA-Z]+"
									// title="Enter alphabets only."
								/>
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
									value={data?.email}
									onChange={(e) => setData({ ...data, email: e.target.value })}
								/>
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
									value={data?.password}
									onChange={(e) => setData({ ...data, password: e.target.value })}
									pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
									title="Mininmum 8 characters, Atleast 1 small letter, Alteast 1 capital letter, Atleast 1 number"
								/>
							</div>
						</Col>
						<Col md="6" sm="12">
							<div className="form-group">
								<input
									required
									type="password"
									className="form-control"
									name="password"
									placeholder="Confirm Password"
									value={confirmPass}
									onChange={(e) => setConfirmPass(e.target.value)}
									pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
									title="Mininmum 8 characters, Atleast 1 small letter, Alteast 1 capital letter, Atleast 1 number"
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
									placeholder="Phone Number"
									value={data?.phoneNo}
									onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
								/>
							</div>
						</Col>
						<Col md="12" sm="12">
							<div className="form-group">
								<input
									required
									type="text"
									className="form-control"
									name="name"
									placeholder="Address"
									value={data?.address.addr}
									onChange={(e) => setData({ ...data, address: { ...data.address, addr: e.target.value } })}
								/>
							</div>
						</Col>
						<Col md="6" sm="12">
							<div className="form-group">
								<input
									required
									type="text"
									className="form-control"
									name="name"
									placeholder="Area"
									value={data?.address.area}
									onChange={(e) => setData({ ...data, address: { ...data.address, area: e.target.value } })}
								/>
							</div>
						</Col>
						<Col md="6" sm="12">
							<div className="form-group">
								<input
									required
									type="text"
									className="form-control"
									name="name"
									placeholder="City"
									value={data?.address.city}
									onChange={(e) => setData({ ...data, address: { ...data.address, city: e.target.value } })}
								/>
							</div>
						</Col>
						<Col md="12" sm="12">
							<button className="default-btn signup-btn" type="submit">
								Update Profile
							</button>
						</Col>
					</Row>
				</form>
			</Row>
		</Container>
	);
};

export default Settings;
