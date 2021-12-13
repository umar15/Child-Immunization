import React from "react";
import axios from "../config/AxiosOptions";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return { ...state, isAuthenticated: true };
		case "SIGN_OUT_SUCCESS":
			return { ...state, isAuthenticated: false };
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function UserProvider({ children }) {
	var [state, dispatch] = React.useReducer(userReducer, {
		isAuthenticated: !!localStorage.getItem("user"),
	});

	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	);
}

function useUserState() {
	var context = React.useContext(UserStateContext);
	if (context === undefined) {
		throw new Error("useUserState must be used within a UserProvider");
	}
	return context;
}

function useUserDispatch() {
	var context = React.useContext(UserDispatchContext);
	if (context === undefined) {
		throw new Error("useUserDispatch must be used within a UserProvider");
	}
	return context;
}

function loginUser(event, login, password, dispatch, alert, history) {
	event.preventDefault();

	axios
		.post("/users/login", { username: login, password: password })
		.then((res) => {
			console.log("Login function: ", JSON.stringify(res));
			localStorage.setItem("user", JSON.stringify(res.data.data.user));
			dispatch({ type: "LOGIN_SUCCESS" });
			history.push(`/${res.data.data.user.userType}`);
			alert.show("Login Successful", { type: "success" });
		})
		.catch((err) => {
			// console.log("Error in login function: " + err.response.data.message + "\n");
			alert.show(err.response.data.message || "Login Failed. Please try again later!", { type: "error" });
		});
}

function signOut(dispatch, history) {
	localStorage.removeItem("user");
	dispatch({ type: "SIGN_OUT_SUCCESS" });
	history.push("/login");
	axios.delete("/logout").catch(() => {});
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };
