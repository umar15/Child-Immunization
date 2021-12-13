import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import "../../../index.css";

const ReportDetails = () => {
	const location = useLocation();
	const report: any = location.state ? location.state : "";
	const alert = useAlert();

	const { children } = report?.report;
	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="9">
					<h3>Report from {report.report?.org.name} Details</h3>
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
							{children?.length > 0 &&
								children?.map((child: any, index) => (
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
													pathname: `/admin/children/${child?._id}`,
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

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default ReportDetails;
