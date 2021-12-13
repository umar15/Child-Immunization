import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";

const Reports = () => {
	const [reports, setReports] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();

	const getReports = () => {
		axios
			.get(`/subadmin/childreports`)
			.then((res) => {
				console.log("Vaccines: ", res.data?.data);
				setReports(res.data?.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				alert.show("Failed to fetch reports.", {
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
				<Col lg="12">
					<h3>Non Vaccinated Children Reports</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
					<ListGroup>
						{reports.reverse().map((report: any) => {
							return (
								<Link
									key={report._id}
									className="notification"
									to={{
										pathname: `/subadmin/reports/${report._id}`,
										state: {
											report,
										},
									}}
								>
									<ListGroupItem className="notification-item">
										<IoMdArrowDropright size={30} />
										<b>
											{report.org.name}, {report.org.address.area}{" "}
										</b>
										has sent a report of non-vaccinated children.
									</ListGroupItem>
								</Link>
							);
						})}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default Reports;
