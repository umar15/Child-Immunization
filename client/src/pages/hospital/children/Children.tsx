import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";
import ChildData from "./ChildData";
import ReactPaginate from "react-paginate";

const Children = () => {
	const [children, setChildren] = useState([]);
	// const [childrenData, setChildrenData] = useState([]);
	const [allChildren, setAllChildren] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);
	const [perPage, setperPage] = useState(10);
	const alert = useAlert();

	const getChildren = async () => {
		axios
			.get("/hospital/children")
			.then((res) => {
				console.log(res.data.data);
				setChildren(res.data?.data);
				// setChildrenData(res.data?.data);
				setPages(Math.ceil(res.data?.data.length / perPage));
				let items = res.data?.data.slice(page * perPage, (page + 1) * perPage);
				setAllChildren(items);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	const handlePageClick = (event) => {
		let newPage = event.selected;
		setPage(newPage);
	};

	const searchChild = (e) => {
		const filtered = children.filter((child: any) => {
			return child.childID.toLowerCase().includes(e.target.value.toLowerCase());
		});
		setAllChildren(filtered.slice(page * perPage, (page + 1) * perPage));
	};

	useEffect(() => {
		getChildren();
	}, [page]);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<>
			<Container>
				<Row className="subadmin-admin">
					<Col lg="9">
						<h3>Children</h3>
					</Col>
					<Col lg="3">
						<button className="default-btn">
							<a href="/hospital/child/add" style={linkStyles}>
								Add Child
							</a>
						</button>
					</Col>
				</Row>
				<Row>
					<Col md="12" sm="12">
						<div className="form-group">
							<input
								type="text"
								className="form-control search-field"
								name="name"
								placeholder="Enter child ID to search child"
								onChange={searchChild}
								style={{ marginBottom: "-30px" }}
							/>
						</div>
					</Col>
				</Row>

				<Row className="subadmin-table">
					<Col lg="12">
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
								{children &&
									allChildren.map((child: any, index) => (
										<tr key={child._id}>
											{/* {console.log(child.dateOfBirth.getTime())} */}
											<th scope="row">{index + 1}</th>
											<td>{child.childID}</td>
											<td>{child.parentName}</td>
											<td>{child.parentCNIC}</td>
											<td>{child.contactNo}</td>
											<td>{child.gender}</td>
											<td>
												<Link
													to={{
														pathname: `/hospital/children/${child._id}`,
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
						{allChildren.length === 0 && (
							<div style={{ margin: "10% 50%" }}>
								<h4>No child available.</h4>
							</div>
						)}
						<ReactPaginate
							breakLabel="..."
							nextLabel="next >"
							onPageChange={(e) => handlePageClick(e)}
							pageRangeDisplayed={5}
							pageCount={pages}
							previousLabel="< prev"
							renderOnZeroPageCount={null}
							containerClassName={"pagination"}
							activeClassName={"active"}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

const editStyles = {
	cursor: "pointer",
	color: "green",
};
const deleteStyles = {
	cursor: "pointer",
	color: "red",
};

const linkStyles = {
	color: "white",
	listStyleType: "none",
};

const rowStyles = {
	cursor: "pointer",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Children;
