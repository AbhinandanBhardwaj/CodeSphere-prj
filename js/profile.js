// =====================================================
// CodeSphere - Profile
// File: js/profile.js
// =====================================================


// =====================================================
// INITIALIZE PROFILE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    updateProfile();

    renderCalendar();

    renderRecentActivity();

});


// =====================================================
// GET SOLVED PROBLEMS
// =====================================================

function getSolvedProblems() {

    try {

        const solvedProblems =
            JSON.parse(
                localStorage.getItem("solvedQuestions")
            );

        if (Array.isArray(solvedProblems)) {

            return solvedProblems;

        }

    } catch (error) {

        console.error(
            "Error reading solved questions:",
            error
        );

    }

    return [];

}


// =====================================================
// GET SOLVED COUNT BY DATE
// =====================================================

function getSolvedCountByDate() {

    const solvedProblems =
        getSolvedProblems();

    const countByDate = {};


    solvedProblems.forEach(
        function (problem) {

            /*
             * Problems page saves the date
             * in the following format:
             *
             * YYYY-MM-DD
             */

            const solvedDate =
                problem.date ||
                problem.solvedDate;


            if (!solvedDate) {

                return;

            }


            if (!countByDate[solvedDate]) {

                countByDate[solvedDate] = 0;

            }


            countByDate[solvedDate]++;

        }
    );


    return countByDate;

}


// =====================================================
// UPDATE PROFILE
// =====================================================

function updateProfile() {

    const solvedProblems =
        getSolvedProblems();


    // -----------------------------------------------
    // TOTAL QUESTIONS SOLVED
    // -----------------------------------------------

    const solvedElement =
        document.getElementById(
            "profile-solved"
        );


    if (solvedElement) {

        solvedElement.textContent =
            solvedProblems.length;

    }


    // -----------------------------------------------
    // CURRENT STREAK
    // -----------------------------------------------

    const streakElement =
        document.getElementById(
            "profile-streak"
        );


    const currentStreak =
        calculateCurrentStreak();


    if (streakElement) {

        streakElement.textContent =
            currentStreak;

    }


    // -----------------------------------------------
    // BEST STREAK
    // -----------------------------------------------

    const bestElement =
        document.getElementById(
            "profile-best"
        );


    const bestStreak =
        calculateBestStreak();


    if (bestElement) {

        bestElement.textContent =
            bestStreak;

    }

}


// =====================================================
// CONTRIBUTION CALENDAR
// =====================================================

function renderCalendar() {

    const container =
        document.getElementById(
            "calendar-container"
        );


    if (!container) {

        return;

    }


    // Clear old calendar

    container.innerHTML = "";


    // Get solved questions by date

    const solvedCountByDate =
        getSolvedCountByDate();


    // Current year

    const year =
        new Date().getFullYear();


    // =================================================
    // CALENDAR HEADER
    // =================================================

    const header =
        document.createElement(
            "div"
        );


    header.className =
        "calendar-header";


    header.innerHTML = `

        <div class="calendar-year">
            ${year}
        </div>

    `;


    container.appendChild(
        header
    );


    // =================================================
    // CREATE 12 MONTHS
    // =================================================

    for (
        let month = 0;
        month < 12;
        month++
    ) {

        const monthBlock =
            document.createElement(
                "div"
            );


        monthBlock.className =
            "calendar-month";


        // ---------------------------------------------
        // MONTH NAME
        // ---------------------------------------------

        const monthName =
            new Date(
                year,
                month,
                1
            ).toLocaleString(
                "default",
                {
                    month: "short"
                }
            );


        const monthTitle =
            document.createElement(
                "div"
            );


        monthTitle.className =
            "calendar-month-title";


        monthTitle.textContent =
            monthName;


        monthBlock.appendChild(
            monthTitle
        );


        // ---------------------------------------------
        // DAYS IN MONTH
        // ---------------------------------------------

        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        // ---------------------------------------------
        // FIRST DAY OF MONTH
        // ---------------------------------------------

        const firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();


        // ---------------------------------------------
        // CALENDAR GRID
        // ---------------------------------------------

        const grid =
            document.createElement(
                "div"
            );


        grid.className =
            "calendar-grid";


        // ---------------------------------------------
        // EMPTY CELLS BEFORE FIRST DAY
        // ---------------------------------------------

        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const emptyCell =
                document.createElement(
                    "div"
                );


            emptyCell.className =
                "calendar-cell empty";


            grid.appendChild(
                emptyCell
            );

        }


        // ---------------------------------------------
        // ACTUAL DAYS
        // ---------------------------------------------

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const cell =
                document.createElement(
                    "div"
                );


            cell.className =
                "calendar-cell";


            // -----------------------------------------
            // CREATE DATE
            // -----------------------------------------

            const date =
                year +
                "-" +
                String(
                    month + 1
                ).padStart(
                    2,
                    "0"
                ) +
                "-" +
                String(day).padStart(
                    2,
                    "0"
                );


            // -----------------------------------------
            // GET NUMBER OF QUESTIONS SOLVED
            // -----------------------------------------

            const solvedCount =
                Number(
                    solvedCountByDate[date] || 0
                );


            // -----------------------------------------
            // APPLY CONTRIBUTION LEVEL
            // -----------------------------------------

            if (
                solvedCount === 0
            ) {

                cell.classList.add(
                    "level-0"
                );

            }

            else if (
                solvedCount === 1
            ) {

                cell.classList.add(
                    "level-1"
                );

            }

            else if (
                solvedCount <= 3
            ) {

                cell.classList.add(
                    "level-2"
                );

            }

            else if (
                solvedCount <= 5
            ) {

                cell.classList.add(
                    "level-3"
                );

            }

            else {

                cell.classList.add(
                    "level-4"
                );

            }


            // -----------------------------------------
            // TOOLTIP
            // -----------------------------------------

            if (
                solvedCount === 0
            ) {

                cell.title =
                    `${date} — No problems solved`;

            }

            else if (
                solvedCount === 1
            ) {

                cell.title =
                    `${date} — 1 problem solved`;

            }

            else {

                cell.title =
                    `${date} — ${solvedCount} problems solved`;

            }


            // -----------------------------------------
            // ADD CELL
            // -----------------------------------------

            grid.appendChild(
                cell
            );

        }


        monthBlock.appendChild(
            grid
        );


        container.appendChild(
            monthBlock
        );

    }


    // =================================================
    // TOTAL CONTRIBUTIONS
    // =================================================

    const contributionTotal =
        document.getElementById(
            "contribution-total"
        );


    const total =
        Object.values(
            solvedCountByDate
        ).reduce(
            function (
                sum,
                count
            ) {

                return (
                    sum +
                    Number(count)
                );

            },
            0
        );


    if (contributionTotal) {

        contributionTotal.textContent =
            `${total} contributions`;

    }

}


// =====================================================
// CURRENT STREAK
// =====================================================

function calculateCurrentStreak() {

    const solvedCountByDate =
        getSolvedCountByDate();


    let streak = 0;


    const today =
        new Date();


    while (true) {

        const date =
            today.getFullYear() +
            "-" +
            String(
                today.getMonth() + 1
            ).padStart(
                2,
                "0"
            ) +
            "-" +
            String(
                today.getDate()
            ).padStart(
                2,
                "0"
            );


        if (
            solvedCountByDate[date]
        ) {

            streak++;


            today.setDate(
                today.getDate() - 1
            );

        }

        else {

            break;

        }

    }


    return streak;

}


// =====================================================
// BEST STREAK
// =====================================================

function calculateBestStreak() {

    const solvedCountByDate =
        getSolvedCountByDate();


    const dates =
        Object.keys(
            solvedCountByDate
        )
        .filter(
            function (date) {

                return (
                    solvedCountByDate[date] > 0
                );

            }
        )
        .sort();


    if (
        dates.length === 0
    ) {

        return 0;

    }


    let best = 1;

    let current = 1;


    for (
        let i = 1;
        i < dates.length;
        i++
    ) {

        const previousDate =
            parseLocalDate(
                dates[i - 1]
            );


        const currentDate =
            parseLocalDate(
                dates[i]
            );


        const difference =
            (
                currentDate -
                previousDate
            ) /
            (
                1000 *
                60 *
                60 *
                24
            );


        if (
            difference === 1
        ) {

            current++;

        }

        else {

            current = 1;

        }


        if (
            current > best
        ) {

            best = current;

        }

    }


    return best;

}


// =====================================================
// PARSE LOCAL DATE
// =====================================================

function parseLocalDate(
    dateString
) {

    const parts =
        dateString.split("-");


    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

}


// =====================================================
// RECENT ACTIVITY
// =====================================================

function renderRecentActivity() {

    const container =
        document.getElementById(
            "recent-activity"
        );


    if (!container) {

        return;

    }


    const solvedProblems =
        getSolvedProblems();


    container.innerHTML = "";


    // -----------------------------------------------
    // SHOW MOST RECENT FIRST
    // -----------------------------------------------

    const recent =
        solvedProblems
            .slice()
            .reverse()
            .slice(
                0,
                10
            );


    // -----------------------------------------------
    // EMPTY STATE
    // -----------------------------------------------

    if (
        recent.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-activity">
                No problems solved yet.
            </div>

        `;


        return;

    }


    // -----------------------------------------------
    // CREATE ACTIVITY ITEMS
    // -----------------------------------------------

    recent.forEach(
        function (problem) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "activity-item";


            const solvedDate =
                problem.date ||
                problem.solvedDate ||
                "Unknown date";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escapeHTML(
                            problem.title
                        )}
                    </strong>

                    <span>
                        ${solvedDate}
                    </span>

                </div>


                <span class="activity-difficulty">
                    ${escapeHTML(
                        problem.difficulty ||
                        "Unknown"
                    )}
                </span>

            `;


            container.appendChild(
                item
            );

        }
    );

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


// =====================================================
// LOGOUT
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (logoutButton) {

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

    }
);