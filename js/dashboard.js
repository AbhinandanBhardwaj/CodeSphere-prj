// =====================================================
// CodeSphere - Dashboard Controller
// Uses the same localStorage data as problems.js/profile.js
// =====================================================

(function checkAuth() {
    try {
        const session = JSON.parse(localStorage.getItem("userSession"));

        if (!session || !session.authenticated) {
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Authentication error:", error);
        window.location.href = "login.html";
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    renderDashboard();
});

function getSession() {
    try {
        return JSON.parse(localStorage.getItem("userSession")) || null;
    } catch (error) {
        return null;
    }
}

function getSolvedProblems() {
    try {
        const solved = JSON.parse(localStorage.getItem("solvedQuestions"));
        return Array.isArray(solved) ? solved : [];
    } catch (error) {
        return [];
    }
}

function getPlatformUsernames() {
    const keys = [
        "codeSphereLeetCodeUsername",
        "codeSphereGfgUsername",
        "codeSphereCodeforcesUsername"
    ];

    return keys.filter(function (key) {
        return Boolean(localStorage.getItem(key));
    });
}

function getDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
}

function getSolvedDates() {
    const solved = getSolvedProblems();
    const dates = {};

    solved.forEach(function (problem) {
        const date = problem.date || problem.solvedDate;
        if (date) {
            dates[date] = (dates[date] || 0) + 1;
        }
    });

    return dates;
}

function calculateCurrentStreak() {
    const dates = Object.keys(getSolvedDates()).sort().reverse();

    if (dates.length === 0) {
        return 0;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayString = getDateString(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = getDateString(yesterday);

    // A streak is active only if the user solved something today
    // or yesterday.
    if (dates[0] !== todayString && dates[0] !== yesterdayString) {
        return 0;
    }

    let streak = 0;
    let cursor = dates[0] === todayString ? today : yesterday;

    while (true) {
        const current = getDateString(cursor);

        if (!dates.includes(current)) {
            break;
        }

        streak++;
        cursor = new Date(cursor);
        cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
}

function renderDashboard() {
    const session = getSession();
    const solved = getSolvedProblems();

    if (session) {
        const username = session.username || session.email || "Developer";

        const sidebarUsername = document.getElementById("sidebarUsername");
        const topbarUsername = document.getElementById("topbarUsername");

        if (sidebarUsername) sidebarUsername.textContent = username;
        if (topbarUsername) topbarUsername.textContent = username;
    }

    const total = solved.length;
    const streak = calculateCurrentStreak();

    const totalSolved = document.getElementById("totalSolved");
    const currentStreak = document.getElementById("currentStreak");
    const rank = document.getElementById("userRank");

    if (totalSolved) totalSolved.textContent = total;
    if (currentStreak) currentStreak.textContent = streak;
    if (rank) rank.textContent = "—";

    const difficulty = {
        Easy: 0,
        Medium: 0,
        Hard: 0
    };

    solved.forEach(function (problem) {
        if (Object.prototype.hasOwnProperty.call(difficulty, problem.difficulty)) {
            difficulty[problem.difficulty]++;
        }
    });

    const easy = document.getElementById("easySolved");
    const medium = document.getElementById("mediumSolved");
    const hard = document.getElementById("hardSolved");

    if (easy) easy.textContent = difficulty.Easy;
    if (medium) medium.textContent = difficulty.Medium;
    if (hard) hard.textContent = difficulty.Hard;

    const progress = document.getElementById("progressPercent");
    if (progress) {
        // Frontend prototype goal: 100 solved problems.
        const percentage = Math.min(100, Math.round((total / 100) * 100));
        progress.textContent = percentage + "%";
    }

    const platformCount = getPlatformUsernames().length;
    const platformElements = document.querySelectorAll(".stats-grid .stat-card");

    // The third stat card is the platform count in the current dashboard markup.
    if (platformElements[2]) {
        const value = platformElements[2].querySelector("strong");
        if (value) value.textContent = platformCount;
    }
}

