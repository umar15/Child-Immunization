import axios from "axios";
import { baseURL, BE_PORT } from "./constants";

const instance = axios.create({
	baseURL: baseURL + ":" + BE_PORT,
	withCredentials: true,
});

export default instance;
