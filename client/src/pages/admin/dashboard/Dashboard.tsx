import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { selectCity } from "../../../config/cities";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { isTerminatorless } from "@babel/types";

const Dashboard = () => {
	const [children, setChildren] = useState([]);
	const [allChildren, setAllChildren] = useState([]);
	const [hospitals, setHospitals] = useState([]);
	const [subadmins, setSubadmins] = useState([]);
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
	const [area, setArea] = useState<string>("Area");
	const [uniqueAreas, setUniqueAreas] = useState<any[]>([]);
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
			.get(`/admin/gethospitals/${city}`)
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
			.get(`/admin/getvaccinecenters/${city}`)
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

	const getAllChildren = async () => {
		axios
			.get(`/admin/children/Country/Area`)
			.then((res) => {
				console.log("Children: ", res.data.data);
				setAllChildren(res.data?.data.children);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};
	const getChildren = async () => {
		axios
			.get(`/admin/children/${city}/${area}`)
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
			.get(`/admin/vaccinatednonvaccinated/${city}/${area}`)
			.then((res) => {
				console.log("vaccinated: ", res.data.data);

				setVaccinated(res.data?.data.vaccinated);
				setNonVaccinated(res.data?.data.nonVaccinated);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccinated non vaccinated stats", {
					type: "error",
				})
			);
	};
	const bornStats = async () => {
		axios
			.get(`/admin/childrenstatistics/${city}/${area}`)
			.then((res) => {
				console.log("Children stats: ", res.data.data);
				setBornToday(res.data?.data.bornToday);
				setBornSevenDays(res.data?.data.bornSevenDays);
				setBornThirtyDays(res.data?.data.bornOneMonth);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children born stats", {
					type: "error",
				})
			);
	};

	const getVaccines = async () => {
		axios
			.get("/admin/vaccines")
			.then((res) => {
				console.log("Vaccines: ", res.data?.data);
				setVaccines(res.data?.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccines", {
					type: "error",
				})
			);
	};

	const getVaccineRequirements = async () => {
		axios
			.get(`/admin/vaccinerequirements/${city}/${area}`)
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

	const getSubadmins = async () => {
		axios
			.get("/admin/subadmins")
			.then((res) => {
				console.log(res.data.data);
				setSubadmins(res.data?.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch subadmins", {
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
		getSubadmins();
		getAllChildren();

		var flags = {};
		var uniqueChildrenAreas: any = [];
		allChildren?.filter((child: any) => {
			if (!flags[child.address.area]) {
				flags[child.address.area] = true;
				uniqueChildrenAreas.push(child);
			}
		});
		setUniqueAreas(uniqueChildrenAreas);
		console.log("Uniques:", uniqueChildrenAreas);
	}, [city, area]);

	return (
		<>
			<Container style={{ maxWidth: "1080px", marginTop: "10px", marginBottom: "10px" }}>
				<Row>
					<Col lg="6" md="12" style={{ width: "100%" }}>
						<div className="form-group">
							<select className="form-control" value={city} onChange={(e) => setCity(e.target.value)}>
								<option value="Country">Country</option>
								{subadmins?.map((item: any) => {
									return (
										<option value={item.address.city} key={item._id}>
											{item.address.city}
										</option>
									);
								})}
								{/* {selectCity()} */}
							</select>
						</div>
					</Col>
					<Col lg="6" md="12">
						<div className="form-group">
							<select
								disabled={city === "Country"}
								className="form-control"
								value={area}
								onChange={(e) => setArea(e.target.value)}
							>
								<option value="">Area</option>
								{uniqueAreas?.map((item: any) => {
									if (item.address.city === city) {
										return (
											<option value={item.address.area} key={item._id}>
												{item.address.area}
											</option>
										);
									}
								})}
							</select>
						</div>
					</Col>
				</Row>
			</Container>
			<Container style={boxStyles}>
				<Row>
					<Col lg="6" xl="6" md="12">
						<Row style={{ marginBottom: "10px" }}>
							<h4>Children</h4>
						</Row>
						<Row>
							<Col sm="6" md="4" xl="4">
								<Card className="card green">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Born
										</CardSubtitle>
										<CardTitle tag="h4">{noOfChildren}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col sm="6" md="4" xl="4">
								<Card className="card green">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Vaccinated
										</CardSubtitle>
										<CardTitle tag="h4">{vaccinated}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col sm="6" md="4" xl="4">
								<Card className="card green">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Not Vaccinated
										</CardSubtitle>
										<CardTitle tag="h4">{nonVaccinated}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							{/* </Row>
						<Row> */}
							<Col sm="6" md="4" xl="4">
								<Card className="card red">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Born Today
										</CardSubtitle>
										<CardTitle tag="h4">{bornToday}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col sm="6" md="4" xl="4">
								<Card className="card red">
									<CardBody>
										<CardSubtitle tag="h6" className="mb-2">
											Born 7 days
										</CardSubtitle>
										<CardTitle tag="h4">{bornSevenDays}</CardTitle>
									</CardBody>
								</Card>
							</Col>
							<Col sm="6" md="4" xl="4">
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
					<Col lg="6" xl="6" md="12">
						<div>
							<BarChart
								width={450}
								height={280}
								data={data}
								margin={{
									top: 20,
									right: 0,
									left: -20,
									bottom: 0,
								}}
								style={{ backgroundColor: "#f2f9fc" }}
							>
								{/* <CartesianGrid strokeDasharray="3 3" /> */}
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								{/* <Legend style={{ paddingTop: "20px" }} /> */}
								<Bar dataKey="born" fill="blue" />
								<Bar dataKey="vaccinated" fill="green" />
								<Bar dataKey="nonVaccinated" fill="red" />
							</BarChart>
						</div>
					</Col>
				</Row>
			</Container>
			<Container style={boxStyles}>
				<Row style={{ marginBottom: "10px" }}>
					<h4>Vaccine Requirements</h4>
				</Row>
				<Row>
					<Col lg="6">
						<div>
							<BarChart
								width={450}
								height={280}
								data={vaccineData}
								margin={{
									top: 20,
									right: 20,
									left: -20,
									bottom: 20,
								}}
								style={{ backgroundColor: "#f2f9fc" }}
							>
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								{/* <Legend /> */}
								<Bar dataKey="required7days" fill="#ff00cc" />
								<Bar dataKey="required30days" fill="#0d526b" />
							</BarChart>
						</div>
					</Col>
					<Col lg="6">
						<Row>
							<Col sm="6" md="4" xl="4">
								<Card className="card yellow">
									<CardBody>
										<CardTitle tag="h6">OPV (Polio)</CardTitle>
										<CardSubtitle tag="p" className="mb-2">
											7days req: <b>{vaccineReq?.opv?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="p" className="mb-2">
											30days req: <b>{vaccineReq?.opv?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							<Col sm="6" md="4" xl="4">
								<Card className="card yellow">
									<CardBody>
										<CardTitle tag="h6">Measles</CardTitle>
										<CardSubtitle tag="p" className="mb-2">
											7days req: <b>{vaccineReq.measles?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="p" className="mb-2">
											30days req: <b>{vaccineReq.measles?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							<Col sm="6" md="4" xl="4">
								<Card className="card yellow">
									<CardBody>
										<CardTitle tag="h6">BCG</CardTitle>
										<CardSubtitle tag="p" className="mb-2">
											7days req: <b>{vaccineReq.bcg?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="p" className="mb-2">
											30days req: <b>{vaccineReq.bcg?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							{/* </Row>
						<Row> */}
							<Col sm="6" md="4" xl="4">
								<Card className="card blue">
									<CardBody>
										<CardTitle tag="h6">Pentavalent</CardTitle>
										<CardSubtitle tag="p" className="mb-2">
											7days req: <b>{vaccineReq.pentavalent?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="p" className="mb-2">
											30days req: <b>{vaccineReq.pentavalent?.thirtyDays}</b>
										</CardSubtitle>
									</CardBody>
								</Card>
							</Col>
							<Col sm="6" md="4" xl="4">
								<Card className="card blue">
									<CardBody>
										<CardTitle tag="h6">PCV</CardTitle>
										<CardSubtitle tag="p" className="mb-2">
											7days req: <b>{vaccineReq.pcv?.sevenDays}</b>
										</CardSubtitle>
										<CardSubtitle tag="p" className="mb-2">
											30days req: <b>{vaccineReq.pcv?.thirtyDays}</b>
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
						<Table bordered size="sm" responsive>
							<thead>
								<tr>
									<th>Child ID</th>
									<th>Father Name</th>
									<th>Gender</th>
								</tr>
							</thead>
							<tbody>
								{children.length > 0 &&
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
										<Link to="/admin/children">view more</Link>
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col lg="6">
						<h4>Admin Available Vaccine Stock</h4>
						<Table bordered responsive size="sm">
							<thead>
								<tr>
									<th>Name</th>
									<th>Quantity</th>
								</tr>
							</thead>
							<tbody>
								{vaccines.map((vc) => (
									<tr key={vc._id}>
										<td>{vc.name}</td>
										<td>{vc.quantity}</td>
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
						<Table responsive bordered size="sm">
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
										?.slice(Math.max(hospitals.length - 4, 1))
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
										<Link to="/admin/hospitals">view more</Link>
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col lg="6">
						<h4>Vaccine Centers</h4>
						<Table responsive bordered size="sm">
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
										?.slice(Math.max(vaccineCenters.length - 4, 1))
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
										<Link to="/admin/hospitals">view more</Link>
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
	boxShadow: "0 0 5px #c9c9c9",
	// marginTop: "20px",
	margin: "auto",
	marginBottom: "20px",
	paddingLeft: "15px",
	paddingTop: "10px",
	paddingBottom: "20px",
	// textAlign: "center",
	// alignItem: "center",
};

export default Dashboard;
