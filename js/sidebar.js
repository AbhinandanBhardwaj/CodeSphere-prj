/* =====================================================
   CodeSphere - Shared Sidebar Navigation
   One navigation system for Dashboard, Problems,
   Coding Platforms and Profile.
   ===================================================== */

(function () {
    const platformPages = ["leetcode.html", "codeforces.html", "gfg.html"];

    function getPageInfo() {
        const current = (window.location.pathname.split("/").pop() || "dashboard.html").toLowerCase();
        const hash = (window.location.hash || "").toLowerCase();

        return {
            current,
            hash,
            isProfile: current === "profile.html",
            activePlatform: platformPages.includes(current)
                ? current.replace(".html", "")
                : null
        };
    }

    function getSession() {
        try {
            return JSON.parse(localStorage.getItem("userSession")) || null;
        } catch (error) {
            return null;
        }
    }

    function renderSidebar() {
        const sidebar = document.querySelector(".sidebar");
        if (!sidebar) return;

        const { current, hash, isProfile, activePlatform } = getPageInfo();
        const session = getSession();
        const username = session?.username || session?.email || "Developer";
        const initial = username.charAt(0).toUpperCase();

        const profileOverviewActive = isProfile && !["#progress", "#contributions"].includes(hash);
        const profileProgressActive = isProfile && hash === "#progress";
        const profileContributionsActive = isProfile && hash === "#contributions";

        sidebar.innerHTML = `
            <div class="cs-sidebar-inner">

                <a class="cs-brand" href="dashboard.html" aria-label="CodeSphere Dashboard">
                    <span class="cs-brand-icon">&lt;/&gt;</span>
                    <span class="cs-brand-copy">
                        <strong>CodeSphere</strong>
                        <small>CODING PERFORMANCE PLATFORM</small>
                    </span>
                </a>

                <nav class="cs-sidebar-nav" aria-label="Main navigation">

                    <div class="cs-nav-section-title">MAIN</div>

                    <a href="dashboard.html"
                       class="cs-nav-link ${current === "dashboard.html" ? "active" : ""}">
                        <span class="cs-nav-icon">▦</span>
                        <span class="cs-nav-text">Dashboard</span>
                    </a>

                    <a href="problems.html"
                       class="cs-nav-link ${current === "problems.html" ? "active" : ""}">
                        <span class="cs-nav-icon">◫</span>
                        <span class="cs-nav-text">Problems</span>
                    </a>

                    <div class="cs-nav-group ${activePlatform ? "open" : ""}">
                        <button type="button"
                                class="cs-nav-group-toggle"
                                aria-expanded="${Boolean(activePlatform)}">
                            <span class="cs-nav-icon">◉</span>
                            <span class="cs-nav-text">Coding Platforms</span>
                            <span class="cs-chevron">⌄</span>
                        </button>

                        <div class="cs-nav-submenu">
                            <a href="leetcode.html"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="cs-nav-sub-link ${activePlatform === "leetcode" ? "active" : ""}">
                                <span class="cs-platform-badge leetcode">LC</span>
                                <span>LeetCode</span>
                                <span class="cs-external">↗</span>
                            </a>

                            <a href="codeforces.html"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="cs-nav-sub-link ${activePlatform === "codeforces" ? "active" : ""}">
                                <span class="cs-platform-badge codeforces">CF</span>
                                <span>Codeforces</span>
                                <span class="cs-external">↗</span>
                            </a>

                            <a href="gfg.html"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="cs-nav-sub-link ${activePlatform === "gfg" ? "active" : ""}">
                                <span class="cs-platform-badge gfg">G</span>
                                <span>GeeksforGeeks</span>
                                <span class="cs-external">↗</span>
                            </a>
                        </div>
                    </div>

                    <div class="cs-nav-group ${isProfile ? "open" : ""}">
                        <button type="button"
                                class="cs-nav-group-toggle"
                                aria-expanded="${isProfile}">
                            <span class="cs-nav-icon">◎</span>
                            <span class="cs-nav-text">Profile</span>
                            <span class="cs-chevron">⌄</span>
                        </button>

                        <div class="cs-nav-submenu">
                            <a href="profile.html"
                               class="cs-nav-sub-link ${profileOverviewActive ? "active" : ""}">
                                <span class="cs-nav-icon">◎</span>
                                <span>Overview</span>
                            </a>

                            <a href="profile.html#progress"
                               class="cs-nav-sub-link ${profileProgressActive ? "active" : ""}">
                                <span class="cs-nav-icon">↗</span>
                                <span>Progress</span>
                            </a>

                            <a href="profile.html#contributions"
                               class="cs-nav-sub-link ${profileContributionsActive ? "active" : ""}">
                                <span class="cs-nav-icon">▦</span>
                                <span>Contributions</span>
                            </a>
                        </div>
                    </div>

                </nav>

                <div class="cs-sidebar-bottom">

                    <a href="#"
                       class="cs-nav-link cs-settings-link">
                        <span class="cs-nav-icon">⚙</span>
                        <span class="cs-nav-text">Settings</span>
                    </a>

                    <button type="button" class="cs-logout-button" id="logoutButton">
                        <span class="cs-nav-icon">⇥</span>
                        <span class="cs-nav-text">Logout</span>
                    </button>

                    <div class="cs-user-mini">
                        <span class="cs-user-avatar">${initial}</span>
                        <span class="cs-user-copy">
                            <strong id="sidebarUsername">${username}</strong>
                            <small>ONLINE</small>
                        </span>
                    </div>

                </div>
            </div>
        `;

        bindSidebarInteractions();
        bindLogout();
        bindSettings();
    }

    function bindSidebarInteractions() {
        document.querySelectorAll(".cs-nav-group-toggle").forEach(function (button) {
            button.addEventListener("click", function () {
                const group = button.closest(".cs-nav-group");
                const shouldOpen = !group.classList.contains("open");

                group.classList.toggle("open", shouldOpen);
                button.setAttribute("aria-expanded", String(shouldOpen));
            });
        });
    }

    function bindLogout() {
        const logoutButton = document.getElementById("logoutButton");
        if (!logoutButton) return;

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("userSession");
            window.location.href = "login.html";
        });
    }

    function bindSettings() {
        const settings = document.querySelector(".cs-settings-link");
        if (!settings) return;

        settings.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Settings will be available when the backend and user preferences are connected.");
        });
    }

    function init() {
        renderSidebar();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
