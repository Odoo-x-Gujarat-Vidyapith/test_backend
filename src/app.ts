import express from "express";
import cors from "cors";
import tripsRoutes from "./routes/trips.routes";
import maintenanceRoutes from "./routes/maintenance.routes";
import { createClient } from "@supabase/supabase-js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
    res.json({ ok: true });
});

app.use("/api/trips", tripsRoutes);
app.use("/api/maintenance", maintenanceRoutes);