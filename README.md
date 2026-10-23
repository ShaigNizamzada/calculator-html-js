# Kalkulyator

HTML, CSS və JavaScript ilə hazırlanmış sadə və responsive kalkulyator. Heç bir kitabxana və ya server tələb etmir.

## Xüsusiyyətlər

- Toplama, çıxma, vurma, bölmə
- AC (hamısını sil), ⌫ (son rəqəmi sil), ± (işarəni dəyiş), % (faiz)
- Onluq kəsrlər (`0,1 + 0,2 = 0,3`)
- Sıfıra bölmədə "Xəta" göstərilir
- Klaviatura dəstəyi: rəqəmlər, `+ - * /`, `Enter` və ya `=`, `Backspace`, `Esc`, `%`, `.` və `,`
- Mobil və masaüstü üçün uyğun dizayn

> Qeyd: hesablama soldan sağa ardıcıl aparılır (məsələn, `2 + 3 × 4 = 20`), adi cib kalkulyatorları kimi.

## Texnologiyalar

- HTML5
- CSS3 (Grid, CSS dəyişənləri)
- Vanilla JavaScript

## Lokal işə salma

```bash
git clone <repo-linki>
cd <repo-adı>
# index.html faylını brauzerdə açın, və ya:
python3 -m http.server 8000
# sonra http://localhost:8000 ünvanına keçin
```

## Test

Hesablama məntiqini yoxlamaq üçün (Node.js lazımdır):

```bash
node test.js
```

## Fayl strukturu

| Fayl | Təsvir |
|------|--------|
| `index.html` | Səhifənin strukturu |
| `style.css` | Dizayn |
| `calc.js` | Hesablama məntiqi |
| `script.js` | Düymə və klaviatura idarəsi |
| `test.js` | Məntiq testləri |

## Canlı link

https://calculator-html-js-zeta.vercel.app
