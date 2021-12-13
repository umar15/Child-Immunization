import React from "react";
import Footer from "../components/footer/Footer";
import FooterBottom from "../components/footer/FooterBottom";
import Header from "../components/header/Header";
import AboutUs from "../components/homepage/AboutUs";
import OurDoctors from "../components/homepage/OurDoctors";
import OurMission from "../components/homepage/OurMission";
import VaccinationTable from "../components/homepage/VaccinationTable";
import Welcome from "../components/homepage/Welcome";
import { useHistory, useLocation, useParams } from "react-router-dom";

const Homepage = () => {
	// const history = useHistory();

	// React.useEffect(() => {
	// 	const loggedInUser = localStorage.getItem("user");
	// 	if (loggedInUser) {
	// 		const foundUser = JSON.parse(loggedInUser);
	// 		console.log("Found user: ", foundUser);
	// 		history.push(`/${foundUser.userType}`);
	// 	}
	// }, []);

	return (
		<>
			<Header />
			<Welcome />
			<AboutUs />
			<OurMission />
			<VaccinationTable />
			<OurDoctors />
			<Footer />
			<FooterBottom />
		</>
	);
};

export default Homepage;
