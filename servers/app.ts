import express from "express";
import cors from "cors";
import { connect } from "./config/database";
import organizationRoutes from "./routes/organizationRoutes";

const app = express();

// Connect to the database
connect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", organizationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});