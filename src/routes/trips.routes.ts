import { Router } from "express";
import { requireAuth } from "../lib/auth";
import { supabaseAsUser } from "../lib/supabase";

const router = Router();

router.post("/:id/dispatch", requireAuth, async (req, res) => {
    const jwt = (req as any).jwt;
    const supabase = supabaseAsUser(jwt);

    const { error } = await supabase.rpc("dispatch_trip", {
        p_trip_id: req.params.id,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ success: true });
});

router.post("/:id/complete", requireAuth, async (req, res) => {
    const jwt = (req as any).jwt;
    const supabase = supabaseAsUser(jwt);

    const { end_odometer_km } = req.body;

    if (typeof end_odometer_km !== "number") {
        return res.status(400).json({ error: "end_odometer_km must be number" });
    }

    const { error } = await supabase.rpc("complete_trip", {
        p_trip_id: req.params.id,
        p_end_odometer_km: end_odometer_km,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ success: true });
});

export default router;