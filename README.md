# Theater Management System

A full-stack web application built using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)** to manage theater operations, movies, shows, bookings, payments, and user activities.

## Features

- **Authentication & Authorization:** User authentication and role-based access for customers, staff, theater managers, and super admins.
- **Movie Management:** Manage movie details, images, and listings.
- **Theater Management:** Manage theaters, screens, and seat configurations.
- **Show Management:** Create and manage movie shows and schedules.
- **Booking Management:** Browse shows, select seats, and manage bookings.
- **Seat Reservation:** Temporary seat locking with automatic release of expired reservations.
- **Pricing & Coupons:** Manage show pricing and apply discount coupons.
- **Payments:** Payment gateway integration.
- **Reviews & Ratings:** Allow customers to review and rate movies.
- **Notifications:** Provide notifications for relevant user activities.
- **Role-based Dashboards:** Dedicated interfaces for different user roles.

## Technology Stack

| Technology | Purpose |
|---|---|
| MongoDB | Database |
| Express.js | Backend framework |
| React.js | Frontend |
| Node.js | JavaScript runtime |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| Axios | API communication |
| Multer | Image uploads |
| Node-cron | Scheduled seat-lock release |

## Project Structure

```text
theater-management-system/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── features/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── styles/
│       └── utils/
│
├── server/                 # Node.js and Express backend
│   ├── seeds/
│   └── src/
│       ├── config/
│       ├── jobs/
│       ├── middleware/
│       ├── modules/
│       ├── routes/
│       └── utils/
│
└── docs/                   # Project documentation
```

## Contributors

The project was developed collaboratively, with contributors working across different application modules.

| Contributor | Areas of Contribution |
|---|---|
| **Harshith P** | Backend architecture, authentication, booking management, seat reservation, notifications, API integration, and application setup. |
| **Melwin** | Frontend architecture, reusable UI components, layouts, navigation, responsive design, and styling. |
| **Adarsh Gogate** | Movie and show management, pricing, coupon functionality, payment integration, and image upload handling. |
| **Namratha** | Theater, screen, and seat management, including backend APIs and super-admin interfaces. |
| **Maneesh** | Movie review and rating functionality, including backend APIs and booking validation. |

## Documentation

Additional project documentation is available in the `docs/` directory:

- API Contract
- Database Schema
- User Roles and Permissions
- Setup Instructions
- UI Guidelines

---

**Project:** Theater Management System  
**Stack:** MERN (MongoDB, Express.js, React.js, Node.js)
