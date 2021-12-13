import React from "react";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import "../../index.css";

const Welcome = () => {
	return (
		<div className="welcome-banner">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12 col-lg-7">
						<div className="banner-text">
							<span className="topic">
								<h5>Smarter Service Care</h5>
							</span>
							<h1 className="main-heading">Vaccination Program for Diseases Prevention</h1>
							<p className="sub-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
								labore et dolore magna aliqua gravida. Risus commodo.
							</p>
							<div className="banner-btn ">
								<a className="default-btn" href="/signup">
									Join Us
								</a>
							</div>
						</div>
					</div>
					<div className="col-md-12 col-lg-5 pr-0">
						<div className="banner-img-wrap">
							<div className="banner-img">
								<img src={banner1} alt="Image" />
							</div>
							<div className="shape">
								<img className="bg2" src={banner2} alt="Image" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
