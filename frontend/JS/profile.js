/**
 * profile.js  –  Gesture Profile Page
 *
 * Currently: always shows the "No Account" state.
 * Later: replace `isLoggedIn` check with a real backend session/token check.
 */

// ── Auth check (replace with real check later) ──────────────────────────────
// e.g. const isLoggedIn = !!localStorage.getItem("gesture_token");
const isLoggedIn = false;   // ← flip to true once backend is ready

// ── On load ─────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    if (isLoggedIn) {
        // Hide no-account screen, show real profile
        document.getElementById("no-account-screen").classList.add("hidden");
        document.getElementById("profile-logged-in").classList.remove("hidden");

        // TODO: fetch real user data from backend and call renderProfile(user)
    }
    // else: "No Account" screen is shown by default (nothing to do)
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
