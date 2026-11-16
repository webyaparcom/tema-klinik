/* ekip-sahne — Ekip sahnesi: büyük portre + üye listesi (15 Kas 2026, G4 · mcp:webmaker/20261115-202337-k60m · D17–D18).
   Yer tutucular: ekssinif eksust eksbaslik eksmetin ekssekmeler ekspaneller eksetiket.
   data: [{ ad, unvan?, metin?, img?, eposta?, social?: [{ ad, url }] }] — unvan/metin dil sözlüğü, ad düz metin ya da sözlük.
   Sekme kalıbı (role=tablist): listedeki üye seçilince sahnedeki portre/biyografi değişir; JS'siz tüm paneller alt alta görünür.
   Görsel yoksa baş harfler. Üye sosyal bağlantıları yalnız http(s) (wmSocialBar site hesabı içindir, üyeye uymaz). Veri yoksa blok basılmaz. */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `/img/${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];

const uyeler = veri
  .map((o) => ({ ad: pick(o && o.ad).trim(), unvan: pick(o && o.unvan).trim(), metin: pick(o && o.metin).trim(), img: medyaUrl(o && o.img), eposta: String((o && o.eposta) || "").trim(), social: Array.isArray(o && o.social) ? o.social : [] }))
  .filter((o) => o.ad);

const basHarf = (ad) => ad.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => [...p][0] || "").join("").toLocaleUpperCase(json.lang);
const sosyal = (liste) => {
  if (!liste.length) return "";
  const ogeler = liste.map((s) => ({ ad: pick(s && s.ad).trim(), url: href(s && s.url) })).filter((s) => s.ad && s.url && /^https?:/i.test(s.url));
  return ogeler.length ? `<ul class="modulex-eks-sosyal">${ogeler.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.ad)}</a></li>`).join("")}</ul>` : "";
};

const eksSekmeler = uyeler.map((u, i) =>
  `<button class="modulex-eks-sekme" type="button" role="tab" id="eks-{{id}}-s${i}" aria-controls="eks-{{id}}-p${i}" aria-selected="${i === 0 ? "true" : "false"}" tabindex="${i === 0 ? "0" : "-1"}">`
  + (u.img ? `<img class="modulex-eks-kucuk" src="${esc(u.img)}" alt="" width="96" height="96" loading="lazy" decoding="async" />` : `<span class="modulex-eks-kucuk modulex-eks-harf" aria-hidden="true">${esc(basHarf(u.ad))}</span>`)
  + `<span class="modulex-eks-sekme-metin"><span class="modulex-eks-sekme-ad">${esc(u.ad)}</span>${u.unvan ? `<span class="modulex-eks-sekme-unvan">${esc(u.unvan)}</span>` : ""}</span>`
  + "</button>").join("");

const eksPaneller = uyeler.map((u, i) =>
  `<article class="modulex-eks-panel" role="tabpanel" id="eks-{{id}}-p${i}" aria-labelledby="eks-{{id}}-s${i}"${i === 0 ? "" : " data-gizli"}>`
  + '<div class="modulex-eks-portre">'
  + (u.img ? `<img src="${esc(u.img)}" alt="${esc(u.ad)}" width="720" height="900" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" />` : `<span class="modulex-eks-harf modulex-eks-harf--buyuk" aria-hidden="true">${esc(basHarf(u.ad))}</span>`)
  + "</div>"
  + '<div class="modulex-eks-bilgi">'
  + `<p class="modulex-eks-no" aria-hidden="true">${String(i + 1).padStart(2, "0")} / ${String(uyeler.length).padStart(2, "0")}</p>`
  + `<h3 class="modulex-eks-ad">${esc(u.ad)}</h3>`
  + (u.unvan ? `<p class="modulex-eks-unvan">${esc(u.unvan)}</p>` : "")
  + (u.metin ? `<p class="modulex-eks-metin">${satirlar(u.metin)}</p>` : "")
  + (u.eposta && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.eposta) ? `<a class="modulex-eks-eposta" href="mailto:${esc(u.eposta)}"><span class="material-symbols-outlined" aria-hidden="true">mail</span>${esc(u.eposta)}</a>` : "")
  + sosyal(u.social)
  + "</div></article>").join("");

const ust = pick(des.ust).trim();
const baslik = pick(des.baslik).trim();
const metin = pick(des.metin).trim();

html = html
  .replaceAll("{{ekssinif}}", () => (ust || baslik || metin ? "" : " modulex-eks--bassiz") + (uyeler.length === 1 ? " modulex-eks--tek" : ""))
  .replaceAll("{{eksust}}", () => (ust ? `<p class="modulex-eks-ust">${esc(ust)}</p>` : ""))
  .replaceAll("{{eksbaslik}}", () => (baslik ? `<h2 class="modulex-eks-baslik" id="eks-{{id}}-baslik">${esc(baslik)}</h2>` : ""))
  .replaceAll("{{eksmetin}}", () => (metin ? `<p class="modulex-eks-giris">${satirlar(metin)}</p>` : ""))
  .replaceAll("{{eksetiket}}", () => (baslik ? 'aria-labelledby="eks-{{id}}-baslik"' : ""))
  .replaceAll("{{ekssekmeler}}", () => eksSekmeler)
  .replaceAll("{{ekspaneller}}", () => eksPaneller);
if (!uyeler.length) html = "";
