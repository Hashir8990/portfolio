(() => {
  const EMAIL = "hashirshah.8990@gmail.com";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;


  function updateClock() {
    try {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      $("#pktClock").textContent = "PKT " + fmt.format(new Date());
    } catch {
      $("#pktClock").textContent = "PKT";
    }
  }
  updateClock();
  setInterval(updateClock, 30000);

  window.addEventListener(
    "scroll",
    () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      $("#scrollProgress").style.width = pct + "%";
    },
    { passive: true }
  );


  if (isFinePointer) {
    document.addEventListener(
      "mousemove",
      (e) => {
        $$(".glass-spotlight").forEach((el) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", e.clientX - r.left + "px");
          el.style.setProperty("--my", e.clientY - r.top + "px");
        });
      },
      { passive: true }
    );

    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.22;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
      });
    });
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


  function initHero3D() {
    if (typeof THREE === "undefined") return;
    const stage = $("#heroStage");
    const canvas = $("#heroCanvas");
    if (!stage || !canvas) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        stage.clientWidth / stage.clientHeight,
        0.1,
        100
      );
      camera.position.z = 5.2;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(stage.clientWidth, stage.clientHeight);

      const group = new THREE.Group();
      scene.add(group);


      const outerGeo = new THREE.IcosahedronGeometry(1.45, 1);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0xe4e4e7,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);


      const coreGeo = new THREE.OctahedronGeometry(0.72, 0);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);


      const ringGeo = new THREE.TorusGeometry(1.95, 0.012, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.6;
      ringMesh.rotation.y = 0.4;
      group.add(ringMesh);


      const pCount = 90;
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i++) {
        pos[i] = (Math.random() - 0.5) * 7.5;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x34d399,
        size: 0.04,
        transparent: true,
        opacity: 0.7,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      let targetX = 0;
      let targetY = 0;
      stage.addEventListener("mousemove", (e) => {
        const r = stage.getBoundingClientRect();
        targetX = ((e.clientX - r.left) / r.width - 0.5) * 1.4;
        targetY = ((e.clientY - r.top) / r.height - 0.5) * 1.4;
      });
      stage.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
      });

      window.addEventListener("resize", () => {
        if (!stage.clientWidth || !stage.clientHeight) return;
        camera.aspect = stage.clientWidth / stage.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(stage.clientWidth, stage.clientHeight);
      });

      const clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        if (document.hidden) return;
        const t = clock.getElapsedTime();

        outerMesh.rotation.y = t * 0.22;
        outerMesh.rotation.x = t * 0.12;

        coreMesh.rotation.y = -t * 0.45;
        coreMesh.rotation.z = t * 0.25;

        ringMesh.rotation.z = t * 0.3;
        particles.rotation.y = t * 0.04;

        group.rotation.y += (targetX - group.rotation.y) * 0.06;
        group.rotation.x += (targetY - group.rotation.x) * 0.06;

        renderer.render(scene, camera);
      }
      animate();
    } catch {

    }
  }
  initHero3D();


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
        "Cloudflare caching and asset optimization for snappy mobile load times",
      ],
      stack: ["PHP", "MySQL", "JavaScript", "Cloudflare"],
      live: "https://zalleve.com",
      repo: "",
      wireframe: `
        <div class="wf-bar">
          <div class="wf-dots"><span></span><span></span><span></span></div>
          <span class="wf-live-tag">zalleve.com</span>
        </div>
        <div class="wf-store-grid">
          <div class="wf-box"><div class="wf-line emerald"></div><div class="wf-line short"></div></div>
          <div class="wf-box"><div class="wf-line"></div><div class="wf-line short"></div></div>
          <div class="wf-box"><div class="wf-line"></div><div class="wf-line short"></div></div>
        </div>
      `,
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
        "Clean print-optimized A4 invoice sheet with one-click Save as PDF",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind"],
      live: "https://billflow-xi-tan.vercel.app/",
      repo: "",
      wireframe: `
        <div class="wf-bar">
          <div class="wf-dots"><span></span><span></span><span></span></div>
          <span class="wf-live-tag">billflow / overview</span>
        </div>
        <div class="wf-dash">
          <div class="wf-box" style="justify-content: flex-start; gap: 7px;">
            <div class="wf-line emerald"></div>
            <div class="wf-line short"></div>
            <div class="wf-line"></div>
          </div>
          <div class="wf-box">
            <div class="wf-bars"><span></span><span></span><span></span><span></span></div>
            <div class="wf-line short"></div>
          </div>
        </div>
      `,
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
        "Admin dashboard with revenue metrics, filters, and slot cancellation/restore",
      ],
      stack: ["React", "Tailwind", "PHP 8", "MySQL"],
      live: "https://frontend-puce-six-34.vercel.app/",
      repo: "",
      wireframe: `
        <div class="wf-bar">
          <div class="wf-dots"><span></span><span></span><span></span></div>
          <span class="wf-live-tag">slotbook</span>
        </div>
        <div class="wf-editorial">
          <div class="wf-box" style="justify-content: flex-start; gap: 6px;">
            <div class="wf-line"></div>
            <div class="wf-line short"></div>
            <div class="wf-slots">
              <div class="wf-slot">09:00</div>
              <div class="wf-slot active">10:30</div>
              <div class="wf-slot">12:00</div>
              <div class="wf-slot">14:30</div>
            </div>
          </div>
          <div class="wf-box" style="justify-content: center;">
            <div class="wf-line emerald"></div>
            <div class="wf-line short"></div>
          </div>
        </div>
      `,
    },
    {
      id: "olivetta",
      cat: "web",
      title: "Olivetta",
      year: "Live",
      summary: "Modern restaurant landing page built with React and TypeScript, focused on clean visual hierarchy.",
      details: "Responsive restaurant landing experience designed with modular React and TypeScript components and clean typography.",
      points: [
        "Component-driven UI built in React with TypeScript type safety",
        "Responsive layout tuned across mobile and desktop viewports",
        "Deployed and live on Vercel",
      ],
      stack: ["React", "TypeScript", "CSS3"],
      live: "https://olivetta-nine.vercel.app/",
      repo: "",
      wireframe: `
        <div class="wf-bar">
          <div class="wf-dots"><span></span><span></span><span></span></div>
          <span class="wf-live-tag">olivetta</span>
        </div>
        <div class="wf-editorial">
          <div class="wf-box" style="justify-content: center;">
            <div class="wf-line" style="width: 80%; height: 8px; background: rgba(245, 196, 120, 0.45);"></div>
            <div class="wf-line short"></div>
          </div>
          <div class="wf-box">
            <div class="wf-line"></div>
            <div class="wf-line short"></div>
          </div>
        </div>
      `,
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
        "DNS, SSL, and WAF setup via Cloudflare for production reliability",
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
          <div class="wf-box" style="gap: 7px;">
            <div class="wf-line emerald" style="width: 45%;"></div>
            <div class="wf-line"></div>
            <div class="wf-line short"></div>
          </div>
        </div>
      `,
    },
    {
      id: "spendwise",
      cat: "mobile",
      title: "SpendWise Mobile App",
      year: "Live • 2026",
      summary: "Cross-platform expense & monthly budget tracker app built with React Native, Expo, and TypeScript.",
      details: "Mobile-first personal finance application built with React Native and Expo — featuring instant expense/income logging, category breakdowns, monthly budget limits, and persistent offline storage.",
      points: [
        "Cross-platform iOS, Android & Web UI with Expo Router tab navigation",
        "Offline-first persistence via AsyncStorage with strict TypeScript state",
        "Monthly spending limit tracker with live category percentage insights",
      ],
      stack: ["React Native", "Expo", "TypeScript"],
      live: "https://spendwise-two-blush.vercel.app/",
      repo: "",
      wireframe: `
        <div class="wf-bar">
          <div class="wf-dots"><span></span><span></span><span></span></div>
          <span class="wf-live-tag">spendwise-app</span>
        </div>
        <div class="wf-phone-wrap">
          <div class="wf-phone">
            <div class="wf-line short" style="margin: 0 auto 4px;"></div>
            <div class="wf-line" style="height: 36px; background: rgba(52, 211, 153, 0.16); border: 1px solid rgba(52, 211, 153, 0.35);"></div>
            <div class="wf-meter"><i></i></div>
            <div class="wf-line"></div>
            <div class="wf-line short"></div>
          </div>
          <div class="wf-phone" style="height: 125px; opacity: 0.65;">
            <div class="wf-line"></div>
            <div class="wf-line" style="height: 30px; opacity: 0.3;"></div>
            <div class="wf-line short"></div>
          </div>
        </div>
      `,
    },
  ];

  function bindCardTilt() {
    if (!isFinePointer) return;
    $$(".work-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  function renderWorks(cat = "all") {
    const list = cat === "all" ? WORKS : WORKS.filter((w) => w.cat === cat);
    $("#workGrid").innerHTML = list
      .map(
        (w) => `
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
    `
      )
      .join("");

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

    bindCardTilt();
  }
  renderWorks();

  $$("#workFilters .tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("#workFilters .tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderWorks(btn.dataset.cat);
      if (typeof gsap !== "undefined") {
        gsap.from(".work-card", {
          opacity: 0,
          y: 18,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      }
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
    if (item.live) {
      links += `<a href="${item.live}" target="_blank" rel="noopener noreferrer" class="btn-pill btn-solid">Visit live site ↗</a>`;
    } else {
      links = `<a href="#contact" class="btn-pill btn-solid" onclick="document.getElementById('drawer').classList.remove('open')">Ask about similar work</a>`;
    }
    $("#drawerLinks").innerHTML = links;

    drawer.classList.add("open");
  }

  $("#drawerClose").addEventListener("click", () => drawer.classList.remove("open"));
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) drawer.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") drawer.classList.remove("open");
  });


  const navMenu = $("#navMenu");
  $("#menuToggle").addEventListener("click", () => navMenu.classList.toggle("open"));
  $$("#navMenu a").forEach((a) => a.addEventListener("click", () => navMenu.classList.remove("open")));

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          $$("#navMenu a").forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  $$("main section").forEach((s) => spy.observe(s));


  function initGSAP() {
    if (typeof gsap === "undefined") return;
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }


    gsap.from(".hero-anim", {
      opacity: 0,
      y: 24,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "transform,opacity",
    });

    gsap.from(".hero-bento-item", {
      opacity: 0,
      y: 20,
      duration: 0.65,
      stagger: 0.1,
      delay: 0.25,
      ease: "power2.out",
      clearProps: "transform,opacity",
    });


    $$(".count-num").forEach((el) => {
      const target = Number(el.dataset.target || 0);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.4,
        delay: 0.35,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.val);
        },
      });
    });


    if (typeof ScrollTrigger !== "undefined") {
      $$(".reveal-head").forEach((head) => {
        gsap.from(head, {
          scrollTrigger: { trigger: head, start: "top 88%", once: true },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      });

      gsap.from(".work-card", {
        scrollTrigger: { trigger: "#workGrid", start: "top 85%", once: true },
        opacity: 0,
        y: 26,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });

      $$(".reveal-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
          opacity: 0,
          y: 22,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      });
    }
  }
  initGSAP();

  
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
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        notify("Message sent! I'll get back to you soon.");
        contactForm.reset();
      } else {
        notify("Error: " + (data.message || "Could not send message."));
      }
    } catch {
      notify("Network error. Please try again.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  $("#yr").textContent = new Date().getFullYear();
})();
