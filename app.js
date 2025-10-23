// Demo data
const shows = [
    {
        id: "s1",
        title: "The Flaming Squirrels + Guests",
        date: "Fri, May 2 — 8:00 PM",
        venue: "The Boiler Room",
        doors: "7:00 PM",
        flyer: "https://placehold.co/600x800/png?text=Flaming+Squirrels",
        desc: "All-ages indie night. $10 at the door.",
        tickets: "https://example.com/tickets/1"
    },
    {
        id: "s2",
        title: "Midnight Laundry (EP Release)",
        date: "Sat, May 3 — 9:30 PM",
        venue: "Warehouse 12",
        doors: "8:30 PM",
        flyer: "https://placehold.co/600x800/png?text=Midnight+Laundry",
        desc: "EP drop party with visuals and special guests.",
        tickets: "https://example.com/tickets/2"
    },
    {
        id: "s3",
        title: "Crust Punks Unite Fest",
        date: "Sun, May 4 — 6:00 PM",
        venue: "VFW Hall",
        doors: "5:30 PM",
        flyer: "https://placehold.co/600x800/png?text=CPU+Fest",
        desc: "Benefit show. Sliding scale $5–$15.",
        tickets: ""
    },
    {
        id: "s4",
        title: "Jazz in the Back Room",
        date: "Thu, May 8 — 7:30 PM",
        venue: "Cafe Andromeda",
        doors: "7:00 PM",
        flyer: "https://placehold.co/600x800/png?text=Back+Room+Jazz",
        desc: "Cozy trio set. Limited seating.",
        tickets: "https://example.com/tickets/4"
    },
];

const headlines = [
    "Paper Tigers enter the studio this weekend.",
    "DIY venue ‘The Dock’ adds upgraded lighting.",
    "Looking for drummer: math-rock friendly.",
    "Zine #12 out now at Cafe Andromeda.",
    "Vinyl swap meet Saturday behind the library."
];

// Utilities
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

// Render list
function renderList(data) {
    const list = $("#showList");
    list.innerHTML = "";
    data.forEach((s, i) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.className = "show-btn";
        btn.type = "button";
        btn.dataset.id = s.id;
        btn.innerHTML = `
        <strong>${s.title}</strong>
        <span class="meta">${s.date} — ${s.venue}</span>
      `;
        btn.addEventListener("click", () => selectShow(s.id));
        li.appendChild(btn);
        list.appendChild(li);
        if (i === 0) selectShow(s.id);
    });
}

// Select a show
function selectShow(id) {
    const s = shows.find(x => x.id === id);
    if (!s) return;

    $$(".show-btn").forEach(b => b.dataset.active = (b.dataset.id === id));

    $("#flyerImg").src = s.flyer;
    $("#flyerImg").alt = `${s.title} flyer`;
    $("#flyerName").textContent = s.title;
    $("#flyerInfo").textContent = `${s.date} • ${s.venue} • Doors ${s.doors}`;
    $("#flyerDesc").textContent = s.desc;

    const ticket = $("#ticketLink");
    if (s.tickets) {
        ticket.hidden = false;
        ticket.href = s.tickets;
    } else {
        ticket.hidden = true;
        ticket.removeAttribute("href");
    }
}

// Search
function initSearch() {
    const input = $("#search");
    input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        const filtered = shows.filter(s =>
            [s.title, s.venue, s.date].some(v => v.toLowerCase().includes(q))
        );
        renderList(filtered.length ? filtered : shows);
    });
}

// Ticker
function initTicker() {
    const track = $("#tickerTrack");
    const items = [...headlines, ...headlines];
    track.innerHTML = items.map(t => `<span class="dot">•</span> ${t}`).join("  ");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    renderList(shows);
    initSearch();
    initTicker();
});
