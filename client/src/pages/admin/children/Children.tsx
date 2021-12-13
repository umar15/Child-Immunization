import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const Children = () => {
	const [children, setChildren] = useState([]);
	const [allChildren, setAllChildren] = useState([]);
	const [subadmins, setSubadmins] = useState([]);
	const [alllChildren, setAlllChildren] = useState([]);
	const [city, setCity] = useState<string>("Country");
	const [area, setArea] = useState<string>("Area");
	const [uniqueAreas, setUniqueAreas] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();

	const getChildren = async () => {
		axios
			.get(`/admin/children/${city}/${area}`)
			.then((res) => {
				console.log(res.data.data);
				setChildren(res.data?.data.children);
				setAllChildren(res.data?.data.children);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	const getAllChildren = async () => {
		axios
			.get(`/admin/children/Country/Area`)
			.then((res) => {
				console.log("Children: ", res.data.data);
				setAlllChildren(res.data?.data.children);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
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

	const searchChild = (e) => {
		const filtered = children.filter((child: any) => {
			return child.childID.toLowerCase().includes(e.target.value.toLowerCase());
		});
		setAllChildren(filtered);
	};

	useEffect(() => {
		getChildren();
		getAllChildren();
		getSubadmins();

		var flags = {};
		var uniqueChildrenAreas: any = [];
		alllChildren?.filter((child: any) => {
			if (!flags[child.address.area]) {
				flags[child.address.area] = true;
				uniqueChildrenAreas.push(child);
			}
		});
		setUniqueAreas(uniqueChildrenAreas);
		console.log("Uniques children:", uniqueChildrenAreas);
	}, [city, area]);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<>
			<Container>
				<Row className="subadmin-admin">
					<Col lg="12">
						<h3>Children</h3>
					</Col>
				</Row>
				<Row>
					<Col md="12" sm="12">
						<div className="form-group">
							<input
								type="text"
								className="form-control search-field"
								name="name"
								placeholder="Enter child ID to search child"
								onChange={searchChild}
								style={{ marginBottom: "-30px" }}
							/>
						</div>
					</Col>
				</Row>
				<Row style={{ marginTop: "30px" }}>
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
				<Row style={{ marginLeft: "10px", marginBottom: "-20px" }}>
					<h5>
						Children born in {area}, {city} : {children.length}
					</h5>
				</Row>

				<Row className="subadmin-table">
					<Col lg="12">
						<Table style={tableStyles} bordered hover responsive>
							<thead>
								<tr>
									<th>#</th>
									<th>Child ID</th>
									<th>Parent Name</th>
									<th>Parent CNIC</th>
									<th>Contact No</th>
									<th>Gender</th>
									<th>View Details</th>
								</tr>
							</thead>
							<tbody>
								{children.length > 0 &&
									allChildren
										.slice(Math.max(allChildren.length - 7, 1))
										.reverse()
										.map((child: any, index) => (
											<tr key={child._id}>
												<th scope="row">{index + 1}</th>
												<td>{child.childID}</td>
												<td>{child.parentName}</td>
												<td>{child.parentCNIC}</td>
												<td>{child.contactNo}</td>
												<td>{child.gender}</td>
												<td>
													<Link
														to={{
															pathname: `/admin/children/${child._id}`,
															state: {
																data: child,
															},
														}}
													>
														view
													</Link>
												</td>
											</tr>
										))}
							</tbody>
						</Table>
						{allChildren.length === 0 && (
							<div style={{ margin: "10% 50%" }}>
								<h4>No child available.</h4>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

const editStyles = {
	cursor: "pointer",
	color: "green",
};
const deleteStyles = {
	cursor: "pointer",
	color: "red",
};

const linkStyles = {
	color: "white",
	listStyleType: "none",
};

const rowStyles = {
	cursor: "pointer",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
	// marginTop: "-20px",
};

export default Children;
