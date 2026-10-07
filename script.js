/* ================= AUTH ================= */

function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("loginError");

    if (!email || !password) {
        error.textContent = "Please enter your email and password.";
        return;
    }

    if (!email.includes("@")) {
        error.textContent = "Please enter a valid email address.";
        return;
    }

    error.textContent = "";

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}


function logout() {

    document.getElementById("app").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");

}


function showRegister() {

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("registerPage").classList.remove("hidden");

}


function showLogin() {

    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");

}


function register() {

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (!name || !email || !password) {

        showToast("Please complete all required fields.");
        return;

    }

    showToast("Account created successfully!");

    setTimeout(() => {

        showLogin();

        document.getElementById("email").value = email;

    }, 1000);

}


function togglePassword() {

    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }

}


/* ================= NAVIGATION ================= */

function showSection(sectionId, element = null) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active-section");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active-section");
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= MODAL ================= */

function openModal() {

    document.getElementById("modal").classList.remove("hidden");

}


function closeModal() {

    document.getElementById("modal").classList.add("hidden");

}


function createTask() {

    const taskName = document.getElementById("newTask").value;

    if (!taskName) {

        showToast("Please enter a task name.");
        return;

    }

    closeModal();

    document.getElementById("newTask").value = "";

    showToast("✓ Task created successfully");

}


/* ================= AI RECOMMENDATIONS ================= */

function applyRecommendation(button) {

    button.textContent = "✓ Applied";
    button.style.background = "#e5f8ef";
    button.style.color = "#087a4b";

    showToast("AI recommendation applied successfully");

}


function optimizeTeam() {

    showToast("✓ Team workload optimized by AI");

}


function generateReport() {

    showToast("✦ AI report generated successfully");

}


/* ================= NOTIFICATIONS ================= */

function showNotification() {

    showToast("🔔 You have 3 new project notifications");

}


/* ================= AI ASSISTANT ================= */

function askAI(question) {

    showSection("ai");

    const input = document.getElementById("aiInput");

    input.value = question;

    sendAI();

}


function handleEnter(event) {

    if (event.key === "Enter") {
        sendAI();
    }

}


function sendAI() {

    const input = document.getElementById("aiInput");
    const messages = document.getElementById("chatMessages");

    const question = input.value.trim();

    if (!question) {
        return;
    }


    /* USER MESSAGE */

    const userMessage = document.createElement("div");

    userMessage.className = "message";
    userMessage.style.marginLeft = "auto";
    userMessage.style.marginBottom = "20px";

    userMessage.innerHTML = `
        <div style="
            background:#eeeeff;
            padding:12px 15px;
            border-radius:12px;
            max-width:600px;
            font-size:11px;
        ">
            ${escapeHTML(question)}
        </div>
    `;

    messages.appendChild(userMessage);

    input.value = "";


    /* AI RESPONSE */

    setTimeout(() => {

        const response = getAIResponse(question);

        const aiMessage = document.createElement("div");

        aiMessage.className = "message";
        aiMessage.style.marginBottom = "20px";

        aiMessage.innerHTML = `
            <div class="message-avatar">✦</div>

            <div style="max-width:750px">

                <p>${response.text}</p>

                ${response.stats || ""}

            </div>
        `;

        messages.appendChild(aiMessage);

        messages.scrollTop = messages.scrollHeight;

    }, 700);

}


function getAIResponse(question) {

    const q = question.toLowerCase();


    if (
        q.includes("finish") ||
        q.includes("deadline") ||
        q.includes("on time")
    ) {

        return {

            text:
            "Based on the current project velocity, unresolved dependencies and team workload, there is a <b>78% probability of a 4-day delay</b>. The biggest contributor is the Authentication API, which currently blocks 3 dependent tasks.",

            stats: `
                <div class="ai-stat-row">
                    <span>🔴 Delay Risk: 78%</span>
                    <span>📅 Predicted Delay: 4 days</span>
                    <span>⛓ Blocked Tasks: 3</span>
                </div>
            `

        };

    }


    if (
        q.includes("overload") ||
        q.includes("workload")
    ) {

        return {

            text:
            "<b>Priya is currently overloaded at 96% capacity.</b> Rahul has approximately 58% available capacity. I recommend moving two testing tasks from Priya to Rahul.",

            stats: `
                <div class="ai-stat-row">
                    <span>🔴 Priya: 96%</span>
                    <span>🟢 Rahul: 42%</span>
                    <span>✦ Recommended: Rebalance</span>
                </div>
            `

        };

    }


    if (
        q.includes("next") ||
        q.includes("priority") ||
        q.includes("urgent")
    ) {

        return {

            text:
            "The highest-priority task is <b>Authentication API</b>. It is due tomorrow and blocks three other tasks. Completing it first will significantly reduce the project's schedule risk.",

            stats: `
                <div class="ai-stat-row">
                    <span>🔥 Priority: Critical</span>
                    <span>⏱ Due: Tomorrow</span>
                    <span>⛓ Blocks: 3 tasks</span>
                </div>
            `

        };

    }


    if (
        q.includes("risk") ||
        q.includes("problem")
    ) {

        return {

            text:
            "I detected three major risks: <b>Backend API delay</b>, <b>QA workload concentration</b>, and <b>incomplete documentation</b>. The API delay has the highest potential impact.",

            stats: `
                <div class="ai-stat-row">
                    <span>🔴 API Delay</span>
                    <span>🟠 QA Workload</span>
                    <span>🟡 Documentation</span>
                </div>
            `

        };

    }


    return {

        text:
        "I've analyzed your project. The most important action right now is to prioritize the Authentication API because it is blocking multiple dependent tasks. Would you like me to generate a recovery plan?",

        stats: `
            <div class="ai-stat-row">
                <span>✦ AI Analysis Ready</span>
                <span>📊 Project Health: 72%</span>
            </div>
        `

    };

}


/* ================= SECURITY ================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
