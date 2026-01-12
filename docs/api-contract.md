# API CONTRACT – THEATER MANAGEMENT SYSTEM

Base URL:
```
/api
```

Authentication:
```
Authorization: Bearer <JWT_TOKEN>
````

<br/>


---

## COMMON RESPONSE FORMAT

### Success
```json
{
  "success": true,
  "message": "string",
  "data": {}
}
````

### Error

```json
{
  "success": false,
  "message": "error description"
}
```

---

## ENUMS (GLOBAL)

```
ROLE = SUPER_ADMIN | THEATER_MANAGER | STAFF | USER
THEATER_STATUS = ACTIVE | INACTIVE
MOVIE_STATUS = UPCOMING | NOW_SHOWING | ARCHIVED
SCREEN_TYPE = 2D | 3D | IMAX | 4DX
BOOKING_STATUS = CONFIRMED | CANCELLED
PAYMENT_METHOD = UPI | CARD | NET_BANKING | WALLET
NOTIFICATION_TYPE = BOOKING | OFFER | SYSTEM
SEAT_CATEGORY = PREMIUM | GOLD | SILVER | BALCONY
```

---

# 1. AUTH MODULE

### Register

POST `/auth/register`

Request:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "string",
  "role": "USER"
}
```

---

### Login

POST `/auth/login`

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "string",
  "role": "ROLE"
}
```

---

### Get Profile

GET `/auth/profile`

Response:

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "ROLE"
}
```

---

# 2. THEATER MANAGEMENT

### Create Theater

POST `/theaters`

Request:

```json
{
  "name": "string",
  "location": "string",
  "amenities": ["string"],
  "contactNumber": "string",
  "openingTime": "09:00",
  "closingTime": "23:00"
}
```

Response:

```json
{
  "theaterId": "string"
}
```

---

### Get All Theaters

GET `/theaters`

Query Params (optional):

```
location=
status=
```

Response:

```json
{
  "data": [
    {
      "theaterId": "string",
      "name": "string",
      "location": "string",
      "status": "THEATER_STATUS"
    }
  ]
}
```

---

### Update Theater

PUT `/theaters/:theaterId`

Request:

```json
{
  "name": "string",
  "amenities": ["string"]
}
```

Response:

```json
{
  "message": "Theater updated"
}
```

---

### Toggle Theater Status

PATCH `/theaters/:theaterId/status`

Response:

```json
{
  "status": "ACTIVE | INACTIVE"
}
```

---

# 3. SCREEN & SEAT MANAGEMENT

### Add Screen

POST `/theaters/:theaterId/screens`

Request:

```json
{
  "name": "Screen 1",
  "capacity": 120,
  "type": "SCREEN_TYPE"
}
```

Response:

```json
{
  "screenId": "string"
}
```

---

### Create Seat Layout

POST `/screens/:screenId/seats`

Request:

```json
{
  "rows": [
    {
      "rowLabel": "A",
      "category": "SEAT_CATEGORY",
      "seatCount": 10
    }
  ]
}
```

Response:

```json
{
  "message": "Seat layout created"
}
```

---

# 4. MOVIE MANAGEMENT

### Add Movie

POST `/movies`

Request:

```json
{
  "title": "string",
  "description": "string",
  "duration": 150,
  "language": ["string"],
  "genre": ["string"],
  "releaseDate": "YYYY-MM-DD"
}
```

Response:

```json
{
  "movieId": "string"
}
```

---

### Get Movies

GET `/movies`

Query Params:

```
status=
language=
genre=
```

Response:

```json
{
  "data": [
    {
      "movieId": "string",
      "title": "string",
      "status": "MOVIE_STATUS"
    }
  ]
}
```

---

### Get Movie Details

GET `/movies/:movieId`

Response:

```json
{
  "movieId": "string",
  "title": "string",
  "description": "string",
  "duration": 150,
  "language": ["string"],
  "genre": ["string"],
  "releaseDate": "YYYY-MM-DD",
  "status": "MOVIE_STATUS"
}
```

---

# 5. SHOW MANAGEMENT

### Create Show

POST `/shows`

Request:

```json
{
  "movieId": "string",
  "screenId": "string",
  "date": "YYYY-MM-DD",
  "startTime": "18:30",
  "priceMultiplier": 1.2
}
```

Response:

```json
{
  "showId": "string"
}
```

---

### Get Shows by Movie

GET `/shows/movie/:movieId`

Query Params:

```
date=
```

Response:

```json
{
  "data": [
    {
      "showId": "string",
      "screen": "string",
      "date": "YYYY-MM-DD",
      "startTime": "18:30"
    }
  ]
}
```

---

# 6. PRICING

### Get Pricing

GET `/pricing/:showId`

Response:

```json
{
  "PREMIUM": 300,
  "GOLD": 200,
  "SILVER": 150,
  "BALCONY": 180
}
```

---

### Apply Coupon

POST `/pricing/apply-coupon`

Request:

```json
{
  "code": "string",
  "amount": 500
}
```

Response:

```json
{
  "finalAmount": 450,
  "discount": 50
}
```

---

# 7. BOOKING

### Lock Seats

POST `/bookings/lock`

Request:

```json
{
  "showId": "string",
  "seatIds": ["A1", "A2"]
}
```

Response:

```json
{
  "expiresInSeconds": 300
}
```

---

### Create Booking

POST `/bookings`

Request:

```json
{
  "showId": "string",
  "seatIds": ["A1", "A2"],
  "paymentMethod": "PAYMENT_METHOD"
}
```

Response:

```json
{
  "bookingId": "string",
  "status": "CONFIRMED"
}
```

---

### Get My Bookings

GET `/bookings/my`

Response:

```json
{
  "data": [
    {
      "bookingId": "string",
      "movieTitle": "string",
      "showDate": "YYYY-MM-DD",
      "showTime": "18:30",
      "seats": ["A1", "A2"],
      "totalAmount": 450,
      "status": "BOOKING_STATUS"
    }
  ]
}
```

---

### Get Booking Details

GET `/bookings/:bookingId`

Response:

```json
{
  "bookingId": "string",
  "movie": "string",
  "theater": "string",
  "screen": "string",
  "showDate": "YYYY-MM-DD",
  "showTime": "18:30",
  "seats": ["A1", "A2"],
  "paymentMethod": "PAYMENT_METHOD",
  "amountPaid": 450,
  "status": "BOOKING_STATUS"
}
```

---

### Cancel Booking

POST `/bookings/:bookingId/cancel`

Response:

```json
{
  "status": "CANCELLED"
}
```

---

# 8. USER MANAGEMENT (ADMIN)

### Get Users

GET `/users`

Response:

```json
{
  "data": [
    {
      "userId": "string",
      "name": "string",
      "email": "string",
      "status": "ACTIVE | BLOCKED"
    }
  ]
}
```

---

### Block / Unblock User

PATCH `/users/:userId/status`

Request:

```json
{
  "status": "ACTIVE | BLOCKED"
}
```

Response:

```json
{
  "message": "User status updated"
}
```

---

# 9. REVIEWS

### Add Review

POST `/reviews`

Request:

```json
{
  "movieId": "string",
  "rating": 1,
  "comment": "string"
}
```

Response:

```json
{
  "reviewId": "string",
  "createdAt": "ISO_DATE"
}
```

---

### Get Reviews by Movie

GET `/reviews/movie/:movieId`

Response:

```json
{
  "data": [
    {
      "userName": "string",
      "rating": 4,
      "comment": "string",
      "createdAt": "ISO_DATE"
    }
  ]
}
```

---

# 10. NOTIFICATIONS

### Get Notifications

GET `/notifications`

Response:

```json
{
  "data": [
    {
      "notificationId": "string",
      "type": "NOTIFICATION_TYPE",
      "message": "string",
      "isRead": false,
      "createdAt": "ISO_DATE"
    }
  ]
}
```

---

### Mark Notification as Read

PATCH `/notifications/:notificationId/read`

Response:

```json
{
  "message": "Notification marked as read"
}
```

---

## FINAL RULES (DO NOT IGNORE)

* No API changes without updating this file
* Frontend must follow response shape exactly
* Backend must return only documented fields
* Dates: `YYYY-MM-DD`
* Time: `HH:mm` (24-hour)

---

END OF API CONTRACT