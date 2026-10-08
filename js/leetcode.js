// =====================================================
// CodeSphere
// LeetCode - Frontend Only
// Evaluation 1
// =====================================================

const LEETCODE_STORAGE_KEY =
    "codeSphereLeetCodeUsername";


// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupEvents();

        loadSavedUsername();

        updateDashboardUsername();

    }
);


// =====================================================
// ELEMENTS
// =====================================================

const usernameInput =
    document.getElementById(
        "leetcodeUsername"
    );

const connectButton =
    document.getElementById(
        "connectLeetcodeButton"
    );

const messageElement =
    document.getElementById(
        "leetcodeMessage"
    );

const profileCard =
    document.getElementById(
        "leetcodeProfileCard"
    );

const connectedUsername =
    document.getElementById(
        "connectedUsername"
    );

const disconnectButton =
    document.getElementById(
        "disconnectLeetcodeButton"
    );


// =====================================================
// EVENTS
// =====================================================

function setupEvents() {

    if (connectButton) {

        connectButton.addEventListener(
            "click",
            connectLeetCode
        );

    }


    if (usernameInput) {

        usernameInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    connectLeetCode();

                }

            }
        );

    }


    if (disconnectButton) {

        disconnectButton.addEventListener(
            "click",
            disconnectLeetCode
        );

    }

}


// =====================================================
// CONNECT LEETCODE
// =====================================================

function connectLeetCode() {

    if (!usernameInput) {

        return;

    }


    const username =
        usernameInput.value.trim();


    if (!username) {

        showMessage(
            "Please enter your LeetCode username.",
            "error"
        );

        usernameInput.focus();

        return;

    }


    // Basic username validation
    if (
        username.includes(" ") ||
        username.includes("/")
    ) {

        showMessage(
            "Please enter only your LeetCode username.",
            "error"
        );

        return;

    }


    // Save username locally
    localStorage.setItem(
        LEETCODE_STORAGE_KEY,
        username
    );


    // Display username
    displayLeetCodeProfile(username);


    showMessage(
        "LeetCode username saved successfully.",
        "success"
    );

}


// =====================================================
// DISPLAY PROFILE
// =====================================================

function displayLeetCodeProfile(username) {

    if (connectedUsername) {

        connectedUsername.textContent =
            username;

    }


    if (profileCard) {

        profileCard.classList.remove(
            "hidden"
        );

    }

}


// =====================================================
// LOAD SAVED USERNAME
// =====================================================

function loadSavedUsername() {

    const savedUsername =
        localStorage.getItem(
            LEETCODE_STORAGE_KEY
        );


    if (!savedUsername) {

        return;

    }


    if (usernameInput) {

        usernameInput.value =
            savedUsername;

    }


    displayLeetCodeProfile(
        savedUsername
    );

}


// =====================================================
// DISCONNECT
// =====================================================

function disconnectLeetCode() {

    localStorage.removeItem(
        LEETCODE_STORAGE_KEY
    );


    if (usernameInput) {

        usernameInput.value = "";

    }


    if (profileCard) {

        profileCard.classList.add(
            "hidden"
        );

    }


    showMessage(
        "LeetCode username removed.",
        "success"
    );

}


// =====================================================
// MESSAGE
// =====================================================

function showMessage(
    message,
    type
) {

    if (!messageElement) {

        return;

    }


    messageElement.textContent =
        message;


    messageElement.className =
        "leetcode-message " + type;

}


// =====================================================
// CODESPHERE USERNAME
// =====================================================

function updateDashboardUsername() {

    const usernameElement =
        document.getElementById(
            "leetcodeDashboardUsername"
        );


    if (!usernameElement) {

        return;

    }


    const sessionData =
        localStorage.getItem(
            "userSession"
        );


    if (!sessionData) {

        usernameElement.textContent =
            "Developer";

        return;

    }


    try {

        const session =
            JSON.parse(sessionData);


        if (
            session &&
            session.username
        ) {

            usernameElement.textContent =
                session.username;

            return;

        }

    } catch (error) {

        console.warn(
            "Could not load CodeSphere username."
        );

    }


    usernameElement.textContent =
        "Developer";

}