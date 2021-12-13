import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { selectCity } from "../../../config/cities";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
	const [children, setChildren] = useState([]);
	const [hospitals, setHospitals] = useState([]);
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [vaccines, setVaccines] = useState<any>([]);
	const [noOfChildren, setNoOfChildren] = useState(0);
	const [vaccinated, setVaccinated] = useState(0);
	const [nonVaccinated, setNonVaccinated] = useState(0);
	const [bornToday, setBornToday] = useState(0);
	const [bornSevenDays, setBornSevenDays] = useState(0);
	const [bornThirtyDays, setBornThirtyDays] = useState(0);
	const [vaccineReq, setVaccineReq] = useState<any>([]);
	const [city, setCity] = useState<string>("Country");
	const alert = useAlert();

	const data = [
		{
			name: "Children Statistics",
			born: noOfChildren,
			vaccinated,
			nonVaccinated,
		},
	];

	const vaccineData = [
		{
			name: "OPV",
			required7days: vaccineReq.opv?.sevenDays,
			required30days: vaccineReq.opv?.thirtyDays,
		},
		{
			name: "Measles",
			required7days: vaccineReq.measles?.sevenDays,
			required30days: vaccineReq.measles?.thirtyDays,
		},
		{
			name: "BCG",
			required7days: vaccineReq.bcg?.sevenDays,
			required30days: vaccineReq.bcg?.thirtyDays,
		},
		{
			name: "Pentavalent",
			required7days: vaccineReq.pentavalent?.sevenDays,
			required30days: vaccineReq.pentavalent?.thirtyDays,
		},
		{
			name: "PCV",
			required7days: vaccineReq.pcv?.sevenDays,
			required30days: vaccineReq.pcv?.thirtyDays,
		},
	];

	const getHospitals = async () => {
		axios
			.get("/subadmin/hospitals")
			.then((res) => {
				console.log("Hospitals: ", res.data.data);
				setHospitals(res.data?.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch Hospitals", {
					type: "error",
				})
			);
	};

	const getVaccineCenters = async () => {
		axios
			.get("/subadmin/vaccinecenters")
			.then((res) => {
				console.log("Vaccine centers: ", res.data.data);
				setVaccineCenters(res.data?.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch Vaccine centers", {
					type: "error",
				})
			);
	};

	const getChildren = async () => {
		axios
			.get(`/subadmin/children`)
			.then((res) => {
				console.log("Children: ", res.data.data);
				setChildren(res.data?.data.children);
				setNoOfChildren(res.data?.data.numberOfChildren);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	const vaccinatedNonVaccinated = async () => {
		axios
			.get(`/subadmin/vaccinatednonvaccinated`)
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
			.get(`/subadmin/childrenstatistics`)
			.then((res) => {
				console.log("Children stats: ", res.data.data);
				setBornToday(res.data?.data.bornToday);
				setBornSevenDays(res.data?.data.bornSevenDays);
				setBornThirtyDays(res.data?.data.bornOneMonth);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children stats", {
					type: "error",
				})
			);
	};

	const getVaccines = async () => {
		axios
			.get("/subadmin/vaccines")
			.then((res) => {
				console.log("Vaccines: ", res.data?.data);
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
			.get(`/subadmin/vaccinerequirements`)
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
		getHospitals();
		getVaccineCenters();
		getChildren();
		getVaccines();
		vaccinatedNonVaccinated();
		bornStats();
		getVaccineRequirements();
	}, []);

	return (
		<>
			<Container style={{ width: "1080px", marginLeft: "-15px", marginTop: "10px", marginBottom: "10px" }}>
				<Row>
					<Col lg="12">
						<h3>Subadmin Statistics</h3>
					</Col>
				</Row>
			</Container>
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
										<CardTitle tag="h4">{noOfChildren}</CardTitle>
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
						<BarChart
							width={500}
							height={280}
							data={data}
							margin={{
								top: 20,
								right: 0,
								left: 20,
								bottom: 0,
							}}
							style={{ backgroundColor: "#f2f9fc" }}
						>
							{/* <CartesianGrid strokeDasharray="3 3" /> */}
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="born" fill="blue" />
							<Bar dataKey="vaccinated" fill="green" />
							<Bar dataKey="nonVaccinated" fill="red" />
						</BarChart>
					</Col>
				</Row>
			</Container>
			<Container style={boxStyles}>
				<Row style={{ marginBottom: "10px" }}>
					<h4>Vaccine Requirements</h4>
				</Row>
				<Row>
					<Col lg="6">
						<BarChart
							width={450}
							height={280}
							data={vaccineData}
							margin={{
								top: 20,
								right: 20,
								left: 0,
								bottom: 20,
							}}
							style={{ backgroundColor: "#f2f9fc" }}
						>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="required7days" fill="#ff00cc" />
							<Bar dataKey="required30days" fill="#0d526b" />
						</BarChart>
					</Col>
					<Col lg="6">
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
						</Row>
					</Col>
				</Row>
			</Container>
			<Container style={boxStyles}>
				<Row>
					<Col lg="6">
						<h4> Last Children born</h4>
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>Child ID</th>
									<th>Father Name</th>
									<th>Gender</th>
								</tr>
							</thead>
							<tbody>
								{children?.length > 0 &&
									children
										?.slice(Math.max(children.length - 4, 1))
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
										<Link to="/subadmin/children">view more</Link>
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col lg="6">
						<h4>Sub admin Available Vaccines</h4>
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>Name</th>
									<th>Quantity</th>
								</tr>
							</thead>
							<tbody>
								{Object.keys(vaccines).map((vc) => (
									<tr key={vc}>
										<td>{vc}</td>
										<td>{vaccines[vc].quantity}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
			<Container style={boxStyles}>
				<Row>
					<Col lg="6">
						<h4>Hospitals</h4>
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>City</th>
								</tr>
							</thead>
							<tbody>
								{hospitals &&
									hospitals
										// .slice(Math.max(hospitals.length - 4, 1))
										.reverse()
										.map((hospital: any, index) => (
											<tr key={hospital._id}>
												<td>{hospital.name}</td>
												<td>{hospital.email}</td>
												<td>{hospital.address.city}</td>
											</tr>
										))}
								<tr style={{ textAlign: "center" }}>
									<td colSpan={3}>
										<Link to="/subadmin/hospitals">view more</Link>
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col lg="6">
						<h4>Vaccine Centers</h4>
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>City</th>
								</tr>
							</thead>
							<tbody>
								{vaccineCenters &&
									vaccineCenters
										// .slice(Math.max(vaccineCenters.length - 4, 1))
										.reverse()
										.map((vc: any) => (
											<tr key={vc._id}>
												<td>{vc.name}</td>
												<td>{vc.email}</td>
												<td>{vc.address.city}</td>
											</tr>
										))}
								<tr style={{ textAlign: "center" }}>
									<td colSpan={3}>
										<Link to="/subadmin/hospitals">view more</Link>
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
};

const boxStyles = {
	// width: "1050px",
	// marginLeft: "-35px",
	// boxShadow: "0 0 5px #c9c9c9",
	// marginBottom: "20px",
	// paddingLeft: "25px",
	// paddingTop: "10px",
	// paddingBottom: "20px",
	// width: "1050px",
	// marginLeft: "-35px",
	// boxShadow: "0 0 5px #c9c9c9",
	// marginTop: "20px",
	margin: "auto",
	marginBottom: "20px",
	// paddingLeft: "25px",
	paddingTop: "10px",
	paddingBottom: "20px",
	// textAlign: "center",
	alignItem: "center",
};

export default Dashboard;
