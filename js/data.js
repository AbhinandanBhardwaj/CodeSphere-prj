// =====================================================
// CodeSphere - Data
// =====================================================

// Get logged-in user
function getLoggedInUser() {
    const session = JSON.parse(
        localStorage.getItem("userSession")
    );

    if (!session) {
        return "Developer";
    }

    return (
        session.username ||
        session.email ||
        "Developer"
    );
}


// =====================================================
// PROBLEMS
// =====================================================

const problems = [

    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy"
    },

    {
        id: 2,
        title: "Valid Parentheses",
        difficulty: "Easy"
    },

    {
        id: 3,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy"
    },

    {
        id: 4,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy"
    },

    {
        id: 5,
        title: "Maximum Subarray",
        difficulty: "Medium"
    },

    {
        id: 6,
        title: "Product of Array Except Self",
        difficulty: "Medium"
    },

    {
        id: 7,
        title: "3Sum",
        difficulty: "Medium"
    },

    {
        id: 8,
        title: "Container With Most Water",
        difficulty: "Medium"
    },

    {
        id: 9,
        title: "LRU Cache",
        difficulty: "Hard"
    },

    {
        id: 10,
        title: "Merge k Sorted Lists",
        difficulty: "Hard"
    }

];


// =====================================================
// GET SOLVED PROBLEMS
// =====================================================

function getSolvedProblems() {

    const solved = JSON.parse(
        localStorage.getItem("solvedProblems")
    );

    if (!Array.isArray(solved)) {
        return [];
    }

    return solved;
}


// =====================================================
// SAVE SOLVED PROBLEM
// =====================================================

function solveProblem(problemId) {

    let solvedProblems = getSolvedProblems();

    // Check if already solved
    const alreadySolved = solvedProblems.find(
        problem => problem.id === problemId
    );

    if (alreadySolved) {
        return;
    }


    const problem = problems.find(
        problem => problem.id === problemId
    );

    if (!problem) {
        return;
    }


    // Get today's date
    const today = new Date();

    const date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");


    solvedProblems.push({

        id: problem.id,

        title: problem.title,

        difficulty: problem.difficulty,

        solvedDate: date

    });


    localStorage.setItem(
        "solvedProblems",
        JSON.stringify(solvedProblems)
    );

}


// =====================================================
// COUNT PROBLEMS SOLVED ON EACH DATE
// =====================================================

function getSolvedCountByDate() {

    const solvedProblems = getSolvedProblems();

    const dateCounts = {};


    solvedProblems.forEach(problem => {

        const date = problem.solvedDate;

        if (!dateCounts[date]) {
            dateCounts[date] = 0;
        }

        dateCounts[date]++;

    });


    return dateCounts;
}


// =====================================================
// DASHBOARD DATA
// =====================================================

const mockUserData = {

    username: getLoggedInUser(),

    totalSolved: getSolvedProblems().length,

    activeStreak: 0,

    platforms: [

        {
            name: "LeetCode",
            solved: 0,
            rating: 0,
            rank: "Unranked",
            key: "leetcode"
        },

        {
            name: "Codeforces",
            solved: 0,
            rating: 0,
            rank: "Unranked",
            key: "codeforces"
        },

        {
            name: "GeeksforGeeks",
            solved: 0,
            score: 0,
            rank: "Unranked",
            key: "gfg"
        }

    ],

    difficultyBreakdown: {

        easy: 0,

        medium: 0,

        hard: 0

    },

    recentSubmissions: []

};