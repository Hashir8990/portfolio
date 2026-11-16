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
        notify._t = setTimeout(() => t.classList.remove("show"), 2600);
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
            id: "billflow",
            cat: "web",
            title: "BillFlow",
            year: "Live • 2026",
            summary: "SaaS invoice generator, client billing directory, and printable PDF portal built with Next.js & TypeScript.",
            details: "Multi-route App Router SaaS application featuring live revenue KPIs, dynamic line-item invoicing with tax calculation, and print-ready PDF export.",
            points: [
                "Next.js App Router architecture with strict TypeScript interfaces and Context state",
                "Interactive revenue chart, status filtering, and dynamic invoice builder",
                "Clean print-optimized A4 invoice sheet with one-click Save as PDF"
            ],
            stack: ["Next.js", "TypeScript", "Tailwind"],
            live: "https://billflow-xi-tan.vercel.app/",
            repo: "",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>billflow / overview</span>
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
            id: "slotbook",
            cat: "web",
            title: "SlotBook",
            year: "Live • 2026",
            summary: "Full-stack appointment scheduling & admin dashboard with live slot locking and booking tracking.",
            details: "Cal.com-inspired booking system built with React & Tailwind on the frontend and a PHP 8 PDO + MySQL REST API on the backend, featuring an interactive Vercel demo fallback.",
            points: [
                "14-day live date strip with double-booking prevention using MySQL transactions",
                "Unique booking reference code lookup & live status tracking",
                "Admin dashboard with revenue metrics, filters, and slot cancellation/restore"
            ],
            stack: ["React", "Tailwind", "PHP 8", "MySQL"],
            live: "https://frontend-puce-six-34.vercel.app/",
            repo: "",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>slotbook</span>
            </div>
            <div class="wf-editorial">
              <div class="wf-box" style="justify-content: flex-start; gap: 6px;">
                <div class="wf-line"></div>
                <div class="wf-line short"></div>
                <div class="wf-line" style="height: 18px; opacity: 0.25;"></div>
              </div>
              <div class="wf-box" style="justify-content: center;">
                <div class="wf-line"></div>
                <div class="wf-line short"></div>
              </div>
            </div>
          `
        },
        {
            id: "olivetta",
            cat: "web",
            title: "Olivetta",
            year: "GitHub",
            summary: "Modern restaurant landing page built with React and TypeScript, focused on clean visual hierarchy.",
            details: "Personal repository project designed as a responsive restaurant landing experience with modular TypeScript components.",
            points: [
                "Component-driven UI built in React with TypeScript type safety",
                "Responsive layout tuned across mobile and desktop viewports",
                "Version-controlled and maintained on GitHub"
            ],
            stack: ["React", "TypeScript", "CSS3"],
            live: "https://olivetta-nine.vercel.app/",
            repo: "",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>olivetta</span>
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
            id: "spendwise",
            cat: "mobile",
            title: "SpendWise Mobile App",
            year: "In Progress",
            summary: "Cross-platform expense & monthly budget tracker app built with React Native, Expo, and TypeScript.",
            details: "Mobile application currently in active build — featuring instant transaction logging, category breakdowns, monthly budget limits, and offline storage.",
            points: [
                "Cross-platform iOS & Android UI with Expo Router tab navigation",
                "Offline-first persistence via AsyncStorage with clean TypeScript state",
                "Android APK release & interactive web preview coming next"
            ],
            stack: ["React Native", "Expo", "TypeScript"],
            live: "",
            repo: "https://github.com/Hashir8990",
            wireframe: `
            <div class="wf-bar">
              <div class="wf-dots"><span></span><span></span><span></span></div>
              <span>spendwise-app</span>
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

    
    const contactForm = $("#contactForm");
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        formData.append("access_key", "c7442c3f-e350-45ed-8924-e1d4c060e2f1");

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                notify("Message sent! I'll get back to you soon.");
                contactForm.reset();
            } else {
                notify("Error: " + (data.message || "Could not send message."));
            }
        } catch (error) {
            notify("Network error. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    $("#yr").textContent = new Date().getFullYear();
})();
