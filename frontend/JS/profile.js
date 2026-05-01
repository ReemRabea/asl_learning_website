/**
 * profile.js  –  Gesture Profile Page
 *
 * Currently: always shows the "No Account" state.
 * Later: replace `isLoggedIn` check with a real backend session/token check.
 */

// ── Auth check and On load ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let user = null;

    if (token && userStr) {
        try {
            user = JSON.parse(userStr);
        } catch(e) {
            console.error(e);
        }
    }

    if (user && token) {
        // Hide no-account screen, show real profile
        document.getElementById("no-account-screen").classList.add("hidden");
        document.getElementById("profile-logged-in").classList.remove("hidden");

        const userProfile = {
            fullName: user.fullName || "User",
            email: user.email || "",
            joinedDate: new Date().toISOString(), // Fallback
            points: 0,
            streak: 0,
            levels: [
                { id: 1, total: 26, completed: 0 },
                { id: 2, total: 10, completed: 0 },
                { id: 3, total: 20, completed: 0 },
                { id: 4, total: 15, completed: 0 }
            ]
        };

        // Fetch real progress from backend
        try {
            const API_URL = 'http://localhost:5000/api';
            const res = await fetch(`${API_URL}/progress`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.ok) {
                const progressData = await res.json();
                userProfile.points = progressData.total_points || 0;
                userProfile.streak = progressData.current_streak || 0;
                
                if (progressData.level1_completed) userProfile.levels[0].completed = 26;
                if (progressData.level2_completed) userProfile.levels[1].completed = 10;
                if (progressData.level3_completed) userProfile.levels[2].completed = 20;
                if (progressData.level4_completed) userProfile.levels[3].completed = 15;
            } else if (res.status === 401 || res.status === 403) {
                // Token invalid
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
                return;
            }
        } catch (e) {
            console.error('Error fetching progress', e);
        }

        renderProfile(userProfile);
        updateNavbarAvatar(user.fullName);

        // ---- Logout Logic ----
        document.getElementById("btn-logout")?.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    } else {
        // If not logged in and on the profile page, we might want to stay on "No Account" 
        // OR redirect if they tried to reach a sub-section. 
        // For now, we allow them to see the "No Account" screen.
    }
});

// ── Render helpers (ready for when backend is connected) ────────────────────
function renderProfile(user) {
    const initials = getInitials(user.fullName);

    document.getElementById("profile-avatar-large").textContent = initials;
    document.getElementById("profile-name").textContent         = user.fullName;
    document.getElementById("profile-email").textContent        = user.email;

    const totalSigns      = user.levels.reduce((s, l) => s + l.completed, 0);
    const levelsCompleted = user.levels.filter(l => l.completed >= l.total).length;

    document.getElementById("stat-points-value").textContent = user.points.toLocaleString();
    document.getElementById("stat-levels-value").textContent = `${levelsCompleted} / ${user.levels.length}`;
    document.getElementById("stat-streak-value").textContent = user.streak;
    document.getElementById("stat-signs-value").textContent  = totalSigns;

    user.levels.forEach(level => {
        const pct    = level.total > 0 ? Math.round((level.completed / level.total) * 100) : 0;
        const status = getLevelStatus(level.completed, level.total);

        const fillEl   = document.getElementById(`lp-fill-${level.id}`);
        const pctEl    = document.getElementById(`lp-pct-${level.id}`);
        const statusEl = document.getElementById(`lp-status-${level.id}`);

        if (fillEl)   setTimeout(() => { fillEl.style.width = pct + "%"; }, 200);
        if (pctEl)    pctEl.textContent = `${level.completed} / ${level.total}`;
        if (statusEl) {
            statusEl.textContent = status.text;
            statusEl.className   = `lp-status ${status.cls}`;
        }
    });

    document.getElementById("account-name").textContent   = user.fullName;
    document.getElementById("account-email").textContent  = user.email;
    document.getElementById("account-joined").textContent = formatDate(user.joinedDate);
}

function getInitials(name) {
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getLevelStatus(completed, total) {
    if (completed === 0)    return { text: "Not Started",  cls: "lp-status--not-started" };
    if (completed >= total) return { text: "Completed ✓",  cls: "lp-status--completed"   };
    return                         { text: "In Progress",  cls: "lp-status--in-progress" };
}

/**
 * Update the navbar avatar with user initials
 */
function updateNavbarAvatar(fullName) {
    const avatarEl = document.querySelector(".avatar");
    if (avatarEl && fullName) {
        const initials = fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
        avatarEl.textContent = initials;
        avatarEl.title = `Profile: ${fullName}`;
        
        // Also ensure the link points to profile.html if it was pointing to login.html
        const avatarLink = avatarEl.closest('a');
        if (avatarLink && avatarLink.getAttribute('href') === 'login.html') {
            avatarLink.setAttribute('href', 'profile.html');
        }
    }
}
