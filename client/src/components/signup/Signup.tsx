import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import signUpImg from "../../assets/images/sign-up-img.jpg";
import "../../index.css";
import Footer from "../footer/Footer";
import FooterBottom from "../footer/FooterBottom";
import Header from "../header/Header";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "../../config/AxiosOptions";
import { validEmail, validPassword, validString, validMobileNumber } from "../../config/regex";
import { selectCity } from "../../config/cities";

const Signup = () => {
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();
	const [file, SETfile] = useState<any>(null);

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
		userType: "",
		password: "",
		phoneNo: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
	});
	const [confirmPass, setConfirmPass] = useState("");

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

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("permit", file);
		// console.log("Address: ", JSON.stringify(data.address));
		Object.keys(data).map((key) => {
			console.log("key: " + key + "\nData: " + data[key]);
			formData.append(key, data[key]);
		});
		formData.append("address", JSON.stringify(data.address));

		if (data.password === confirmPass) {
			axios
				.post("/users/create", formData)
				.then((res) => {
					console.log(res);
					alert.show("User request sent successfully!", {
						type: "success",
					});
					// history.push("/login");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to send request. please try again!", {
						type: "error",
					});
				});
		} else {
			alert.show("Password donot match with confirm password", {
				type: "error",
			});
		}

		console.log("signup form: ", formData);
	};
	return (
		<>
			<Header />
			<div className="signup-area">
				<Container>
					<div className="section-title">
						<h2>Create an account!</h2>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium quas cumque iste veniam id
							dolorem deserunt ratione error voluptas rem ullam possimus placeat, ut, odio
						</p>
					</div>
					<Row>
						<Col lg="6">
							<div className="signup-form">
								<form onSubmit={handleSubmit}>
									<Row>
										<Col md="12" sm="12">
											<div className="form-group">
												<select
													value={data.userType}
													onChange={(e) => setData({ ...data, userType: e.target.value })}
													className="form-control"
													required
												>
													<option value="">Sign up As</option>
													<option value="hospital">Hospital</option>
													<option value="vaccinecenter">Vaccine center</option>
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
													value={data.name}
													onChange={(e) => handleChange(e.target.name, e.target.value, validString)}
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
													// onChange={(e) => setData({ ...data, password: e.target.value })}
													// pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
													title="Mininmum 8 characters, Atleast 1 small letter, Alteast 1 capital letter, Atleast 1 number"
												/>
												{error.password && <p className="err">Invalid password!</p>}
											</div>
										</Col>
										<Col md="6" sm="12">
											<div className="form-group">
												<input
													required
													type="password"
													className="form-control"
													name="confirmPassword"
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
											<div className="form-group">
												<input
													required
													type="file"
													className="form-control"
													name="permit"
													placeholder="Permit"
													value={file?.filename}
													onChange={(e: any) => SETfile(e.target.files[0])}
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<button className="default-btn signup-btn" type="submit">
												Sign up
											</button>
										</Col>
										<Col md="12" sm="12">
											<p style={{ marginTop: "20px" }} className="account-desc">
												Already have an account? <a href="/login">Log In</a>
											</p>
										</Col>
									</Row>
								</form>
							</div>
						</Col>
						<Col lg="6">
							<div className="signup-img">
								<img src={signUpImg} />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default Signup;
