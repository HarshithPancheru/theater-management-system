# 📘 COMPONENTS GUIDE – CinemaHub

This document explains how to use the shared UI components available in the project.
These components are reusable, consistent with the app theme, and should be preferred over custom UI where possible.

---

## 1️⃣ Badge Component

### Purpose

Used to display small status labels like **Success**, **Warning**, **Error**, or **Info**.

### Props

- `status` (optional): `success | warning | error | info` (default: `info`)
- `size` (optional): `sm | md` (default: `md`)
- `children`: Text/content inside the badge

### Example Usage

```jsx
import Badge from "../../components/Badge/Badge";

<Badge status="success">Active</Badge>
<Badge status="warning" size="sm">Pending</Badge>
<Badge status="error">Cancelled</Badge>
```

### When to use

- Booking status
- Payment status
- Theater availability
- Approval states

---

## 2️⃣ Button Component

### Purpose

Primary action trigger with built-in variants, sizes, disabled and loading states.

### Props

- `variant`: `primary | secondary | danger` (default: `primary`)
- `size`: `sm | md | lg` (default: `md`)
- `disabled`: boolean
- `loading`: boolean (shows loader & disables button)
- `onClick`: function
- `type`: `button | submit`

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

- When `loading=true`, button is automatically disabled
- Loader replaces button text visually

---

## 3️⃣ EmptyState Component

### Purpose

Shown when there is no data to display (tables, lists, dashboards).

### Props

- `title`: Main message
- `description` (optional): Additional explanation
- `actionLabel` (optional): Button label
- `onAction` (optional): Action callback

### Example Usage

```jsx
import EmptyState from "../../components/EmptyState/EmptyState";

<EmptyState
  title="No Bookings Found"
  description="You haven't made any bookings yet."
  actionLabel="Book a Movie"
  onAction={() => navigate("/customer/movies")}
/>;
```

### When to use

- Empty tables
- First-time user screens
- No search results

---

## 4️⃣ Input Component

### Purpose

Standardized text input with label and error handling.

### Props

- `label` (optional)
- `type`: `text | password | email | number`
- `placeholder`
- `value`
- `onChange` (returns value only)
- `disabled`
- `error` (string)

### Example Usage

```jsx
import Input from "../../components/Input/Input";

<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  error={emailError}
/>;
```

### Notes

- Error text is shown below input automatically
- Input styling is theme-consistent

---

## 5️⃣ Loader Component

### Purpose

Lightweight spinner used for loading states.

### Props

- `size`: `sm | md` (default: `md`)

### Example Usage

```jsx
import Loader from "../../components/Loader/Loader";

<Loader />
<Loader size="sm" />
```

### Common usage

- Inside buttons
- Page loading states
- Inline async actions

---

## 6️⃣ Modal Component

### Purpose

Used for dialogs, confirmations, and forms.

### Props

- `open`: boolean (controls visibility)
- `title`: Modal heading
- `children`: Modal body content
- `onClose`: Close handler

### Example Usage

```jsx
import Modal from "../../components/Modal/Modal";

<Modal open={isOpen} title="Delete Booking" onClose={() => setIsOpen(false)}>
  <p>Are you sure you want to delete this booking?</p>
</Modal>;
```

### Notes

- Clicking outside modal closes it
- Clicking inside modal does NOT close it
- Modal renders nothing when `open=false`

---

## 7️⃣ Table Component

### Purpose

Generic table for displaying structured data.

### Props

- `columns`: Array of column definitions
- `data`: Array of row objects

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

<Table columns={columns} data={data} />;
```

### Notes

- Automatically shows `EmptyState` when `data` is empty
- Displays `-` when a cell value is missing

---

## 8️⃣ FilterDropdown Component

### Purpose

Used to apply filters through a dropdown panel triggered by a Filter button.
Commonly used in list and table pages (Movies, Bookings, Users, etc.).

### Props

- `align` : `left | right | center` (default:`right`)
- `statusOptions`: Array of { label, value } options
- `selectedStatus`: Currently selected filter value
- `onStatusChange`: Callback when dropdown value changes
- `onApply`: Callback when Apply is clicked
- `onReset`: Callback when Reset is clicked

This is a controlled component. All filter state is managed by the parent.

### Example Usage

```jsx
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";

const [status, setStatus] = useState("");

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Cancelled", value: "cancelled" },
];

const handleApply = () => {
  console.log("Apply filter:", status);
};

const handleReset = () => {
  setStatus("");
};

return (
  <FilterDropdown
    align="left"
    statusOptions={statusOptions}
    selectedStatus={status}
    onStatusChange={setStatus}
    onApply={handleApply}
    onReset={handleReset}
  />
);
```

### Notes

- Dropdown opens below the Filter button
- Reset clears filters and closes dropdown
- API calls and filtering logic stay in the page component

---

## 9️⃣ Card Component

### Purpose

Reusable container component for displaying movies, theaters, summaries, or statistics.

### Card handles:

- Spacing
- Typography scale
- Hover behavior
- Click interaction

Content layout is controlled by child components.

### Props

- `size`: `sm | md | lg` (default: `md`)
- `clickable `: boolean (default: `false`)
- `onClick `: click handler (only when clickable)
- `children`: Card content

### Example Usage - 1

```jsx
import Card from "../../components/Card/Card";

<Card size="md" clickable onClick={onClick}>
  <img
    src={movie.poster}
    alt={movie.title}
    style={{
      width: "100%",
      height: "260px",
      objectFit: "cover",
      borderRadius: "var(--radius-md)",
      marginBottom: "12px",
    }}
  />

  <h4 style={{ fontWeight: "var(--font-weight-semibold)" }}>{movie.title}</h4>

  <p
    style={{
      fontSize: "var(--font-size-secondary)",
      color: "var(--text-secondary)",
    }}
  >
    {movie.genre}
  </p>
</Card>;
```

### Example Usage - 2

```jsx
<Card size="sm">
  <p>Total Bookings</p>
  <h3>124</h3>
</Card>
```

### Hover Behavior

- Non-clickable card
  - Subtle hover shadow
  - Default cursor

- Clickable card
  - Pointer cursor
  - Stronger hover shadow
  - Slight lift effect
  - Primary border highlight

### Notes

- Card does NOT control image size
- Image size belongs to content components (MovieCard, TheaterCard, etc.)
- Keeps Card reusable across different use cases

---

## 1️⃣0️⃣ Toast Notifications

### Purpose

Toast notifications are used to provide quick feedback to users for actions such as success, errors, warnings, or loading states.

The project uses **react-hot-toast** with theme-aligned styling.

---

### Setup (Already Done)

The toaster is configured globally in `App.jsx`.
Developers should **not** add another `<Toaster />` anywhere else.

---

### Usage

Toast should be triggered using utility functions instead of directly calling the library.

### Available Methods

```js
import {
  showSuccess,
  showError,
  showInfo,
  showLoading,
} from "../../utils/toast";
```

---

### Success Toast

```js
showSuccess("Booking confirmed successfully");
```

Use for:

- Successful form submissions
- Completed actions
- API success responses

---

### Error Toast

```js
showError("Failed to create booking");
```

Use for:

- API errors
- Validation failures
- Permission issues

---

### Info Toast

```js
showInfo("Fetching latest data...");
```

Use for:

- Informational messages
- Non-blocking notices

---

### Loading Toast

```js
const toastId = showLoading("Processing payment...");

// later
toast.dismiss(toastId);
```

Use for:

- Long-running API calls
- Payment flows
- Multi-step actions

---

### Guidelines

- Always use toast utilities (`utils/toast.js`)
- Do NOT call `react-hot-toast` directly
- Keep messages short and user-friendly
- Avoid triggering toast inside render loops

---

## ✅ General Guidelines

- Prefer shared components over custom UI
- Do NOT modify component styles directly in pages
- Extend components only when required
- Keep usage consistent across roles (Customer, Theater Manager, Staff and Super Admin)
