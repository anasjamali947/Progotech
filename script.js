
/* =========================
   PROGOTECH SOCIETY JAVASCRIPT
   ========================= */

// 1. DARK AND LIGHT THEME

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
}

let savedTheme = "dark";

try {
    savedTheme = localStorage.getItem("progotech-theme") || "dark";
} catch (error) {
    console.warn("Theme preference could not be loaded.");
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const nextTheme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
        localStorage.setItem("progotech-theme", nextTheme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }
});


// 2. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// 3. PROJECT SHOWCASE
// These are SAMPLE projects and SAMPLE ratings.
// Replace them with real, verified project data.

const projects = [
    {
        title: "Student Portfolio",
        description: "A responsive portfolio website for students to showcase their skills.",
        technology: "HTML · CSS · JavaScript",
        rating: 4.9,
        icon: "</>",
        creator: "Sample Student",
        link: ""
    },
    {
        title: "Python Study Assistant",
        description: "A learning helper for programming notes and practice questions.",
        technology: "Python",
        rating: 4.7,
        icon: "Py",
        creator: "Sample Student",
        link: ""
    },
    {
        title: "AI Learning Dashboard",
        description: "A concept dashboard for exploring machine learning resources.",
        technology: "AI / ML",
        rating: 4.8,
        icon: "✳",
        creator: "Sample Student",
        link: ""
    },
    {
        title: "Community Task Board",
        description: "A sample interface for tracking tasks and student collaboration.",
        technology: "JavaScript",
        rating: 4.5,
        icon: "⌘",
        creator: "Sample Student",
        link: ""
    }
];

const projectGrid = document.getElementById("projectGrid");

const topProjects = [...projects]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

topProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const visual = document.createElement("div");
    visual.className = "project-visual";
    visual.textContent = project.icon;
    visual.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "project-content";

    const tag = document.createElement("span");
    tag.className = "project-tag";
    tag.textContent = `FEATURED #${index + 1}`;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const creator = document.createElement("p");
    creator.textContent = `By ${project.creator}`;

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const tech = document.createElement("span");
    tech.className = "project-tag";
    tech.textContent = project.technology;

    const rating = document.createElement("span");
    rating.className = "rating";
    rating.textContent = `★ ${project.rating.toFixed(1)}`;

    meta.append(tech, rating);
    content.append(tag, title, description, creator, meta);
    card.append(visual, content);
    projectGrid.appendChild(card);
});


// 4. MEMBERSHIP REQUEST DIALOG

const joinDialog = document.getElementById("joinDialog");
const joinForm = document.getElementById("joinForm");
const closeDialog = document.getElementById("closeDialog");
const formMessage = document.getElementById("formMessage");
const departmentInput = document.getElementById("department");

document.querySelectorAll("[data-open-join]").forEach((button) => {
    button.addEventListener("click", () => {
        formMessage.textContent = "";
        formMessage.className = "form-message";

        if (typeof joinDialog.showModal === "function") {
            joinDialog.showModal();
        } else {
            alert("Please open this page in a modern browser.");
        }
    });
});

// Clicking a track preselects that department.

document.querySelectorAll("[data-track]").forEach((track) => {
    track.addEventListener("click", () => {
        const selectedTrack = track.dataset.track;

        for (const option of departmentInput.options) {
            if (option.value === selectedTrack || option.text === selectedTrack) {
                departmentInput.value = option.value;
                break;
            }
        }
    });
});

closeDialog.addEventListener("click", () => {
    joinDialog.close();
});

// Close the dialog if the user clicks outside the form.

joinDialog.addEventListener("click", (event) => {
    if (event.target === joinDialog) {
        joinDialog.close();
    }
});

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = departmentInput.value;

    if (!fullName || !email || !department) {
        showFormMessage("Please complete every field.", "error");
        return;
    }

    // This saves only a local demo request in this browser.
    // It does NOT send an application to an administrator.

    let requests = [];

    try {
        requests = JSON.parse(
            localStorage.getItem("progotech-demo-requests") || "[]"
        );

        if (!Array.isArray(requests)) {
            requests = [];
        }

        requests.push({
            name: fullName,
            email: email,
            department: department,
            status: "Pending (demo only)",
            submittedAt: new Date().toISOString()
        });

        localStorage.setItem(
            "progotech-demo-requests",
            JSON.stringify(requests)
        );

        showFormMessage(
            "Demo request saved in this browser only. It has not been sent to an administrator.",
            "success"
        );

        joinForm.reset();
    } catch (error) {
        showFormMessage(
            "Browser storage is unavailable. No request was saved.",
            "error"
        );
    }
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}


// 5. CURRENT YEAR IN FOOTER

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// 6. CUSTOM JAVASCRIPT CODE BACKGROUND
// Small moving code-like particles, not a generic AI image.

const canvas = document.getElementById("codeCanvas");
const context = canvas.getContext("2d");

const symbols = ["{ }", "</>", "01", "=>", "&&", "JS", "[]", "()", "++"];
let particles = [];
let animationFrame = null;
let canvasWidth = 0;
let canvasHeight = 0;
let lastFrame = 0;

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = rect.width;
    canvasHeight = rect.height;

    canvas.width = Math.round(canvasWidth * pixelRatio);
    canvas.height = Math.round(canvasHeight * pixelRatio);

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.min(45, Math.floor(canvasWidth / 20));

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        speed: 0.15 + Math.random() * 0.35,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: 10 + Math.random() * 7
    }));
}

function drawBackground(time = 0) {
    // Limit animation frequency for better performance.
    if (time - lastFrame < 30) {
        animationFrame = requestAnimationFrame(drawBackground);
        return;
    }

    lastFrame = time;
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const isLight =
        document.documentElement.dataset.theme === "light";

    context.fillStyle = isLight
        ? "rgba(8, 123, 87, 0.17)"
        : "rgba(105, 228, 180, 0.2)";

    context.font = "12px monospace";

    particles.forEach((particle) => {
        context.fillText(particle.symbol, particle.x, particle.y);

        particle.y -= particle.speed;

        if (particle.y < -20) {
            particle.y = canvasHeight + 20;
            particle.x = Math.random() * canvasWidth;
        }
    });

    animationFrame = requestAnimationFrame(drawBackground);
}

resizeCanvas();
animationFrame = requestAnimationFrame(drawBackground);

window.addEventListener("resize", resizeCanvas);

// Respect the user's reduced-motion preference.

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cancelAnimationFrame(animationFrame);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}
