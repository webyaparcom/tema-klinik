# tema-klinik · nr66u4 — Metin Modülü

## Nedir

tema-klinik sitesinin matrix modülü. `Metin Modülü` şablonu (div kökü,
sınıf `modulex-text-module-body`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (0 KB) |
| `index.html` | Modül şablonu (render hedefi) (1 KB) |
| `index.jpeg` | Önizleme görseli (6 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `name` | `{'tr': 'Metin içeriği', 'en': 'Text content'}` |
| `bgcolor` | `#f5f5f5` |
| `padding` | `20px 16px` |
| `margin` | `12px 0` |
| `font-size` | `18px` |
| `color` | `#333333` |

- `name`: `Metin Modülü`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **name**, **bgcolor**, **padding**, **margin**, **font-size**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-text-module-body`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-klinik sitesinde `web/matrix/modules/nr66u4/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Metin Modülü",
  "desing": {
    "name": {
      "tr": "Metin içeriği",
      "en": "Text content"
    },
    "bgcolor": "#f5f5f5",
    "padding": "20px 16px",
    "margin": "12px 0",
    "font-size": "18px",
    "color": "#333333"
  },
  "data": null
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
