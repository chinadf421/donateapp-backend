import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Credenciales reales de tus capturas anteriores
const SUPABASE_URL = "https://pawtksaoukxefhomcbjy.supabase.co";
const SUPABASE_KEY = "sb_publishable_gtMz1kucnM4B90t8IS4c9A_LpnCEd";

// Conectamos con Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// RUTA POST: Recibe datos y los guarda en la base de datos real
app.post("/api/donaciones", async (req, res) => {
  const { nombre, contacto, tipo_donacion, descripcion } = req.body;

  if (!nombre || !contacto || !tipo_donacion) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan datos obligatorios.",
    });
  }

  try {
    // Insertamos el registro en la tabla de Supabase
    const { data, error } = await supabase
      .from("donaciones")
      .insert([{ nombre, contacto, tipo_donacion, descripcion }]);

    if (error) throw error;

    console.log(`\n✅ ¡Donación de ${nombre} guardada con éxito en Supabase!`);

    res.status(201).json({
      ok: true,
      mensaje: "¡Donación registrada con éxito en la base de datos!",
    });
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error.message);
    res.status(500).json({
      ok: false,
      mensaje: "Hubo un error al procesar el registro.",
    });
  }
});

app.listen(PORT, () => {
  console.log("Servidor de DONATEapp corriendo en el puerto ${PORT}");
});
