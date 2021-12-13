import { transitions, positions } from "react-alert";

export const alertOptions = {
	position: "top right",
	timeout: 3000,
	offset: "10px",
	transition: transitions.FADE,
	containerStyle: { zIndex: 999999 },
};
