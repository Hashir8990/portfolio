
(() => {
    const EMAIL = "hashirshah.8990@gmail.com";
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);


    function updateClock() {
        try {
            const fmt = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Karachi",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            $("#pktClock").textContent = "PKT " + fmt.format(new Date());
        } catch {
            $("#pktClock").textContent = "PKT";
        }
    }
    updateClock();
    setInterval(updateClock, 30000);


    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
            $$(".glass-spotlight").forEach((el) => {
                const r = el.getBoundingClientRect();
                el.style.setProperty("--mx", (e.clientX - r.left) + "px");
                el.style.setProperty("--my", (e.clientY - r.top) + "px");
            });
        }, { passive: true });
    }


    function notify(msg) {
        const t = $("#toast");
        t.textContent = msg;
        t.classList.add("show");
        clearTimeout(notify._t);
        notify._t = setTimeout(() => t.classList.remove("show"), 2400);
    }

    $("#copyMailBtn").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            notify("Copied " + EMAIL);
        } catch {
            notify(EMAIL);
        }
    });


    const WORKS = [
        {
            id: "zalleve",
            cat: "commerce",
            title: "Zalleve",
            year: "Live • 2025",
            summary: "Tech & audio e-commerce storefront serving customers across Pakistan with COD and fast dispatch.",
            details: "Built and optimized for fast mobile browsing and frictionless checkout across audio gear, earbuds, and smartwatches.",
            points: [
                "Structured product catalog, category filters, and order tracking flow",
                "Server-side handling with PHP & MySQL for inventory and checkout",
                "Cloudflare caching and asset optimization for snappy mobile load times"
            ],
            stack: ["PHP", "MySQL", "JavaScript", "Cloudflare"],
            live: "https://zalleve.com",
            repo: "",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>zalleve.com</span>
            </div>
            <div class="wf-store-grid">
              <div class="wf-box"><div class="wf-line"></div><div class="wf-line short"></div></div>
              <div class="wf-box"><div class="wf-line"></div><div class="wf-line short"></div></div>
              <div class="wf-box"><div class="wf-line"></div><div class="wf-line short"></div></div>
            </div>
          `
        },
        {
            id: "olivetta",
            cat: "web",
            title: "Olivetta",
            year: "GitHub",
            summary: "Clean, responsive web build focused on modular frontend layout and light asset weight.",
            details: "Personal repository project built to refine layout structure, responsive breakpoints, and clean frontend code.",
            points: [
                "Semantic HTML and modular stylesheet architecture",
                "Responsive layout tuned across mobile and desktop viewports",
                "Version-controlled and maintained on GitHub"
            ],
            stack: ["HTML5", "CSS3", "JavaScript"],
            live: "",
            repo: "https://github.com/Hashir8990/olivetta",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>github / olivetta</span>
            </div>
            <div class="wf-editorial">
              <div class="wf-box" style="justify-content: center;">
                <div class="wf-line" style="width: 80%; height: 8px;"></div>
                <div class="wf-line short"></div>
              </div>
              <div class="wf-box">
                <div class="wf-line"></div>
                <div class="wf-line short"></div>
              </div>
            </div>
          `
        },
        {
            id: "client-systems",
            cat: "web",
            title: "Client Portals & Sites",
            year: "2024 — 2026",
            summary: "12+ commercial websites, booking flows, and admin dashboards delivered under NDA.",
            details: "Production systems built during my full-time web development role — covering frontend interfaces, backend databases, and deployment.",
            points: [
                "Custom admin panels & role-based CRUD workflows in PHP and MySQL",
                "Interactive frontend views implemented in React.js and Angular",
                "DNS, SSL, and WAF setup via Cloudflare for production reliability"
            ],
            stack: ["React", "Angular", "PHP", "MySQL"],
            live: "",
            repo: "",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>internal-portal</span>
            </div>
            <div class="wf-dash">
              <div class="wf-box" style="justify-content: flex-start; gap: 7px;">
                <div class="wf-line"></div>
                <div class="wf-line short"></div>
                <div class="wf-line"></div>
              </div>
              <div class="wf-box">
                <div class="wf-line" style="height: 28px; opacity: 0.35;"></div>
                <div class="wf-line short"></div>
              </div>
            </div>
          `
        },
        {
            id: "pipeline",
            cat: "next",
            title: "Next Web & Mobile Builds",
            year: "Upcoming",
            summary: "Two new full-stack web projects and a cross-platform mobile app currently in the pipeline.",
            details: "Expanding my public case studies right after launching this portfolio — focused on modern React/Next.js web apps and a React Native mobile application.",
            points: [
                "SaaS / productivity web app with clean API architecture",
                "Dedicated business web build with full live demo",
                "Cross-platform iOS & Android app built with React Native"
            ],
            stack: ["Next.js", "React Native", "Tailwind"],
            live: "",
            repo: "https://github.com/Hashir8990",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>in-progress</span>
            </div>
            <div class="wf-phone-wrap">
              <div class="wf-phone">
                <div class="wf-line short" style="margin: 0 auto 6px;"></div>
                <div class="wf-line" style="height: 44px; opacity: 0.4;"></div>
                <div class="wf-line"></div>
                <div class="wf-line short"></div>
              </div>
              <div class="wf-phone" style="height: 125px; opacity: 0.65;">
                <div class="wf-line"></div>
                <div class="wf-line" style="height: 32px; opacity: 0.3;"></div>
                <div class="wf-line short"></div>
              </div>
            </div>
          `
        }
    ];

    function renderWorks(cat = "all") {
        const list = cat === "all" ? WORKS : WORKS.filter((w) => w.cat === cat);
        $("#workGrid").innerHTML = list.map((w) => `
          <article class="glass-panel glass-spotlight work-card" data-id="${w.id}" tabindex="0" role="button">
            <div class="wireframe-stage">${w.wireframe}</div>
            <div class="work-info">
              <div class="work-top">
                <h3>${w.title}</h3>
                <span class="work-year">${w.year}</span>
              </div>
              <p>${w.summary}</p>
              <div class="work-bottom">
                <div class="work-stack">
                  ${w.stack.map((s) => `<span class="mini-chip">${s}</span>`).join("")}
                </div>
                <span class="work-arrow">Details →</span>
              </div>
            </div>
          </article>
        `).join("");

        $$(".work-card").forEach((card) => {
            const open = () => openDrawer(card.dataset.id);
            card.addEventListener("click", open);
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open();
                }
            });
        });
    }
    renderWorks();

    $$("#workFilters .tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            $$("#workFilters .tab-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderWorks(btn.dataset.cat);
        });
    });


    const drawer = $("#drawer");
    function openDrawer(id) {
        const item = WORKS.find((w) => w.id === id);
        if (!item) return;
        $("#drawerMeta").textContent = item.year;
        $("#drawerTitle").textContent = item.title;
        $("#drawerDesc").textContent = item.details;
        $("#drawerPoints").innerHTML = item.points.map((p) => `<li>${p}</li>`).join("");
        $("#drawerStack").innerHTML = item.stack.map((s) => `<span class="mini-chip">${s}</span>`).join("");

        let links = "";
        if (item.live) links += `<a href="${item.live}" target="_blank" rel="noopener noreferrer" class="btn-pill btn-solid">Visit site ↗</a>`;
        if (item.repo) links += `<a href="${item.repo}" target="_blank" rel="noopener noreferrer" class="btn-pill btn-ghost">GitHub repo ↗</a>`;
        if (!links) links = `<a href="#contact" class="btn-pill btn-solid" onclick="document.getElementById('drawer').classList.remove('open')">Ask about similar work</a>`;
        $("#drawerLinks").innerHTML = links;

        drawer.classList.add("open");
    }

    $("#drawerClose").addEventListener("click", () => drawer.classList.remove("open"));
    drawer.addEventListener("click", (e) => { if (e.target === drawer) drawer.classList.remove("open"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") drawer.classList.remove("open"); });


    const navMenu = $("#navMenu");
    $("#menuToggle").addEventListener("click", () => navMenu.classList.toggle("open"));
    $$("#navMenu a").forEach((a) => a.addEventListener("click", () => navMenu.classList.remove("open")));

    const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) {
                $$("#navMenu a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
            }
        });
    }, { rootMargin: "-40% 0px -50% 0px" });
    $$("main section").forEach((s) => spy.observe(s));


    const rev = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) {
                en.target.classList.add("in");
                rev.unobserve(en.target);
            }
        });
    }, { threshold: 0.1 });
    $$(".fade-up").forEach((el) => rev.observe(el));

    $("#contactForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = $("#cName").value.trim();
        notify("Thanks " + name + " — message ready.");
        e.target.reset();
    });

    $("#yr").textContent = new Date().getFullYear();
})();
