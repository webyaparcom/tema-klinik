# tema-klinik · 9ovvk0 — Ekip 1

## Nedir

tema-klinik sitesinin matrix modülü. `Ekip 1` şablonu (section kökü,
sınıf `modulex-team`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (1 KB) |
| `index.html` | Modül şablonu (render hedefi) (3 KB) |
| `index.jpeg` | Önizleme görseli (39 KB) |
| `index.json` | Veri + tema token'ları (1 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `bgcolor` | `#ffffff` |
| `cardbg` | `#f8fafc` |
| `bordercolor` | `#e2e8f0` |
| `titlecolor` | `#1e293b` |
| `textcolor` | `#475569` |
| `accent` | `#DE6D26` |
| `badge` | `{'tr': 'Ekibimiz', 'en': 'Our Team'}` |

- `name`: `Ekip 1`
- `data`: 3 kayıt. Örnek: `{"name": "Ad Soyad", "role": {"tr": "Kurucu / CEO", "en": "Founder / CEO"}, "bio": {"tr": "10+ yıllık sektör deneyimi ile strateji ve yönet…`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **bgcolor**, **cardbg**, **bordercolor**, **titlecolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-team`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-klinik sitesinde `web/matrix/modules/9ovvk0/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Ekip 1",
  "desing": {
    "max": "1200px",
    "bgcolor": "#ffffff",
    "cardbg": "#f8fafc",
    "bordercolor": "#e2e8f0",
    "titlecolor": "#1e293b",
    "textcolor": "#475569",
    "accent": "#DE6D26",
    "badge": {
      "tr": "Ekibimiz",
      "en": "Our Team"
    },
    "title": {
      "tr": "Uzman Kadromuzla Tanışın",
      "en": "Meet Our Experts"
    },
    "description": {
      "tr": "Alanında deneyimli ekibimiz projelerinize değer katmak için burada.",
      "en": "Our experienced team is here to add value to your projects."
    }
  },
  "data": [
    {
      "name": "Ad Soyad",
      "role": {
        "tr": "Kurucu / CEO",
        "en": "Founder / CEO"
      },

```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
