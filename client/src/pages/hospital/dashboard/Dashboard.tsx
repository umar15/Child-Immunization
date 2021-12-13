import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { ImportsNotUsedAsValues } from "typescript";

const Dashboard = () => {
	const [children, setChildren] = useState([]);
	const [vaccines, setVaccines] = useState<any>([]);
	const [noOfChilren, setNoOfChildren] = useState(0);
	const [vaccinated, setVaccinated] = useState(0);
	const [nonVaccinated, setNonVaccinated] = useState(0);
	const [bornToday, setBornToday] = useState(0);
	const [bornSevenDays, setBornSevenDays] = useState(0);
	const [bornThirtyDays, setBornThirtyDays] = useState(0);
	const [vaccineReq, setVaccineReq] = useState<any>([]);
	const alert = useAlert();

	const getChildren = async () => {
		axios
			.get("/hospital/children")
			.then((res) => {
				console.log("CHildren: ", res.data.data);
				setChildren(res.data?.data);
				setNoOfChildren(res.data?.data.length);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	const vaccinatedNonVaccinated = async () => {
		axios
			.get("/hospital/vaccinatednonvaccinated")
			.then((res) => {
				console.log("vaccinated: ", res.data.data);

				setVaccinated(res.data?.data.vaccinated);
				setNonVaccinated(res.data?.data.nonVaccinated);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};
	const bornStats = async () => {
		axios
			.get("/hospital/childbornstats")
			.then((res) => {
				console.log("vaccinated: ", res.data.data);

				setBornToday(res.data?.data.bornToday);
				setBornSevenDays(res.data?.data.bornSevenDays);
				setBornThirtyDays(res.data?.data.bornOneMonth);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	const getVaccines = async () => {
		axios
			.get("/hospital/vaccines")
			.then((res) => {
				// console.log("Vaccines: ", res.data.data[0].vaccines);
				setVaccines(res.data?.data[0].vaccines);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccines", {
					type: "error",
				})
			);
	};

	const getVaccineRequirements = async () => {
		axios
			.get("/hospital/vaccinerequirements")
			.then((res) => {
				console.log("Vaccines requirements: ", res.data.data);
				setVaccineReq(res.data?.data.requirements);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccine requirements", {
					type: "error",
				})
			);
	};

	useEffect(() => {
		getChildren();
		getVaccines();
		vaccinatedNonVaccinated();
		bornStats();
		getVaccineRequirements();
	}, []);

	return (
		<>
			{/* <Row>Children Details</Row> */}
			<Container style={boxStyles}>
				<Row>
					<Col lg="6">
						<Row style={{ marginBottom: "10px" }}>
							<h4>Children</h4>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card green">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Born
										</CardSubtitle>
										<CardTitle tag="h4">{noOfChilren}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card green">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Vaccinated
										</CardSubtitle>
										<CardTitle tag="h4">{vaccinated}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card green">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Not Vaccinated
										</CardSubtitle>
										<CardTitle tag="h4">{nonVaccinated}</CardTitle>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card red">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Born Today
										</CardSubtitle>
										<CardTitle tag="h4">{bornToday}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card red">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Born 7 days
										</CardSubtitle>
										<CardTitle tag="h4">{bornSevenDays}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card red">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Born 30 days
										</CardSubtitle>
										<CardTitle tag="h4">{bornThirtyDays}</CardTitle>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Col>
					<Col lg="6">
						<Row style={{ marginLeft: "2px", marginBottom: "10px" }}>
							<h4> Last Children born</h4>
						</Row>
						<Row>
							<Col>
								<Table bordered size="sm">
									<thead>
										<tr>
											<th>Child ID</th>
											<th>Father Name</th>
											<th>Gender</th>
										</tr>
									</thead>
									<tbody>
										{children &&
											children
												.slice(Math.max(children.length - 4, 1))
												.reverse()
												.map((child: any, index) => (
													<tr key={child._id}>
														<td>{child.childID}</td>
														<td>{child.parentName}</td>
														<td>{child.gender}</td>
													</tr>
												))}
										<tr style={{ textAlign: "center" }}>
											<td colSpan={3}>
												<Link to="/hospital/children">view more</Link>
											</td>
										</tr>
									</tbody>
								</Table>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			<Container style={boxStyles}>
				<Row>
					<Col lg="6">
						<Row style={{ marginLeft: "2px", marginBottom: "10px" }}>
							<h4>Available Vaccines</h4>
						</Row>
						<Row>
							<Col>
								<Table bordered size="sm">
									<thead>
										<tr>
											<th>Name</th>
											<th>Quantity</th>
										</tr>
									</thead>
									<tbody>
										{Object.keys(vaccines).map((vc, i) => (
											<tr key={i}>
												<td>{vc}</td>
												<td>{vaccines[vc].quantity}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Col>
						</Row>
					</Col>
					<Col lg="6">
						<Row style={{ marginBottom: "10px" }}>
							<h4>Vaccine Requirements</h4>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card yellow">
									<CardBody>
										<CardTitle tag="h5">OPV (Polio)</CardTitle>
										<CardSubtitle tag="h6" className="mb-2">
											7 days req: <b>{vaccineReq?.opv?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="h6" className="mb-2">
											30 days req: <b>{vaccineReq?.opv?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card yellow">
									<CardBody>
										<CardTitle tag="h5">Measles</CardTitle>
										<CardSubtitle tag="h6" className="mb-2">
											7 days req: <b>{vaccineReq.measles?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="h6" className="mb-2">
											30 days req: <b>{vaccineReq.measles?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card yellow">
									<CardBody>
										<CardTitle tag="h5">BCG</CardTitle>
										<CardSubtitle tag="h6" className="mb-2">
											7 days req: <b>{vaccineReq.bcg?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="h6" className="mb-2">
											30 days req: <b>{vaccineReq.bcg?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col lg="4">
								<Card className="card blue">
									<CardBody>
										<CardTitle tag="h5">Pentavalent</CardTitle>
										<CardSubtitle tag="h6" className="mb-2">
											7 days req: <b>{vaccineReq.pentavalent?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="h6" className="mb-2">
											30 days req: <b>{vaccineReq.pentavalent?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							<Col lg="4">
								<Card className="card blue">
									<CardBody>
										<CardTitle tag="h5">PCV</CardTitle>
										<CardSubtitle tag="h6" className="mb-2">
											7 days req: <b>{vaccineReq.pcv?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="h6" className="mb-2">
											30 days req: <b>{vaccineReq.pcv?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							{/* <Col lg="4">
								<Card className="card blue">
									<CardBody>
										<CardTitle tag="h5">Total</CardTitle>
										<CardSubtitle tag="h6" className="mb-2">
											7 days req: <b>123</b>
										</CardSubtitle>
										<CardSubtitle tag="h6" className="mb-2">
											30 days req: <b>123</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col> */}
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
};

const boxStyles = {
	width: "1050px",
	marginLeft: "-45px",
	boxShadow: "0 0 5px #c9c9c9",
	marginTop: "20px",
	marginBottom: "20px",
	paddingLeft: "25px",
	paddingTop: "10px",
};

export default Dashboard;

// var days; // Days you want to subtract
// var date = new Date();
// var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
// var day = last.getDate();
// var month = last.getMonth() + 1;
// var year = last.getFullYear();
