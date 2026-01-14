# UI GUIDELINES – THEATER MANAGEMENT SYSTEM

This document defines the **single source of truth for UI design**.
All frontend code must strictly follow this.

Owner: Melwin (UI Owner)

---

## 1. COLOR SYSTEM

### 1.1 Theme Colors

| Purpose | Color Name | Hex |
|------|-----------|-----|
| Main Background | White | #FFFFFF |
| Page Background (Soft) | Light Gray | #F5F6FA |
| Primary Color | Purple | #7C3AED |
| Primary Dark (Hover) | Deep Purple | #6D28D9 |
| Secondary Accent | Violet | #9333EA |
| Card Background | White | #FFFFFF |
| Border Color | Light Gray | #E5E7EB |
| Text Primary | Dark Gray | #111827 |
| Text Secondary | Gray | #6B7280 |

---

### 1.2 Sidebar Colors

| Element | Color |
|------|------|
| Sidebar Background | Purple Gradient (#7C3AED → #6D28D9) |
| Sidebar Text | #FFFFFF |
| Active Menu Background | rgba(255,255,255,0.22) |
| Active Menu Text | #FFFFFF |
| Inactive Menu Text | #EDE9FE |
| Sidebar Icons | #FFFFFF |

---

### 1.3 Button Colors

| Button Type | Color |
|-----------|-------|
| Primary Button | #7C3AED |
| Primary Hover | #6D28D9 |
| Secondary Button | #E5E7EB |
| Secondary Text | #111827 |
| Danger Button | #EF4444 |
| Disabled | #CBD5E1 |

---

### 1.4 Status & Message Colors

| Type | Color | Usage |
|----|------|------|
| Success | #22C55E | Booking confirmed |
| Warning | #F97316 | Pending / attention |
| Error | #EF4444 | Login failed |
| Info | #7C3AED | General info |
| Disabled | #CBD5E1 | Disabled buttons |

---

## 2. SEAT COLORS (CUSTOMER UI)

| Seat State | Color |
|----------|-------|
| Available | #E5E7EB |
| Selected | #7C3AED |
| Booked | #EF4444 |
| Premium | #9333EA |
| Disabled | #9CA3AF |

Rules:
- Booked seats are **not clickable**
- Selected seats use **primary color**
- Premium category uses **violet**

---

## 3. ROLE-BASED UI VISIBILITY

### 3.1 Super Admin (FULL ACCESS)

Visible Pages:
- Dashboard
- Theaters
- Screens
- Movies
- Shows
- Bookings
- Users
- Settings

Actions:
- Add / Edit / Delete everything
- Manage admins & staff

---

### 3.2 Admin (Theater Manager)

Visible Pages:
- Dashboard
- Screens
- Movies
- Shows
- Bookings

Actions:
- Add / Edit movies and shows
- View bookings
- ❌ No user management
- ❌ No system settings

---

### 3.3 Staff (LIMITED)

Visible Pages:
- Dashboard (basic)
- Shows
- Bookings

Actions:
- View bookings
- Update booking status
- ❌ No create / delete actions

---

### 3.4 Customer

Visible Pages:
- Home
- Movie Details
- Theater & Show Selection
- Seat Selection
- Booking Summary
- My Bookings
- Profile

Actions:
- Book tickets
- View bookings
- Cancel bookings

NOTE:  
Same Admin UI layout is reused.  
Menu items are shown/hidden based on role.

---

## 4. REUSABLE UI COMPONENTS (MANDATORY)

All components must be reusable and placed in:
```

client/src/components/

```

Required components:
1. Badge
2. Button
3. EmptyState
4. Header
5. Input
6. Loader
7. Modal
8. SearchBar
9. SideBar
10. Table
11. Seat Component
12. Alert / Toast


Do NOT create duplicate versions of these.

---

## 5. TYPOGRAPHY

### Font Family (ONLY ONE ALLOWED)
- Primary: Inter
- Fallback: system-ui, sans-serif

---

### Font Sizes & Weights

| Usage | Font Size | Weight |
|----|----------|--------|
| Page Title | 24px | 600 |
| Section Heading | 18px | 600 |
| Card Title | 16px | 500 |
| Normal Text | 14px | 400 |
| Secondary Text | 13px | 400 |
| Labels | 12px | 500 |
| Error / Helper Text | 12px | 400 |

---

## 6. BUTTON DESIGN SPECS

| Property | Value |
|--------|------|
| Height | 40px |
| Padding | 0px 16px |
| Font Size | 14px |
| Font Weight | 500 |
| Border Radius | 8px |
| Border | None |

Rules:
- No custom button styles outside shared Button component
- Hover only changes background color

---

## 7. INPUT FIELD DESIGN

| Property | Value |
|--------|------|
| Height | 40px |
| Padding | 0px 12px |
| Border Radius | 8px |
| Border Color | #E5E7EB |
| Focus Border | #7C3AED |
| Error Border | #EF4444 |

Rules:
- All inputs must use same component
- Error state must show red border + helper text

---

## 8. LAYOUT RULES

- Sidebar on left
- Header on top
- Content area uses soft background (#F5F6FA)
- Cards use white background with subtle border
- No random spacing or colours

---

## 9. UI DOs & DONTs

### DO
- Use theme colours only
- Use reusable components
- Follow spacing & font rules
- Hide menu items based on role

### DO NOT
- Add new colours
- Add inline styles randomly
- Change font sizes arbitrarily
- Duplicate components

---

## 10. FINAL RULES (NON-NEGOTIABLE)

- UI owner approval required for design changes
- Follow this document strictly
- Consistency > creativity
- Functional UI is more important than fancy UI

---

END OF UI GUIDELINES