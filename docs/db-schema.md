# DATABASE SCHEMA – THEATER MANAGEMENT SYSTEM

Database: MongoDB  
ORM: Mongoose  
All `_id` fields are MongoDB ObjectId (stored as string in API)

---

## 1. USERS COLLECTION

### users
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "passwordHash": "string",
  "role": "SUPER_ADMIN | THEATER_MANAGER | STAFF | USER",
  "status": "ACTIVE | BLOCKED",
  "createdAt": "Date",
  "updatedAt": "Date"
}
````

Indexes:

* `email` (unique)

---

## 2. THEATERS COLLECTION

### theaters

```json
{
  "_id": "ObjectId",
  "name": "string",
  "location": "string",
  "amenities": ["string"],
  "contactNumber": "string",
  "openingTime": "HH:mm",
  "closingTime": "HH:mm",
  "status": "ACTIVE | INACTIVE",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 3. SCREENS COLLECTION

### screens

```json
{
  "_id": "ObjectId",
  "theaterId": "ObjectId",
  "name": "string",
  "capacity": 120,
  "type": "2D | 3D | IMAX | 4DX",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

Relation:

* `screens.theaterId → theaters._id`

---

## 4. SEATS COLLECTION

### seats

```json
{
  "_id": "ObjectId",
  "screenId": "ObjectId",
  "seatLabel": "A1",
  "rowLabel": "A",
  "category": "PREMIUM | GOLD | SILVER | BALCONY",
  "createdAt": "Date"
}
```

Relation:

* `seats.screenId → screens._id`

---

## 5. MOVIES COLLECTION

### movies

```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "duration": 150,
  "language": ["string"],
  "genre": ["string"],
  "releaseDate": "Date",
  "status": "UPCOMING | NOW_SHOWING | ARCHIVED",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 6. SHOWS COLLECTION

### shows

```json
{
  "_id": "ObjectId",
  "movieId": "ObjectId",
  "screenId": "ObjectId",
  "date": "Date",
  "startTime": "HH:mm",
  "priceMultiplier": 1.2,
  "createdAt": "Date"
}
```

Relations:

* `shows.movieId → movies._id`
* `shows.screenId → screens._id`

---

## 7. SHOW SEATS (LOCKING & STATUS)

### showSeats

```json
{
  "_id": "ObjectId",
  "showId": "ObjectId",
  "seatId": "ObjectId",
  "status": "AVAILABLE | LOCKED | BOOKED",
  "lockedUntil": "Date | null"
}
```

Purpose:

* Seat locking
* Prevent double booking

Relations:

* `showSeats.showId → shows._id`
* `showSeats.seatId → seats._id`

---

## 8. PRICING COLLECTION

### pricing

```json
{
  "_id": "ObjectId",
  "showId": "ObjectId",
  "prices": {
    "PREMIUM": 300,
    "GOLD": 200,
    "SILVER": 150,
    "BALCONY": 180
  }
}
```

Relation:

* `pricing.showId → shows._id`

---

## 9. COUPONS COLLECTION

### coupons

```json
{
  "_id": "ObjectId",
  "code": "string",
  "discountAmount": 50,
  "isActive": true,
  "createdAt": "Date"
}
```

Indexes:

* `code` (unique)

---

## 10. BOOKINGS COLLECTION

### bookings

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "showId": "ObjectId",
  "seatIds": ["ObjectId"],
  "paymentMethod": "UPI | CARD | NET_BANKING | WALLET",
  "totalAmount": 450,
  "status": "CONFIRMED | CANCELLED",
  "createdAt": "Date"
}
```

Relations:

* `bookings.userId → users._id`
* `bookings.showId → shows._id`
* `bookings.seatIds → seats._id`

---

## 11. REVIEWS COLLECTION

### reviews

```json
{
  "_id": "ObjectId",
  "movieId": "ObjectId",
  "userId": "ObjectId",
  "rating": 1,
  "comment": "string",
  "createdAt": "Date"
}
```

Relations:

* `reviews.movieId → movies._id`
* `reviews.userId → users._id`

---

## 12. NOTIFICATIONS COLLECTION

### notifications

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "type": "BOOKING | OFFER | SYSTEM",
  "message": "string",
  "isRead": false,
  "createdAt": "Date"
}
```

Relation:

* `notifications.userId → users._id`

---

## DESIGN RULES (MANDATORY)

* No schema changes without team approval
* `ObjectId` only for relations
* No embedded documents for core relations
* Seat availability controlled via `showSeats`
* All dates stored in UTC

---

## OWNERSHIP

* Schema Owner: **Adarsh**
* Others: Read-only unless approved

---

END OF DATABASE SCHEMA