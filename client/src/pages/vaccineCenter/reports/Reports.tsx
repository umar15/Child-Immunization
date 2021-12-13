import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const Reports = () => {
	const [reports, setReports] = useState([]);
	const [children, setChildren] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	const alert = useAlert();

	const getReports = () => {
		axios
			.get("/vaccinecenter/vaccinereports")
			.then((res) => {
				console.log("reports: ", res.data.data);
				setReports(res.data?.data?.nonVaccinatedChildren);
				setLoading(false);
				let ch = res.data?.data?.nonVaccinatedChildren.map((item) => item._id);
				console.log("ch: ", ch);
				setChildren(ch);
			})
			.catch((err) => {
				alert.show("Failed to Fetch reports", {
					type: "error",
				});
			});
	};
	const sendReportToSubamdin = () => {
		// reports?.map((item: any) => return setChildren([...children, item._id]));
		console.log("Children reports: ", children);
		axios
			.post("/vaccinecenter/sendreport", children)
			.then((res) => {
				alert.show("Report successfully sent to subadmin!", {
					type: "success",
				});
			})
			.catch((err) => {
				alert.show("Failed to send report.", {
					type: "error",
				});
			});
	};

	useEffect(() => {
		getReports();
	}, []);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="9">
					<h3>Reports</h3>
				</Col>
				<Col lg="3">
					<button onClick={() => sendReportToSubamdin()} className="default-btn">
						Send to sub admin
					</button>
				</Col>
			</Row>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h5>List of non-vaccinated children</h5>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12" style={{ height: "600px", overflow: "scroll" }}>
					<Table style={tableStyles} bordered hover>
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
							{reports?.length > 0 &&
								reports?.map((child: any, index) => (
									<tr key={child?._id}>
										{/* {console.log(child.dateOfBirth.getTime())} */}
										<th scope="row">{index + 1}</th>
										<td>{child?.childID}</td>
										<td>{child?.parentName}</td>
										<td>{child?.parentCNIC}</td>
										<td>{child?.contactNo}</td>
										<td>{child?.gender}</td>
										<td>
											<Link
												to={{
													pathname: `/vaccinecenter/children/${child?._id}`,
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
				</Col>
			</Row>
		</Container>
	);
};

const linkStyles = {
	color: "white",
	listStyleType: "none",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Reports;
