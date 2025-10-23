/* Scene Portal — basic interactivity
   - Fills the list
   - Updates flyer/details when a show is clicked
   - Streams some delightfully 2000s news into the marquee
*/

// Demo data (swap with your backend later)
const shows = [
    {
        id: "s1",
        title: "The Flaming Squirrels + Guests",
        date: "Fri, May 2 — 8:00PM",
        venue: "The Boiler Room",
        doors: "7:00PM",
        flyer: "https://placehold.co/240x340?text=Flaming+Squirrels",
        desc: "All-ages indie night. $10 at the door. Bring earplugs."
    },
    {
        id: "s2",
        title: "Midnight Laundry (EP Release)",
        date: "Sat, May 3 — 9:30PM",
        venue: "Warehouse 12",
        doors: "8:30PM",
        flyer: "https://placehold.co/240x340?text=Midnight+Laundry",
        desc: "New EP drop party w/ neon lights & projections."
    },
    {
        id: "s3",
        title: "Crust Punks Unite Fest",
        date: "Sun, May 4 — 6:00PM",
        venue: "VFW Hall",
        doors: "5:30PM",
        flyer: "https://placehold.co/240x340?text=CPU+Fest",
        desc: "Benefit show. Sliding scale $5–$15. Zine table on site."
    },
    {
        id: "s4",
        title: "Jazz in the Back Room",
        date: "Thu, May 8 — 7:30PM",
        venue: "Cafe Andromeda",
        doors: "7:00PM",
        flyer: "https://placehold.co/240x340?text=Back+Room+Jazz",
        desc: "Trio set. Candlelight. Limited seating, RSVP advised."
    },
];

const headlines = [
    "Local heroes ‘Paper Tigers’ enter studio with 4-track.",
    "DIY venue ‘The Dock’ adds second PA speaker (!!).",
    "Looking for drummer: must love math rock & odd meters.",
    "Zine #12 out now — free at counter of Cafe Andromeda.",
    "Vinyl swap meet this weekend behind the library.",
];

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function renderList() {
    const list = $("#show-list");
    list.innerHTML = "";
    shows.forEach((show, idx) => {
        const li = document.createElement("li");
        li.dataset.id = show.id;
        li.innerHTML = `
        <a href="#" class="reset">
          <div class="title">${show.title}</div>
          <div class="mono small">${show.date} — ${show.venue}</div>
        </a>
      `;
        li.addEventListener("click", (e) => {
            e.preventDefault();
            selectShow(show.id);
        });
        list.appendChild(li);

        // Auto-select first item on load
        if (idx === 0) selectShow(show.id);
    });
}

function selectShow(id) {
    const show = shows.find(s => s.id === id);
    if (!show) return;

    // Active item styling
    $$("#show-list li").forEach(li => li.classList.toggle("active", li.dataset.id === id));

    // Update flyer & text
    $("#flyer-img").src = show.flyer;
    $("#flyer-img").alt = `${show.title} flyer`;
    $("#flyer-title").textContent = show.title;
    $("#flyer-info").textContent = `${show.date} — ${show.venue} — Doors ${show.doors}`;
    $("#flyer-desc").textContent = show.desc;
}

function renderNews() {
    const mq = $("#news-marquee");
    mq.textContent = headlines.map(h => `• ${h} `).join(" ");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    renderList();
    renderNews();
});
