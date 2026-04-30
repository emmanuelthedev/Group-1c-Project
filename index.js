const express = require("express");
const app = express();

app.use(express.json()); // ✅ KEEP IT HERE

const taskRoutes = require("./routes/taskRoutes");
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));