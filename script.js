// ===============================
// EVENT DATA
// ===============================

let events = [

    {
        title: "AI & Machine Learning Summit",
        category: "Technology",
        date: "20 September 2026",
        time: "10:00 AM",
        venue: "Delhi Convention Center",
        price: 499,
        icon: "🤖"
    },

    {
        title: "Startup & Business Meetup",
        category: "Business",
        date: "25 September 2026",
        time: "11:00 AM",
        venue: "Business Hub, Delhi",
        price: 299,
        icon: "💼"
    },

    {
        title: "Music Night 2026",
        category: "Music",
        date: "28 September 2026",
        time: "7:00 PM",
        venue: "City Auditorium",
        price: 799,
        icon: "🎵"
    },

    {
        title: "Future Education Conference",
        category: "Education",
        date: "2 October 2026",
        time: "9:30 AM",
        venue: "University Hall",
        price: 199,
        icon: "🎓"
    },

    {
        title: "Web Development Workshop",
        category: "Technology",
        date: "8 October 2026",
        time: "10:00 AM",
        venue: "Tech Campus",
        price: 399,
        icon: "💻"
    },

    {
        title: "Entrepreneurship Summit",
        category: "Business",
        date: "15 October 2026",
        time: "12:00 PM",
        venue: "Grand Hotel",
        price: 599,
        icon: "🚀"
    }

];


// ===============================
// DISPLAY EVENTS
// ===============================

function displayEvents(list) {

    const container = document.getElementById("eventContainer");

    container.innerHTML = "";

    list.forEach((event, index) => {

        container.innerHTML += `

        <div class="event-card">

            <div class="event-image">
                ${event.icon}
            </div>

            <div class="event-info">

                <span class="category">
                    ${event.category.toUpperCase()}
                </span>

                <h3>${event.title}</h3>

                <p>
                    Join this amazing event and connect
                    with professionals and communities.
                </p>

                <div class="event-meta">

                    <span>📅 ${event.date}</span>

                    <strong>₹${event.price}</strong>

                </div>

                <div class="event-meta">

                    <span>📍 ${event.venue}</span>

                    <span>⏰ ${event.time}</span>

                </div>

                <button class="ticket-btn"
                        onclick="buyTicket(${index})">

                    Buy / Register

                </button>

            </div>

        </div>

        `;
    });
}

displayEvents(events);


// ===============================
// EVENT FILTER
// ===============================

function filterEvents(category, button) {

    document.querySelectorAll(".filter")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    if (category === "all") {

        displayEvents(events);

    } else {

        const filtered = events.filter(
            event => event.category === category
        );

        displayEvents(filtered);
    }
}


// ===============================
// LOGIN
// ===============================


    function openLogin() {

    document.getElementById("modalContent").innerHTML = `

        <h2>Welcome Back 👋</h2>

        <div class="form-group">
            <label>Email</label>

            <input type="email"
                   id="loginEmail"
                   placeholder="Enter your email">
        </div>

        <div class="form-group">
            <label>Password</label>

            <input type="password"
                   id="loginPassword"
                   placeholder="Enter password">
        </div>

        <button class="btn btn-primary full"
                onclick="login()">

            Login

        </button>
    `;

    showModal();
}




   async function login() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        showToast("Please enter email and password.");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        console.log("Server response:", data);

        if (!response.ok) {
            showToast(data.error);
            return;
        }

        localStorage.setItem(
            "eventifyUser",
            JSON.stringify(data.user)
        );

        closeModal();

        showToast("Welcome " + data.user.name + "! 🎉");

        document.getElementById("dashboard")
            .scrollIntoView({
                behavior: "smooth"
            });

    } catch (error) {

        console.error("Login error:", error);

        showToast("Server connection failed.");
    }
}


// ===============================
// REGISTER
// ===============================

function openRegister() {

    document.getElementById("modalContent").innerHTML = `

        <h2>Create Account</h2>

        <div class="form-group">
            <label>Full Name</label>
            <input type="text"
                   id="regName"
                   placeholder="Your name">
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email"
                   id="regEmail"
                   placeholder="Your email">
        </div>

        <div class="form-group">

            <label>Select Role</label>

            <select id="regRole">

                <option value="attendee">
                    Attendee
                </option>

                <option value="organizer">
                    Event Organizer
                </option>

            </select>

        </div>

        <div class="form-group">

            <label>Password</label>

            <input type="password" 
       id="regPassword"
       placeholder="Create password">

        </div>

        <button class="btn btn-primary full"
                onclick="registerUser()">

            Create Account

        </button>

    `;

    showModal();
}




async function registerUser() {

    const name =
        document.getElementById("regName").value;

    const email =
        document.getElementById("regEmail").value;

    const password =
        document.getElementById("regPassword").value;

    const role =
        document.getElementById("regRole").value;


    if (name === "" || email === "" || password === "") {

        showToast("Please fill all required fields.");

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:3000/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            showToast(data.error);

            return;
        }


        closeModal();

        showToast(
            "Account created successfully! 🎉"
        );


    } catch (error) {

        console.log(error);

        showToast(
            "Server connection failed."
        );
    }
}



// ===============================
// BUY TICKET
// ===============================

function buyTicket(index) {

    const event = events[index];

    document.getElementById("modalContent").innerHTML = `

        <h2>🎟️ ${event.title}</h2>

        <p style="color:#777;margin-bottom:20px;">
            ${event.date} • ${event.time}
        </p>

        <div class="form-group">

            <label>Ticket Type</label>

            <select id="ticketType">

                <option>Regular - ₹${event.price}</option>

                <option>VIP - ₹${event.price + 500}</option>

            </select>

        </div>

        <div class="form-group">

            <label>Attendee Name</label>

            <input type="text"
                   id="attendeeName"
                   placeholder="Your name">

        </div>

        <button class="btn btn-primary full"
                onclick="purchaseTicket()">

            Pay & Get Ticket

        </button>
    `;

    showModal();
}


function purchaseTicket() {

    const name =
        document.getElementById("attendeeName").value;

    if (name === "") {

        showToast("Enter attendee name.");

        return;
    }

    closeModal();

    showToast(
        "Ticket purchased successfully! 🎟️"
    );
}


// ===============================
// CREATE EVENT
// ===============================

function openCreateEvent() {

    document.getElementById("modalContent").innerHTML = `

        <h2>Create New Event</h2>

        <div class="form-group">
            <label>Event Title</label>

            <input type="text"
                   id="eventTitle"
                   placeholder="Enter event title">
        </div>

        <div class="form-group">
            <label>Description</label>

            <textarea id="eventDescription"
                      rows="3"
                      placeholder="Event description"></textarea>
        </div>

        <div class="form-group">
            <label>Date</label>

            <input type="date"
                   id="eventDate">
        </div>

        <div class="form-group">
            <label>Time</label>

            <input type="time"
                   id="eventTime">
        </div>

        <div class="form-group">
            <label>Venue</label>

            <input type="text"
                   id="eventVenue"
                   placeholder="Event venue">
        </div>

        <div class="form-group">

            <label>Ticket Price</label>

            <input type="number"
                   id="eventPrice"
                   placeholder="₹">

        </div>

        <button class="btn btn-primary full"
                onclick="createEvent()">

            Submit Event

        </button>
    `;

    showModal();
}


function createEvent() {

    const title =
        document.getElementById("eventTitle").value;

    const venue =
        document.getElementById("eventVenue").value;

    if (title === "" || venue === "") {

        showToast("Please fill event details.");

        return;
    }

    closeModal();

    showToast(
        "Event submitted for admin approval! ⏳"
    );
}


// ===============================
// MESSAGE ATTENDEES
// ===============================

function openMessage() {

    document.getElementById("modalContent").innerHTML = `

        <h2>💬 Message Attendees</h2>

        <div class="form-group">

            <label>Select Event</label>

            <select>

                <option>AI Workshop</option>
                <option>Startup Meetup</option>

            </select>

        </div>

        <div class="form-group">

            <label>Message</label>

            <textarea rows="5"
                      placeholder="Write your announcement..."></textarea>

        </div>

        <button class="btn btn-primary full"
                onclick="sendMessage()">

            Send Message

        </button>
    `;

    showModal();
}


function sendMessage() {

    closeModal();

    showToast(
        "Message sent to attendees! 📢"
    );
}


// ===============================
// ADMIN APPROVAL
// ===============================

function approveEvent(button) {

    const item = button.closest(".approval-item");

    item.style.opacity = "0.5";

    button.disabled = true;

    showToast(
        "Event approved successfully! ✅"
    );
}


function rejectEvent(button) {

    const item = button.closest(".approval-item");

    item.remove();

    showToast(
        "Event rejected."
    );
}


// ===============================
// SETTINGS
// ===============================

function openSettings() {

    document.getElementById("modalContent").innerHTML = `

        <h2>⚙ System Settings</h2>

        <div class="form-group">
            <label>Website Name</label>
            <input value="Eventify">
        </div>

        <div class="form-group">
            <label>Currency</label>

            <select>
                <option>INR ₹</option>
                <option>USD $</option>
            </select>
        </div>

        <div class="form-group">
            <label>Event Approval</label>

            <select>
                <option>Admin Approval Required</option>
                <option>Auto Approval</option>
            </select>
        </div>

        <button class="btn btn-primary full"
                onclick="saveSettings()">

            Save Settings

        </button>
    `;

    showModal();
}


function saveSettings() {

    closeModal();

    showToast(
        "System settings saved successfully! ⚙️"
    );
}


// ===============================
// DASHBOARD ROLE SWITCH
// ===============================

function showDashboard(role, button) {

    document.querySelectorAll(".side-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    button.classList.add("active");

    document.getElementById("adminDashboard")
        .classList.add("hidden");

    document.getElementById("organizerDashboard")
        .classList.add("hidden");

    document.getElementById("attendeeDashboard")
        .classList.add("hidden");

    if (role === "admin") {

        document.getElementById("adminDashboard")
            .classList.remove("hidden");

        document.getElementById("roleText")
            .innerText = "Administrator";
    }

    if (role === "organizer") {

        document.getElementById("organizerDashboard")
            .classList.remove("hidden");

        document.getElementById("roleText")
            .innerText = "Event Organizer";
    }

    if (role === "attendee") {

        document.getElementById("attendeeDashboard")
            .classList.remove("hidden");

        document.getElementById("roleText")
            .innerText = "Attendee";
    }
}


// ===============================
// MODAL
// ===============================

function showModal() {

    document.getElementById("modal")
        .classList.add("show");
}


function closeModal() {

    document.getElementById("modal")
        .classList.remove("show");
}


// ===============================
// TOAST
// ===============================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);
}


// ===============================
// SCROLL
// ===============================

function scrollToEvents() {

    document.getElementById("events")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// Close modal by clicking outside

document.getElementById("modal")
    .addEventListener("click", function(e) {

        if (e.target === this) {
            closeModal();
        }

    });