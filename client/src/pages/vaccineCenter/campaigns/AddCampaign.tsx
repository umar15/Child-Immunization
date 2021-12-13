import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const AddCampaign = (props) => {
	const campID: any = useParams();
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();
	const [workers, setWorkers] = useState([]);

	const makeCampaignID = () => {
		let campaignID = "CM-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
		for (let i = 0; i <= 5; i++) campaignID += possible.charAt(Math.floor(Math.random() * possible.length));
		return campaignID;
	};

	const getWorkers = async () => {
		axios
			.get("/vaccinecenter/workers")
			.then((res) => {
				console.log(res.data.data);
				setWorkers(res.data?.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch workers", {
					type: "error",
				})
			);
	};

	let options = workers?.map((worker: any) => {
		return {
			value: worker._id,
			label: worker.name,
		};
	});

	console.log("options: ", options);

	const [data, setData] = useState<any>({
		campaignID: makeCampaignID(),
		status: "inactive",
		area: "",
		workers: [],
		vaccine: "",
		startDate: new Date(),
		endDate: new Date(),
		vaccineCenter: "",
	});
	const campaign: any = location.state ? location.state : "";
	console.log("Campaign: ", campaign);

	const getUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				console.log("User: ", res.data.data.user);
				setData({
					...data,
					vaccineCenter: res.data.data.user._id,
				});
			})
			.catch((err) =>
				alert.show("Failed to fetch user!", {
					type: "error",
				})
			);
	};

	const handleMultiChange = (e) => {
		const d = data;
		console.log("value", options);
		d["workers"] = e.map((o) => o.value);
		console.log(
			"options",
			e.map((o) => o.value)
		);
		setData(d);
	};

	useEffect(() => {
		getUser();
		getWorkers();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (campID.id == "add") {
			axios
				.post("/vaccinecenter/campaigns/add", data)
				.then((res) => {
					console.log("add: ", res);
					alert.show("Campaign added successfully!", {
						type: "success",
					});
					history.push("/vaccinecenter/campaigns");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to add campaign.", {
						type: "error",
					});
				});
		} else {
			axios
				.put(`/vaccinecenter/campaigns/${campID.id}`, data)
				.then((res) => {
					console.log("update", res);
					alert.show("Campaign updated successfully!", {
						type: "success",
					});
					history.push("/vaccinecenter/campaigns");
				})
				.catch((err) => {
					console.log(err);
					alert.show("Failed to update campaign", {
						type: "error",
					});
				});
		}
		console.log("Data in submit: ", data);
	};

	const handleStartDateChange = (date: any) => {
		setData({
			...data,
			startDate: date,
		});
	};
	const handleEndDateChange = (date: any) => {
		setData({
			...data,
			endDate: date,
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
									<h3 style={headerStyles}>Add Campaign</h3>
								</Col>
								<Col lg="12">
									<div className="form-group">
										<label>Campaign Status</label>
										<select
											value={data.status}
											onChange={(e) =>
												setData({
													...data,
													status: e.target.value,
												})
											}
											className="form-control"
										>
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</div>
								</Col>
								<Col lg="12">
									<div className="form-group">
										<label>Campaign area</label>
										<input
											required
											type="text"
											className="form-control"
											name="area"
											placeholder="Campaign Area"
											value={data.area}
											onChange={(e) =>
												setData({
													...data,
													area: e.target.value,
												})
											}
										/>
									</div>
								</Col>
								<Col md="12" sm="12">
									<label>Name</label>
									<div className="form-group">
										<select
											value={data.vaccine}
											onChange={(e) => setData({ ...data, vaccine: e.target.value })}
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
								{/* <Col lg="12">
									<div className="form-group">
										<label>Number of workers</label>
										<input
											type="number"
											className="form-control"
											name="numWorkers"
											placeholder="No. of workers"
											value={data.noOfWorkers}
											onChange={(e) =>
												setData({
													...data,
													noOfWorkers: e.target.value,
												})
											}
										/>
									</div>
								</Col> */}
								{/* <Col lg="12">
										<div className="form-group">
											<input
												type="number"
												className="form-control"
												name="vaccineQuantity"
												placeholder="Vaccine Quantity"
												value={area}
												onChange={(e) => setArea(e.target.value)}
											/>
										</div>
									</Col> */}
								<Col lg="6">
									<div className="form-group">
										<label>Start date</label>
										<DatePicker
											required
											className="form-control"
											// value={startDate}
											selected={data.startDate}
											onChange={handleStartDateChange}
										/>
									</div>
								</Col>
								<Col lg="6">
									<div className="form-group">
										<label>End Date</label>
										<DatePicker
											required
											className="form-control"
											// value={endDate}
											selected={data.endDate}
											onChange={handleEndDateChange}
										/>
									</div>
								</Col>
								<Col lg="12">
									<div className="form-group">
										<label>Allotte Workers</label>
										<Select
											isMulti
											options={options}
											placeholder={"Select workers..."}
											onChange={(e: any) => handleMultiChange(e)}
										/>
									</div>
								</Col>

								<Col lg="12">
									<button className="default-btn add-stock-btn" type="submit">
										Add Campaign
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
	marginTop: "20px",
	height: "700px",
};

export default AddCampaign;
