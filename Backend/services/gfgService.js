const axios = require("axios");

const GFG_API_BASE = "https://gfg-stats.tashif.codes";

async function getGFGStats(username) {
    const cleanUsername = String(username || "").trim();
    if (!cleanUsername) throw new Error("GFG username is required.");

    try {
        const response = await axios.get(
            `${GFG_API_BASE}/${encodeURIComponent(cleanUsername)}/stats`,
            {
                timeout: 15000,
                headers: { Accept: "application/json" }
            }
        );

        const payload = response.data;
        if (payload?.status !== "success" || !payload?.data) {
            throw new Error(payload?.message || "GFG user not found.");
        }

        const d = payload.data;
        return {
            platform: "GeeksforGeeks",
            username: payload.username || cleanUsername,
            totalSolved: Number(d.totalSolved ?? 0),
            totalQuestions: Number(d.totalQuestions ?? 0),
            acceptanceRate: Number(d.acceptanceRate ?? 0),
            easy: Number(d.byDifficulty?.easy ?? 0),
            medium: Number(d.byDifficulty?.medium ?? 0),
            hard: Number(d.byDifficulty?.hard ?? 0),
            school: Number(d.byDifficulty?.school ?? 0),
            basic: Number(d.byDifficulty?.basic ?? 0),
            topicAnalysis: Array.isArray(d.topicAnalysis) ? d.topicAnalysis : [],
            profileUrl: `https://www.geeksforgeeks.org/user/${encodeURIComponent(cleanUsername)}/`
        };
    } catch (error) {
        if (error.response?.status === 404) throw new Error("GFG user not found.");
        if (error.response?.status === 429) throw new Error("GFG API is rate-limiting requests. Please try again later.");
        if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") throw new Error("GFG API request timed out. Please try again.");
        if (error.response?.data?.message) throw new Error(error.response.data.message);
        throw new Error(`Unable to reach GFG stats service: ${error.message}`);
    }
}

module.exports = { getGFGStats };
