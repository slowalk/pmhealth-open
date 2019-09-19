import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000/v1",
  // baseURL: "http://backend:3000/v1",
  // baseURL: "http://127.0.0.1:3000/v1",
  baseURL: process.env.NODE_ENV == "production" ? "https://pmhealth.team-d.work/v1" : "http://localhost:3000/v1",
  timeout: 9000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});
