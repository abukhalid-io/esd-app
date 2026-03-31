# PDM/ESD Monitoring System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Web%20App-orange)

Sistem Monitoring Tag DCS Industrial untuk PDM/ESD (Process Data Management / Emergency Shutdown System).

## 🎯 Fitur Utama

- **Dashboard Real-time** - Statistik status TAG dengan visualisasi progress
- **Data TAG** - Kelola 280+ TAG instrumentasi dengan filtering dan sorting
- **Input Batch** - Input reading otomatis berurutan dari TAG pertama (klik → input → next)
- **Edit Data** - Edit data TAG yang sudah ada
- **Export/Import Excel** - Download dan upload data dalam format .xlsx
- **Audit Log** - Lacak semua aktivitas pengguna
- **Multi-user** - Sistem login dengan role (Admin, Engineer, Operator)

## 🚀 Cara Menjalankan

### Opsi 1: GitHub Pages (Recommended)

1. Fork repository ini
2. Enable GitHub Pages di Settings → Pages → Source: main branch
3. Akses aplikasi di `https://[username].github.io/[repo-name]/docs/`

### Opsi 2: Local Development

1. Clone repository:
```bash
git clone https://github.com/username/pdmesd-monitoring.git
cd pdmesd-monitoring
```

2. Jalankan dengan local server:
```bash
# Python 3
python -m http.server 8000

# atau dengan Node.js
npx serve .
```

3. Buka browser di `http://localhost:8000/docs/`

## 📋 Default Credentials

| Role     | Username   | Password     |
|----------|------------|--------------|
| Admin    | admin      | admin123     |
| Engineer | engineer   | engineer123  |
| Operator | operator   | operator123  |

## 📊 Status TAG

| Status  | Kondisi                    | Warna   |
|---------|---------------------------|---------|
| Normal  | Reading < 90% MAX         | 🟢 Hijau |
| Warning | 90% MAX ≤ Reading ≤ MAX   | 🟡 Kuning |
| Critical| Reading > MAX             | 🔴 Merah |
| Empty   | Belum ada input            | ⚪ Abu   |

## 📝 Cara Input Batch (Otomatis)

Fitur Input Batch memungkinkan input data reading secara berurutan dari TAG pertama:

1. **Buka menu "Input Batch"** dari sidebar
2. **Klik "Mulai Input"** untuk memulai dari TAG pertama
3. **Input nilai reading** di field yang tersedia
4. **Tekan Enter** atau klik **"Simpan & Next"** untuk menyimpan dan otomatis ke TAG berikutnya
5. **Gunakan "Skip"** jika ingin melewati TAG tertentu
6. **Progress tersimpan otomatis** - bisa resume kapan saja

### Keyboard Shortcut:
| Key | Fungsi |
|-----|--------|
| `Enter` | Simpan & Next |
| `Tab` | Pindah field |
| `Esc` | Skip TAG |

### Fitur Tambahan:
- **Progress Bar** - melihat persentase completion
- **Resume** - continue dari posisi terakhir
- **Quick Jump** - lompat ke TAG tertentu
- **Filter** - filter berdasarkan ESD/DCS atau Status

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.2
- **Icons**: Bootstrap Icons
- **Data Processing**: SheetJS (XLSX)
- **Storage**: localStorage (client-side)

## 📁 Struktur Project

```
pdmesd-monitoring/
├── index.html              # Landing page
├── README.md               # Dokumentasi
├── .gitignore              # Git ignore rules
├── docs/
│   └── index.html          # Main application
├── data/
│   ├── tags.json           # Data TAG (286 entries)
│   └── PDMESD.xlsx         # Source Excel file
└── scripts/
    └── excel_to_json.py    # Python script untuk convert Excel ke JSON
```

## 🔧 Development

### Convert Excel ke JSON

Jika ada update data di Excel, jalankan script Python:

```bash
cd scripts
python excel_to_json.py
```

### Deploy to GitHub Pages

1. Push changes ke branch `main`
2. GitHub Pages akan otomatis deploy dari folder `docs/`

## 📱 Screenshots

<details>
<summary>Klik untuk melihat screenshot</summary>

### Login Page
![Login](https://via.placeholder.com/800x500/1E3C72/FFFFFF?text=Login+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x500/2A5298/FFFFFF?text=Dashboard)

### Data TAG
![Data TAG](https://via.placeholder.com/800x500/17A2B8/FFFFFF?text=Data+TAG)

</details>

## 📝 License

MIT License - Silakan gunakan untuk proyek apapun.

## 👥 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📧 Kontak

Untuk pertanyaan atau kolaborasi, silakan buat Issue di repository ini.

---

Built with ❤️ for Industrial Plant Monitoring
