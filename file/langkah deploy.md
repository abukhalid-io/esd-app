# 📦 LANGKAH DEPLOY PDM/ESD MONITORING KE GITHUB PAGES

Panduan lengkap untuk deploy aplikasi web ini ke GitHub Pages.

---

## PRASYARAT

- Akun GitHub (buat di https://github.com jika belum punya)
- Git terinstall di komputer
- Repository kosong di GitHub (belum berisi kode)

---

## 🔐 Default Login Credentials

| Role     | Username   | Password     |
|----------|------------|--------------|
| Admin    | admin      | admin123     |
| Engineer | engineer   | engineer123  |
| Operator | operator   | operator123  |

---

## LANGKAH 1: Buat Repository Baru di GitHub

1. Buka https://github.com/new
2. Isi form:
   - **Repository name:** `pdmesd-monitoring` (atau nama lain yang kamu suka)
   - **Description:** `Sistem Monitoring Tag DCS Industrial untuk PDM/ESD`
   - **Visibility:** Public (GitHub Pages gratis hanya untuk public repo)
   - ✅ **DO NOT** centang "Add a README file" (karena kita sudah punya)
3. Klik **Create repository**

---

## LANGKAH 2: Push Kode ke GitHub

Buka terminal/Command Prompt, lalu jalankan perintah berikut:

```bash
# Masuk ke folder proyek
cd "C:\Users\randex\Desktop\proyek psd esd"

# Inisialisasi git (jika belum pernah)
git init

# Tambah semua file
git add .

# Commit pertama
git commit -m "Initial commit: PDM/ESD Monitoring System"

# Rename branch ke main
git branch -M main

# Tambah remote origin (ganti USERNAME dengan username GitHub kamu)
git remote add origin https://github.com/USERNAME/pdmesd-monitoring.git

# Push ke GitHub
git push -u origin main
```

> ⚠️ **Penting:** Ganti `USERNAME` dengan username GitHub kamu yang sebenarnya!

---

## LANGKAH 3: Enable GitHub Pages

1. Buka repository GitHub yang baru dibuat
2. Klik tab **Settings** (di menu atas repository)
3. Scroll ke bagian **Pages** (sidebar kiri)
4. Pada section **Build and deployment**:
   - **Source:** Pilih **Deploy from a branch**
   - **Branch:** Pilih **main** dan **(root)**
5. Klik tombol **Save**
6. Tunggu 1-2 menit untuk proses deployment

---

## LANGKAH 4: Verifikasi Deployment

1. Buka tab **Actions** di repository
2. Lihat workflow yang sedang berjalan (atau sudah selesai)
3. Jika berhasil, akan muncul tanda ✅ hijau
4. Buka link aplikasi di: `https://USERNAME.github.io/pdmesd-monitoring/`

> 💡 **Tips:** Link akan aktif setelah GitHub Pages selesai build (biasanya 1-5 menit)

---

## STRUKTUR DEPLOYMENT

```
GitHub Repository
├── index.html           ← Landing page (root)
├── docs/
│   └── index.html       ← Aplikasi utama (ini yang di-deploy)
├── data/                ← Data TAG
├── scripts/             ← Script Python
└── README.md            ← Dokumentasi
```

GitHub Pages akan serve file dari root, dan otomatis mengarahkan ke `docs/index.html`.

---

## CARA UPDATE APLIKASI

Setelah ada perubahan, jalankan:

```bash
cd "C:\Users\randex\Desktop\proyek psd esd"

# Tambah file yang berubah
git add .

# Commit dengan pesan deskriptif
git commit -m "Update: [deskripsi perubahan]"

# Push ke GitHub
git push
```

GitHub Actions akan otomatis re-deploy aplikasi.

---

## PENJELASAN FILE-FILE PENTING

| File | Fungsi |
|------|--------|
| `.github/workflows/deploy.yml` | Konfigurasi GitHub Actions untuk auto-deploy |
| `docs/index.html` | Aplikasi utama (yang di-deploy) |
| `index.html` | Landing page untuk root URL |
| `.gitignore` | File yang tidak di-upload ke GitHub |
| `README.md` | Dokumentasi project |

---

## TROUBLESHOOTING

### ❌ Error "Failed to deploy"

1. Cek tab **Actions** untuk melihat error details
2. Pastikan repository adalah **Public** (bukan Private)
3. Pastikan GitHub Pages sudah enabled di Settings

### ❌ Error "404 Page Not Found"

1. Tunggu beberapa menit setelah enable GitHub Pages
2. Pastikan branch dan folder sudah benar (main / root)
3. Cek apakah file `docs/index.html` ada di repository

### ❌ Error git push rejected

1. Jika remote sudah ada, force push:
```bash
git push -u origin main --force
```

---

## CUSTOM DOMAIN (Optional)

Jika ingin pakai domain sendiri:

1. Buka Settings → Pages
2. Tambahkan domain di field **Custom domain**
3. Buat CNAME file di repository (opsional)
4. Tunggu DNS verification (bisa sampai 24 jam)

---

## KONTAK

Jika ada pertanyaan, buat Issue di repository GitHub.

---

**Happy Coding! 🎉**
