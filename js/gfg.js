const GFG_STORAGE_KEY = "codeSphereGfgUsername";
const BACKEND_URL = "http://localhost:5000";
const GFG_API_URL = `${BACKEND_URL}/api/platforms/gfg/`;

const usernameInput = document.getElementById("gfgUsername");
const connectButton = document.getElementById("connectGfgButton");
const messageElement = document.getElementById("gfgMessage");
const profileCard = document.getElementById("gfgProfileCard");
const connectedUsername = document.getElementById("connectedGfgUsername");
const profileUsername = document.getElementById("gfgProfileUsername");
const profileLink = document.getElementById("gfgProfileLink");
const disconnectButton = document.getElementById("disconnectGfgButton");

document.addEventListener("DOMContentLoaded", () => {
    setupEvents();
    loadSavedUsername();
    updateDashboardUsername();
});

function setupEvents() {
    connectButton?.addEventListener("click", connectGFG);
    usernameInput?.addEventListener("keydown", e => { if (e.key === "Enter") connectGFG(); });
    disconnectButton?.addEventListener("click", disconnectGFG);
}

async function fetchGFG(username) {
    const response = await fetch(GFG_API_URL + encodeURIComponent(username));
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch {
        throw new Error("Backend returned an invalid response. Restart the CodeSphere backend from its Backend folder.");
    }
    if (!response.ok || data.success === false) throw new Error(data.message || "Unable to fetch GFG profile.");
    return data;
}

async function connectGFG() {
    const username = usernameInput?.value.trim();
    if (!username) return showMessage("Please enter your GFG username.", "error");
    if (/[\s/]/.test(username)) return showMessage("Please enter only your GFG username.", "error");

    showMessage("Fetching live GFG data...", "success");
    if (connectButton) connectButton.disabled = true;
    try {
        const data = await fetchGFG(username);
        localStorage.setItem(GFG_STORAGE_KEY, username);
        displayGFGProfile(username, data);
        showMessage("GFG profile connected successfully.", "success");
    } catch (error) {
        console.error("GFG connection error:", error);
        showMessage(error.message || "Failed to connect GFG profile.", "error");
    } finally {
        if (connectButton) connectButton.disabled = false;
    }
}

function displayGFGProfile(username, data = null) {
    if (connectedUsername) connectedUsername.textContent = username;
    if (profileUsername) profileUsername.textContent = username;
    if (profileLink) profileLink.href = `https://www.geeksforgeeks.org/user/${encodeURIComponent(username)}/`;
    if (profileCard) profileCard.classList.remove("hidden");

    const d = data || {};
    const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    set("gfgTotalSolved", d.totalSolved ?? "—");
    set("gfgEasy", d.easy ?? "—");
    set("gfgMedium", d.medium ?? "—");
    set("gfgHard", d.hard ?? "—");
    set("gfgAcceptance", d.acceptanceRate != null ? `${d.acceptanceRate}%` : "—");
    set("gfgTotalQuestions", d.totalQuestions ?? "—");

    const topics = document.getElementById("gfgTopTopics");
    if (topics) {
        topics.innerHTML = "";
        (d.topicAnalysis || []).slice(0, 5).forEach(item => {
            const chip = document.createElement("span");
            chip.className = "gfg-topic-chip";
            chip.textContent = `${item.topic}: ${item.count}`;
            topics.appendChild(chip);
        });
        if (!topics.children.length) topics.textContent = "No topic data available.";
    }
}

async function loadSavedUsername() {
    const saved = localStorage.getItem(GFG_STORAGE_KEY);
    if (!saved) return;
    if (usernameInput) usernameInput.value = saved;
    try { displayGFGProfile(saved, await fetchGFG(saved)); }
    catch (error) { console.warn("Could not refresh saved GFG profile:", error.message); displayGFGProfile(saved); }
}

function disconnectGFG() {
    localStorage.removeItem(GFG_STORAGE_KEY);
    if (usernameInput) usernameInput.value = "";
    if (profileCard) profileCard.classList.add("hidden");
    showMessage("GFG username removed.", "success");
}

function showMessage(message, type) {
    if (!messageElement) return;
    messageElement.textContent = message;
    messageElement.className = "gfg-message " + type;
}

function updateDashboardUsername() {
    const el = document.getElementById("gfgDashboardUsername");
    if (!el) return;
    try {
        const session = JSON.parse(localStorage.getItem("userSession") || "null");
        el.textContent = session?.username || "Developer";
    } catch { el.textContent = "Developer"; }
}
