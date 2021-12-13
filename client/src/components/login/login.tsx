import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import loginImg from "../../assets/images/login-img.jpg";
import "../../index.css";
import Footer from "../footer/Footer";
import FooterBottom from "../footer/FooterBottom";
import Header from "../header/Header";
import { useUserDispatch, loginUser } from "../../context/userContext";
import { useAlert } from "react-alert";
import { withRouter, useHistory } from "react-router-dom";

const Login = () => {
	const [role, setRole] = useState("hospital");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	var userDispatch = useUserDispatch();
	const alert = useAlert();
	const history = useHistory();

	const roleOnChange = (e: any) => {
		setRole(e.target.value);
	};
	return (
		<>
			<Header />
			<div className="signup-area">
				<Container>
					<div className="section-title">
						<h2>Sign In Your Account!</h2>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium quas cumque iste veniam id
							dolorem deserunt ratione error voluptas rem ullam possimus placeat, ut, odio
						</p>
					</div>
					<Row>
						<Col lg="6">
							<div className="login-img">
								<img src={loginImg} />
							</div>
						</Col>
						<Col lg="6">
							<div className="login-form">
								<form method="post">
									<Row>
										<Col md="12" sm="12">
											<div className="form-group">
												<select className="form-control" onChange={roleOnChange}>
													<option value="0">Sign in As</option>
													<option value="hospital">Hospital</option>
													<option value="vaccinecenter">Vaccine center</option>
												</select>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="email"
													className="form-control"
													name="email"
													placeholder="Email Address"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
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
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</div>
										</Col>
										<Col lg="6" sm="12" className="form-condition">
											<div className="agree-label">
												<input type="checkbox" id="chb1" />
												<label htmlFor="chb1">Remember me</label>
											</div>
										</Col>
										<Col lg="6" sm="12">
											<a className="forget" href="/recover-password">
												Forgot my password?
											</a>
										</Col>
										<Col md="12" sm="12">
											<a
												href={role == "hospital" ? "/hospital" : "/vaccinecenter"}
												className="default-btn signup-btn"
												type="submit"
												onClick={(e) => loginUser(e, email, password, userDispatch, alert, history)}
											>
												Log In
											</a>
										</Col>
										<Col md="12" sm="12">
											<p className="account-desc">
												Not a member? <a href="/signup">Sign Up</a>
											</p>
										</Col>
									</Row>
								</form>
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

export default Login;
