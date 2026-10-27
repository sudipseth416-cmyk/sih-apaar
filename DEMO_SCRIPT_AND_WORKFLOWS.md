# APAAR-Sentinel: Complete 5–6 Minute Video Demonstration Script & AICTE Workflows Deep-Dive

> **Platform**: APAAR-Sentinel (Intelligent Student Identity, Enrolment Verification & AICTE Regulatory Compliance Platform)  
> **Target Audience**: Smart India Hackathon (SIH) Jury, AICTE Evaluators, Technical Observers  
> **Target Runtime**: 5 Minutes 30 Seconds – 6 Minutes (Comfortable, deliberate pacing)  
> **Key Value Proposition**: Interconnected, event-driven regulatory compliance bridging institutions, national regulators, and students through APAAR ID.

---

## Part 1: AICTE Portal Workflows — In-Depth Expansion & Time Allocation

In Scene 3 of your demonstration, you switch back to the **AICTE Admin** role (`aicte.admin@aicte-india.org`) to prove that data uploaded by colleges does not sit in a silo. It instantly updates the entire national regulatory brain.

Here is the structured breakdown of all 7 AICTE workflows, their assigned demonstration times, key screen actions, and spoken narration.

```
Total AICTE Portal Deep-Dive Duration: ~2 Minutes (01:50 to 03:50)
├── 1. National Overview (Live Metrics & Synchronization)  [15s]
├── 2. Institution Registry (Unified Search & Tiering)    [15s]
├── 3. Admission & Intake Compliance Monitor              [20s]
├── 4. AI Anomaly & Fraud Risk Intelligence               [20s]
├── 5. Cross-Institution Conflict Network Graph           [20s]
├── 6. Geographic Compliance Heatmap                      [15s]
└── 7. AICTE Regulatory AI Copilot (Deterministic NL2SQL)  [15s]
```

---

### Workflow 1: National Overview (Live Metrics & Real-Time Sync)
- **Dedicated Time**: **15 Seconds** (Cumulative: 01:50 – 02:05)
- **Tab / Route**: `National Overview` (`aicte-overview`)
- **What it Proves**: The platform is an event-driven transactional ledger, not a static report viewer. National enrollment counts, identity verification percentages, and state intake totals update instantly when a college completes an ingestion batch.
- **On-Screen Actions**:
  1. Click role switcher → **AICTE Admin** (Dr. Ramesh Chandra).
  2. Point cursor to the top KPI cards: **Total Institutions (12)**, **Total Active Students (1,100+)**, and **Verified APAAR Identity Rate (~92%)**.
  3. Hover briefly over the **National Intake Utilization Bar** and the **State-wise Admission Breakdown** bar chart.
- **Presenter Narration**:
  > *"The moment College A confirmed its admission batch, AICTE's National Overview reflected it in real-time. Notice how our total registered students and APAAR verification metrics adjusted instantly without manual page refreshes. Regulatory compliance is no longer an end-of-year post-mortem—it is a live, streaming reality."*

---

### Workflow 2: Institution Registry (Unified Search & Governance Tiering)
- **Dedicated Time**: **15 Seconds** (Cumulative: 02:05 – 02:20)
- **Tab / Route**: `Institution Registry` (`aicte-institutions`)
- **What it Proves**: AICTE maintains an immutable, searchable registry of all approved colleges nationwide, complete with sanctioned intake caps, accreditation status (NBA/NAAC), and real-time compliance badges.
- **On-Screen Actions**:
  1. Click **Institution Registry** on the sidebar.
  2. In the search box, quickly type `Kolkata` or filter by `West Bengal`.
  3. The table filters down to **Tech Institute of Technology Kolkata**.
  4. Highlight the **Approved Intake (300)** vs **Reported Enrollment (325+)** and the red **'NON-COMPLIANT'** status badge.
- **Presenter Narration**:
  > *"Under the Institution Registry, AICTE monitors all affiliated universities and polytechnics. With unified search, regulators can instantly filter institutions by state, tier, or accreditation status. Notice Tech Institute of Technology Kolkata: the system immediately flags their non-compliant status alongside verified campus coordinates and active programs."*

---

### Workflow 3: Admission & Intake Compliance Monitor (Quota vs. Actual)
- **Dedicated Time**: **20 Seconds** (Cumulative: 02:20 – 02:40)
- **Tab / Route**: `Admission Compliance` (`aicte-compliance`)
- **What it Proves**: Directly addresses the core SIH problem statement—uncovering unsanctioned seats and over-intake. Compares AICTE sanctioned ceilings against active enrollment across Regular, OBC, SC, ST, EWS, NRI, and Supernumerary (PMSSS/TFW) quotas.
- **On-Screen Actions**:
  1. Click **Admission Compliance** on the sidebar.
  2. Highlight the **High-Priority Excess Alerts** table at the top.
  3. Point to **B.Tech Computer Science & Engineering**: Sanctioned = `120`, Admitted = `145` (**+25 Excess Seats / 120.8% Capacity Utilization**).
  4. Click the institution dropdown to demonstrate multi-college compliance auditing and the "Recalculate Compliance Engine" button.
- **Presenter Narration**:
  > *"Here is the core regulatory enforcement engine: the Admission Compliance Monitor. AICTE sets strict intake ceilings to protect student-to-teacher ratios and laboratory standards. Look at Computer Science at TIT Kolkata: sanctioned for 120 seats, but 145 students have been admitted—a 25-seat over-intake violation. The system categorizes violations across Regular, NRI, and Supernumerary quotas like TFW and PMSSS."*

---

### Workflow 4: AI Anomaly & Fraud Risk Intelligence (Explainable Scoring)
- **Dedicated Time**: **20 Seconds** (Cumulative: 02:40 – 03:00)
- **Tab / Route**: `Anomaly Intelligence` (`aicte-anomalies`)
- **What it Proves**: Solves the "black-box AI" critique. The hybrid ML engine assigns each college a transparent **0–100 Fraud Risk Score** based on verifiable indicators: intake overflow, temporal ingestion spikes (late-night batch dumps), and identity mismatch clusters.
- **On-Screen Actions**:
  1. Click **Anomaly Intelligence** on the sidebar.
  2. Point to the **Risk Distribution Gauge** (High, Elevated, Compliant).
  3. Click on the row for **Tech Institute of Technology Kolkata** (Risk Score: `50/100 - Elevated Risk`).
  4. Expand the **Anomaly Explainability Drawer / Breakdown Card** showing exact contributing weights:
     - Intake Cap Deviation (+30 pts)
     - Temporal Batch Spike (+15 pts)
     - APAAR Demographic Inconsistency (+5 pts).
- **Presenter Narration**:
  > *"To catch covert evasion before physical audits, our Anomaly Intelligence engine scores every institution from 0 to 100. Rather than an unexplainable black box, every score is mathematically transparent. College A's elevated risk score of 50 is driven by intake cap deviation, late-window temporal bursts, and demographic discrepancies, allowing AICTE to deploy physical inspection squads with surgical precision."*

---

### Workflow 5: Cross-Institution Conflict Network Graph (Multi-College Enrolment)
- **Dedicated Time**: **20 Seconds** (Cumulative: 03:00 – 03:20)
- **Tab / Route**: `Conflict Network` (`aicte-conflicts`)
- **What it Proves**: Solves the ghost-student and dual-admission bottleneck. Detects students who hold simultaneous `ACTIVE` seats in two different colleges across state boundaries using their unique 12-digit APAAR ID.
- **On-Screen Actions**:
  1. Click **Conflict Network** on the sidebar.
  2. The interactive SVG graph visualizes connected nodes: Students (Blue), Institutions (Green/Purple), and Program Nodes.
  3. Click on the central conflict node: **Rahul Sharma** (`APAAR: 9824-0011-2233`).
  4. Highlight the side panel showing two active links:
     - **Tech Institute of Technology (Kolkata)** – Status: `ACTIVE`
     - **Apex National Engineering College (Bengaluru)** – Status: `ACTIVE`.
- **Presenter Narration**:
  > *"This is the National Conflict Network. In technical admissions, students often block a seat in a private college as a backup while attending centralized state counseling elsewhere. Here, the graph catches Rahul Sharma active at Tech Institute in Kolkata and Apex College in Bengaluru simultaneously. AICTE can inspect the admission timestamps and initiate automated dispute resolution with one click."*

---

### Workflow 6: Geographic Compliance Risk Heatmap (Spatial Intelligence)
- **Dedicated Time**: **15 Seconds** (Cumulative: 03:20 – 03:35)
- **Tab / Route**: `Geographic Heatmap` (`aicte-geography`)
- **What it Proves**: AICTE regional officers can analyze compliance trends geographically, detecting localized clusters of intake violations and demographic verification failures.
- **On-Screen Actions**:
  1. Click **Geographic Heatmap** on the sidebar.
  2. Show the Leaflet map of India populated with color-coded institutional markers:
     - Green = Fully Compliant
     - Amber = Under Review / Elevated
     - Red = Severe Intake Violation / High Risk.
  3. Use the state filter dropdown to select **West Bengal** (the map smoothly pans and zooms).
  4. Click the Kolkata marker to show the institutional popup card with risk metrics and direct audit links.
- **Presenter Narration**:
  > *"Our Geographic Heatmap empowers AICTE's regional directorates with geospatial situational awareness. Filtering by West Bengal smoothly zooms into institutional clusters. Red pins instantly identify oversubscribed campuses, enabling regional officers to spot state-level quota trends at a glance."*

---

### Workflow 7: AICTE Regulatory AI Copilot (Deterministic NL2SQL)
- **Dedicated Time**: **15 Seconds** (Cumulative: 03:35 – 03:50)
- **Tab / Route**: `Regulatory AI Copilot` (`aicte-copilot`)
- **What it Proves**: AICTE officers do not need SQL knowledge to query millions of records. The Gemini-powered Copilot translates natural language questions into bounded, deterministic SQL queries with **zero hallucination**.
- **On-Screen Actions**:
  1. Click **AI Regulatory Copilot** on the sidebar.
  2. Click the quick prompt: *"Show colleges in West Bengal exceeding approved CSE intake"*, or type: *"Which institutions have low verification rates?"*.
  3. Hit Send.
  4. Show the Copilot response displaying the matched deterministic tool (`getIntakeViolations`), the executed query parameters, and the formatted tabular answer showing real database rows.
- **Presenter Narration**:
  > *"Finally, our AI Regulatory Copilot translates plain conversational questions into deterministic database audits. We ask: 'Show colleges in West Bengal exceeding approved CSE intake.' The Copilot doesn't guess or hallucinate—it queries our live database and produces structured, verifiable results with citations to AICTE approval records in seconds."*

---

## Part 2: Complete 5–6 Minute Master Video Demonstration Script

### Video Production Overview
- **Total Estimated Runtime**: **5 Minutes 30 Seconds** (Max 6:00)
- **Style**: Screen recording with crisp voiceover, smooth cursor movements, and zero dead air.
- **Pacing Rule**: 130–140 words per minute. Do not rush; speak with confidence, clarity, and authority.
- **Visual Rule**: Cut out all loading times in post-production. Use quick-fill for credentials. Never leave the viewer looking at a blank page.

---

### Comprehensive Step-by-Step Production Sheet

```
+---------------+------------------------------------------------------+---------------+
| TIME          | SCENE TITLE & FOCUS                                 | USER ROLE     |
+---------------+------------------------------------------------------+---------------+
| 00:00 - 00:40 | Scene 1: Welcome & National Regulatory Vision        | AICTE Admin   |
| 00:40 - 01:45 | Scene 2: College Portal Smart Ingestion & AI Schema  | College Admin |
| 01:45 - 03:45 | Scene 3: The National Brain — AICTE Deep Dive        | AICTE Admin   |
| 03:45 - 04:15 | Scene 4: Institutional Score Card & PDF Audit        | College Admin |
| 04:15 - 04:55 | Scene 5: Student Discrepancy Correction Governance   | Student/Admin |
| 04:55 - 05:40 | Scene 6: Smart Digital Passport & Instant QR Verify  | Student/Guest |
| 05:40 - 06:00 | Scene 7: Grand Finale Pitch & NEP 2020 Vision        | Presenter     |
+---------------+------------------------------------------------------+---------------+
```

---

### Detailed Scene Script

#### SCENE 1: Introduction, Problem Context & AICTE Login
- **Duration**: **00:00 – 00:40** (40 seconds)
- **Role**: `AICTE Admin` (Dr. Ramesh Chandra — `aicte.admin@aicte-india.org`)
- **Screen**: Sign In Page (`LoginPage.tsx`) → One-click login → AICTE Overview Dashboard.

| Timestamp | Visual / Screen Action | Spoken Narration (Voiceover) |
| :--- | :--- | :--- |
| **00:00 – 00:15** | Open on the clean, professional login screen of **APAAR-Sentinel**. The cursor hovers over the title and badges: *"AICTE Digital Public Infrastructure • Academic Session 2026–2027"*. | *"Every year, AICTE oversees thousands of technical colleges across India. Yet regulators face three systemic challenges: colleges secretly exceeding sanctioned intake quotas, students holding duplicate seats across states, and months of administrative delay caused by messy spreadsheets."* |
| **00:15 – 00:28** | Click the **Quick Demo Login: AICTE Admin** button (`Dr. Ramesh Chandra`). The portal signs in instantly without typing delay. | *"Meet APAAR-Sentinel: an intelligent regulatory platform that turns the Government of India's 12-digit APAAR ID into an active, real-time guardian of institutional integrity."* |
| **00:28 – 00:40** | The **National Overview** loads. Point to the top cards showing `12 Institutions`, `1,109 Students`, and the national compliance health gauge. | *"Logging in as the AICTE National Administrator, we immediately see the macro view across all 12 seeded institutions. But to see how this data enters the system, let's step into the shoes of a college registrar."* |

---

#### SCENE 2: College Portal Smart Bulk Upload with AI Column Mapping
- **Duration**: **00:40 – 01:45** (65 seconds)
- **Role**: Switch to `College Admin` (Prof. Subhasis Banerjee — `admin@tit-kolkata.edu.in`)
- **Screen**: Top Navbar Role Switcher → Select **College A (Kolkata)** → Navigate to **Smart Bulk Upload** (`BulkUploadWizard.tsx`).

| Timestamp | Visual / Screen Action | Spoken Narration (Voiceover) |
| :--- | :--- | :--- |
| **00:40 – 00:52** | Click the top account dropdown → select **College A (Kolkata)**. The sidebar updates to college-specific operations. Click **Smart Bulk Upload**. | *"We switch to Prof. Banerjee, Administrator at Tech Institute of Technology Kolkata. Every admission cycle, colleges struggle to format their student lists to strict government schemas. APAAR-Sentinel solves this with AI-powered Smart Ingestion."* |
| **00:52 – 01:08** | Drag and drop `students_alternate_headers.csv` into the upload dropzone. Show the messy column headers: `StudentName`, `APAAR_No`, `mobile_no`, `RollNumber`, `Branch`. | *"We upload a raw CSV with non-standard, messy headers: 'StudentName' instead of full_name, 'APAAR_No' with hyphens, and 'Branch' instead of programmeCode."* |
| **01:08 – 01:22** | Click **Analyze Headers & Map**. The AI column-mapping interface appears with animated green checkmarks showing 100% matched canonical fields. | *"Instantly, our schema intelligence matches every inconsistent column to AICTE's canonical schema. Notice how 'CandidateName' automatically routes to full_name and 'Academic_ID' to apaar_id. No manual reformatting required."* |
| **01:22 – 01:33** | Click **Validate Data Records**. Step 3 loads showing row-by-row validation: valid rows in green, format errors highlighted with clear explanations. | *"Next, the multi-tier validation engine audits each row. It verifies 12-digit checksums, flags missing demographic fields, and protects against data corruption before any record touches the database."* |
| **01:33 – 01:45** | Click **Confirm Import**. The summary screen appears, followed immediately by the **Interconnected System Synchronized** banner. | *"When we confirm the import, look at this notification: 'Duplicate check completed • Admission compliance recalculated • Anomaly risk score updated in real-time.' The entire national ledger has reacted instantly."* |

---

#### SCENE 3: The National Brain — AICTE Live Audit & Intelligence Suite
- **Duration**: **01:45 – 03:45** (120 seconds / 2 minutes)
- **Role**: Switch to `AICTE Admin` (Dr. Ramesh Chandra)
- **Screen**: Walkthrough of all 7 AICTE workflows in logical order.

| Timestamp | Visual / Screen Action | Spoken Narration (Voiceover) |
| :--- | :--- | :--- |
| **01:45 – 02:00** | Click the top dropdown → switch back to **AICTE Admin**. Land on **National Overview**. Point to updated student counts and state cards. | *(Workflow 1)* *"Switching back to AICTE Admin, the data is live. National student counts have increased, identity verification rates are recalculated, and state quotas reflect the newly ingested batch in real-time."* |
| **02:00 – 02:15** | Click **Institution Registry** on the sidebar. Search `Kolkata`. Show the filtered row for Tech Institute of Technology with its red non-compliant badge. | *(Workflow 2)* *"Under the Institution Registry, regulators can search and audit any affiliated college nationwide. Searching for Kolkata instantly surfaces TIT Kolkata, highlighting its approved intake quota of 300 versus reported admissions."* |
| **02:15 – 02:35** | Click **Admission Compliance** on the sidebar. Scroll to the **Capacity Excess Alerts** table. Highlight B.Tech CSE (120 sanctioned vs 145 admitted). | *(Workflow 3)* *"Now to the heart of regulatory enforcement: Admission Compliance. In Computer Science, College A was sanctioned for 120 seats, but admitted 145—a clear 25-seat oversubscription. The engine automatically segregates Regular, OBC, SC, ST, and supernumerary quotas like PMSSS."* |
| **02:35 – 02:55** | Click **Anomaly Intelligence** on the sidebar. Click on College A (`Risk Score: 50/100`). Expand the explainability drawer showing contributing factors. | *(Workflow 4)* *"To detect fraud proactively, our Anomaly Intelligence engine scores colleges from 0 to 100. College A flags an elevated score of 50. Every point is explainable: driven by intake ceiling overflow and late-window batch uploads. No black-box guesswork."* |
| **02:55 – 03:15** | Click **Conflict Network** on the sidebar. Click on student node **Rahul Sharma**. Show the two active edges connecting Kolkata and Bengaluru. | *(Workflow 5)* *"What about ghost students? The Conflict Network visualizes national student-institution graphs. Here, Rahul Sharma holds simultaneous active enrolments at Tech Institute in Kolkata AND Apex College in Bengaluru—blocking a subsidized seat. The network catches this cross-state conflict instantly."* |
| **03:15 – 03:30** | Click **Geographic Heatmap** on the sidebar. Select `West Bengal` in the state dropdown. Click the red marker over Kolkata. | *(Workflow 6)* *"On the Geographic Heatmap, regional directorates get spatial intelligence. Filtering by West Bengal focuses the map, where red markers pinpoint high-risk institutions with active infractions for targeted regional oversight."* |
| **03:30 – 03:45** | Click **AI Regulatory Copilot**. Click the prompt card: *"Show colleges in West Bengal exceeding approved CSE intake"*. Show the SQL-backed table. | *(Workflow 7)* *"Finally, the AI Regulatory Copilot allows non-technical officers to query the national ledger in plain English. We ask for oversubscribed CSE colleges in West Bengal. Using bounded NL2SQL, it executes deterministic database queries with zero hallucination."* |

---

#### SCENE 4: Institutional Accountability — AICTE Compliance Score Card
- **Duration**: **03:45 – 04:15** (30 seconds)
- **Role**: Switch back to `College Admin` (`admin@tit-kolkata.edu.in`)
- **Screen**: Top Navbar Role Switcher → Select **College A** → Navigate to **Reports & Downloads** (`InstitutionReportsPage.tsx`).

| Timestamp | Visual / Screen Action | Spoken Narration (Voiceover) |
| :--- | :--- | :--- |
| **03:45 – 03:57** | Switch to **College A Admin**. Click **Reports & Downloads** on the sidebar. Point to the **Official AICTE Compliance Audit Report (PDF)** card. | *"Transparency works both ways. Colleges need official documentation to defend their admissions during annual AICTE approval cycles. We switch back to College Admin and open Institutional Reports."* |
| **03:57 – 04:15** | Click **Download Official Compliance PDF**. Open the generated PDF in the browser or show its crisp preview: AICTE header, digital seal, quota table, and excess alert. | *"With one click, the college downloads their official 'AICTE Compliance Score Card'. This is a real, digitally generated PDF complete with category-wise intake breakdowns, compliance percentages, and cryptographic verification seals."* |

---

#### SCENE 5: Student Discrepancy Correction & College Governance Workflow
- **Duration**: **04:15 – 04:55** (40 seconds)
- **Role**: Switch to `Student Rahul Sharma` → Submit Correction → Switch to `College Admin` → Approve Request.
- **Screen**: `StudentCorrectionPage.tsx` → `CorrectionReviewPage.tsx`.

| Timestamp | Visual / Screen Action | Spoken Narration (Voiceover) |
| :--- | :--- | :--- |
| **04:15 – 04:27** | Switch to **Student: Rahul Sharma** (`rahul.sharma@student.apaar.gov.in`). Click **Record Corrections** on the sidebar. | *"A crucial requirement of the problem statement is self-service discrepancy correction. Rahul Sharma discovers his dual-enrolment conflict and wants to update his previous college record."* |
| **04:27 – 04:37** | Select enrolment: **Tech Institute of Technology Kolkata**. Field: `Enrolment Status`. Proposed Value: `TRANSFERRED`. Click **Submit Correction Request**. Show success badge. | *"Rahul selects his enrollment at College A, requests his status be updated to 'TRANSFERRED', attaches his Transfer Certificate reference, and submits the request."* |
| **04:37 – 04:47** | Switch back to **College A Admin**. Navigate to **Correction Requests** (`CorrectionReviewPage.tsx`). Rahul's request appears at the top. | *"Switching to College Admin, the registrar opens Correction Requests. Rahul's submission is waiting with timestamped audit evidence."* |
| **04:47 – 04:55** | Click **Approve & Sync**. A green toast appears: *"Record updated and Conflict Network synchronized"*. | *"The registrar clicks 'Approve & Sync'. The database updates, the student's status becomes TRANSFERRED, and the national conflict graph automatically resolves the dual-enrollment violation."* |

---

#### SCENE 6: Smart Digital Passport & Instant Public QR Verification
- **Duration**: **04:55 – 05:40** (45 seconds)
- **Role**: Switch to `Student Priya Das` (`priya.das@student.apaar.gov.in`) → Open Public Verification Gateway.
- **Screen**: `DigitalPassportPage.tsx` → Click **Open Verification Portal** → `PublicVerificationPage.tsx`.

| Timestamp | Visual / Screen Action | Spoken Narration (Voiceover) |
| :--- | :--- | :--- |
| **04:55 – 05:08** | Switch to **Student: Priya Das**. Navigate to **Digital Passport**. Show the modern digital credential card with HMAC-SHA256 signature and dynamic QR code. | *"Now for our most exciting feature: the Smart Digital Enrolment Passport. Logging in as student Priya Das, we see her verified academic passport. Every credential is cryptographically sealed with an HMAC-SHA256 signature and dynamic QR code."* |
| **05:08 – 05:25** | Click **Open Verification Portal** (or scan the on-screen QR code). A new tab opens directly to `/verify/SENTINEL-PASSPORT-2024-XXXX`. Show the glowing green badge: **'AICTE VERIFIED CREDENTIAL'**. | *"When an employer, university, or embassy scans this QR code, they are taken to the public verification gateway. Without needing access to internal databases, the gateway verifies the cryptographic hash against the AICTE ledger—confirming Priya's genuine active enrollment."* |
| **05:25 – 05:40** | Switch back to Priya's tab. Click **Revoke Credential**. Switch back to the public verify tab and click **Verify Again**. The badge flips to a red **'REVOKED CREDENTIAL'** alert. | *"And if a student withdraws or a credential is compromised? With one click, Priya revokes it. Re-verifying instantly shows 'REVOKED'. Total cryptographic security with zero blockchain gas fees."* |

---

#### SCENE 7: Outro & SIH Pitch Summary
- **Duration**: **05:40 – 06:00** (20 seconds)
- **Role**: Presenter wrap-up.
- **Screen**: Return to the **AICTE National Command Dashboard** with full interactive charts visible.

| Timestamp | Visual / Screen Action | Spoken Narration (Voiceover) |
| :--- | :--- | :--- |
| **05:40 – 05:50** | Pan back to the **AICTE Command Center** with full charts, live ticker, and green indicators. | *"In under six minutes, we have demonstrated a complete regulatory lifecycle: from AI spreadsheet normalization and automated quota enforcement to conflict graphs, participatory student governance, and cryptographic digital passports."* |
| **05:50 – 06:00** | Display the final slide / title screen: **APAAR-Sentinel: Intelligent Regulatory Infrastructure for India's Technical Education**. End on a crisp, professional note. | *"APAAR-Sentinel delivers on NEP 2020's promise of One Nation, One Student ID—ensuring transparency, protecting students, and securing the future of Indian technical education. Thank you."* |

---

## Part 3: Video Recording Checklist & "What to Avoid"

### Essential Demo Dos and Don'ts

| Category | Do This (Best Practice) | Avoid This (Common Pitfall) |
| :--- | :--- | :--- |
| **Authentication** | Use the **top navbar role switcher dropdown** or the quick-login buttons on the login page for instant 1-click role transitions. | Do NOT manually type email and password character-by-character on camera. |
| **Loading & Spinners** | Cut out or fast-forward network waits in your video editor so the viewer experiences instantaneous responses. | Do NOT leave the audience staring at spinning circles or loading bars for 5+ seconds. |
| **Narration Focus** | Narrate **what the feature proves** (e.g., *"This catches dual-enrolment across state borders"*). | Do NOT narrate basic mechanical mouse clicks (e.g., *"Now I click this button, then I scroll down, then I click here"*). |
| **Spreadsheet Upload** | Use `students_alternate_headers.csv` or `mixed_admissions_with_errors.csv` to showcase the AI auto-mapping capabilities. | Do NOT upload an already-perfect CSV with identical headers, which makes AI mapping look trivial. |
| **Ending Shot** | End the demo dynamically by scanning the **Digital Passport QR code** into the public verification gateway and demonstrating instant revocation. | Do NOT end on a static dashboard or boring logout screen. |

---

## Quick Reference: Demo Accounts & Passwords

| Role | Name | Email | Password | Primary Workflow |
| :--- | :--- | :--- | :--- | :--- |
| **AICTE Admin** | Dr. Ramesh Chandra | `aicte.admin@aicte-india.org` | `admin123` | National Overview, Compliance Monitor, Anomaly Engine, Conflict Network, Copilot |
| **College A Admin** | Prof. Subhasis Banerjee | `admin@tit-kolkata.edu.in` | `admin123` | Smart Bulk Upload (messy CSV), Intake Excess Alert (+25 CSE), Correction Review, PDF Report |
| **College B Admin** | Dr. Radhakrishnan Nair | `admin@apex-bengaluru.edu.in` | `admin123` | Dual-college conflict resolution partner |
| **Student** | Rahul Sharma | `rahul.sharma@student.apaar.gov.in` | `student123` | Dual-enrollment conflict node, Record Correction Request submission |
| **Student** | Priya Das | `priya.das@student.apaar.gov.in` | `student123` | Smart Digital Passport, Dynamic QR verification, Instant Credential Revocation |

---

## Instant Demo Data Reset
If at any point during practice or recording you wish to restore the database to its pristine initial state (12 institutions, 1,109 students, and test conflict scenarios):

- **Option A (In-Browser)**: Click the **Reset Demo Baseline** button with the refresh icon in the top navigation bar.
- **Option B (Terminal)**: Run:
  ```bash
  cd backend
  npm run seed
  ```
*Restores all initial baseline records and test conflicts in under 2 seconds.*
