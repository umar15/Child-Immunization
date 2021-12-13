import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/userContext";
import { alertOptions } from "./config/AlertOptions";
import AlertTemplate from "react-alert-template-basic";
import { Provider as AlertProvider } from "react-alert";

ReactDOM.render(
	<AlertProvider template={AlertTemplate} {...alertOptions}>
		<UserProvider>
			<App />
		</UserProvider>
	</AlertProvider>,
	document.getElementById("root")
);
