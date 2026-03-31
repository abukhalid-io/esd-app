=============================================================================
                    PDM/ESD MONITORING SYSTEM - PROJECT BRIEF
=============================================================================

JUDUL PROJECT:
Sistem Monitoring Tag DCS Industrial untuk PDM/ESD (Process Data Management / 
Emergency Shutdown System)

TUJUAN:
Membangun aplikasi web-based untuk monitoring, input, dan validasi reading 
value dari 280+ TAG instrumentasi di plant industri dengan validasi otomatis 
terhadap batas MAX limit.

=============================================================================

Aplikasi ini digunakan untuk:
- Monitoring nilai reading dari DCS (Distributed Control System)
- Validasi otomatis apakah nilai reading masih dalam batas aman (MAX limit)
- Recording data checking untuk audit dan compliance
- Early warning system untuk nilai yang mendekati atau melebihi batas MAX
- Reporting dan export data untuk management review

User yang akan menggunakan:
- Operator Plant (input reading harian/shift)
- Engineer (analisa dan review data)
- Manager (monitoring dan reporting)

FRONTEND:
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3+ untuk responsive design
- Bootstrap Icons untuk iconography
- SheetJS (XLSX) untuk export/import Excel

BACKEND (Pilih salah satu):
┌─────────────────────────────────────────────────────────────────┐
│ Opsi A - Firebase (Recommended untuk cloud)                    │
│ - Firebase Authentication (Email/Password)                     │
│ - Firestore Database (NoSQL)                                   │
│ - Firebase Hosting                                             │
│ - Real-time updates                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Opsi B - Supabase (Alternative)                                │
│ - Supabase Auth                                                │
│ - PostgreSQL Database                                          │
│ - Row Level Security                                           │
│ - Real-time subscription                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Opsi C - Traditional PHP + MySQL (On-Premise)                  │
│ - PHP 8.0+                                                     │
│ - MySQL/MariaDB                                                │
│ - Apache/Nginx Web Server                                      │
│ - JWT untuk session management                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Opsi D - localStorage (Untuk demo/testing)                     │
│ - Client-side storage only                                     │
│ - No backend required                                          │
│ - Data per-browser                                             │
└─────────────────────────────────────────────────────────────────┘

-- Tabel Utama: pdmesd_tags
CREATE TABLE pdmesd_tags (
    id              VARCHAR(50) PRIMARY KEY,
    tag_no          VARCHAR(50) NOT NULL,      -- FT-1257, FIC-1020, dll
    tag_dcs         VARCHAR(50) NOT NULL,      -- FI-1257, FIC-1020, dll
    service         VARCHAR(200),              -- 102-B SCTN FLOW ESD
    io_loc          VARCHAR(20),               -- ESD atau DCS
    io_type         VARCHAR(20),               -- AI (Analog Input)
    max_limit       DECIMAL(15,2) NOT NULL,    -- 212500, 600, 100, dll
    unit            VARCHAR(20),               -- Nm3/h, kg/hr, degC, %, dll
    reading_value   DECIMAL(15,2),             -- Nilai input dari user
    tx_condition    VARCHAR(50),               -- Normal, Maintenance, Calibration, Bypass
    date_checked    DATETIME,                  -- Tanggal input reading
    notes           TEXT,                      -- Catatan tambahan
    status          VARCHAR(20),               -- Normal, Warning, Critical (auto-calculated)
    created_at      DATETIME DEFAULT NOW(),
    updated_at      DATETIME DEFAULT NOW(),
    created_by      VARCHAR(100),
    updated_by      VARCHAR(100)
);

-- Tabel Users
CREATE TABLE users (
    id              VARCHAR(50) PRIMARY KEY,
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(20),               -- admin, operator, engineer
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      DATETIME DEFAULT NOW(),
    last_login      DATETIME
);

-- Tabel Audit Log
CREATE TABLE audit_log (
    id              VARCHAR(50) PRIMARY KEY,
    user_id         VARCHAR(50),
    action          VARCHAR(50),               -- CREATE, UPDATE, DELETE, LOGIN, LOGOUT
    table_name      VARCHAR(50),
    record_id       VARCHAR(50),
    old_value       JSON,
    new_value       JSON,
    created_at      DATETIME DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX idx_tag_dcs ON pdmesd_tags(tag_dcs);
CREATE INDEX idx_service ON pdmesd_tags(service);
CREATE INDEX idx_status ON pdmesd_tags(status);
CREATE INDEX idx_date_checked ON pdmesd_tags(date_checked);

LOGIN SYSTEM:
- Username/Email + Password
- Session management dengan token (JWT atau Firebase Auth)
- Remember me option
- Password encryption (bcrypt atau Argon2)
- Failed login attempt limit (max 5x, lock 15 menit)
- Password reset via email

USER ROLES:
┌─────────────┬────────────────────────────────────────────────────┐
│ Role        │ Permission                                         │
├─────────────┼────────────────────────────────────────────────────┤
│ Admin       │ Full access (CRUD + User Management + Settings)   │
│ Engineer    │ Read + Write + Export + Edit                      │
│ Operator    │ Read + Write (Input reading only)                 │
│ Viewer      │ Read only + Export                                │
└─────────────┴────────────────────────────────────────────────────┘

DEFAULT CREDENTIALS (Development):
- Admin: admin@pdmesd.com / admin123
- Engineer: engineer@pdmesd.com / engineer123
- Operator: operator@pdmesd.com / operator123

DASHBOARD HOMEPAGE:
- Statistics Cards:
  * Total Tags (280+)
  * Normal Status (Green)
  * Warning Status (Yellow - 90-100% MAX)
  * Critical Status (Red - >100% MAX)
  * Belum Diinput (Gray)

- Quick Filters:
  * Search by TAG DCS
  * Filter by Service
  * Filter by I/O Location (ESD/DCS)
  * Filter by Status
  * Filter by Date Range

- Data Table:
  * Pagination (10/25/50/100 rows per page)
  * Sortable columns
  * Export button per page
  * Bulk actions (select multiple)
  
  INPUT DATA READING:
1. User mencari TAG DCS (autocomplete/search)
2. System menampilkan detail TAG:
   - TAG No.
   - TAG DCS
   - Service
   - MAX Limit
   - Unit
   - I/O Location
   - I/O Type
   
3. User input Reading Value
4. System auto-calculate status:
   - Normal: reading < 90% MAX
   - Warning: reading 90-100% MAX
   - Critical: reading > 100% MAX
   
5. User input tambahan:
   - Tx Condition (Normal/Maintenance/Calibration/Bypass)
   - Date Checked (auto-fill current datetime)
   - Notes (optional)
   
6. Validation:
   - Reading value harus numerik
   - Reading value tidak boleh negatif
   - Jika Critical, show confirmation dialog
   - Required fields validation
   
7. Save data dengan audit trail

EXPORT TO EXCEL:
- Format: .xlsx (Excel 2007+)
- Export Options:
  * Semua Data (full database)
  * Data Terfilter (sesuai search/filter aktif)
  * Summary Report (statistik only)
  * Critical & Warning Only (issue tracking)
  
- Excel Features:
  * Header dengan styling (color, bold)
  * Auto column width
  * Multiple sheets (Data + Summary)
  * Filename dengan timestamp
  
- Columns in Export:
  No | TAG No. | TAG DCS | Service | I/O Loc | MAX | Unit | 
  Reading | Status | Tx Condition | Date Checked | Notes

IMPORT FROM EXCEL:
- Template download available
- Validation before import
- Duplicate handling (skip/update/merge)
- Import summary report
- Rollback option

SEARCH CAPABILITIES:
- Full-text search on TAG DCS
- Search on TAG No.
- Search on Service name
- Search on Notes

FILTER OPTIONS:
- I/O Location: ESD / DCS / All
- Status: Normal / Warning / Critical / Belum Diinput
- Date Range: From - To
- Tx Condition: Normal / Maintenance / Calibration / Bypass
- Unit Type: % / degC / kg/hr / Nm3/h / etc.

ADVANCED FILTER:
- Combination of multiple filters
- Save filter presets
- Share filter via URL

STANDARD REPORTS:
1. Daily Monitoring Report
   - All tags with reading for selected date
   - Summary statistics
   - Critical/Warning highlights
   
2. Weekly/Monthly Summary
   - Trend analysis
   - Comparison with previous period
   - Top 10 Critical tags
   
3. Compliance Report
   - Tags with missing readings
   - Tags frequently in Warning/Critical
   - Audit trail summary
   
4. Management Dashboard
   - KPI charts
   - Status distribution pie chart
   - Trend line charts
   
   COLOR SCHEME:
- Primary: #1E3C72 (Dark Blue)
- Secondary: #2A5298 (Blue)
- Success: #28A745 (Green) - Normal status
- Warning: #FFC107 (Yellow) - Warning status
- Danger: #DC3545 (Red) - Critical status
- Info: #17A2B8 (Cyan)
- Light: #F8F9FA
- Dark: #343A40

TYPOGRAPHY:
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Base Font Size: 14px
- Heading: 18px-24px
- Body: 14px
- Small: 12px

COMPONENTS:
- Cards dengan shadow
- Rounded corners (8-12px)
- Consistent spacing (8px grid system)
- Hover effects pada interactive elements
- Loading states untuk async operations

BREAKPOINTS:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

MOBILE OPTIMIZATION:
- Hamburger menu untuk navigation
- Collapsible table rows
- Touch-friendly buttons (min 44px)
- Swipe gestures untuk table navigation
- Bottom navigation bar (optional)

DESKTOP OPTIMIZATION:
- Multi-column layout
- Keyboard shortcuts
- Right-click context menu
- Drag-and-drop (if applicable)

WCAG 2.1 COMPLIANCE:
- Color contrast ratio min 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels untuk interactive elements
- Focus indicators
- Skip to main content link

LANGUAGE:
- Primary: Bahasa Indonesia
- Secondary: English (toggle option)
- Date format: DD/MM/YYYY (Indonesian)
- Number format: 1.000,00 (Indonesian)

AUTHENTICATION:
- Password hashing: bcrypt (min 10 rounds)
- Session timeout: 8 hours
- Token expiration: JWT 24 hours
- Refresh token: 7 days
- Concurrent session limit: 3 devices

AUTHORIZATION:
- Role-based access control (RBAC)
- API endpoint protection
- Row-level security (database level)
- Resource ownership validation

DATA PROTECTION:
- HTTPS/TLS 1.3 enforced
- Input sanitization (XSS prevention)
- SQL injection prevention (prepared statements)
- CSRF token protection
- Rate limiting (100 requests/minute)

AUDIT & LOGGING:
- All CRUD operations logged
- Login/logout events
- Failed authentication attempts
- Data export events
- Admin actions

BACKUP & RECOVERY:
- Daily automated backup
- Point-in-time recovery
- Backup retention: 30 days
- Disaster recovery plan

TOTAL TAGS: 280+ instrumentasi tags

TAG CATEGORIES:
┌─────────────────────────────────────────────────────────────────┐
│ Category          │ Count │ Examples                           │
├─────────────────────────────────────────────────────────────────┤
│ Flow (F)          │ ~40   │ FT-1257, FIC-1020, FI-1455A       │
│ Level (L)         │ ~80   │ LIC-1023A, LI-1216A, LT-1216B     │
│ Temperature (T)   │ ~60   │ TI-1047, TT-1396, TIC-1005        │
│ Pressure (P)      │ ~80   │ PT-20100, PI-1075, PIC-1014       │
│ Speed (S)         │ ~6    │ ST-1007A, ST-2007B                │
│ Other (Z)         │ ~4    │ ZT-2202, ZT-2203                  │
└─────────────────────────────────────────────────────────────────┘

I/O LOCATION DISTRIBUTION:
- ESD (Emergency Shutdown): ~65%
- DCS (Distributed Control): ~35%

UNIT TYPES:
- % (Percentage): Level indicators
- degC (Degree Celsius): Temperature
- kg/cm2g (Kilogram per cm² gauge): Pressure
- Nm3/h (Normal cubic meter per hour): Flow gas
- kg/hr (Kilogram per hour): Flow mass
- t/h (Ton per hour): Flow mass large
- mmH2O-g (Millimeter water column): Pressure low
- rpm (Revolutions per minute): Speed
- kgA (Kilogram absolute): Pressure absolute

SAMPLE DATA (First 10 tags):
┌──────────┬──────────┬──────────────────────┬───────┬────────┬─────────┐
│ TAG No.  │ TAG DCS  │ SERVICE              │ I/O   │ MAX    │ UNIT    │
├──────────┼──────────┼──────────────────────┼───────┼────────┼─────────┤
│ FT-1257  │ FI-1257  │ 102-B SCTN FLOW ESD  │ ESD   │ 212500 │ Nm3/h   │
│ FIC-1020 │ FIC-1020 │ 123-C2 SCTN BW FLOW  │ DCS   │ 261000 │ kg/hr   │
│ FT-1455A │ FI-1455A │ 123-C2 SCTN BW FLOW A│ ESD   │ 261000 │ kg/hr   │
│ LIC-1023A│LIC-1023A │ 120-CF2 LEVEL        │ DCS   │ 100    │ %       │
│ LT-1216A │ LI-1216A │ 120-CF2 LEVEL A      │ ESD   │ 100    │ %       │
│ TI-1047  │ TI-1047  │ 102-B DSCH TEMP      │ DCS   │ 600    │ degC    │
│ PT-20100 │ PI-20100 │ 101 BJ L/O PRESS LOW │ ESD   │ 6      │ kg/cm2g │
│ ST-1007A │ ST-1007A │ 101-BJM SPEED A      │ ESD   │ 1500   │ rpm     │
│ LT-3105  │ LI-3105  │ AMMONIA STORAGE      │ ESD   │ 100    │ %       │
│ ZT-2202  │ ZT-2202  │ SEA WATER INTAKE     │ ESD   │ 100    │ %       │
└──────────┴──────────┴──────────────────────┴───────┴────────┴─────────┘

STATUS CALCULATION LOGIC:
┌─────────────────────────────────────────────────────────────────┐
│ Status    │ Condition                    │ Color │ Action       │
├─────────────────────────────────────────────────────────────────┤
│ Normal    │ reading < 90% × MAX          │ Green │ No action    │
│ Warning   │ 90% × MAX ≤ reading ≤ MAX    │ Yellow│ Monitor      │
│ Critical  │ reading > MAX                │ Red   │ Immediate    │
│ Empty     │ reading = null/empty         │ Gray  │ Input needed │
└─────────────────────────────────────────────────────────────────┘

EXAMPLE CALCULATIONS:
- TAG FI-1257: MAX = 212,500 Nm3/h
  * Normal: 0 - 191,250 Nm3/h (< 90%)
  * Warning: 191,250 - 212,500 Nm3/h (90-100%)
  * Critical: > 212,500 Nm3/h (> 100%)

- TAG TI-1047: MAX = 600 degC
  * Normal: 0 - 540 degC
  * Warning: 540 - 600 degC
  * Critical: > 600 degC

INPUT VALIDATION:
- Reading Value: numeric, min 0, max 999,999,999
- Date Checked: cannot be future date
- TAG DCS: must exist in database
- Required fields: TAG DCS, Reading Value, Date Checked

TESTING TYPES:

1. Unit Testing:
   - Authentication functions
   - Status calculation logic
   - Data validation functions
   - Export/Import functions

2. Integration Testing:
   - Login to dashboard flow
   - Input data to database
   - Export data to Excel
   - Search and filter functionality

3. User Acceptance Testing (UAT):
   - Operator workflow testing
   - Engineer review workflow
   - Admin management workflow
   - Mobile responsiveness testing

4. Performance Testing:
   - Load time < 3 seconds
   - Search response < 1 second
   - Export 280 tags < 5 seconds
   - Concurrent users: 10+ users

5. Security Testing:
   - Penetration testing
   - SQL injection testing
   - XSS testing
   - Authentication bypass testing

TEST CASES (Sample):
┌─────────────────────────────────────────────────────────────────┐
│ ID   │ Test Case                    │ Expected Result          │
├─────────────────────────────────────────────────────────────────┤
│ TC01 │ Login with valid credentials │ Success, redirect to dash│
│ TC02 │ Login with invalid password  │ Error message shown      │
│ TC03 │ Input reading < 90% MAX      │ Status = Normal (Green)  │
│ TC04 │ Input reading 95% MAX        │ Status = Warning (Yellow)│
│ TC05 │ Input reading > 100% MAX     │ Status = Critical (Red)  │
│ TC06 │ Export all data to Excel     │ .xlsx file downloaded    │
│ TC07 │ Search TAG DCS               │ Filtered results shown   │
│ TC08 │ Delete data confirmation     │ Confirm dialog shown     │
│ TC09 │ Session timeout              │ Auto logout after 8 hours│
│ TC10 │ Mobile responsive            │ Layout adjusts properly  │
└─────────────────────────────────────────────────────────────────┘

