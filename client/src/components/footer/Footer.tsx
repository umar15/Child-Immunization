import React from "react";
import { Container, Row, Col } from "reactstrap";
import { AiFillInstagram, AiFillFacebook, AiFillLinkedin, AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { BiLocationPlus } from "react-icons/bi";

import logo from "../../assets/images/logo-two.png";

const Footer = () => {
	return (
		<footer className="footer-top-area">
			<Container>
				<Row>
					<Col lg="6" md="6" sm="12">
						<div className="single-widget">
							<a href="/">
								<img src={logo} width="70px" alt="logo" />
							</a>
							<p>
								Lorem ipsum dolor, sit amet earum consectetur adipisicing elit. Cupiditate rerum quidem fugiat
								sapiente! Iusto quae perspiciatis, repudiandae ipsam minus et ex, aliquid dolor molestias, earum
								enim officiis porro obcaecati.
							</p>
							<div className="social-area">
								<ul>
									<li>
										<a href="#" target="_blank">
											<i className="bx bxl-facebook">
												<AiFillFacebook style={iconStyles} />
											</i>
										</a>
									</li>
									<li>
										<a href="#" target="_blank">
											<i className="bx bxl-twitter">
												<AiOutlineTwitter style={iconStyles} />
											</i>
										</a>
									</li>
									<li>
										<a href="#" target="_blank">
											<i className="bx bxl-linkedin">
												<AiFillLinkedin style={iconStyles} />
											</i>
										</a>
									</li>
									<li>
										<a href="#" target="_blank">
											<i className="bx bxl-youtube">
												<AiFillYoutube style={iconStyles} />
											</i>
										</a>
									</li>
									<li>
										<a href="#" target="_blank">
											<i className="bx bxl-instagram">
												<AiFillInstagram style={iconStyles} />
											</i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col lg="6" md="6" sm="12">
						<div className="single-widget">
							<h3>Vaccinations</h3>
							<ul>
								<li>Polio</li>
								<li>BCG</li>
								<li>PCV</li>
								<li>Measles</li>
								<li>Pentavalent</li>
							</ul>
						</div>
					</Col>
					{/* <Col lg="3" md="12">
						<div className="single-widget open-time">
							<h3>Opening Hours</h3>
							<ul>
								<li>
									<span>Mon-Tue:</span>
									<span className="right">6:00AM-10:00PM</span>
								</li>
								<li>
									<span>Wed-Thu:</span>
									<span className="right">6:00AM-10:00PM</span>
								</li>
								<li>
									<span>Fry:</span>
									<span className="right">6:00AM-04:00PM</span>
								</li>
								<li>
									<span>Sun:</span>
									<span className="right">Closed</span>
								</li>
							</ul>
						</div>
					</Col> */}
					{/* <Col lg="4" md="12">
						<div className="single-widget contact">
							<h3>Get In Touch</h3>
							<ul>
								<li className="pl-0">
									<a href="/">
										<i className="bxa bx-phone-call">
											<FiPhoneCall style={iconStyles} />
										</i>
										<span>Hotline:</span>
										<br />
										<span className="contact-us">Phone: +92123456789</span>
									</a>
								</li>
								<li className="pl-0">
									<a href="/">
										<i className="bxa bx-envelope">
											<HiOutlineMail style={iconStyles} />
										</i>
										<span>Email:</span>
										<br />
										<span className="contact-us">abc@mail.com</span>
									</a>
								</li>
								<li>
									<i className="bxa bx-location-plus">
										<BiLocationPlus style={iconStyles} />
									</i>
									<span>Address:</span> <br />
									<span className="contact-us">
										123, ABC Road, Islamabad <span className="contact-us">Pakistan</span>
									</span>
								</li>
							</ul>
						</div>
					</Col> */}
				</Row>
			</Container>
		</footer>
	);
};

const iconStyles = { width: "20px", height: "20px" };

export default Footer;
