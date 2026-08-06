/* ==========================================================================
   Portfolio — script.js
   Terminal animation, particle network, count-up stats, modals, theme
   ========================================================================== */

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT DATA
// ═══════════════════════════════════════════════════════════════════════════

const projectData = {
  neuroatr: {
    status: "Submitted research · 2026",
    title: "NeuroATR",
    details: [
      { label: "THE PROBLEM", text: "Closed-set SAR ATR systems force-classify every input, including unknown targets they were never trained on. This makes them unusable in real-world scenarios where novel objects routinely appear." },
      { label: "MY ROLE", text: "Led the end-to-end research: SwinV2 backbone adaptation for SAR, calibrated knownness scoring, leakage-controlled checkpointing, evaluation protocol design, and manuscript preparation." },
      { label: "PROCESS", text: "Built a classifier-centered open-world framework with few-shot SAR adaptation, energy-based uncertainty scoring, and prototype-structured representations. Designed strict multi-seed evaluation with leakage control." },
      { label: "VERIFIED OUTCOME", text: "Achieved reliable unknown-target rejection across MSTAR-7, SLICY, clutter, T72 config-variant near-OOD, EOC depression-angle stress, and FUSAR-Ship external unknown transfer benchmarks." }
    ],
    tags: ["SAR ATR", "SwinV2", "Open-World", "Few-Shot", "Uncertainty", "MSTAR"],
    link: "#", linkText: "Paper under review"
  },
  "sar-reliability": {
    status: "Under review · EAAI",
    title: "Multi-Source Evidence Learning for Open-World SAR",
    details: [
      { label: "THE PROBLEM", text: "Open-world neural recognition requires both accurate classification and a reliable signal for observations outside the learned operating envelope. Vanilla confidence scores fail under configuration shift." },
      { label: "MY ROLE", text: "Designed the multi-source neural evidence-learning framework, trained vanilla/four/eight-hypothesis SwinV2-Tiny models across five seeds, and built the geometry-aware readout evaluation pipeline." },
      { label: "PROCESS", text: "Combined logit-energy regularization, prototype geometry, structural hypothesis learning, and a geometry-aware readout. Evaluated with matched post-hoc detector comparisons (ViM, reinforced-class-separability) on held-out T72 variants." },
      { label: "VERIFIED OUTCOME", text: "Four-hypothesis training with ViM readout reaches AUROC 0.9925±0.0062 on T72 variants (up from 0.9157 vanilla), FPR95 0.0394. Also AUROC 0.9944 on controlled open-set suite. Identifies cross-angle transfer as key limitation." }
    ],
    tags: ["Evidence Learning", "Geometry-Aware", "OOD Detection", "SAR ATR", "SwinV2"],
    link: "#", linkText: "Paper under review"
  },
  sage: {
    status: "Under double-blind review",
    title: "Explanation Reliability & Auditing Framework",
    details: [
      { label: "THE PROBLEM", text: "Post-hoc explanations can be unfaithful or misleading when presented without quality control, attribution auditing, or risk calibration under domain shift." },
      { label: "MY ROLE", text: "Designed explanation auditing protocols and intrinsic evidence pathways, establishing faithfulness, stability, and sanity benchmarks." },
      { label: "PROCESS", text: "Built calibrated explanation gating that routes explanations to trusted, review, or reject states under controlled risk thresholds." },
      { label: "VERIFIED OUTCOME", text: "Established task-aligned explanation reliability under domain shift, providing decision-makers with calibrated confidence in predictions and supporting explanations." }
    ],
    tags: ["XAI", "Calibration", "Risk Control", "Attribution"],
    link: "#", linkText: "Under double-blind review"
  },
  channel: {
    status: "In preparation",
    title: "Neural Channel Estimation",
    details: [
      { label: "THE PROBLEM", text: "Fractional delay-Doppler channels in OTFS systems require accurate path parameter estimation, but conventional methods struggle with continuous unordered path atoms and finite transceiver effects." },
      { label: "MY ROLE", text: "Co-developed the neural-assisted parametric estimation framework, implementing deterministic multi-view pilot representations and the differentiable transceiver reconstruction layer." },
      { label: "PROCESS", text: "Combined deterministic DD/Zak, TF, DAFT, and delay-time pilot views with neural unordered path-set prediction, analytical least-squares gain solving, and transceiver-matched channel reconstruction." },
      { label: "VERIFIED OUTCOME", text: "Achieved superior BER and NMSE performance compared to conventional OTFS channel estimation methods across various fractional delay-Doppler channel scenarios." }
    ],
    tags: ["OTFS", "Signal Processing", "Channel Estimation", "Neural Networks"],
    link: "#", linkText: "Manuscript in preparation"
  },
  openmanus: {
    status: "Open-source contributor",
    title: "OpenManus Agent Runtime",
    details: [
      { label: "THE PROBLEM", text: "Autonomous LLM agents need sandboxed execution environments, real-time tool observability, and reliable long-running task orchestration that existing frameworks lacked." },
      { label: "MY ROLE", text: "Major contributor with 120,000+ lines added across the full Python/FastAPI/PostgreSQL/React stack. Designed and implemented core infrastructure modules." },
      { label: "PROCESS", text: "Built sandboxed code execution, live tool observability via SSE, MCP server integration, long-running task orchestration with Celery/Redis, and operational dashboards." },
      { label: "VERIFIED OUTCOME", text: "Enabled reliable autonomous agent operation with real-time monitoring, safe execution isolation, and scalable task management in production-grade infrastructure." }
    ],
    tags: ["LLM", "FastAPI", "React", "PostgreSQL", "MCP", "Celery"],
    link: "https://github.com/muhammed-aksoy", linkText: "View on GitHub"
  },
  astronomy: {
    status: "Research project",
    title: "Astronomical Transient Triage",
    details: [
      { label: "THE PROBLEM", text: "LSST-like astronomical surveys generate millions of transient alerts nightly. Rare events must be prioritized for follow-up while maintaining a controlled false-discovery rate." },
      { label: "MY ROLE", text: "Designed the risk-controlled triage pipeline, implemented conformal calibration, and conducted rigorous degradation stress tests across 1.5M+ survey objects." },
      { label: "PROCESS", text: "Processed 1.5M+ objects through a conformal calibration framework, establishing broker-style baselines with target error rate guarantees under distribution shift and data degradation." },
      { label: "VERIFIED OUTCOME", text: "Demonstrated reliable rare-transient detection with calibrated error guarantees that hold under systematic degradation stress tests — the same reliability question as SAR ATR in a different domain." }
    ],
    tags: ["Conformal", "Astronomy", "Risk Control", "LSST", "Calibration"],
    link: "#", linkText: "Project details"
  },
  registration: {
    status: "Published · IEEE SIU 2022 & 2023",
    title: "Cross-Spectral Image Registration",
    details: [
      { label: "THE PROBLEM", text: "Registering thermal infrared and visible-light images is challenging due to the large appearance gap between modalities, making conventional keypoint matching unreliable." },
      { label: "MY ROLE", text: "Led both registration approaches as first author: the cGAN-based image translation pipeline (SIU 2022) and the Swin Transformer Siamese encoder (SIU 2023). Built evaluation benchmarks." },
      { label: "PROCESS", text: "Approach 1: pix2pix conditional GAN translation to close the appearance gap, then standard keypoint matching. Approach 2: SwinV2 Siamese encoder with cosine descriptor alignment for direct cross-modal correspondence." },
      { label: "VERIFIED OUTCOME", text: "SwinV2 Siamese approach improved nn-mAP by 17.3%, matching score by 8.4%, and homography correctness by 24% on VEDAI. Both papers published at IEEE SIU with 14+ combined citations." }
    ],
    tags: ["GAN", "Swin Transformer", "Registration", "Thermal-Optical", "IEEE SIU"],
    link: "https://ieeexplore.ieee.org/abstract/document/9864815", linkText: "Read the paper"
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════════════════

const themeToggle = document.querySelector("[data-theme-toggle]");
const themeColorMeta = document.querySelector("[data-theme-color]");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", theme === "light" ? "#f6f8fa" : "#0a0e13");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// TERMINAL TYPING ANIMATION
// ═══════════════════════════════════════════════════════════════════════════

const terminalLines = [
  { type: "command", text: "python neuroatr/train.py --open-world" },
  { type: "output",  text: "Loading SwinV2-Base backbone..." },
  { type: "output",  text: "Dataset: MSTAR-7 (10-class, 3-unknown)" },
  { type: "output",  text: "Calibrating knownness scores..." },
  { type: "blank" },
  { type: "result",  text: "Epoch 42/50  loss: 0.0347" },
  { type: "metric",  text: "  F1 (known):      0.947" },
  { type: "metric",  text: "  AUROC (unknown):  0.983" },
  { type: "metric",  text: "  Rejection rate:   96.2%" },
  { type: "blank" },
  { type: "success", text: "✓ Checkpoint saved: best_model.pt" },
  { type: "command", text: "python evaluate.py --benchmark all" },
  { type: "output",  text: "Running 6 benchmark suites..." },
  { type: "metric",  text: "  MSTAR-7:          PASS" },
  { type: "metric",  text: "  SLICY:            PASS" },
  { type: "metric",  text: "  T72 variants:     PASS" },
  { type: "metric",  text: "  EOC depression:   PASS" },
  { type: "metric",  text: "  FUSAR-Ship:       PASS" },
  { type: "success", text: "✓ All benchmarks passed" },
];

function buildTerminalHTML(line) {
  switch (line.type) {
    case "command":
      return `<span class="prompt">$ </span><span class="cmd">${line.text}</span>`;
    case "output":
      return `<span class="output">${line.text}</span>`;
    case "result":
      return `<span class="output">${line.text}</span>`;
    case "metric":
      return `<span class="metric">${line.text}</span>`;
    case "success":
      return `<span class="success">${line.text}</span>`;
    case "blank":
      return `&nbsp;`;
    default:
      return line.text;
  }
}

function runTerminalAnimation() {
  const container = document.getElementById("terminal-body");
  if (!container) return;

  container.innerHTML = "";

  // Pre-create all line elements
  const lineEls = terminalLines.map((line) => {
    const div = document.createElement("div");
    div.className = "terminal-line";
    div.innerHTML = buildTerminalHTML(line);
    container.appendChild(div);
    return div;
  });

  // Add cursor at the end
  const cursorSpan = document.createElement("span");
  cursorSpan.className = "terminal-cursor";
  container.appendChild(cursorSpan);

  // Reveal lines one by one
  let i = 0;
  function showNext() {
    if (i >= lineEls.length) {
      // Loop after a pause
      setTimeout(() => {
        lineEls.forEach((el) => el.classList.remove("visible"));
        i = 0;
        setTimeout(showNext, 600);
      }, 4000);
      return;
    }

    lineEls[i].classList.add("visible");
    i++;

    // Vary delay by line type
    const line = terminalLines[i - 1];
    let delay = 90;
    if (line.type === "command") delay = 180;
    if (line.type === "blank") delay = 40;
    if (line.type === "success") delay = 250;

    setTimeout(showNext, delay);
  }

  // Start after a brief pause
  setTimeout(showNext, 800);
}

runTerminalAnimation();

// ═══════════════════════════════════════════════════════════════════════════
// PARTICLE NETWORK (Neural Network Background)
// ═══════════════════════════════════════════════════════════════════════════

const particleCanvas = document.getElementById("particle-canvas");

if (particleCanvas) {
  const ctx = particleCanvas.getContext("2d");
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animFrame;
  let canvasW, canvasH;

  const PARTICLE_COUNT = 60;
  const CONNECTION_DIST = 150;
  const MOUSE_DIST = 200;

  function resizeCanvas() {
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    particleCanvas.width = canvasW;
    particleCanvas.height = canvasH;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    const isDark = document.documentElement.dataset.theme !== "light";
    const particleColor = isDark ? "0, 255, 136" : "0, 102, 68";
    const lineColor = isDark ? "0, 212, 255" : "0, 119, 170";

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles & mouse interaction
    for (const p of particles) {
      // Mouse attraction
      const mdx = mouse.x - p.x;
      const mdy = mouse.y - p.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < MOUSE_DIST && mDist > 0) {
        const force = (1 - mDist / MOUSE_DIST) * 0.015;
        p.vx += mdx * force;
        p.vy += mdy * force;
      }

      // Dampen velocity
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = canvasW;
      if (p.x > canvasW) p.x = 0;
      if (p.y < 0) p.y = canvasH;
      if (p.y > canvasH) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.fillStyle = `rgba(${particleColor}, 0.6)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrame = requestAnimationFrame(drawParticles);
  }

  function initParticles() {
    resizeCanvas();
    createParticles();
    drawParticles();
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  initParticles();
}

// ═══════════════════════════════════════════════════════════════════════════
// COUNT-UP ANIMATION FOR STATS
// ═══════════════════════════════════════════════════════════════════════════

function animateCountUp(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const isFloat = target % 1 !== 0;
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    if (isFloat) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.round(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
    }
  }

  requestAnimationFrame(update);
}

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT MODAL
// ═══════════════════════════════════════════════════════════════════════════

const modalOverlay = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalDetails = document.getElementById("modal-details");
const modalTags = document.getElementById("modal-tags");
const modalLink = document.getElementById("modal-link");
const modalCloseBtn = document.getElementById("modal-close");

function openModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  modalStatus.textContent = project.status;
  modalTitle.textContent = project.title;

  modalDetails.innerHTML = project.details
    .map(
      (d) => `
    <div class="modal-detail-card">
      <p class="modal-detail-label">${d.label}</p>
      <p class="modal-detail-text">${d.text}</p>
    </div>`
    )
    .join("");

  modalTags.innerHTML = project.tags.map((t) => `<span>${t}</span>`).join("");

  if (project.link && project.link !== "#") {
    modalLink.href = project.link;
    modalLink.textContent = project.linkText;
    modalLink.style.display = "";
    modalLink.style.pointerEvents = "";
  } else {
    modalLink.textContent = project.linkText || "";
    modalLink.href = "#";
    modalLink.style.pointerEvents = "none";
    modalLink.style.display = project.linkText ? "" : "none";
  }

  modalOverlay.classList.add("open");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  setTimeout(() => modalCloseBtn.focus(), 80);
}

function closeModal() {
  modalOverlay.classList.remove("open");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalLink.style.pointerEvents = "";
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.project;
    if (key) openModal(key);
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
    closeModal();
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL + COUNT-UP TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

const revealElements = document.querySelectorAll(".reveal");
const statNumbers = document.querySelectorAll(".stat-number[data-count]");
const countedSet = new Set();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);

          // Trigger count-up for stat numbers within this element
          const stats = entry.target.querySelectorAll
            ? entry.target.querySelectorAll(".stat-number[data-count]")
            : [];
          stats.forEach((s) => {
            if (!countedSet.has(s)) {
              countedSet.add(s);
              animateCountUp(s);
            }
          });
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Also observe individual stat items
  statNumbers.forEach((el) => {
    const parent = el.closest(".stat-item");
    if (parent && parent.classList.contains("reveal")) {
      // Already observed via parent
    }
  });
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
  statNumbers.forEach((s) => animateCountUp(s));
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVE NAV HIGHLIGHT
// ═══════════════════════════════════════════════════════════════════════════

const navLinks = document.querySelectorAll(".desktop-nav a");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════════════════

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
