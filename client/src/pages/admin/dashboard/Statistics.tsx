import React from "react";
import { Container, Col, Row, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "../../../index.css";
import Graph from "./Graph";

const Statistics = () => {
	return (
		<Container>
			<Row>
				<Col lg="3">
					<Card className="card child-born">
						<CardBody>
							<CardTitle tag="h4">123,456</CardTitle>
							<CardSubtitle tag="h6" className="mb-2">
								Children Born
							</CardSubtitle>
						</CardBody>
					</Card>
				</Col>
				<Col lg="3">
					<Card className="card vaccinated">
						<CardBody>
							<CardTitle tag="h4">123,456</CardTitle>
							<CardSubtitle tag="h6" className="mb-2">
								Children Vaccinated
							</CardSubtitle>
						</CardBody>
					</Card>
				</Col>
				<Col lg="3">
					<Card className="card not-vaccinated">
						<CardBody>
							<CardTitle tag="h4">123,456</CardTitle>
							<CardSubtitle tag="h6" className="mb-2">
								Children not vaccinated
							</CardSubtitle>
						</CardBody>
					</Card>
				</Col>
				<Col lg="3">
					<Card className="card vaccines">
						<CardBody>
							<CardTitle tag="h4">123,456</CardTitle>
							<CardSubtitle tag="h6" className="mb-2">
								Vaccines Available
							</CardSubtitle>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Graph />
				</Col>
			</Row>
		</Container>
	);
};

export default Statistics;
