const axios = require("axios");

async function getCodeforcesUser(handle) {
    const response = await axios.get(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`
    );

    if (response.data.status !== "OK" || !response.data.result?.length) {
        throw new Error("Codeforces user not found");
    }

    return response.data;
}

async function getCodeforcesSolvedCount(handle) {
    const response = await axios.get(
        `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}`
    );

    if (response.data.status !== "OK") {
        throw new Error("Could not fetch Codeforces submissions");
    }

    const solved = new Set();

    for (const submission of response.data.result) {
        if (submission.verdict === "OK" && submission.problem) {
            solved.add(
                `${submission.problem.contestId ?? "unknown"}-${submission.problem.index ?? ""}`
            );
        }
    }

    return solved.size;
}

module.exports = { getCodeforcesUser, getCodeforcesSolvedCount };
