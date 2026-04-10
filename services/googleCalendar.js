import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    credentials: {
        type: "service_account",
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
    },
    scopes: ["https://www.googleapis.com/auth/calendar"]
});

const calendar = google.calendar({ version: "v3", auth });

export async function crearEvento(nombre, email, fecha, hora) {

    // 🔥 unir fecha + hora correctamente
    const fechaCompleta = `${fecha}T${hora}:00`;

    const evento = {
        summary: "Cita presencial",
        description: `Cliente: ${nombre} - Email: ${email}`,
        start: {
            dateTime: new Date(fechaCompleta).toISOString(),
            timeZone: "America/Guayaquil"
        },
        end: {
            dateTime: new Date(new Date(fechaCompleta).getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: "America/Guayaquil"
        }
    };

    const response = await calendar.events.insert({
        calendarId: "chiribogakerly@gmail.com", // tu calendario
        resource: evento
    });

    console.log("✅ EVENTO CREADO:", response.data.htmlLink);

    return response.data;
}