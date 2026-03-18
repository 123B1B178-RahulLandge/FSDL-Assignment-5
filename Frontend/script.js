const form = document.getElementById("bookingForm");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function scrollToBooking(packageName = "") {
    const bookingSection = document.getElementById("booking");
    if (!bookingSection) return;

    if (packageName) {
        const packageSelect = document.getElementById("package");
        if (packageSelect) packageSelect.value = packageName;
    }

    bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function smoothScrollToId(id) {
    const target = document.querySelector(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeMobileMenu() {
    if (navLinks && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
    }
}

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navLinks?.classList.toggle("open");
    });
}

// Smooth scroll for in-page links
const pageLinks = document.querySelectorAll("a[href^='#']");
pageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = link.getAttribute("href");
        if (!href) return;

        smoothScrollToId(href);
        closeMobileMenu();
    });
});

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            departureCity: document.getElementById("departure").value.trim(),
            destination: document.getElementById("destination").value.trim(),
            travelDate: document.getElementById("date").value,
            travelers: document.getElementById("travelers").value,
            packageType: document.getElementById("package").value,
            notes: document.getElementById("notes").value.trim(),
        };

        try {
            const res = await fetch("http://localhost:5000/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            alert(result.message || "Booking submitted successfully!");
            form.reset();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again later.");
        }
    });
}

