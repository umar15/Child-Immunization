import React from "react";
import doctorsImg from "../../assets/images/home-four-doctors.jpg";
import { Container, Row, Col } from "reactstrap";
import { BsCheckBox } from "react-icons/bs";

const OurDoctors = () => {
	return (
		<div className="doctors-area">
			<Container className="doctors-container">
				<Row>
					<Col lg="6" md="12">
						<div className="doctors-content">
							<span className="topic">Our Doctors</span>
							<h2 className="main-heading doctor-heading">
								Help your kids understand the importance of vaccines
							</h2>
							<p className="topic-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
								labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
								maecenas accumsan lacus vel facilisis.
							</p>
							<ul className="vaccine-list">
								<li>
									<i className="flaticon-tick tick">
										<BsCheckBox />
									</i>
									Influenza Vaccine
								</li>
								<li>
									<i className="flaticon-tick tick">
										<BsCheckBox />
									</i>
									Vaccination Guidelines
								</li>
								<li>
									<i className="flaticon-tick tick">
										<BsCheckBox />
									</i>
									How Vaccine Works
								</li>
							</ul>
							<a className="default-btn" href="/about">
								More About Us
							</a>
						</div>
					</Col>
					<div className="col-lg-6 pr-0">
						<Col lg="6" md="12" pl="0">
							<img src={doctorsImg} alt="homepage img" className="doctors-img" />
						</Col>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default OurDoctors;
