import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button, Input } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";

const CampaignDetails = () => {
	const location = useLocation();
	const campaign: any = location.state ? location.state : "";
	const data = campaign?.campaign;
	console.log("Data campaign: ", data);
	let today = new Date();
	let startDate = new Date(data.startDate);
	let endDate = new Date(data.endDate);
	today.setHours(0, 0, 0, 0);
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(0, 0, 0, 0);

	return (
		<Container>
			<Row>
				<Col lg="12">
					<h3>Campaign Details</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col>
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Campaign ID</th>
								<td>{data.campaignID}</td>
							</tr>
							<tr>
								<th>Campaign Status</th>
								<td>
									<span
										style={{
											color: "#fff",
											padding: "5px",
											borderRadius: "5px",
											backgroundColor: startDate <= today || endDate <= today ? "green" : "red",
										}}
									>
										{startDate <= today || endDate <= today ? "active" : "inactive"}
									</span>
								</td>
							</tr>
							<tr>
								<th>Area</th>
								<td>{data.area}</td>
							</tr>
							<tr>
								<th>Vaccine</th>
								<td>{data.vaccine}</td>
							</tr>
							<tr>
								<th>Start Date</th>
								<td>{new Date(data.startDate).toDateString()}</td>
							</tr>
							<tr>
								<th>End Date</th>
								<td>{new Date(data.endDate).toDateString()}</td>
							</tr>
							<tr>
								<th rowSpan={data.workers.length}>Workers</th>
								{data.workers.map((worker) => (
									<tr>{worker.name}</tr>
								))}
							</tr>
						</thead>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default CampaignDetails;
