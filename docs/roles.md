# ROLES & RESPONSIBILITIES – THEATER MANAGEMENT SYSTEM

This document defines **who owns what** in the project.
All team members must strictly follow this to avoid conflicts.

---

## GENERAL RULES (APPLIES TO EVERYONE)

1. Work ONLY on your assigned branch  
2. Edit ONLY your assigned folders/files  
3. Do NOT change DB schema or API contract without approval  
4. Do NOT import another module’s service or model directly  
5. All cross-feature interaction must happen via APIs  
6. Never push directly to `main` branch  

If unsure → ASK before coding.

---

## PERSON 1 – ITHIHAS  
### Role: Authentication

### Branch
```

feature/auth

```

### Responsibilities
- User authentication
- Role-based access control
- JWT handling
- Super Admin / Admin / User login logic
- Owns API contract file

### Backend – Allowed Files
```

server/src/modules/auth/*
server/src/routes/auth.routes.js
server/src/middleware/auth.middleware.js
server/src/middleware/role.middleware.js
server/src/utils/jwt.util.js

```

### Frontend – Allowed Files
```

client/src/features/auth/*
client/src/api/auth.api.js

```

### Notes
- Keep auth logic simple and stable

---

## PERSON 2 – NAMRATHA  
### Role: Theater, Screen & Seat Management

### Branch
```

feature/theater

```

### Responsibilities
- Theater CRUD
- Screen creation
- Seat layout creation
- Seat categories and capacity

### Backend – Allowed Files
```

server/src/modules/theater/*
server/src/routes/theater.routes.js

```

### Frontend – Allowed Files
```

client/src/features/theater/*
client/src/api/theater.api.js

```

### Notes
- Do NOT handle pricing or booking logic
- Seat layout must only create seats, not book them
- Follow DB schema exactly

---

## PERSON 3 – LINESH  
### Role: Movie & Show Management

### Branch
```

feature/movie-show

```

### Responsibilities
- Movie CRUD
- Movie listing & filters
- Show scheduling
- Show conflict checks

### Backend – Allowed Files
```

server/src/modules/movie/*
server/src/modules/show/*
server/src/routes/movie.routes.js
server/src/routes/show.routes.js

```

### Frontend – Allowed Files
```

client/src/features/movie/*
client/src/api/movie.api.js

```

### Notes
- Show creation must not touch booking or pricing
- Keep show timing logic clean
- Use IDs from theater/screen modules only

---

## PERSON 4 – ADARSH  
### Role: Pricing, Coupons & Discounts & Database Schema     Owner

### Branch
```

feature/pricing

```

### Responsibilities
- Seat pricing per show
- Coupon creation & validation
- Discount calculation
- Final price computation

### Backend – Allowed Files
```

server/src/modules/pricing/*
server/src/routes/pricing.routes.js

```

### Frontend – Allowed Files
```

client/src/api/pricing.api.js
client/src/features/booking/BookingSummary.jsx

```

### Docs Ownership
```

docs/db-schema.md

```

### Notes
- Pricing depends on shows, not theaters directly
- Do NOT lock seats or create bookings
- Amount returned must match API contract
- Others must not change schema without approval

---

## PERSON 5 – HARSHITH  
### Role: Booking & API Contract Owner (CORE)

### Branch
```

feature/booking

```

### Responsibilities
- Seat locking
- Booking creation
- Booking cancellation
- Booking status handling
- Owns DB schema

### Backend – Allowed Files
```

server/src/modules/booking/*
server/src/routes/booking.routes.js

```

### Frontend – Allowed Files
```

client/src/features/booking/*
client/src/api/booking.api.js

```

### Docs Ownership
```

docs/api-contract.md

```

### Notes
- Must update api-contract.md before adding/changing APIs
- Other teammates depend on this module
- This is the most critical module
- Must ensure no double booking

---

## PERSON 6 – MANEESH  
### Role: Users, Reviews & Notifications

### Branch
```

feature/user-notification

```

### Responsibilities
- Admin user management
- User status (block/unblock)
- Reviews and ratings
- Notifications (create & read)

### Backend – Allowed Files
```

server/src/modules/review/*
server/src/modules/notification/*
server/src/routes/user.routes.js

```

### Frontend – Allowed Files
```

client/src/features/user/*

```

### Notes
- Reviews only after booking (check via API)
- Notifications should be simple (no real-time)
- Do not touch auth logic

---

## PERSON 7 – MELWIN  
### Role: UI, Layout & Styling Owner

### Branch
```

feature/ui-client

```

### Responsibilities
- UI consistency
- Layouts
- Shared components
- Routing
- Styling rules

### Frontend – Allowed Files
```

client/src/components/*
client/src/layouts/*
client/src/styles/*
client/src/routes/AppRoutes.jsx

```

### Docs Ownership
```

docs/ui-guidelines.md

```

### Notes
- No business logic
- No API calls
- Others depend on UI components you create

---

## SHARED BUT RESTRICTED FILES

| File | Owner |
|-----|------|
| docs/api-contract.md | Harshith |
| docs/db-schema.md | Adarsh |
| docs/ui-guidelines.md | Melwin |
| server/src/config/db.js | Adarsh |
| main branch | Harshith |

---

## BRANCH RULES

- One feature = one branch
- Always pull latest `main` before starting
- Small commits with clear messages
- PR must be reviewed by at least one teammate

---

## FINAL WARNING

Breaking these rules will:
- Cause merge conflicts
- Waste time
- Delay project completion

If confused → ASK FIRST.

---

END OF ROLES DOCUMENT