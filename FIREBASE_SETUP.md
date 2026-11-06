# SOHIL HAIR CUTTING — FIREBASE & ADMIN PANEL SETUP GUIDE

## What Was Added

### 1. Secure Admin Panel (`admin/`)
- `admin/index.html` — Secure Admin Login with email/password. Checks backend Firestore admin claims before granting dashboard access.
- `admin/dashboard.html` — Full-featured Gallery Management Dashboard:
  - Multi-file drag-and-drop photo upload
  - Photo preview before upload with title/category/featured configuration
  - Update photo titles, categories, and display order
  - Delete photos (removes from both Firestore and Firebase Storage)
  - Toggle "Featured" badge (controls homepage visibility)
  - Search photos by title/category
  - Category filters
  - Live photo statistics (Total, Featured, Categories, Added Today)
  - 50+ photos support with Load More pagination
- `admin/forgot-password.html` — Secure 4-step OTP-based password recovery:
  1. Identifies admin by registered email and phone (never leaks admin status)
  2. Sends real 6-digit SMS OTP via Firebase Phone Authentication
  3. Enforces 5-minute expiry, max 5 attempts, resend cooldown (30s), rate limiting
  4. Secure password reset delivery

### 2. Gallery Real-Time Sync
- `index.html` — Homepage gallery automatically shows "Featured" photos from Firestore. Falls back gracefully to original static photos if Firebase is offline.
- `view-more.html` — Full Gallery shows all photos with pagination / Load More. Supports 50+ photos with smooth staggered reveal and lightbox.

### 3. Performance Optimizations (Whole Site)
- `loading="lazy"` on all gallery and service images
- Explicit `width`, `height`, and `aspect-ratio` to eliminate Cumulative Layout Shift (CLS)
- Smooth fade-in on media appearance (`.media-loaded` class)
- Skeleton pulse placeholders while media loads (`.skeleton-loading`)
- `preload="metadata"` on videos to reduce initial page load size
- IntersectionObserver for smooth deferred loading

### 4. Mobile Footer Reorder & Fixed Bottom Navbar (≤768px only)
- Footer reordered on mobile: OP SOHIL heading, SOFTWARE DEVELOPER badge, description, and "Available for Projects & Collaboration" status are placed **above** the social icons
- Fixed bottom navbar with exactly 3 icons: Instagram, Facebook, WhatsApp
- Red glow theme accents, curved top corners, blur backdrop
- Page bottom padding (`padding-bottom: 62px`) prevents content overlap
- Desktop layout is 100% untouched

---

## Quick Setup: Connecting to Your Firebase Project

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** and name it (e.g. `sohil-hair-studio`)
3. Disable Google Analytics (optional) and click **Create Project**

### Step 2: Enable Authentication
1. In Firebase Console, go to **Build → Authentication → Get Started**
2. In the **Sign-in method** tab:
   - Enable **Email/Password**
   - Enable **Phone** (for OTP recovery)
3. Under **Users** tab, click **Add user** to create your admin account:
   - Email: `sq300151@gmail.com`
   - Password: `s4zaan`
   - Copy the generated **User UID**

### Step 3: Enable Firestore Database
1. Go to **Build → Firestore Database → Create database**
2. Choose **Start in production mode** and select your closest location (e.g., `asia-south1` for India)
3. In the **Rules** tab, paste the contents of `firestore.rules` and click **Publish**
4. Under the **Data** tab, click **Start collection**:
   - Collection ID: `admins`
   - Document ID: Paste the **User UID** copied from Step 2
   - Add fields:
     - `role` (string): `admin`
     - `email` (string): `sq300151@gmail.com`
     - `phone` (string): `+917355954554`

### Step 4: Enable Firebase Storage
1. Go to **Build → Storage → Get Started**
2. Choose **Start in production mode**
3. In the **Rules** tab, paste the contents of `storage.rules` and click **Publish**

### Step 5: Copy Your Firebase Config
1. Go to **Project Settings** (gear icon top-left) → **General**
2. Scroll to **Your apps**, click the `</>` (Web) icon, and register the app
3. Copy the `firebaseConfig` object:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "sohil-hair-studio.firebaseapp.com",
     projectId: "sohil-hair-studio",
     storageBucket: "sohil-hair-studio.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
4. Paste this config into:
   - `admin/index.html` (line 197)
   - `admin/dashboard.html` (line 424)
   - `admin/forgot-password.html` (line 177)
   - `index.html` (line 991)
   - `view-more.html` (line 496)

---

## File Structure

```
sohil-cutting/
├── index.html              ← Homepage (synced gallery + mobile footer/navbar)
├── view-more.html          ← Full Gallery (synced gallery + Load More)
├── style.css               ← Main styles (+ Part 2 & 3 responsive rules)
├── js/
│   ├── main.js             ← Enhanced with performance lazy load & video init
│   └── animation.js        ← Existing animations preserved
├── admin/
│   ├── index.html          ← Admin Login
│   ├── dashboard.html      ← Gallery Dashboard (Upload, Edit, Delete, 50+ photos)
│   └── forgot-password.html← OTP-based password recovery
├── firestore.rules         ← Production security rules for Firestore
├── storage.rules           ← Production security rules for Storage
└── FIREBASE_SETUP.md       ← This guide
```
