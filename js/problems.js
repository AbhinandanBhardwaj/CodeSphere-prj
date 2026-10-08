// =====================================================
// CodeSphere - Problems Page
// File: js/problems.js
// =====================================================


// =====================================================
// AUTHENTICATION
// =====================================================

(function checkAuth() {

    try {

        const session = JSON.parse(
            localStorage.getItem("userSession")
        );

        if (!session || !session.authenticated) {
            window.location.href = "login.html";
            return;
        }

    } catch (error) {

        console.error(
            "Authentication error:",
            error
        );

        window.location.href = "login.html";

    }

})();


// =====================================================
// PROBLEM DATA
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
// FILTER STATE
// =====================================================

let currentDifficulty = "all";
let currentStatus = "all";
let searchText = "";


// =====================================================
// INITIALIZE PAGE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderProblems();
        setupProblemControls();

    }
);


// =====================================================
// GET SOLVED QUESTIONS
// =====================================================

function getSolvedQuestions() {

    try {

        const solved = JSON.parse(
            localStorage.getItem("solvedQuestions")
        );

        if (Array.isArray(solved)) {
            return solved;
        }

    } catch (error) {

        console.error(
            "Could not read solved questions:",
            error
        );

    }

    return [];

}


// =====================================================
// SAVE SOLVED QUESTIONS
// =====================================================

function saveSolvedQuestions(
    solvedQuestions
) {

    localStorage.setItem(
        "solvedQuestions",
        JSON.stringify(solvedQuestions)
    );

}


// =====================================================
// CHECK IF PROBLEM IS SOLVED
// =====================================================

function isSolved(problemId) {

    const solvedQuestions =
        getSolvedQuestions();

    return solvedQuestions.some(
        function (problem) {

            return Number(problem.id) ===
                Number(problemId);

        }
    );

}


// =====================================================
// RENDER PROBLEMS
// =====================================================

function renderProblems() {

    const container =
        document.getElementById(
            "problemList"
        );

    const emptyState =
        document.getElementById(
            "emptyProblems"
        );

    const solvedCountElement =
        document.getElementById(
            "solvedCount"
        );

    const totalCountElement =
        document.getElementById(
            "totalCount"
        );


    // -----------------------------------------------
    // SAFETY CHECK
    // -----------------------------------------------

    if (!container) {

        console.error(
            "Problem list container not found."
        );

        return;

    }


    // -----------------------------------------------
    // TOTAL COUNT
    // -----------------------------------------------

    if (totalCountElement) {

        totalCountElement.innerText =
            problems.length;

    }


    // -----------------------------------------------
    // SOLVED COUNT
    // -----------------------------------------------

    const solvedQuestions =
        getSolvedQuestions();

    if (solvedCountElement) {

        solvedCountElement.innerText =
            solvedQuestions.length;

    }


    // -----------------------------------------------
    // COPY ORIGINAL PROBLEMS
    // -----------------------------------------------

    let filteredProblems =
        [...problems];


    // -----------------------------------------------
    // SEARCH FILTER
    // -----------------------------------------------

    if (
        searchText.trim() !== ""
    ) {

        const search =
            searchText
                .trim()
                .toLowerCase();

        filteredProblems =
            filteredProblems.filter(
                function (problem) {

                    return problem.title
                        .toLowerCase()
                        .includes(search);

                }
            );

    }


    // -----------------------------------------------
    // DIFFICULTY FILTER
    // -----------------------------------------------

    if (
        currentDifficulty !== "all"
    ) {

        filteredProblems =
            filteredProblems.filter(
                function (problem) {

                    return (
                        problem.difficulty ===
                        currentDifficulty
                    );

                }
            );

    }


    // -----------------------------------------------
    // STATUS FILTER
    // -----------------------------------------------

    if (
        currentStatus === "solved"
    ) {

        filteredProblems =
            filteredProblems.filter(
                function (problem) {

                    return isSolved(
                        problem.id
                    );

                }
            );

    }


    if (
        currentStatus === "unsolved"
    ) {

        filteredProblems =
            filteredProblems.filter(
                function (problem) {

                    return !isSolved(
                        problem.id
                    );

                }
            );

    }


    // -----------------------------------------------
    // CLEAR CURRENT LIST
    // -----------------------------------------------

    container.innerHTML = "";


    // -----------------------------------------------
    // EMPTY STATE
    // -----------------------------------------------

    if (
        filteredProblems.length === 0
    ) {

        if (emptyState) {
            emptyState.style.display =
                "block";
        }

        return;

    }


    if (emptyState) {
        emptyState.style.display =
            "none";
    }


    // -----------------------------------------------
    // CREATE PROBLEM ROWS
    // -----------------------------------------------

    filteredProblems.forEach(
        function (problem) {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "problem-row";


            // ---------------------------------------
            // PROBLEM NAME
            // ---------------------------------------

            const titleElement =
                document.createElement(
                    "div"
                );

            titleElement.className =
                "problem-title";

            titleElement.innerText =
                problem.title;


            // ---------------------------------------
            // DIFFICULTY
            // ---------------------------------------

            const difficultyElement =
                document.createElement(
                    "div"
                );

            difficultyElement.className =
                "problem-difficulty";

            difficultyElement.innerText =
                problem.difficulty;

            difficultyElement.classList.add(
                problem.difficulty
                    .toLowerCase()
            );


            // ---------------------------------------
            // STATUS
            // ---------------------------------------

            const statusElement =
                document.createElement(
                    "div"
                );

            statusElement.className =
                "problem-status";


            const solved =
                isSolved(problem.id);


            if (solved) {

                statusElement.innerHTML =
                    '<span class="status-solved">Solved</span>';

            } else {

                statusElement.innerHTML =
                    '<span class="status-unsolved">Unsolved</span>';

            }


            // ---------------------------------------
            // ACTION
            // ---------------------------------------

            const actionElement =
                document.createElement(
                    "div"
                );

            actionElement.className =
                "problem-action";


            const actionButton =
                document.createElement(
                    "button"
                );

            actionButton.type =
                "button";


            if (solved) {

                actionButton.innerText =
                    "Mark Unsolved";

                actionButton.className =
                    "problem-action-button solved";

            } else {

                actionButton.innerText =
                    "Mark Solved";

                actionButton.className =
                    "problem-action-button";

            }


            actionButton.addEventListener(
                "click",
                function () {

                    toggleSolved(
                        problem.id
                    );

                }
            );


            actionElement.appendChild(
                actionButton
            );


            // ---------------------------------------
            // BUILD ROW
            // ---------------------------------------

            row.appendChild(
                titleElement
            );

            row.appendChild(
                difficultyElement
            );

            row.appendChild(
                statusElement
            );

            row.appendChild(
                actionElement
            );


            container.appendChild(
                row
            );

        }
    );

}


// =====================================================
// TOGGLE SOLVED STATUS
// =====================================================

function toggleSolved(
    problemId
) {

    const problem =
        problems.find(
            function (item) {

                return Number(item.id) ===
                    Number(problemId);

            }
        );


    if (!problem) {
        return;
    }


    let solvedQuestions =
        getSolvedQuestions();


    const existingIndex =
        solvedQuestions.findIndex(
            function (item) {

                return Number(item.id) ===
                    Number(problemId);

            }
        );


    // -----------------------------------------------
    // REMOVE SOLVED STATUS
    // -----------------------------------------------

    if (
        existingIndex !== -1
    ) {

        solvedQuestions.splice(
            existingIndex,
            1
        );

    }


    // -----------------------------------------------
    // ADD SOLVED STATUS
    // -----------------------------------------------

    else {

        solvedQuestions.push({

            id: problem.id,

            title: problem.title,

            difficulty:
                problem.difficulty,

            date: getToday()

        });

    }


    // -----------------------------------------------
    // SAVE
    // -----------------------------------------------

    saveSolvedQuestions(
        solvedQuestions
    );


    // -----------------------------------------------
    // RE-RENDER
    // -----------------------------------------------

    renderProblems();

}


// =====================================================
// GET TODAY'S DATE
// =====================================================

function getToday() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


// =====================================================
// SETUP SEARCH
// =====================================================

function setupProblemControls() {


    // -----------------------------------------------
    // SEARCH INPUT
    // -----------------------------------------------

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function (event) {

                searchText =
                    event.target.value;

                renderProblems();

            }
        );

    }


    // -----------------------------------------------
    // DIFFICULTY BUTTONS
    // -----------------------------------------------

    const difficultyButtons =
        document.querySelectorAll(
            "[data-difficulty]"
        );


    difficultyButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    difficultyButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentDifficulty =
                        button.dataset
                            .difficulty;


                    renderProblems();

                }
            );

        }
    );


    // -----------------------------------------------
    // STATUS BUTTONS
    // -----------------------------------------------

    const statusButtons =
        document.querySelectorAll(
            "[data-status]"
        );


    statusButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    statusButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentStatus =
                        button.dataset
                            .status;


                    renderProblems();

                }
            );

        }
    );

}