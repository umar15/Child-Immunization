import React from "react";
import { Container, Row, Col } from "reactstrap";
import { BsCheckBox } from "react-icons/bs";
import "../../index.css";
import homepageimg2 from "../../assets/images/our-mission.jpg";

const OurMission = () => {
	return (
		<div className="about-area">
			<Container>
				<Row>
					<Col lg="6" md="12">
						<div className="about-content mission-content ml-auto mt-0">
							<span className="topic">Our Mission</span>
							<h2 className="" style={{ fontWeight: "bold" }}>
								Our Aim to Provide:
							</h2>
							<p className="topic-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
								labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
								maecenas accumsan lacus vel facilisis.
							</p>
							<ul className="vaccine-list">
								<li>
									<i className="flaticon-tick">
										<i className="flaticon-tick mission-icon">
											<BsCheckBox />
										</i>
									</i>
									Vaccine for Babies &amp; Children
								</li>
								<li>
									<i className="flaticon-tick">
										<i className="flaticon-tick mission-icon">
											<BsCheckBox />
										</i>
									</i>
									Vaccine for Premature Babies
								</li>
								<li>
									<i className="flaticon-tick">
										<i className="flaticon-tick mission-icon">
											<BsCheckBox />
										</i>
									</i>
									Before Pregnancy
								</li>
								<li>
									<i className="flaticon-tick">
										<i className="flaticon-tick mission-icon">
											<BsCheckBox />
										</i>
									</i>
									During Pregnancy
								</li>
								<li>
									<i className="flaticon-tick">
										<i className="flaticon-tick mission-icon">
											<BsCheckBox />
										</i>
									</i>
									Childbirth
								</li>
								<li>
									<i className="flaticon-tick">
										<i className="flaticon-tick mission-icon">
											<BsCheckBox />
										</i>
									</i>
									Wear a facemask if sick
								</li>
								<li>
									<i className="flaticon-tick">
										<i className="flaticon-tick mission-icon">
											<BsCheckBox />
										</i>
									</i>
									Cover your mouth and nose
								</li>
							</ul>
							<a className="default-btn" href="/about">
								More About Us
							</a>
						</div>
					</Col>
					<Col className="col-lg-6" md="12" pr-0>
						<img src={homepageimg2} alt="homepage img" className="mission-img" />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default OurMission;
