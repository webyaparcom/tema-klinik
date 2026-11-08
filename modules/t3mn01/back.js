try {

  var wxPublicSlug = function(it) {
    if (!it) return "";
    var n = it.pathnext;
    if (n != null && String(n).trim() !== "") return String(n).trim();
    return it.path != null ? String(it.path) : "";
  };

  var pagesettingjson = webmakerdata.pagesetting.data.find(
    function(item) { return item.modulestatus && item.modulestatus.page; },
  );
  var backhtml = `<a href="${wxLangInternalHref('')}">@home@ </a>`;
  if (pagesettingjson) {
    // Iterate over the relevant data to create HTML content
    for (var iterator of webmakerdata[pagesettingjson.path].data) {
      if (iterator.status == "play" && iterator.category == "") {
        if (wxPublicSlug(page) == wxPublicSlug(iterator)) {
          backhtml += `<a class="modulex-menu-list-active" href="${wxLangInternalHref(
            wxPublicSlug(iterator),
          )}">${iterator.name[json.lang]}</a>`;
        } else {
          backhtml += `<a href="${wxLangInternalHref(wxPublicSlug(iterator))}">${
            iterator.name[json.lang]
          }</a>`;
        }
      }
    }
    // Replace the placeholder {{html}} with the generated backhtml content
    html = html.replace(new RegExp("{{html}}", "g"), backhtml);
  }
  // Dil linkleri: bulunulan sayfada kalsın (ana sayfa değilse aynı path ile dil değişsin)
  langhtml = "";
  var langCount = 0;
  var currentPagePath = wxPublicSlug(page);
  for (var key in webmakerdata.setting.langs) {
    if (webmakerdata.setting.langs[key] == true) {
      langCount++;
      var langUrl = wxLangHref(key, currentPagePath || "");
      langhtml += `<li><a href="${langUrl}"><img height="25" src="/src/lang/${key}.png" alt="${key}" loading="lazy"></a></li>`;
    }
  }
  // Eğer sadece 1 dil varsa dil seçiciyi gösterme
  if (langCount <= 1) {
    langhtml = "";
  }
  html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);
} catch (error) {
  console.log("menu-2-b back.js", error);
}
