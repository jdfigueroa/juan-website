/* =====================================================
   Juan David Figueroa — site scripts (no dependencies)
   ===================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* ---------- mobile layout switch (matches Cargo's mobile view) */
  var MOBILE_BREAKPOINT = 680;
  function setMobile() {
    root.classList.toggle("mobile", window.innerWidth <= MOBILE_BREAKPOINT);
  }
  setMobile();
  window.addEventListener("resize", setMobile);

  /* ---------- Info overlay */
  var overlay = document.getElementById("info");
  var lastFocus = null;

  function openOverlay() {
    if (!overlay || !overlay.hidden) return;
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("no-scroll");
    var close = overlay.querySelector(".overlay-close");
    if (close) close.focus();
  }
  function closeOverlay() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
    if (location.hash === "#info") history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }

  if (overlay) {
    var btn = document.createElement("button");
    btn.className = "overlay-close";
    btn.setAttribute("aria-label", "Close");
    btn.textContent = "×";
    btn.addEventListener("click", closeOverlay);
    overlay.prepend(btn);

    // close when clicking outside the text
    overlay.addEventListener("click", function (e) {
      if (!e.target.closest(".bodycopy > *") && !e.target.closest(".overlay-close")) closeOverlay();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeOverlay();
    });
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-open-overlay]");
    if (!trigger) return;
    e.preventDefault();
    closeMenu();
    openOverlay();
  });
  if (location.hash === "#info") openOverlay();

  /* ---------- mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
  }

  /* ---------- footer clock + year */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var now = new Date();
    document.querySelectorAll(".clock").forEach(function (el) {
      var f = el.getAttribute("data-format") || "{hour}:{minute}";
      el.textContent = f
        .replace("{hour}", pad(now.getHours()))
        .replace("{minute}", pad(now.getMinutes()))
        .replace("{second}", pad(now.getSeconds()));
    });
  }
  tick();
  setInterval(tick, 10000);
  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- scroll reveal for images */
  var revealables = document.querySelectorAll(".pages .media");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -5% 0px" });
    revealables.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight) {
        el.classList.add("reveal");
        io.observe(el);
      }
    });
  }

  /* ---------- home: on touch screens, highlight the thumbnail in the
     middle of the screen (port of your Cargo custom script) */
  var homeThumbs = Array.prototype.slice.call(document.querySelectorAll('[id="L2400837117"] .thumbnail-index .media'));
  var coarse = window.matchMedia("(hover: none) and (pointer: coarse)");
  var scheduled = false;
  function updateActive() {
    scheduled = false;
    if (!coarse.matches) {
      homeThumbs.forEach(function (t) { t.classList.remove("is-scroll-active"); });
      return;
    }
    var mid = window.innerHeight / 2, best = null, bestD = Infinity;
    homeThumbs.forEach(function (t) {
      var r = t.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      var d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = t; }
    });
    homeThumbs.forEach(function (t) { t.classList.toggle("is-scroll-active", t === best); });
  }
  if (homeThumbs.length) {
    var schedule = function () {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateActive); }
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
  }

  /* ---------- archive: whole row is clickable (port of your Cargo custom script) */
  document.addEventListener("click", function (e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var row = e.target.closest('[id="O3471381827"] .cs');
    if (!row || e.target.closest("a")) return;
    var link = row.querySelector(".cu:nth-child(2) a[href]") || row.querySelector("a[href]");
    if (link) link.click();
  });

  /* ---------- marquees: duplicate content for a seamless loop */
  document.querySelectorAll(".marquee-inner").forEach(function (el) {
    el.innerHTML += el.innerHTML;
  });
})();
