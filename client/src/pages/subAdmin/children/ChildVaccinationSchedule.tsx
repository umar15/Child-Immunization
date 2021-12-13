import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import { useAlert } from "react-alert";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

const ChildVaccinationSchedule = () => {
	const alert = useAlert();
	const location = useLocation();
	const vaccinationSchedule: any = location.state ? location.state : "";
	const [data, setData] = useState<any>(vaccinationSchedule.data?.vaccines);
	console.log("Data in schedule: ", data);
	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>Vaccination Schedule of CHILD:</h3>
				</Col>
			</Row>
			<Row>
				<Table bordered>
					<thead>
						<tr>
							<th>#</th>
							<th>Vaccine name</th>
							<th>Date</th>
							<th>Done</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							Object.keys(data).map((item, i) => {
								return (
									<tr>
										<td>{i + 1}</td>
										<td>{item}</td>
										<td>{new Date(data[item].date).toDateString()}</td>
										<td>
											{data[item].done ? (
												<TiTick size={30} color="green" />
											) : (
												<ImCross size={17} color="red" style={{ marginLeft: "7px" }} />
											)}
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default ChildVaccinationSchedule;
