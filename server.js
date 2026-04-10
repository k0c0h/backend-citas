import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { crearEvento } from "./services/googleCalendar.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint principal
app.post("/crear-cita", async (req, res) => {
    try {
        const { nombre, email, fecha, hora } = req.body;

        if (!nombre || !email || !fecha || !hora) {
            return res.status(400).json({ ok: false, msg: "Faltan datos" });
        }

        // 🔥 UNIR FECHA + HORA
        const fechaCompleta = `${fecha}T${hora}:00`;

        await crearEvento(nombre, email, fechaCompleta);

        res.json({ ok: true });

    } catch (error) {
        console.error("🔥 ERROR REAL:", error);
        res.status(500).json({ ok: false });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor corriendo");
});