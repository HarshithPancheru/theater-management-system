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

Used to apply one or more filters through a dropdown panel triggered by a Filter button.

The component is fully `dynamic and config-driven`:

- Labels are dynamic
- Options are dynamic
- Any number of filters can be rendered

Commonly used in list and table pages (Movies, Shows, Bookings, Users, etc.).

### Props

- `align`: `left | right | center` (default: `right`)
- `filters`: Array of filter configuration objects
- `onApply`: Callback when Apply is clicked
- `onReset`: Callback when Reset is clicked

This is a controlled component. All filter state is managed by the parent.

### Filter Config Format

Each filter must follow this structure:

```js
{
  key: string,                 // unique identifier
  label: string,               // label shown in UI
  value: string,               // selected value
  options: [{ label, value }], // dropdown options
  onChange: function           // change handler
}

```

### Example Usage

```jsx
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";

const [filters, setFilters] = useState({
  status: "",
  isShowOver: "",
});

const filterConfig = [
  {
    key: "status",
    label: "Status",
    value: filters.status,
    options: [
      { label: "Confirmed", value: "confirmed" },
      { label: "Cancelled", value: "cancelled" },
    ],
    onChange: (value) => setFilters((prev) => ({ ...prev, status: value })),
  },
  {
    key: "isShowOver",
    label: "Is Show Over",
    value: filters.isShowOver,
    options: [
      { label: "True", value: "true" },
      { label: "False", value: "false" },
    ],
    onChange: (value) => setFilters((prev) => ({ ...prev, isShowOver: value })),
  },
];

const handleApply = () => {
  console.log("Apply filters:", filters);
};

const handleReset = () => {
  setFilters({
    status: "",
    isShowOver: "",
  });
};

return (
  <FilterDropdown
    align="right"
    filters={filterConfig}
    onApply={handleApply}
    onReset={handleReset}
  />
);
```

### Notes

- Any number of filters can be passed using the filters array
- Filters are applied only when Apply is clicked
- Reset clears all filters and closes the dropdown
- Empty filter values should be ignored by the backend
- API calls and filtering logic stay in the page component

---

## 9️⃣ SortDropdown Component

### Purpose

Used to apply sorting through a dropdown panel triggered by a Sort button.
Allows users to select one or more fields and choose ascending or descending order.
Sorting is applied only when Apply is clicked.

By default, no sorting is applied and backend data order is shown.

### Props

- `align` (optional): `left | right | center` (default: `right`)
- `options`: Array of sortable fields
  - Format: `{ key, label }`
- `onApply`: Callback fired when Apply or Reset is clicked
  - Receives `null` when sorting is reset
  - Receives an object when sorting is applied

This is a controlled component. All filter state is managed by the parent.

### Example Usage

```jsx
import SortDropdown from "../../components/SortDropdown/SortDropdown";

const sortOptions = [
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
];

const handleSortApply = (sortConfig) => {
  console.log(sortConfig);
  // null → no sorting
  // { price: "asc", name: "desc" }
};

<SortDropdown options={sortOptions} onApply={handleSortApply} />;
```

### Notes

- Multiple sort fields can be selected
- Each selected field defaults to ascending order
- Reset clears sorting and closes the dropdown
- Sorting logic and API calls stay in the page component

---

## 1️⃣0️⃣ Card Component

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

## 1️⃣1️⃣ SearchBar Component

### Purpose

Used to capture search input for filtering lists and tables.
The SearchBar is a controlled, reusable UI component and does not handle any search or API logic internally.

It supports different sizes and includes a built-in clear (×) button.

### Props

- `value`: Current search value (controlled)
- `onChange`: Callback fired when search text changes
- `placeholder` (optional): Placeholder text (default: "`Search...`")
- `size` (optional): `sm | md | lg` (default: `md`)
- `disabled` (optional): Disables input and actions

### Example Usage

```jsx
import SearchBar from "../../components/SearchBar/SearchBar";

const [search, setSearch] = useState("");

<SearchBar
  value={search}
  onChange={setSearch}
  placeholder="Search theaters..."
  size="md"
/>;
```

### Notes

- Clear (×) button appears only when input has value
- Clearing the input calls `onChange("")`
- Component is layout-agnostic; parent controls width and placement
- Search logic, debouncing, and API calls must be handled in the page component

---

## 1️⃣2️⃣ Toast Notifications

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
