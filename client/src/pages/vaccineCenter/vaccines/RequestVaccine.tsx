import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RequestVaccine = (props) => {
	const alert = useAlert();
	const history = useHistory();

	const [data, setData] = useState<any>({
		vaccine: "",
		quantity: 0,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("/vaccinecenter/requestvaccinestock", data)
			.then((res) => {
				console.log("add: ", res);
				alert.show("Vaccine stock request sent successfully!", {
					type: "success",
				});
				history.push("/vaccinecenter/vaccines");
			})
			.catch((err) => {
				console.log(err);
				alert.show("Failed to sent vaccine request.", {
					type: "error",
				});
			});
		console.log(data);
	};

	return (
		<Container>
			{/* {console.log("subadmin", props.location)} */}
			<Row>
				<Col>
					<div className="signup-form" style={formStyles}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col md="12" sm="12">
									<h3 style={headerStyles}>Vaccine stock request</h3>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<label>Vaccine Name</label>
										<select
											value={data.vaccine}
											onChange={(e) => setData({ ...data, vaccine: e.target.value })}
											className="form-control"
											required
										>
											<option value="">Vaccine Name</option>
											<option value="opv">opv</option>
											<option value="bcg">bcg</option>
											<option value="measles">measles</option>
											<option value="pentavalent">pentavalent</option>
											<option value="pcv">pcv</option>
										</select>
									</div>
								</Col>
								<Col md="12" sm="12">
									<div className="form-group">
										<label>Quantity</label>
										<input
											min={0}
											required
											type="number"
											className="form-control"
											name="quantity"
											placeholder="Quantity"
											value={data.quantity}
											onChange={(e) => setData({ ...data, quantity: e.target.value })}
										/>
									</div>
								</Col>

								<Col md="12" sm="12">
									<button type="submit" className="default-btn signup-btn">
										Send
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

export default RequestVaccine;
