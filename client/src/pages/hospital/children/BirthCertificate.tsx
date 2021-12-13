import React, { useState, useEffect } from "react";
import "./../../../index.css";
import { Table } from "reactstrap";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";

const BirthCertificate = () => {
	const history = useHistory();
	const location = useLocation();
	const alert = useAlert();
	const child: any = location.state ? location.state : "";
	const [dob, setDob] = useState(new Date(child.data.dateOfBirth));
	const [hospital, setHospital] = useState<any>([]);
	const [schedule, setSchedule] = useState(child.schedule);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	console.log("Child added: ", child);
	// console.log("date: ", new Date(dob.setDate(dob.getDate())).toDateString());

	const getHospital = () => {
		axios
			.get(`/hospital/${child.data.hospitalName}`)
			.then((res) => {
				console.log("Hospital: ", res.data.data);
				setHospital(res.data.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch hospital", {
					type: "error",
				})
			);
	};

	useEffect(() => {
		getHospital();
	}, []);

	return (
		<>
			<button className="default-btn print" onClick={() => window.print()}>
				Print
			</button>
			{console.log("Schedule: ", schedule)}
			<div className="birth">
				<h1 className="heading">Certificate of Brith</h1>
				<h1 className="certificate-body">
					This is to certify that <br />
					________________________________________ <br />
					was born on the day of{" "}
					<b className="dob">
						{dob.getDate()}, {monthNames[dob.getMonth()]},
					</b>{" "}
					<br />
					to ____________________ and ___________________ <br />
					in the year of <b className="dob">{dob.getFullYear()}</b> in <b className="dob">{hospital?.name}</b>.
				</h1>
				<h2 className="sign">
					<b>
						Stamp and Signature <br /> of Hospital
					</b>
				</h2>
			</div>
			<div className="birth schedule">
				<h1 className="heading">Vaccination Schedule</h1>
				<Table bordered className="schedule-table">
					<thead className="thead-sch">
						<tr>
							<th>#</th>
							<th>Vaccine Name</th>
							<th>Disease</th>
							<th>Age</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>BCG, OPV</td>
							<td>Children TB, Polio</td>
							<td>Soon After Birth</td>
							<td>{new Date(schedule.vaccines.bcg.date).toDateString()}</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Pentavalent, OPV, PCV</td>
							<td>Hepatitus, Fever, Pneumonia</td>
							<td>6 Weeks</td>
							<td>{new Date(schedule.vaccines.opv1.date).toDateString()}</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Pentavalent, OPV, PCV</td>
							<td>Hepatitus, Fever, Pneumonia</td>
							<td>10 Weeks</td>
							<td>{new Date(schedule.vaccines.opv2.date).toDateString()}</td>
						</tr>
						<tr>
							<td>4</td>
							<td>Pentavalent, OPV, PCV</td>
							<td>Hepatitus, Fever, Pneumonia</td>
							<td>14 Weeks</td>
							<td>{new Date(schedule.vaccines.opv3.date).toDateString()}</td>
						</tr>
						<tr>
							<td>5</td>
							<td>Measles</td>
							<td>Measles</td>
							<td>9 Months</td>
							<td>{new Date(schedule.vaccines.measles0.date).toDateString()}</td>
						</tr>
						<tr>
							<td>6</td>
							<td>Measles</td>
							<td>Measles</td>
							<td>15 Months</td>
							<td>{new Date(schedule.vaccines.measles1.date).toDateString()}</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</>
	);
};

export default BirthCertificate;
