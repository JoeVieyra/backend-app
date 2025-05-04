const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const uploadRoutes = require("./src/routes/upload");
const colaboradorRoutes = require("./src/routes/colaboradores");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/appUsuarios", {
      })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/files", uploadRoutes);
app.use("/api/colaboradores", colaboradorRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
