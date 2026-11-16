/* ==========================================================================
   LA GRENOUILLÈRE — DÉCORATIONS DE SAISON AUTOMATIQUES
   --------------------------------------------------------------------------
   Le site change de décor tout seul selon la date du jour :
   couleurs, bandeau d'annonce, ornement fixe en fond d'en-tête
   et encadré « Ce mois-ci » sur l'accueil.

   ✏️  POUR MODIFIER UN TEXTE : changez simplement le texte entre guillemets
       dans la liste EVENEMENTS ou SAISONS ci-dessous.
   ⛔  POUR DÉSACTIVER UN ÉVÉNEMENT : mettez  actif: false
   👀  POUR PRÉVISUALISER : ajoutez  ?apercu  à l'adresse du site
       (ex. https://boulangerie-bourgenbresse.fr/?apercu) puis choisissez.
       Ou directement  ?saison=noel  /  ?saison=paques  …  ( ?saison=auto pour revenir)

   Dates : "MM-JJ" (mois-jour). Pâques, fête des mères et fête des pères
   sont calculées automatiquement chaque année.
   ========================================================================== */

/* 🧪 MODE TEST : affiche des boutons pour essayer chaque décor sur le site.
      ⚠️  Remettez  false  avant la mise en ligne. */
const MODE_TEST = false;

const EVENEMENTS = [
  {
    id: "galette", actif: true,
    nom: "Galette des rois",
    debut: "01-01", fin: "01-31",
    emoji: "👑", particules: "etoiles", ornement: "couronne", deco: null,
    bandeau: { texte: "C'est la saison des galettes des rois ! Pensez à réserver la vôtre.", lien: "contact.html#commander", lienTexte: "Réserver" },
    heros: { titre: "Les galettes sont là", texte: "Feuilletage pur beurre, fève et couronne offertes" },
    vedette: {
      surtitre: "Épiphanie",
      titre: "Qui aura <em>la fève</em> cette année ?",
      texte: "Tout le mois de janvier, Arnaud feuillette ses galettes au beurre, à partager en famille, entre amis ou au bureau. Pour être sûr d'avoir la vôtre, réservez-la !",
      produits: [
        ["Galette frangipane", "Feuilletage pur beurre et crème d'amande fondante"],
        ["Brioche couronne", "La brioche des rois, moelleuse et parfumée"],
        ["Toutes les tailles", "De 4 à 10 parts — sur réservation pour les grandes tablées"]
      ],
      cta: { texte: "Réserver ma galette", lien: "contact.html#commander" },
      etiquette: "Fève & couronne offertes"
    }
  },
  {
    id: "valentin", actif: true,
    nom: "Saint-Valentin",
    debut: "02-01", fin: "02-14",
    emoji: "💝", particules: "coeurs", ornement: "coeur", deco: null,
    bandeau: { texte: "Saint-Valentin : offrez une douceur faite maison à votre moitié.", lien: "patisserie.html", lienTexte: "Nos pâtisseries" },
    heros: { titre: "Saint-Valentin", texte: "Un gâteau pour deux, fait avec amour" },
    vedette: {
      surtitre: "14 février",
      titre: "L'amour passe <em>par la gourmandise</em>",
      texte: "Fraisier, framboisier, trois chocolats… Pour la Saint-Valentin, commandez un entremets pour deux et laissez Arnaud s'occuper du reste.",
      produits: [
        ["Framboisier", "Génoise, crème légère et framboises fraîches"],
        ["Chocolat blanc framboise", "Mousse onctueuse et cœur fruité"],
        ["Macarons framboise", "Pour croquer l'amour en petites bouchées"]
      ],
      cta: { texte: "Commander pour deux", lien: "contact.html#commander" },
      etiquette: "Pour deux, sur commande"
    }
  },
  {
    id: "paques", actif: true,
    nom: "Pâques",
    debut: "paques-21", fin: "paques+1",
    emoji: "🐣", particules: "oeufs", ornement: "oeuf", deco: "fanions",
    bandeau: { texte: "Joyeuses Pâques ! Les gourmandises de saison sont en boutique.", lien: "patisserie.html", lienTexte: "Voir" },
    heros: { titre: "Pâques à la Grenouillère", texte: "Les gourmandises de printemps sont arrivées" },
    vedette: {
      surtitre: "Pâques",
      titre: "La chasse aux <em>gourmandises</em> est ouverte",
      texte: "Pour Pâques, la boutique se pare de couleurs pastel. Venez découvrir nos douceurs de saison, à offrir ou à partager au déjeuner du dimanche.",
      produits: [
        ["Gourmandises de Pâques", "Chocolats et douceurs de saison en boutique"],
        ["Entremets de fête", "À commander pour le repas de famille"],
        ["Brioche Nanterre", "Pour un petit-déjeuner de Pâques réussi"]
      ],
      cta: { texte: "Commander pour Pâques", lien: "contact.html#commander" },
      etiquette: "Édition de printemps"
    }
  },
  {
    id: "fete-meres", actif: true,
    nom: "Fête des mères",
    debut: "meres-10", fin: "meres",
    emoji: "💐", particules: "petales", ornement: "fleur", deco: "fanions",
    bandeau: { texte: "Fête des mères : faites-lui plaisir avec un gâteau fait maison.", lien: "contact.html#commander", lienTexte: "Commander" },
    heros: { titre: "Fête des mères", texte: "Un gâteau maison pour dire merci" },
    vedette: {
      surtitre: "Fête des mères",
      titre: "Pour la plus belle <em>des mamans</em>",
      texte: "Un entremets, une tarte aux fruits, une boîte de macarons… Réservez sa douceur préférée, on la prépare avec tout notre cœur.",
      produits: [
        ["Fraisier", "Le grand classique qui fait toujours plaisir"],
        ["Tarte aux fraises", "Pâte sablée, crème vanille et fruits frais"],
        ["Gros macarons", "Généreux et colorés, à offrir"]
      ],
      cta: { texte: "Réserver son gâteau", lien: "contact.html#commander" },
      etiquette: "Réservez à l'avance"
    }
  },
  {
    id: "fete-peres", actif: true,
    nom: "Fête des pères",
    debut: "peres-7", fin: "peres",
    emoji: "🎁", particules: "confettis", ornement: null, deco: "fanions",
    bandeau: { texte: "Fête des pères : un Paris-Brest ou un Royal pour papa ?", lien: "contact.html#commander", lienTexte: "Commander" },
    heros: { titre: "Fête des pères", texte: "Le dessert préféré de papa, fait maison" },
    vedette: {
      surtitre: "Fête des pères",
      titre: "Pour papa, <em>que du bon</em>",
      texte: "Pâte à choux pralinée, chocolat intense ou baba bien imbibé : à chaque papa son dessert. Commandez-le en grand format pour toute la famille.",
      produits: [
        ["Paris-Brest", "Pâte à choux et crème pralinée amandes-noisettes"],
        ["Royal", "Dacquoise, croustillant praliné, mousse chocolat"],
        ["Baba au rhum", "Bien imbibé, crème légère et fruits frais"]
      ],
      cta: { texte: "Commander", lien: "contact.html#commander" },
      etiquette: "Grand format sur commande"
    }
  },
  {
    id: "halloween", actif: true,   // prend le pas sur Octobre rose du 25 au 31 octobre
    nom: "Halloween",
    debut: "10-25", fin: "10-31",
    emoji: "🎃", particules: "feuilles", ornement: "feuille", deco: null,
    bandeau: { texte: "Halloween approche… des gourmandises à faire peur !", lien: "patisserie.html", lienTexte: "Voir" },
    heros: { titre: "Halloween", texte: "Des douceurs qui font frissonner" },
    vedette: {
      surtitre: "Halloween",
      titre: "Des bonbons <em>ou un gâteau</em> ?",
      texte: "Pour Halloween, la boutique s'habille d'orange. Venez chercher vos gourmandises avant la tournée des bonbons !",
      produits: [["Gourmandises d'Halloween", "En boutique toute la semaine"]],
      cta: { texte: "Nous trouver", lien: "contact.html" },
      etiquette: "Toute la semaine"
    }
  },
  {
    id: "octobre-rose", actif: true,
    nom: "Octobre rose",
    debut: "10-01", fin: "10-31",
    emoji: "🎀", particules: "petales-roses", ornement: "ruban", deco: null,
    bandeau: { texte: "Octobre rose : la Grenouillère se met en rose pour soutenir la lutte contre le cancer du sein.", lien: "", lienTexte: "" },
    heros: { titre: "Octobre rose", texte: "Ensemble, on se mobilise" },
    vedette: {
      surtitre: "Octobre rose",
      titre: "La Grenouillère <em>voit la vie en rose</em>",
      texte: "Tout le mois d'octobre, la boulangerie se pare de rose pour sensibiliser au dépistage du cancer du sein. Parlons-en autour d'une douceur !",
      produits: [
        ["Framboisier", "Génoise moelleuse et framboises fraîches"],
        ["Chocolat blanc framboise", "Une mousse délicate au cœur rose"],
        ["Le Cochon", "Notre douceur toute rose en pâte d'amande"]
      ],
      cta: { texte: "Voir nos pâtisseries", lien: "patisserie.html" },
      etiquette: "Tout le mois d'octobre"
    }
  },
  {
    id: "movember", actif: true,
    nom: "Movember",
    debut: "11-01", fin: "11-30",
    emoji: "🥸", particules: "moustaches", ornement: "moustache", deco: null,
    bandeau: { texte: "Movember : tout le mois de novembre, la Grenouillère se laisse pousser la moustache pour la santé des hommes.", lien: "", lienTexte: "" },
    heros: { titre: "Movember", texte: "On se laisse pousser la moustache" },
    vedette: {
      surtitre: "Movember",
      titre: "En novembre, <em>la moustache</em> est de sortie",
      texte: "Tout le mois de novembre, on se mobilise pour la santé des hommes : cancer de la prostate, cancer des testicules, santé mentale. Messieurs, un petit contrôle chez le médecin, et un bon pain en rentrant !",
      produits: [
        ["Paris-Brest", "Pâte à choux et crème pralinée, pour les gros appétits"],
        ["Royal", "Dacquoise, croustillant praliné et mousse chocolat"],
        ["Pain aux noix", "Riche et généreux, parfait avec le fromage"]
      ],
      cta: { texte: "Voir nos pâtisseries", lien: "patisserie.html" },
      etiquette: "Tout le mois de novembre"
    }
  },
  {
    id: "noel", actif: true,
    nom: "Noël",
    debut: "12-01", fin: "12-31",
    emoji: "🎄", particules: "neige", ornement: "bonnet", deco: "guirlande",
    bandeau: { texte: "Bûches, pains de fête, commandes pour vos réveillons : pensez à réserver !", lien: "contact.html#commander", lienTexte: "Réserver" },
    heros: { titre: "Les fêtes à la Grenouillère", texte: "Bûches et pains de fête — réservez vite" },
    vedette: {
      surtitre: "Noël & réveillons",
      titre: "Des fêtes <em>gourmandes</em> et faites maison",
      texte: "Pour Noël et le jour de l'an, Arnaud prépare bûches, pains de fête et créations sur mesure. Les commandes partent vite : réservez dès maintenant pour vos réveillons.",
      produits: [
        ["Bûches de Noël", "Pâtissières, à réserver pour vos réveillons"],
        ["Pains de fête", "Pain aux noix, figues & noisettes : parfaits avec le foie gras et les fromages"],
        ["Commandes de fête", "Pièces montées, plaques de pizza ou de quiche, pains en quantité"]
      ],
      cta: { texte: "Réserver pour les fêtes", lien: "contact.html#commander" },
      etiquette: "Réservations ouvertes"
    }
  }
];

/* Saisons « de fond », utilisées quand aucun événement n'est en cours. */
const SAISONS = [
  {
    id: "printemps", nom: "Printemps", debut: "03-20", fin: "06-20",
    emoji: "🍓", particules: "petales", ornement: "fleur", deco: null, bandeau: null,
    vedette: {
      surtitre: "Ce printemps à la boutique",
      titre: "Les fraises <em>sont de retour</em>",
      texte: "Avec les beaux jours, les fruits frais reviennent dans nos vitrines. C'est le moment des tartes et des entremets fruités !",
      produits: [
        ["Fraisier", "Génoise, crème légère et fraises de saison"],
        ["Tarte aux fraises ou framboises", "Pâte sablée croustillante et fruits frais"],
        ["Tarte citron meringuée", "Acidulée, légère, irrésistible"]
      ],
      cta: { texte: "Toute la pâtisserie", lien: "patisserie.html" },
      etiquette: "Fruits de saison"
    }
  },
  {
    id: "ete", nom: "Été", debut: "06-21", fin: "09-22",
    emoji: "☀️", particules: "lucioles", ornement: "soleil", deco: null, bandeau: null,
    vedette: {
      surtitre: "Cet été à la boutique",
      titre: "L'été, ça se <em>croque</em>",
      texte: "Pique-nique, pause au bord de l'eau ou déjeuner sur le pouce : nos sandwichs du jour et nos tartes aux fruits vous accompagnent tout l'été.",
      produits: [
        ["Formule Gourmande à 9,90 €", "Sandwich + boisson + dessert du jour"],
        ["Tarte aux myrtilles", "Pâte sablée et crème d'amande fondante"],
        ["Baguette tradition", "Primée 2ème de l'Ain — l'indispensable du pique-nique"]
      ],
      cta: { texte: "Voir le snacking", lien: "snacking.html" },
      etiquette: "Spécial pique-nique"
    }
  },
  {
    id: "automne", nom: "Automne", debut: "09-23", fin: "12-20",
    emoji: "🍂", particules: "feuilles", ornement: "feuille", deco: null, bandeau: null,
    vedette: {
      surtitre: "Cet automne à la boutique",
      titre: "Noix, marrons <em>et chocolat</em>",
      texte: "Quand les feuilles tombent, on a envie de saveurs réconfortantes : pains aux fruits secs, crème de marron et entremets chocolatés.",
      produits: [
        ["Pain aux noix", "Riche et généreux, parfait avec les fromages"],
        ["Barquettes marron", "Pâte légère et crème de marron onctueuse"],
        ["Pain figues & noisettes", "Idéal avec un chèvre frais"]
      ],
      cta: { texte: "Découvrir nos pains", lien: "boulangerie.html" },
      etiquette: "Saveurs d'automne"
    }
  },
  {
    id: "hiver", nom: "Hiver", debut: "12-21", fin: "03-19",
    emoji: "❄️", particules: "neige", ornement: "bonnet", deco: null, bandeau: null,
    vedette: {
      surtitre: "Cet hiver à la boutique",
      titre: "Du réconfort <em>au chocolat</em>",
      texte: "Pour affronter le froid, rien de tel qu'une douceur chocolatée ou une part de brioche encore tiède.",
      produits: [
        ["Trois chocolats", "Trio de mousses noir, lait et blanc"],
        ["Forêt Noire", "Génoise chocolat, crème fouettée et griottes"],
        ["Brioche Nanterre", "Moelleuse et perlée de sucre"]
      ],
      cta: { texte: "Toute la pâtisserie", lien: "patisserie.html" },
      etiquette: "Douceurs d'hiver"
    }
  }
];

/* ==========================================================================
   Moteur — aucune modification nécessaire en dessous de cette ligne
   ========================================================================== */
(function () {
  "use strict";

  var stockage = {
    lire: function (k, session) { try { return (session ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
    ecrire: function (k, v, session) { try { (session ? sessionStorage : localStorage).setItem(k, v); } catch (e) {} },
    effacer: function (k, session) { try { (session ? sessionStorage : localStorage).removeItem(k); } catch (e) {} }
  };

  /* ---- Dates ---- */
  function jourParis() {
    // Date du jour à l'heure de Paris (évite les décalages)
    try {
      var p = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return new Date(+o.year, +o.month - 1, +o.day);
    } catch (e) { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  }
  function paques(an) { // algorithme de Meeus
    var a = an % 19, b = Math.floor(an / 100), c = an % 100, d = Math.floor(b / 4), e = b % 4,
        f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
        i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
        mois = Math.floor((h + l - 7 * m + 114) / 31), jour = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(an, mois - 1, jour);
  }
  function feteDesMeres(an) { // dernier dimanche de mai, ou 1er dimanche de juin si c'est la Pentecôte
    var d = new Date(an, 4, 31); d.setDate(31 - d.getDay());
    var pentecote = paques(an); pentecote.setDate(pentecote.getDate() + 49);
    if (d.getTime() === pentecote.getTime()) d.setDate(d.getDate() + 7);
    return d;
  }
  function feteDesPeres(an) { // 3e dimanche de juin
    var d = new Date(an, 5, 1); d.setDate(1 + ((7 - d.getDay()) % 7) + 14); return d;
  }
  function resoudre(expr, an) {
    var m = /^(paques|meres|peres)([+-]\d+)?$/.exec(expr);
    if (m) {
      var base = m[1] === "paques" ? paques(an) : m[1] === "meres" ? feteDesMeres(an) : feteDesPeres(an);
      base.setDate(base.getDate() + (m[2] ? parseInt(m[2], 10) : 0));
      return base;
    }
    var p = expr.split("-"); return new Date(an, +p[0] - 1, +p[1]);
  }
  function estDansPeriode(theme, jour) {
    var an = jour.getFullYear();
    // On teste l'année en cours et la précédente (pour les périodes à cheval sur deux années)
    for (var y = an - 1; y <= an; y++) {
      var d = resoudre(theme.debut, y), f = resoudre(theme.fin, y);
      if (f < d) f = resoudre(theme.fin, y + 1);
      if (jour >= d && jour <= f) return true;
    }
    return false;
  }

  var tous = EVENEMENTS.concat(SAISONS);
  function trouver(id) { for (var i = 0; i < tous.length; i++) if (tous[i].id === id) return tous[i]; return null; }
  function themeDuJour(jour) {
    for (var i = 0; i < EVENEMENTS.length; i++) if (EVENEMENTS[i].actif !== false && estDansPeriode(EVENEMENTS[i], jour)) return EVENEMENTS[i];
    for (var j = 0; j < SAISONS.length; j++) if (estDansPeriode(SAISONS[j], jour)) return SAISONS[j];
    return null;
  }

  /* ---- Choix du thème (avec aperçu forcé par l'adresse) ---- */
  var params = new URLSearchParams(location.search);
  var force = params.get("saison");
  if (force === "auto") stockage.effacer("gr-saison", true);
  else if (force && trouver(force)) stockage.ecrire("gr-saison", force, true);
  if (params.has("apercu")) stockage.ecrire("gr-apercu", "1", true);

  var theme = trouver(stockage.lire("gr-saison", true)) || themeDuJour(jourParis());
  var racine = document.documentElement;
  if (theme) racine.setAttribute("data-saison", theme.id);

  /* ---- Ornements SVG posés sur la grenouille du logo ---- */
  var ORNEMENTS = {
    bonnet: { style: "top:-7px;left:13px;width:36px;transform:rotate(-14deg)", svg:
      '<svg viewBox="0 0 64 50"><path d="M8 40 Q16 8 44 5 Q58 4 58 28 Q52 16 42 19 Q30 23 30 40Z" fill="#D2232A"/><path d="M14 30 Q22 12 40 9" stroke="#fff" stroke-opacity=".25" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="2" y="35" width="34" height="11" rx="5.5" fill="#fff"/><circle cx="57" cy="30" r="6.5" fill="#fff"/></svg>' },
    couronne: { style: "top:-6px;left:19px;width:27px;transform:rotate(-10deg)", svg:
      '<svg viewBox="0 0 40 30"><path d="M3 25 5 8l8 7 7-12 7 12 8-7 2 17z" fill="#F2C230" stroke="#9C6F0A" stroke-width="1.6" stroke-linejoin="round"/><rect x="3" y="22" width="34" height="6" rx="2" fill="#E0A91C" stroke="#9C6F0A" stroke-width="1.4"/><circle cx="20" cy="25" r="1.8" fill="#C8324B"/><circle cx="11" cy="25" r="1.5" fill="#2F6B9A"/><circle cx="29" cy="25" r="1.5" fill="#2F8A4B"/><circle cx="5" cy="8" r="2" fill="#F2C230" stroke="#9C6F0A"/><circle cx="20" cy="3" r="2" fill="#F2C230" stroke="#9C6F0A"/><circle cx="35" cy="8" r="2" fill="#F2C230" stroke="#9C6F0A"/></svg>' },
    ruban: { style: "top:4px;left:146px;width:14px", svg:
      '<svg viewBox="0 0 24 34"><path d="M7 32 15.5 15Q19.5 7 15 4.2 12 2.6 9 4.2 4.5 7 8.5 15L17 32" fill="none" stroke="#fff" stroke-width="6.5" stroke-linecap="round"/><path d="M7 32 15.5 15Q19.5 7 15 4.2 12 2.6 9 4.2 4.5 7 8.5 15L17 32" fill="none" stroke="#E0457B" stroke-width="3.8" stroke-linecap="round"/></svg>' },
    coeur: { style: "top:6px;left:145px;width:17px;transform:rotate(12deg)", svg:
      '<svg viewBox="0 0 24 22"><path d="M12 21S3 15.5 1.5 10A5.6 5.6 0 0 1 12 5a5.6 5.6 0 0 1 10.5 5C21 15.5 12 21 12 21z" fill="#E03A5A" stroke="#fff" stroke-width="2"/></svg>' },
    oeuf: { style: "top:4px;left:146px;width:15px;transform:rotate(14deg)", svg:
      '<svg viewBox="0 0 20 26"><ellipse cx="10" cy="14" rx="8.5" ry="11" fill="#F9C9DA" stroke="#fff" stroke-width="2"/><path d="M2.5 13l2.5-2.2 2.5 2.2 2.5-2.2 2.5 2.2 2.5-2.2 2.5 2.2" stroke="#6FB0E3" stroke-width="2" fill="none" stroke-linejoin="round"/><circle cx="7" cy="19" r="1.4" fill="#F2C230"/><circle cx="13" cy="19" r="1.4" fill="#8BC56A"/><circle cx="10" cy="6.5" r="1.4" fill="#8BC56A"/></svg>' },
    fleur: { style: "top:-5px;left:3px;width:20px", svg:
      '<svg viewBox="0 0 24 24"><g fill="#F7A8C4" stroke="#fff" stroke-width="1"><circle cx="12" cy="5.5" r="5"/><circle cx="18.2" cy="10" r="5"/><circle cx="15.8" cy="17.4" r="5"/><circle cx="8.2" cy="17.4" r="5"/><circle cx="5.8" cy="10" r="5"/></g><circle cx="12" cy="12" r="3.6" fill="#F2C230"/></svg>' },
    feuille: { style: "top:2px;left:145px;width:18px;transform:rotate(28deg)", svg:
      '<svg viewBox="0 0 24 24"><path d="M12 1.5C5 6 3.5 13 6.5 19c2.6 2.6 7.5 2.4 9.8-.6C20 13.5 18.5 6 12 1.5z" fill="#D9661F" stroke="#fff" stroke-width="1.4"/><path d="M12 5v17M12 11l-3.5-2.5M12 15l4-3" stroke="#8A3D0C" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>' },
    moustache: { style: "top:21px;left:27px;width:22px;transform:rotate(-10deg)", svg:
      '<svg viewBox="0 0 64 24"><path d="M32 9C28 3 20 1 14 5 10 8 8 13 2 12c4 6 14 9 22 4 4-2 6-5 8-7 2 2 4 5 8 7 8 5 18 2 22-4-6 1-8-4-12-7-6-4-14-2-18 4z" fill="#3A2A1F" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>' },
    soleil: { style: "top:-6px;left:140px;width:22px", svg:
      '<svg viewBox="0 0 24 24"><g stroke="#F2A81D" stroke-width="2.2" stroke-linecap="round"><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></g><circle cx="12" cy="12" r="5" fill="#F7C531" stroke="#fff" stroke-width="1.2"/></svg>' }
  };

  function echapper(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---- Application sur la page ---- */
  function appliquer() {
    if (!theme) return;

    // 1. Accessoire sur le logo
    var orn = ORNEMENTS[theme.ornement];
    if (orn) document.querySelectorAll(".logo").forEach(function (logo) {
      var s = document.createElement("span");
      s.className = "logo__ornement"; s.setAttribute("aria-hidden", "true");
      s.style.cssText = orn.style; s.innerHTML = orn.svg;
      logo.appendChild(s);
    });

    // 2. Badge de saison dans le héros de l'accueil
    var badge = document.getElementById("badge-saison");
    if (badge && theme.heros) {
      badge.querySelector(".badge__titre").textContent = theme.heros.titre;
      badge.querySelector(".badge__texte").textContent = theme.heros.texte;
      badge.classList.add("est-visible");
    }

    // 3. Encadré « Ce mois-ci » sur l'accueil
    var v = document.getElementById("vedette-saison");
    if (v && theme.vedette) {
      var ve = theme.vedette;
      v.querySelector("[data-v=etiquette]").textContent = ve.etiquette || theme.nom;
      v.querySelector("[data-v=surtitre]").textContent = ve.surtitre;
      v.querySelector("[data-v=titre]").innerHTML = ve.titre; // <em> autorisé
      v.querySelector("[data-v=texte]").textContent = ve.texte;
      v.querySelector("[data-v=produits]").innerHTML = ve.produits.map(function (p) {
        return "<li><div><strong>" + echapper(p[0]) + "</strong><span>" + echapper(p[1]) + "</span></div></li>";
      }).join("");
      var cta = v.querySelector("[data-v=cta]");
      cta.href = ve.cta.lien; cta.querySelector("span").textContent = ve.cta.texte;
      v.hidden = false;
    }
  }

  /* ---- Panneau de test : un bouton par décor ---- */
  function panneauApercu() {
    if (!MODE_TEST && stockage.lire("gr-apercu", true) !== "1") return;
    var choisi = stockage.lire("gr-saison", true) || "auto";
    var auto = themeDuJour(jourParis());
    var d = document.createElement("div");
    d.className = "test-saisons";
    var liste = [{ id: "auto", nom: "Automatique", emoji: "📅", info: auto ? "aujourd'hui : " + auto.nom : "" }].concat(tous);
    var html = '<button type="button" class="test-saisons__ouvrir" aria-expanded="false">🎨 Tester les saisons</button>' +
      '<div class="test-saisons__panneau" hidden><div class="test-saisons__titre">Choisir un décor</div><div class="test-saisons__grille">';
    liste.forEach(function (t) {
      html += '<button type="button" data-id="' + t.id + '"' + (t.id === choisi ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' +
        '<span aria-hidden="true">' + (t.emoji || "") + "</span>" + t.nom + (t.actif === false ? " <small>(désactivé)</small>" : "") +
        (t.info ? " <small>" + t.info + "</small>" : "") + "</button>";
    });
    html += "</div></div>";
    d.innerHTML = html;
    var ouvrir = d.querySelector(".test-saisons__ouvrir"), panneau = d.querySelector(".test-saisons__panneau");
    ouvrir.addEventListener("click", function () {
      var o = panneau.hidden; panneau.hidden = !o; ouvrir.setAttribute("aria-expanded", o ? "true" : "false");
    });
    d.querySelectorAll("[data-id]").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-id");
        if (id === "auto") stockage.effacer("gr-saison", true); else stockage.ecrire("gr-saison", id, true);
        var u = new URL(location.href); u.searchParams.delete("saison"); u.searchParams.delete("apercu");
        location.href = u.toString();
      });
    });
    document.body.appendChild(d);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { appliquer(); panneauApercu(); });
  else { appliquer(); panneauApercu(); }
})();
