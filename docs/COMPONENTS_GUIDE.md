# 📘 COMPONENTS GUIDE – CinemaHub

This document explains how to use the shared UI components available in the project.
These components are reusable, consistent with the app theme, and should be preferred over custom UI where possible.

---

## 1️⃣ Badge Component

### Purpose

Used to display small status labels like **Success**, **Warning**, **Error**, or **Info**.

### Props

* `status` (optional): `success | warning | error | info` (default: `info`)
* `size` (optional): `sm | md` (default: `md`)
* `children`: Text/content inside the badge

### Example Usage

```jsx
import Badge from "../../components/Badge/Badge";

<Badge status="success">Active</Badge>
<Badge status="warning" size="sm">Pending</Badge>
<Badge status="error">Cancelled</Badge>
```

### When to use

* Booking status
* Payment status
* Theater availability
* Approval states

---

## 2️⃣ Button Component

### Purpose

Primary action trigger with built-in variants, sizes, disabled and loading states.

### Props

* `variant`: `primary | secondary | danger` (default: `primary`)
* `size`: `sm | md | lg` (default: `md`)
* `disabled`: boolean
* `loading`: boolean (shows loader & disables button)
* `onClick`: function
* `type`: `button | submit`

### Example Usage

```jsx
import Button from "../../components/Button/Button";

<Button onClick={handleSave}>
  Save
</Button>

<Button variant="secondary">
  Cancel
</Button>

<Button variant="danger" loading>
  Delete
</Button>
```

### Notes

* When `loading=true`, button is automatically disabled
* Loader replaces button text visually

---

## 3️⃣ EmptyState Component

### Purpose

Shown when there is no data to display (tables, lists, dashboards).

### Props

* `title`: Main message
* `description` (optional): Additional explanation
* `actionLabel` (optional): Button label
* `onAction` (optional): Action callback

### Example Usage

```jsx
import EmptyState from "../../components/EmptyState/EmptyState";

<EmptyState
  title="No Bookings Found"
  description="You haven't made any bookings yet."
  actionLabel="Book a Movie"
  onAction={() => navigate("/customer/movies")}
/>
```

### When to use

* Empty tables
* First-time user screens
* No search results

---

## 4️⃣ Input Component

### Purpose

Standardized text input with label and error handling.

### Props

* `label` (optional)
* `type`: `text | password | email | number`
* `placeholder`
* `value`
* `onChange` (returns value only)
* `disabled`
* `error` (string)

### Example Usage

```jsx
import Input from "../../components/Input/Input";

<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  error={emailError}
/>
```

### Notes

* Error text is shown below input automatically
* Input styling is theme-consistent

---

## 5️⃣ Loader Component

### Purpose

Lightweight spinner used for loading states.

### Props

* `size`: `sm | md` (default: `md`)

### Example Usage

```jsx
import Loader from "../../components/Loader/Loader";

<Loader />
<Loader size="sm" />
```

### Common usage

* Inside buttons
* Page loading states
* Inline async actions

---

## 6️⃣ Modal Component

### Purpose

Used for dialogs, confirmations, and forms.

### Props

* `open`: boolean (controls visibility)
* `title`: Modal heading
* `children`: Modal body content
* `onClose`: Close handler

### Example Usage

```jsx
import Modal from "../../components/Modal/Modal";

<Modal
  open={isOpen}
  title="Delete Booking"
  onClose={() => setIsOpen(false)}
>
  <p>Are you sure you want to delete this booking?</p>
</Modal>
```

### Notes

* Clicking outside modal closes it
* Clicking inside modal does NOT close it
* Modal renders nothing when `open=false`

---

## 7️⃣ Table Component

### Purpose

Generic table for displaying structured data.

### Props

* `columns`: Array of column definitions
* `data`: Array of row objects

### Column Format

```js
const columns = [
  { key: "name", label: "Name" },
  { key: "city", label: "City" },
  { key: "status", label: "Status" },
];
```

### Example Usage

```jsx
import Table from "../../components/Table/Table";

const data = [
  { name: "PVR Orion", city: "Bangalore", status: "Active" },
  { name: "INOX Forum", city: "Mangalore", status: "Inactive" },
];

<Table columns={columns} data={data} />
```

### Notes

* Automatically shows `EmptyState` when `data` is empty
* Displays `-` when a cell value is missing

---

## ✅ General Guidelines

* Prefer shared components over custom UI
* Do NOT modify component styles directly in pages
* Extend components only when required
* Keep usage consistent across roles (Customer, Theater Manager, Staff and Super Admin)
