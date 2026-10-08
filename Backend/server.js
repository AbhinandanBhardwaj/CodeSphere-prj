const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const platformRoutes = require("./routes/platformRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CodeSphere backend is running!",
        platformApi: "/api/platforms",
        gfgApi: "/api/platforms/gfg/:username",
        codeforcesApi: "/api/platforms/codeforces/:handle"
    });
});

// All platform integrations are mounted here.
app.use("/api/platforms", platformRoutes);

// Helpful JSON response for unknown API routes instead of Express HTML.
app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: `API route not found: ${req.method} ${req.originalUrl}`
    });
});

app.listen(PORT, () => {
    console.log("========================================");
    console.log(`CodeSphere backend: http://localhost:${PORT}`);
    console.log(`GFG endpoint: http://localhost:${PORT}/api/platforms/gfg/:username`);
    console.log(`Codeforces endpoint: http://localhost:${PORT}/api/platforms/codeforces/:handle`);
    console.log("Platform routes loaded successfully.");
    console.log("========================================");
});
