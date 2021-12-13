import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "../../../config/AxiosOptions";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import { useAlert } from "react-alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssignVaccine = () => {
	const subadminID: any = useParams();
	const [vaccines, setVaccines] = useState<any>([]);
	const [data, setData] = useState<any>({
		vaccine: "",
		quantity: 0,
		date: new Date(),
	});
	const alert = useAlert();
	const history = useHistory();

	const getVaccines = () => {
		axios
			.get("/subadmin/vaccines")
			.then((res) => {
				console.log(res.data.data[0]);
				setVaccines(res.data.data[0].vaccines);
			})
			.catch((err) => {
				console.log(err);
				alert.show("Failed to add vaccine.", {
					type: "error",
				});
			});
	};

	const handleDateChange = (date: any) => {
		setData({
			...data,
			date,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("data: ", data);
		if (data.quantity > 0) {
			if (vaccines[data.vaccine].quantity > data.quantity) {
				axios
					.post(`/subadmin/vaccine/assign/${subadminID.id}`, data)
					.then((res) => {
						console.log("add: ", res);
						alert.show("Vaccine assigned successfully!", {
							type: "success",
						});
						history.push("/subadmin/vaccines");
					})
					.catch((err) => {
						console.log(err);
						alert.show("Failed to assign vaccine.", {
							type: "error",
						});
					});
			} else {
				alert.show("Vaccine not available. Please try again later or reduce your quantity", {
					type: "error",
				});
			}
		} else {
			alert.show("Quantity must be greater then 0.", {
				type: "error",
			});
		}
	};

	useEffect(() => {
		getVaccines();
	}, []);

	return (
		<Container>
			{/* {console.log("subadmin", props.location)} */}
			<Row>
				<Col>
					<div className="signup-form" style={formStyles}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col md="12" sm="12">
									<h3 style={headerStyles}>Assign Vaccine</h3>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<label>Vaccine</label>
										<select
											required
											value={data.vaccine}
											onChange={(e) => setData({ ...data, vaccine: e.target.value })}
											className="form-control"
										>
											<option>Select vaccine</option>
											{Object.keys(vaccines).map((vc) => {
												if (vaccines[vc].quantity > 0) {
													return (
														<option key={vc} value={vc}>
															{vc}
														</option>
													);
												}
											})}
										</select>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<label>Quantity</label>
										<input
											type="number"
											className="form-control"
											name="quantity"
											placeholder="Quantity"
											value={data.quantity}
											onChange={(e) => setData({ ...data, quantity: e.target.value })}
										/>
									</div>
								</Col>

								<Col md="12" sm="12" lg="12">
									<div className="form-group">
										<label>Date</label>
										<DatePicker className="form-control" selected={data.date} onChange={handleDateChange} />
									</div>
								</Col>
								<Col md="12" sm="12">
									<button type="submit" className="default-btn signup-btn">
										Assign
									</button>
								</Col>
							</Row>
						</form>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

const headerStyles = {
	marginBottom: "20px",
	marginLeft: "30%",
};

const formStyles = {
	marginLeft: "20%",
	height: "700px",
};

export default AssignVaccine;
