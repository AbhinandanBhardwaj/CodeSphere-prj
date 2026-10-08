// =====================================================
// CodeSphere Dashboard
// =====================================================


// =====================================================
// AUTH GUARD
// =====================================================

(function checkAuth() {

    const session =
        JSON.parse(
            localStorage.getItem(
                "userSession"
            )
        );


    if (
        !session ||
        !session.authenticated
    ) {

        window.location.href =
            "login.html";

    }

})();



// =====================================================
// START DASHBOARD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderDashboard();

    }
);



// =====================================================
// MAIN DASHBOARD RENDER
// =====================================================

function renderDashboard() {

    renderUserInfo();

    renderStatistics();

    renderPlatformCards();

    renderDifficulty();

    renderRecentActivity();

    renderHeatmapByMonth();

    renderCurrentDate();

    setupLogout();

}



// =====================================================
// GET SESSION
// =====================================================

function getSession() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "userSession"
            )
        );

    } catch (error) {

        return null;

    }

}



// =====================================================
// GET SOLVED PROBLEMS
// =====================================================

function getSolvedProblems() {

    const saved =
        localStorage.getItem(
            "solvedProblems"
        );


    if (!saved) {
        return [];
    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        return [];

    }

}



// =====================================================
// GET SOLVED DATES
// =====================================================

function getSolvedDates() {

    const saved =
        localStorage.getItem(
            "solvedProblemDates"
        );


    if (!saved) {
        return {};

    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        return {};

    }

}



// =====================================================
// USER INFORMATION
// =====================================================

function renderUserInfo() {

    const session =
        getSession();


    if (!session) {
        return;
    }


    const username =
        session.username ||
        "Developer";


    const welcomeUsername =
        document.getElementById(
            "welcomeUsername"
        );


    const dashboardUsername =
        document.getElementById(
            "dashboardUsername"
        );


    if (welcomeUsername) {

        welcomeUsername.textContent =
            username;

    }


    if (dashboardUsername) {

        dashboardUsername.textContent =
            username;

    }

}



// =====================================================
// STATISTICS
// =====================================================

function renderStatistics() {

    const solvedProblems =
        getSolvedProblems();


    const totalSolved =
        solvedProblems.length;


    // Total solved

    const totalPoints =
        document.getElementById(
            "total-points"
        );


    if (totalPoints) {

        totalPoints.textContent =
            totalSolved;

    }



    // Streak

    const currentStreak =
        calculateCurrentStreak();


    const currentStreakElement =
        document.getElementById(
            "current-streak"
        );


    if (currentStreakElement) {

        currentStreakElement.textContent =
            currentStreak;

    }



    // Rating

    const rating =
        calculateRating(
            totalSolved
        );


    const ratingElement =
        document.getElementById(
            "userRating"
        );


    if (ratingElement) {

        ratingElement.textContent =
            rating;

    }



    // Rank

    const rankElement =
        document.getElementById(
            "userRank"
        );


    if (rankElement) {

        // Ranking system will be connected
        // in a later change.

        rankElement.textContent =
            "—";

    }

}



// =====================================================
// CALCULATE RATING
// =====================================================

function calculateRating(
    solvedCount
) {

    const baseRating = 1000;

    const rating =
        baseRating +
        solvedCount * 25;


    return rating;

}



// =====================================================
// CURRENT STREAK
// =====================================================

function calculateCurrentStreak() {

    const solvedDates =
        getSolvedDates();


    const dates =
        Object.values(
            solvedDates
        );


    if (dates.length === 0) {

        return 0;

    }


    // Remove duplicates

    const uniqueDates =
        [...new Set(dates)];


    // Convert to Date

    uniqueDates.sort(
        (a, b) =>
            new Date(b) -
            new Date(a)
    );


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    let streak = 0;


    for (
        let i = 0;
        i < uniqueDates.length;
        i++
    ) {


        const date =
            new Date(
                uniqueDates[i]
            );


        date.setHours(
            0,
            0,
            0,
            0
        );


        const expectedDate =
            new Date(today);


        expectedDate.setDate(
            today.getDate() - streak
        );


        if (
            date.getTime() ===
            expectedDate.getTime()
        ) {

            streak++;

        } else {

            break;

        }

    }


    return streak;

}



// =====================================================
// PLATFORM CARDS
// =====================================================

function renderPlatformCards() {

    const container =
        document.getElementById(
            "platform-cards-container"
        );


    if (!container) {
        return;
    }


    const solved =
        getSolvedProblems().length;


    container.innerHTML = `

        <div class="stat-card platform-card leetcode">

            <h3>
                LeetCode
            </h3>

            <div class="value">
                ${solved}
            </div>

            <p
                style="
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                "
            >
                Problems solved
            </p>

        </div>


        <div class="stat-card platform-card codeforces">

            <h3>
                Codeforces
            </h3>

            <div class="value">
                0
            </div>

            <p
                style="
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                "
            >
                Problems solved
            </p>

        </div>


        <div class="stat-card platform-card gfg">

            <h3>
                GeeksforGeeks
            </h3>

            <div class="value">
                0
            </div>

            <p
                style="
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                "
            >
                Problems solved
            </p>

        </div>

    `;

}



// =====================================================
// DIFFICULTY
// =====================================================

function renderDifficulty() {

    const solvedProblems =
        getSolvedProblems();


    const solvedDates =
        getSolvedDates();


    // Problem list must match
    // problems.js

    const problemData = [

        {
            id: 1,
            difficulty: "Easy"
        },

        {
            id: 2,
            difficulty: "Easy"
        },

        {
            id: 3,
            difficulty: "Easy"
        },

        {
            id: 4,
            difficulty: "Easy"
        },

        {
            id: 5,
            difficulty: "Easy"
        },

        {
            id: 6,
            difficulty: "Medium"
        },

        {
            id: 7,
            difficulty: "Medium"
        },

        {
            id: 8,
            difficulty: "Medium"
        },

        {
            id: 9,
            difficulty: "Medium"
        },

        {
            id: 10,
            difficulty: "Hard"
        },

        {
            id: 11,
            difficulty: "Hard"
        },

        {
            id: 12,
            difficulty: "Hard"
        }

    ];


    let easy = 0;

    let medium = 0;

    let hard = 0;


    problemData.forEach(
        problem => {

            if (
                solvedProblems.includes(
                    problem.id
                )
            ) {

                if (
                    problem.difficulty ===
                    "Easy"
                ) {

                    easy++;

                }

                else if (
                    problem.difficulty ===
                    "Medium"
                ) {

                    medium++;

                }

                else if (
                    problem.difficulty ===
                    "Hard"
                ) {

                    hard++;

                }

            }

        }
    );



    const easyElement =
        document.getElementById(
            "easyCount"
        );


    const mediumElement =
        document.getElementById(
            "mediumCount"
        );


    const hardElement =
        document.getElementById(
            "hardCount"
        );


    if (easyElement) {

        easyElement.textContent =
            easy;

    }


    if (mediumElement) {

        mediumElement.textContent =
            medium;

    }


    if (hardElement) {

        hardElement.textContent =
            hard;

    }



    // Update chart if Chart.js exists

    if (
        typeof Chart !==
        "undefined"
    ) {

        const canvas =
            document.getElementById(
                "difficultyChart"
            );


        if (
            canvas &&
            typeof window.difficultyChartInstance !==
            "undefined"
        ) {

            window.difficultyChartInstance
                .destroy();

        }


        if (canvas) {

            window.difficultyChartInstance =
                new Chart(
                    canvas,
                    {

                        type: "doughnut",

                        data: {

                            labels: [
                                "Easy",
                                "Medium",
                                "Hard"
                            ],

                            datasets: [

                                {

                                    data: [
                                        easy,
                                        medium,
                                        hard
                                    ]

                                }

                            ]

                        },

                        options: {

                            responsive: true,

                            maintainAspectRatio: false,

                            plugins: {

                                legend: {
                                    display: false
                                }

                            }

                        }

                    }
                );

        }

    }

}



// =====================================================
// CONTRIBUTION CALENDAR
// =====================================================

function renderHeatmapByMonth() {

    const wrapper =
        document.getElementById(
            "heatmap-wrapper"
        );


    if (!wrapper) {
        return;
    }


    wrapper.innerHTML = "";


    const months = [

        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"

    ];


    const solvedDates =
        getSolvedDates();


    // Create a set of actual
    // dates on which problems
    // were solved.

    const solvedDateSet =
        new Set(
            Object.values(
                solvedDates
            )
        );



    months.forEach(
        (month, monthIndex) => {


            const monthBlock =
                document.createElement(
                    "div"
                );


            monthBlock.classList.add(
                "month-block"
            );



            const label =
                document.createElement(
                    "div"
                );


            label.classList.add(
                "month-label"
            );


            label.innerText =
                month;


            monthBlock.appendChild(
                label
            );



            const monthGrid =
                document.createElement(
                    "div"
                );


            monthGrid.classList.add(
                "month-grid"
            );


            // 14 cells

            for (
                let i = 0;
                i < 14;
                i++
            ) {


                const cell =
                    document.createElement(
                        "div"
                    );


                cell.classList.add(
                    "heatmap-cell"
                );


                // Create a day for
                // this month.

                const day =
                    i + 1;


                const date =
                    new Date(
                        new Date()
                            .getFullYear(),
                        monthIndex,
                        day
                    );


                const year =
                    date.getFullYear();


                const formattedMonth =
                    String(
                        date.getMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    );


                const formattedDay =
                    String(
                        date.getDate()
                    ).padStart(
                        2,
                        "0"
                    );


                const dateString =
                    `${year}-${formattedMonth}-${formattedDay}`;



                // -------------------------------------------------
                // GREEN ONLY IF A PROBLEM WAS SOLVED ON THIS DATE
                // -------------------------------------------------

                if (
                    solvedDateSet.has(
                        dateString
                    )
                ) {

                    cell.classList.add(
                        "lvl-3"
                    );


                    cell.title =
                        `${dateString} • Problem solved`;

                }

                else {

                    cell.title =
                        `${dateString} • No contribution`;

                }


                monthGrid.appendChild(
                    cell
                );

            }


            monthBlock.appendChild(
                monthGrid
            );


            wrapper.appendChild(
                monthBlock
            );

        }
    );



    // Contribution count

    const contributionCount =
        document.getElementById(
            "contributionCount"
        );


    if (contributionCount) {

        contributionCount.textContent =
            solvedDateSet.size;

    }

}



// =====================================================
// RECENT ACTIVITY
// =====================================================

function renderRecentActivity() {

    const container =
        document.getElementById(
            "recentActivity"
        );


    if (!container) {
        return;
    }


    const solvedProblems =
        getSolvedProblems();


    const solvedDates =
        getSolvedDates();


    const problemData = [

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
            title: "Binary Search",
            difficulty: "Easy"
        },

        {
            id: 6,
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium"
        },

        {
            id: 7,
            title: "3Sum",
            difficulty: "Medium"
        },

        {
            id: 8,
            title: "Product of Array Except Self",
            difficulty: "Medium"
        },

        {
            id: 9,
            title: "Group Anagrams",
            difficulty: "Medium"
        },

        {
            id: 10,
            title: "LRU Cache",
            difficulty: "Hard"
        },

        {
            id: 11,
            title: "Merge k Sorted Lists",
            difficulty: "Hard"
        },

        {
            id: 12,
            title: "Trapping Rain Water",
            difficulty: "Hard"
        }

    ];


    const recent =
        solvedProblems
            .map(id => {

                return problemData.find(
                    problem =>
                        problem.id === id
                );

            })
            .filter(Boolean)
            .reverse()
            .slice(0, 5);



    if (recent.length === 0) {

        container.innerHTML = `

            <div
                style="
                    padding: 1.5rem;
                    text-align: center;
                    color: var(--text-dim);
                    font-size: 0.8rem;
                "
            >

                No problems solved yet.

                <br>

                Go to Problems and
                solve your first question.

            </div>

        `;

        return;

    }



    container.innerHTML =
        recent.map(
            problem => `

                <div class="activity-item">

                    <div class="activity-title">

                        <span class="activity-icon">
                            ✓
                        </span>

                        <div>

                            <div>
                                ${problem.title}
                            </div>

                            <small
                                style="
                                    color: var(--text-dim);
                                "
                            >
                                Solved
                            </small>

                        </div>

                    </div>


                    <div class="activity-meta">

                        <span
                            class="badge-tag badge-${problem.difficulty.toLowerCase()}"
                        >
                            ${problem.difficulty}
                        </span>

                    </div>

                </div>

            `
        )
        .join("");

}



// =====================================================
// CURRENT DATE
// =====================================================

function renderCurrentDate() {

    const element =
        document.getElementById(
            "currentDate"
        );


    if (!element) {
        return;
    }


    const today =
        new Date();


    element.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

}



// =====================================================
// LOGOUT
// =====================================================

function setupLogout() {

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "userSession"
            );


            window.location.href =
                "login.html";

        }
    );

}