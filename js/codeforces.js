const CODEFORCES_STORAGE_KEY = "codeSphereCodeforcesHandle";
const BACKEND_URL = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", () => {
    setupEvents();
    loadSavedHandle();
    updateDashboardUsername();
});

const handleInput = document.getElementById("codeforcesHandle");
const connectButton = document.getElementById("connectCodeforcesButton");
const messageElement = document.getElementById("codeforcesMessage");
const profileCard = document.getElementById("codeforcesProfileCard");
const connectedHandle = document.getElementById("connectedCodeforcesHandle");
const disconnectButton = document.getElementById("disconnectCodeforcesButton");
const ratingElement = document.getElementById("codeforcesRating");
const rankElement = document.getElementById("codeforcesRank");
const maxRatingElement = document.getElementById("codeforcesMaxRating");
const acceptedElement = document.getElementById("codeforcesAccepted");
const profileLink = document.getElementById("codeforcesProfileLink");

function setupEvents() {
    connectButton?.addEventListener("click", connectCodeforces);
    handleInput?.addEventListener("keydown", e => {
        if (e.key === "Enter") connectCodeforces();
    });
    disconnectButton?.addEventListener("click", disconnectCodeforces);
}

async function connectCodeforces() {
    const handle = handleInput?.value.trim();

    if (!handle) {
        showMessage("Please enter your Codeforces handle.", "error");
        handleInput?.focus();
        return;
    }

    if (handle.includes(" ") || handle.includes("/")) {
        showMessage("Please enter only your Codeforces handle.", "error");
        return;
    }

    setLoading(true);
    showMessage("Connecting to Codeforces...", "success");

    try {
        const response = await fetch(
            `${BACKEND_URL}/api/platforms/codeforces/${encodeURIComponent(handle)}`
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not connect to Codeforces.");
        }

        localStorage.setItem(CODEFORCES_STORAGE_KEY, handle);
        displayCodeforcesProfile(data);
        showMessage("Codeforces profile connected successfully!", "success");
    } catch (error) {
        console.error("Codeforces connection error:", error);
        showMessage(error.message || "Could not connect to this Codeforces profile.", "error");
        profileCard?.classList.add("hidden");
    } finally {
        setLoading(false);
    }
}

async function loadSavedHandle() {
    const savedHandle = localStorage.getItem(CODEFORCES_STORAGE_KEY);
    if (!savedHandle) return;

    if (handleInput) handleInput.value = savedHandle;

    try {
        const response = await fetch(
            `${BACKEND_URL}/api/platforms/codeforces/${encodeURIComponent(savedHandle)}`
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not load profile.");
        displayCodeforcesProfile(data);
    } catch (error) {
        console.warn("Could not refresh saved Codeforces profile:", error.message);
        if (connectedHandle) connectedHandle.textContent = savedHandle;
        profileCard?.classList.remove("hidden");
    }
}

function displayCodeforcesProfile(data) {
    if (connectedHandle) connectedHandle.textContent = data.username || "-";
    if (ratingElement) ratingElement.textContent = data.rating ?? "—";
    if (rankElement) rankElement.textContent = data.rank || "Unrated";
    if (maxRatingElement) maxRatingElement.textContent = data.maxRating ?? "—";
    if (acceptedElement) acceptedElement.textContent = data.problemsSolved ?? 0;

    if (profileLink && data.username) {
        profileLink.href = `https://codeforces.com/profile/${encodeURIComponent(data.username)}`;
    }

    profileCard?.classList.remove("hidden");
}

function disconnectCodeforces() {
    localStorage.removeItem(CODEFORCES_STORAGE_KEY);
    if (handleInput) handleInput.value = "";
    profileCard?.classList.add("hidden");
    if (ratingElement) ratingElement.textContent = "—";
    if (rankElement) rankElement.textContent = "Unrated";
    if (maxRatingElement) maxRatingElement.textContent = "—";
    if (acceptedElement) acceptedElement.textContent = "0";
    if (profileLink) profileLink.href = "#";
    showMessage("Codeforces account disconnected.", "success");
}

function setLoading(loading) {
    if (!connectButton) return;
    connectButton.disabled = loading;
    connectButton.textContent = loading ? "Connecting..." : "Connect";
}

function showMessage(message, type) {
    if (!messageElement) return;
    messageElement.textContent = message;
    messageElement.className = `codeforces-message ${type}`;
}

function updateDashboardUsername() {
    const el = document.getElementById("codeforcesDashboardUsername");
    if (!el) return;

    const raw = localStorage.getItem("userSession");
    if (!raw) {
        el.textContent = "Developer";
        return;
    }

    try {
        const session = JSON.parse(raw);
        el.textContent = session?.username || "Developer";
    } catch {
        el.textContent = "Developer";
    }
}
