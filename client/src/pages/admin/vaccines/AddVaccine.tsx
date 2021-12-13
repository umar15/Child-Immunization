import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddVaccine = (props) => {
	const vaccineID: any = useParams();
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();

	const [data, setData] = useState<any>({
		name: "",
		manufacturer: "",
		quantity: 0,
		expiryDate: new Date(),
	});
	const vaccine: any = location.state ? location.state : "";

	// const { subadmin } = location.state;
	console.log("object", vaccine.vaccine);
	console.log("id", vaccineID.id);

	React.useEffect(() => {
		if (vaccineID.id === "add") {
			return;
		} else {
			vaccineID.id !== "add" &&
				setData({
					name: vaccine ? vaccine.vaccine.name : "",
					manufacturer: vaccine ? vaccine.vaccine.manufacturer : "",
					quantity: vaccine ? vaccine.vaccine.quantity : 0,
					expiryDate: new Date(),
				});
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (vaccineID.id == "add") {
			if (data.quantity > 0) {
				axios
					.post("/admin/vaccines/add", data)
					.then((res) => {
						console.log("add: ", res);
						alert.show("Vaccine added successfully!", {
							type: "success",
						});
						history.push("/admin/vaccines");
					})
					.catch((err) => {
						console.log(err);
						alert.show("Failed to add vaccine.", {
							type: "error",
						});
					});
			} else {
				alert.show("Quanitity must be greater then 0.", {
					type: "error",
				});
			}
		} else {
			if (data.quantity > 0) {
				axios
					.put(`/admin/vaccines/${vaccineID.id}`, data)
					.then((res) => {
						console.log("update", res);
						alert.show("Vaccine updated successfully!", {
							type: "success",
						});
						history.push("/admin/vaccines");
					})
					.catch((err) => {
						console.log(err);
						alert.show("Failed to update vaccine", {
							type: "error",
						});
					});
			} else {
				alert.show("Quantity must be greater then 0..", {
					type: "error",
				});
			}
		}
		console.log(data);
	};

	const handleDateChange = (date: any) => {
		setData({
			...data,
			expiryDate: date,
		});
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
									<h3 style={headerStyles}>{vaccineID.id == "add" ? "Add Vaccine" : "Update Vaccine"}</h3>
								</Col>
								<Col md="12" sm="12">
									<label>Name</label>
									<div className="form-group">
										<select
											required
											value={data.name}
											onChange={(e) => setData({ ...data, name: e.target.value })}
											className="form-control"
										>
											<option value="">Vaccine Name</option>
											<option value="opv">Polio</option>
											<option value="bcg">BCG</option>
											<option value="pentavalent">Pentavalent</option>
											<option value="pcv">PCV</option>
											<option value="measles">Measles</option>
										</select>
									</div>
								</Col>
								<Col md="12" sm="12">
									<label>Manufacturer</label>
									<div className="form-group">
										<input
											type="manufacturer"
											className="form-control"
											name="manufacturer"
											placeholder="Manufacturer"
											value={data.manufacturer}
											onChange={(e) => setData({ ...data, manufacturer: e.target.value })}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<label>Quantity</label>
									<div className="form-group">
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
									<label>Date</label>
									<div className="form-group">
										<DatePicker
											className="form-control"
											selected={data.expiryDate}
											onChange={handleDateChange}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<button type="submit" className="default-btn signup-btn">
										{vaccineID.id === "add" ? "Add" : "Update"}
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

export default AddVaccine;
