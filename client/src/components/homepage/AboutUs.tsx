import React from "react";
import { Container, Row, Col } from "reactstrap";
import homepageimg1 from "../../assets/images/home-four-about.jpg";
import { BsCheckBox } from "react-icons/bs";

const AboutUs = () => {
	return (
		<div className="about-area">
			<Container>
				<Row>
					<Col lg="6" md="12" pl="0">
						<img src={homepageimg1} alt="homepage img" className="about-img" />
					</Col>
					<Col lg="6" md="12">
						<div className="about-content">
							<span className="topic">About Us</span>
							<h2 className="" style={{ fontWeight: "bold" }}>
								Routine Vaccines Provided for Babies and Children
							</h2>
							<p className="topic-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
								labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
								maecenas accumsan lacus vel facilisis.
							</p>
							<ul className="vaccine-list">
								<li>
									<i className="flaticon-tick">
										<BsCheckBox />
									</i>
									Vaccine against Diphtheria-Tetanus-Whooping cough
								</li>
								<li>
									<i className="flaticon-tick">
										<BsCheckBox />
									</i>
									Vaccine against Measles-Mumps-Rubella
								</li>
								<li>
									<i className="flaticon-tick">
										<BsCheckBox />
									</i>
									Vaccine against pneumococcus bacteria
								</li>
								<li>
									<i className="flaticon-tick">
										<BsCheckBox />
									</i>
									Vaccine against Hepatitis B
								</li>
								<li>
									<i className="flaticon-tick">
										<BsCheckBox />
									</i>
									Vaccine against Hepatitis A
								</li>
								<li>
									<i className="flaticon-tick">
										<BsCheckBox />
									</i>
									Wear a facemask if sick
								</li>
								<li>
									<i className="flaticon-tick">
										<BsCheckBox />
									</i>
									Cover your mouth and nose
								</li>
							</ul>
							<a className="default-btn about-btn" href="/about">
								More About Us
							</a>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AboutUs;
