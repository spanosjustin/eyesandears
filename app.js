// Demo data — Shows
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

// Demo data — Headlines
const headlines = [
    "Paper Tigers enter the studio this weekend.",
    "DIY venue ‘The Dock’ adds upgraded lighting.",
    "Looking for drummer: math-rock friendly.",
    "Zine #12 out now at Cafe Andromeda.",
    "Vinyl swap meet Saturday behind the library."
];

// Demo data — Articles (Local Interviews)
const articles = [
    {
        id: "a1",
        title: "Q&A with Midnight Laundry on their EP & RVA roots",
        date: "Apr 28",
        tags: ["Interview", "Indie"],
        tagStyles: ["violet", "aqua"],
        excerpt: "We talked late-night writing sessions, the best cheap eats after practice, and the story behind track three.",
        image: "https://placehold.co/800x450/png?text=Midnight+Laundry+Interview",
        url: "#"
    },
    {
        id: "a2",
        title: "Scene Builders: The folks behind ‘The Dock’ DIY space",
        date: "Apr 26",
        tags: ["Feature", "DIY"],
        tagStyles: ["mint", "aqua"],
        excerpt: "From extension cords to community code, here’s how a warehouse became a cornerstone for all-ages shows.",
        image: "https://placehold.co/800x450/png?text=The+Dock+DIY",
        url: "#"
    },
    {
        id: "a3",
        title: "Five Records that Shaped Paper Tigers",
        date: "Apr 22",
        tags: ["List", "Influences"],
        tagStyles: ["violet", "mint"],
        excerpt: "The band walks us through the records they wore out in high school and the ones they still put on before a set.",
        image: "https://placehold.co/800x450/png?text=Paper+Tigers",
        url: "#"
    }
];

// Utilities
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

// Render list of shows
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

// Search (filters shows; can extend to articles if you want)
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

// Render Articles
function renderArticles(items) {
    const wrap = $("#articlesWrap");
    wrap.innerHTML = "";
    items.forEach(a => {
        const card = document.createElement("article");
        card.className = "post";
        card.setAttribute("role", "listitem");
        card.innerHTML = `
        <div class="post-thumb">
          <img src="${a.image}" alt="${a.title}">
        </div>
        <div class="post-body">
          <h3 class="post-title">${a.title}</h3>
          <p class="post-excerpt">${a.excerpt}</p>
          <div class="post-tags">
            ${a.tags.map((t, i) => `<span class="tag ${a.tagStyles?.[i] || ""}">${t}</span>`).join("")}
          </div>
        </div>
        <div class="post-foot">
          <span class="meta">${a.date}</span>
          <a class="btn" href="${a.url}" target="_blank" rel="noreferrer noopener" aria-label="Read ${a.title}">
            Read
          </a>
        </div>
      `;
        wrap.appendChild(card);
    });
}

/* Tiny zine magic: give cards/buttons slight random tilt */
function sprinkleTilt(selector, maxDeg = 1.6) {
    $$(selector).forEach((el, idx) => {
        const seed = (idx + 1) * 9301 % 233280; // deterministic-ish
        const r = (seed / 233280) * 2 - 1;  // -1..1
        el.style.setProperty('--tilt', `${(r * maxDeg).toFixed(2)}deg`);
    });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    renderList(shows);
    initSearch();
    initTicker();
    renderArticles(articles);

    // After DOM paints, add tilts
    //sprinkleTilt(".show-btn", 1.2);
    //sprinkleTilt(".post", 1.4);
});