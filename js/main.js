/* ==========================================================================
   La Grenouillère — interactions du site
   ✏️  HORAIRES : modifiez ici (0 = dimanche, 1 = lundi … 6 = samedi).
       null = fermé.  FERMETURES : jours de fermeture exceptionnelle (AAAA-MM-JJ).
   ========================================================================== */
var HORAIRES = {
  0: null,
  1: ["06:30", "19:00"],
  2: ["06:30", "19:00"],
  3: ["06:30", "19:00"],
  4: ["06:30", "19:00"],
  5: ["06:30", "19:00"],
  6: ["06:30", "19:00"]
};
var FERMETURES = [
  // "2026-12-25",
];
var TELEPHONE = "+33474222870";

(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("sans-js");
  var reduit = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Heure de Paris ---------- */
  function maintenantParis() {
    try {
      var p = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return new Date(+o.year, +o.month - 1, +o.day, +o.hour % 24, +o.minute);
    } catch (e) { return new Date(); }
  }
  function enMinutes(h) { var p = h.split(":"); return +p[0] * 60 + +p[1]; }
  function joli(h) { var p = h.split(":"); return (+p[0]) + "h" + p[1]; }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function plages(d) { return FERMETURES.indexOf(iso(d)) > -1 ? null : HORAIRES[d.getDay()]; }
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

  function calculerStatut() {
    var now = maintenantParis(), min = now.getHours() * 60 + now.getMinutes(), h = plages(now);
    if (h && min >= enMinutes(h[0]) && min < enMinutes(h[1])) {
      var reste = enMinutes(h[1]) - min;
      var d0 = reste <= 45 ? "ferme bientôt (" + joli(h[1]) + ")" : "jusqu'à " + joli(h[1]);
      return { ouvert: true, mot: "Ouvert", detail: d0, texte: "Ouvert · " + d0 };
    }
    if (h && min < enMinutes(h[0])) return { ouvert: false, mot: "Fermé", detail: "ouvre à " + joli(h[0]), texte: "Fermé · ouvre à " + joli(h[0]) };
    for (var i = 1; i <= 7; i++) {
      var d = new Date(now); d.setDate(d.getDate() + i);
      var hj = plages(d);
      if (hj) { var d1 = "ouvre " + (i === 1 ? "demain" : JOURS[d.getDay()]) + " à " + joli(hj[0]); return { ouvert: false, mot: "Fermé", detail: d1, texte: "Fermé · " + d1 }; }
    }
    return { ouvert: false, mot: "Fermé", detail: "", texte: "Fermé" };
  }
  function majStatut() {
    var s = calculerStatut();
    document.querySelectorAll("[data-statut]").forEach(function (el) {
      el.classList.toggle("est-ouvert", s.ouvert);
      el.classList.toggle("est-ferme", !s.ouvert);
      var mot = el.querySelector(".statut__mot"), t = el.querySelector(".statut__texte");
      if (mot) { mot.textContent = s.mot; if (t) t.textContent = s.detail; }
      else if (t) t.textContent = s.texte;
    });
    // ligne « aujourd'hui » dans les tableaux d'horaires
    var j = maintenantParis().getDay();
    document.querySelectorAll(".horaires tr[data-jour]").forEach(function (tr) {
      tr.classList.toggle("est-aujourdhui", +tr.getAttribute("data-jour") === j);
    });
  }
  majStatut();
  setInterval(majStatut, 60000);

  /* ---------- En-tête : ombre au défilement ---------- */
  var entete = document.querySelector(".entete");
  function onScroll() { if (entete) entete.classList.toggle("est-scrolle", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector(".burger"), menu = document.getElementById("menu-mobile");
  function basculer(ouvrir) {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", ouvrir ? "true" : "false");
    burger.setAttribute("aria-label", ouvrir ? "Fermer le menu" : "Ouvrir le menu");
    menu.classList.toggle("est-ouvert", ouvrir);
    menu.setAttribute("aria-hidden", ouvrir ? "false" : "true");
    document.body.classList.toggle("menu-ouvert", ouvrir);
    if (ouvrir) { var a = menu.querySelector("a"); if (a) setTimeout(function () { a.focus({ preventScroll: true }); }, 300); }
  }
  if (burger) burger.addEventListener("click", function () { basculer(burger.getAttribute("aria-expanded") !== "true"); });
  if (menu) menu.addEventListener("click", function (e) { if (e.target.closest("a")) basculer(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { basculer(false); fermerVisionneuse(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth >= 900) basculer(false); }, { passive: true });

  /* ---------- Apparition au défilement ---------- */
  var reveles = document.querySelectorAll(".revele");
  if ("IntersectionObserver" in window && !reduit) {
    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("est-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    reveles.forEach(function (el) { io.observe(el); });
  } else reveles.forEach(function (el) { el.classList.add("est-visible"); });

  /* ---------- Filtres de la pâtisserie ---------- */
  var filtres = document.querySelectorAll(".filtre");
  if (filtres.length) {
    var cartes = document.querySelectorAll("[data-cat]");
    filtres.forEach(function (f) {
      var cat = f.getAttribute("data-filtre"), n = 0;
      cartes.forEach(function (c) { if (cat === "tout" || c.getAttribute("data-cat").split(" ").indexOf(cat) > -1) n++; });
      var span = f.querySelector("span"); if (span) span.textContent = n;
      f.addEventListener("click", function () {
        filtres.forEach(function (x) { x.setAttribute("aria-pressed", x === f ? "true" : "false"); });
        cartes.forEach(function (c) {
          var ok = cat === "tout" || c.getAttribute("data-cat").split(" ").indexOf(cat) > -1;
          c.hidden = !ok;
          c.classList.remove("apparait");
          if (ok && !reduit) { void c.offsetWidth; c.classList.add("apparait"); }
        });
      });
    });
  }

  /* ---------- Galerie : photo absente => tuile élégante ; visionneuse ---------- */
  var visio = document.getElementById("visionneuse");
  function fermerVisionneuse() { if (visio && visio.classList.contains("est-ouverte")) { visio.classList.remove("est-ouverte"); document.body.style.overflow = ""; } }
  document.querySelectorAll(".galerie__item").forEach(function (item) {
    var img = item.querySelector("img");
    function sansPhoto() {
      item.classList.add("sans-photo"); item.setAttribute("tabindex", "-1"); item.disabled = true;
      if (img) img.remove();
      var v = document.createElement("div"); v.className = "galerie__vide";
      v.innerHTML = '<svg class="icone" aria-hidden="true"><use href="#i-camera"/></svg><small>Photo à venir</small>';
      item.insertBefore(v, item.firstChild);
    }
    if (img) {
      if (img.complete && img.naturalWidth === 0) sansPhoto();
      else img.addEventListener("error", sansPhoto);
    }
    item.addEventListener("click", function () {
      if (!visio || item.classList.contains("sans-photo")) return;
      var i = item.querySelector("img"); if (!i) return;
      visio.querySelector("img").src = i.currentSrc || i.src;
      visio.querySelector("img").alt = i.alt;
      visio.querySelector("p").textContent = item.querySelector(".galerie__legende").textContent;
      visio.classList.add("est-ouverte"); document.body.style.overflow = "hidden";
      visio.querySelector("button").focus();
    });
  });
  if (visio) visio.addEventListener("click", function (e) { if (e.target === visio || e.target.closest("button")) fermerVisionneuse(); });

  /* ---------- Carte Google Maps chargée à la demande (plus rapide sur mobile) ---------- */
  var btnCarte = document.querySelector("[data-charger-carte]");
  if (btnCarte) btnCarte.addEventListener("click", function () {
    var bloc = btnCarte.closest(".carte-plan");
    bloc.innerHTML = '<iframe title="Plan d\'accès à la boulangerie La Grenouillère" src="https://www.google.com/maps?q=14+Rue+Paul+Pioda,+01000+Bourg-en-Bresse&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  });

  /* ---------- Année du copyright ---------- */
  document.querySelectorAll("[data-annee]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
