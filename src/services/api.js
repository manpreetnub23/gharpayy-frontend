import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Lead APIs
export const getLeads = () => API.get("/leads");

export const createLead = (data) => API.post("/leads", data);

export const updateLead = (id, data) => API.patch(`/leads/${id}`, data);

export const updateLeadStatus = (id, status) =>
	API.put(`/leads/${id}/status`, { status });

// Visit APIs
export const scheduleVisit = (data) => API.post("/visits", data);

export const getVisits = () => API.get("/visits");

export const updateVisit = (id, data) => API.patch(`/visits/${id}`, data);

// Dashboard
export const getDashboardStats = () => API.get("/dashboard");

export default API;
