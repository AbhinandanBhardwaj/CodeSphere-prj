const express = require("express");
const { getGFGStats } = require("../services/gfgService");
const {
    getCodeforcesUser,
    getCodeforcesSolvedCount
} = require("../services/codeforcesService");

const router = express.Router();

// ==================== CODEFORCES ====================
router.get("/codeforces/:handle", async (req, res) => {
    try {
        const handle = req.params.handle.trim();
        if (!handle) {
            return res.status(400).json({ success: false, message: "Codeforces handle is required." });
        }

        const userData = await getCodeforcesUser(handle);
        const user = userData.result[0];
        const problemsSolved = await getCodeforcesSolvedCount(handle);

        res.json({
            success: true,
            platform: "Codeforces",
            username: user.handle,
            rating: user.rating ?? 0,
            maxRating: user.maxRating ?? 0,
            rank: user.rank ?? "Unrated",
            maxRank: user.maxRank ?? "Unrated",
            problemsSolved
        });
    } catch (error) {
        console.error("Codeforces route error:", error.message);
        const notFound = error.response?.status === 400 || /not found/i.test(error.message);
        res.status(notFound ? 404 : 502).json({
            success: false,
            message: notFound ? "Codeforces profile not found." : "Failed to fetch Codeforces data."
        });
    }
});

// ==================== GFG ====================
router.get("/gfg/:username", async (req, res) => {
    const username = decodeURIComponent(req.params.username || "").trim();

    if (!username) {
        return res.status(400).json({ success: false, message: "GFG username is required." });
    }

    console.log(`[GFG] Fetching live stats for: ${username}`);

    try {
        const data = await getGFGStats(username);
        return res.json({ success: true, ...data });
    } catch (error) {
        console.error("GFG route error:", error.message);
        const message = error.message || "Unable to fetch GFG profile.";
        const lower = message.toLowerCase();
        const status = lower.includes("not found") ? 404 : lower.includes("rate") ? 429 : 502;
        return res.status(status).json({ success: false, message });
    }
});

module.exports = router;
