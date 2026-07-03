# API Endpoints Documentation - Tripma Flight Booking

## Tổng quan

**Base URL:** `http://localhost:3000` (development)

**Authentication:**
- NextAuth.js với JWT session strategy
- Support: Credentials (email/password) và Google OAuth
- Session stored in JWT token

**Response Format:** JSON

---

## 1. Authentication Endpoints

### 1.1 Sign Up - Đăng ký tài khoản mới

**Endpoint:** `POST /api/auth/signup`

**Authentication:** Không yêu cầu (Public endpoint)

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required, min 8 characters)",
  "agreeTerms": "boolean (required, must be true)"
}
```

**Validation Rules:**
- `email`: Bắt buộc, phải chứa "@"
- `password`: Bắt buộc, phải >= 8 characters
- `agreeTerms`: Bắt buộc, phải là `true`
- Email phải unique (chưa được sử dụng)

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "message": "Signup successful"
}
```

**Error Responses:**

**400 Bad Request - Missing fields:**
```json
{
  "error": "Email and password are required"
}
```

**400 Bad Request - Invalid email:**
```json
{
  "error": "Invalid email address"
}
```

**400 Bad Request - Password too short:**
```json
{
  "error": "Password must be at least 8 characters long"
}
```

**400 Bad Request - Terms not agreed:**
```json
{
  "error": "You must agree to the terms and conditions"
}
```

**400 Bad Request - Email already exists:**
```json
{
  "error": "Email is already in use"
}
```

**500 Internal Server Error:**
```json
{
  "error": "An error occurred during signup"
}
```

**Business Logic:**
- Generate username: `{emailBase}_{timestamp}`
- Hash password với bcrypt (SALT_ROUNDS = 10)
- Set default city: "Cairo"
- Set default country: "Egypt"
- Create user record in database

---

### 1.2 Sign In / Sign Out - NextAuth Authentication

**Endpoint:** `GET /api/auth/[...nextauth]` và `POST /api/auth/[...nextauth]`

**Authentication:** Không yêu cầu (Public endpoint)

**Supported Providers:**
1. **Credentials** (Email/Password)
2. **Google OAuth**

---

#### 1.2.1 Sign In with Credentials

**Request (POST):**
```
POST /api/auth/signin
Content-Type: application/x-www-form-urlencoded

email=user@example.com&password=password123
```

**Validation Rules:**
- `email`: Bắt buộc, phải chứa "@"
- `password`: Bắt buộc, phải >= 8 characters

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:** NextAuth session object
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user_1234567890"
  },
  "expires": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**

**400 Bad Request - Missing credentials:**
```json
{
  "error": "Email and password are required"
}
```

**400 Bad Request - Invalid email:**
```json
{
  "error": "Invalid email address"
}
```

**400 Bad Request - Password too short:**
```json
{
  "error": "Password must be at least 8 characters long"
}
```

**401 Unauthorized - Invalid credentials:**
```json
{
  "error": "Invalid email or password"
}
```

**Business Logic:**
- Query user by email
- Compare password hash với bcrypt
- Return user object nếu match
- Create JWT session token

---

#### 1.2.2 Sign In with Google OAuth

**Request (GET):**
```
GET /api/auth/signin/google
```

**Response:**
- Redirect to Google OAuth consent screen

**Callback:**
```
GET /api/auth/callback/google
```

**Success Response:**
- Redirect to callback URL with auth code
- Create/update user in database via Prisma Adapter
- Create JWT session token

**Error Response:**
- Redirect to error page

**Environment Variables Required:**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

---

#### 1.2.3 Get Session

**Request (GET):**
```
GET /api/auth/session
```

**Success Response (Authenticated):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user_1234567890"
  },
  "expires": "2024-01-01T00:00:00.000Z"
}
```

**Success Response (Not Authenticated):**
```json
{
  "user": null,
  "expires": null
}
```

---

#### 1.2.4 Sign Out

**Request (POST):**
```
POST /api/auth/signout
```

**Success Response:**
- Redirect to home page
- Clear session cookie

---

## 2. Flight Search Endpoints

### 2.1 Search Flights - Tìm kiếm chuyến bay

**Endpoint:** `GET /api/flights`

**Authentication:** Không yêu cầu (Public endpoint)

**Request Query Parameters:**
```
fromCity=string (required)
toCity=string (required)
startDate=string (required, ISO date format)
endDate=string (optional, ISO date format, for round-trip)
adults=number (optional, default: 0)
minors=number (optional, default: 0)
type=boolean (optional, "true" for round-trip, "false" for one-way)
```

**Example Request:**
```
GET /api/flights?fromCity=New York&toCity=London&startDate=2024-01-15&endDate=2024-01-20&adults=2&minors=0&type=true
```

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "departingFlights": [
    {
      "flightId": "uuid",
      "fromCity": "New York",
      "toCity": "London",
      "type": true,
      "imgPath": "/images/flight1.jpg",
      "subtotalPrice": 500.00,
      "taxesAndFees": 50.00,
      "airlineName": "British Airways",
      "duration": "7h 30min",
      "fromToTime": "7:00AM - 4:15PM",
      "date": "2024-01-15T07:00:00.000Z",
      "availableSeats": 150,
      "stopsNumber": 0,
      "stopsInfo": null
    }
  ],
  "arrivingFlights": [
    {
      "flightId": "uuid",
      "fromCity": "London",
      "toCity": "New York",
      "type": true,
      "imgPath": "/images/flight2.jpg",
      "subtotalPrice": 450.00,
      "taxesAndFees": 45.00,
      "airlineName": "British Airways",
      "duration": "8h 00min",
      "fromToTime": "6:00PM - 2:00AM",
      "date": "2024-01-20T18:00:00.000Z",
      "availableSeats": 120,
      "stopsNumber": 1,
      "stopsInfo": "1 stop in Paris"
    }
  ]
}
```

**Error Response:**
- **Status Code:** 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

**Business Logic:**
1. Calculate total passengers: `adults + minors`
2. Query departing flights:
   - Filter by fromCity, toCity, type
   - Filter by date range: `Date >= startDate` và `Date < startDate + 24h`
   - Only include flights with available seats
   - Filter: `availableSeats >= totalPassengers`
3. If round-trip (type=true) and endDate provided:
   - Query returning flights with same logic
   - Reverse fromCity and toCity
   - Filter by date range: `Date >= endDate` và `Date < endDate + 24h`
4. Format response with selected fields only

---

## 3. Seat Endpoints

### 3.1 Get Seats by Flight ID - Lấy danh sách ghế

**Endpoint:** `GET /api/seats/[flightId]`

**Authentication:** Không yêu cầu (Public endpoint)

**Request Parameters:**
```
flightId - UUID (path parameter)
```

**Example Request:**
```
GET /api/seats/0089b898-88d4-4e9e-ac26-e1c929279077
```

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "businessSeats": [
    {
      "flightId": "uuid",
      "type": "Business",
      "seatNumber": "1A",
      "available": true,
      "price": 200.00
    },
    {
      "flightId": "uuid",
      "type": "Business",
      "seatNumber": "1B",
      "available": true,
      "price": 200.00
    }
  ],
  "economySeats": [
    {
      "flightId": "uuid",
      "type": "Economy",
      "seatNumber": "10A",
      "available": true,
      "price": 100.00
    },
    {
      "flightId": "uuid",
      "type": "Economy",
      "seatNumber": "10B",
      "available": false,
      "price": 100.00
    }
  ]
}
```

**Error Response:**
- **Status Code:** 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

**Business Logic:**
1. Extract flightId from URL path
2. Query all seats for the flight where available = true
3. Order by seatNumber ascending
4. Separate into businessSeats and economySeats arrays
5. Return JSON with both arrays

---

## 4. Booking Endpoints

### 4.1 Create Booking - Đặt vé

**Endpoint:** `POST /api/booking`

**Authentication:** Không yêu cầu (Supports guest booking)

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "uuid (optional, null for guest booking)",
  "departingFlightId": "uuid (required)",
  "returningFlightId": "uuid (optional, null for one-way)",
  "departingSeat": "string (required)",
  "arrivingSeat": "string (optional, null for one-way)",
  "passengerInfo": {
    "firstName": "string (required)",
    "middleName": "string (optional)",
    "lastName": "string (required)",
    "suffix": "string (optional)",
    "dateOfBirth": "string (required, ISO date format)",
    "email": "string (required)",
    "phone": "string (required, 11 digits)",
    "redressNumber": "string (optional)",
    "knownTravelerNumber": "string (optional)",
    "checkedBags": "number (required)"
  },
  "paymentInfo": {
    "paymentType": "string (required, must be 'Visa')",
    "nameOnCard": "string (required)",
    "cardNumber": "string (required, 16 digits)",
    "ccv": "string (required, 3 digits)",
    "expireDate": "string (required, ISO date format)"
  }
}
```

**Example Request:**
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "departingFlightId": "0089b898-88d4-4e9e-ac26-e1c929279077",
  "returningFlightId": "06b2a838-325f-42d3-8f76-f537f5ac32d1",
  "departingSeat": "10A",
  "arrivingSeat": "5B",
  "passengerInfo": {
    "firstName": "John",
    "middleName": "William",
    "lastName": "Doe",
    "suffix": "Jr",
    "dateOfBirth": "1990-01-15",
    "email": "john.doe@example.com",
    "phone": "12345678901",
    "redressNumber": null,
    "knownTravelerNumber": "KTN123456",
    "checkedBags": 2
  },
  "paymentInfo": {
    "paymentType": "Visa",
    "nameOnCard": "John Doe",
    "cardNumber": "4111111111111111",
    "ccv": "123",
    "expireDate": "2025-12-31"
  }
}
```

**Validation Rules:**

**Required Fields:**
- `departingFlightId`, `departingSeat`, `passengerInfo`, `paymentInfo`

**Passenger Info Validation:**
- `firstName`, `lastName`, `dateOfBirth`, `email`, `phone`, `checkedBags`: Required
- Email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone format: `/^\d{11}$/` (11 digits)
- Date of birth: Must be < current date

**Payment Info Validation:**
- `paymentType`, `nameOnCard`, `cardNumber`, `ccv`, `expireDate`: Required
- Payment type: Must be "Visa"
- Card number format: `/^\d{16}$/` (16 digits)
- CCV format: `/^\d{3}$/` (3 digits)
- Expire date: Must be > current date

**User Validation (if userId provided):**
- User must exist in database

**Flight Validation:**
- Departing flight must exist
- Returning flight (if provided) must exist

**Success Response:**
- **Status Code:** 201 Created
- **Response Body:**
```json
{
  "bookingId": "uuid",
  "departingFlight": {
    "flightId": "uuid",
    "fromCity": "New York",
    "toCity": "London",
    "type": true,
    "imgPath": "/images/flight1.jpg",
    "subtotalPrice": 500.00,
    "taxesAndFees": 50.00,
    "baggageFees": 25.00,
    "airlineName": "British Airways",
    "duration": "7h 30min",
    "numberofStops": 0,
    "stopsInfo": null,
    "fromToTime": "7:00AM - 4:15PM",
    "Date": "2024-01-15T07:00:00.000Z"
  },
  "returningFlight": {
    "flightId": "uuid",
    "fromCity": "London",
    "toCity": "New York",
    "type": true,
    "imgPath": "/images/flight2.jpg",
    "subtotalPrice": 450.00,
    "taxesAndFees": 45.00,
    "baggageFees": 25.00,
    "airlineName": "British Airways",
    "duration": "8h 00min",
    "numberofStops": 1,
    "stopsInfo": "1 stop in Paris",
    "fromToTime": "6:00PM - 2:00AM",
    "Date": "2024-01-20T18:00:00.000Z"
  },
  "passengerInfo": {
    "firstName": "John",
    "checkedBags": 2
  },
  "paymentInfo": {
    "paymentType": "Visa",
    "nameOnCard": "John Doe",
    "cardNumber": "1111",
    "ccv": "123",
    "expireDate": "2025-12-31T00:00:00.000Z"
  },
  "departingSeat": {
    "flightId": "uuid",
    "type": "Economy",
    "seatNumber": "10A",
    "available": true,
    "price": 100.00
  },
  "arrivingSeat": {
    "flightId": "uuid",
    "type": "Business",
    "seatNumber": "5B",
    "available": true,
    "price": 200.00
  },
  "confirmationMessage": "TRIPMA123456789",
  "baggageFees": 100.00,
  "upgradeFees": 200.00,
  "total": 1470.00
}
```

**Error Responses:**

**400 Bad Request - Missing required fields:**
```json
{
  "message": "Missing required fields"
}
```

**400 Bad Request - Invalid user ID:**
```json
{
  "message": "Invalid user ID"
}
```

**400 Bad Request - Missing passenger info:**
```json
{
  "message": "Missing required passenger info"
}
```

**400 Bad Request - Invalid passenger info:**
```json
{
  "message": "Invalid passenger information"
}
```

**400 Bad Request - Invalid payment info:**
```json
{
  "message": "Invalid payment information"
}
```

**400 Bad Request - Invalid card details:**
```json
{
  "message": "Invalid card number, CCV, or expiration date"
}
```

**400 Bad Request - Flight not found:**
```json
{
  "message": "Departing flight not found"
}
```
or
```json
{
  "message": "Returning flight not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```

**Business Logic:**

**1. Price Calculation:**
- **Departing flight:**
  - `departingBaggageFees = departingFlight.baggageFees * checkedBags`
  - `upgradeFees = departingSeat.price` if seat type is "Business", else 0
  - `departingTotalPrice = subtotalPrice + taxesAndFees + departingBaggageFees + upgradeFees`

- **Returning flight (if applicable):**
  - `returningBaggageFees = returningFlight.baggageFees * checkedBags`
  - `returningUpgradeFees = arrivingSeat.price` if seat type is "Business", else 0
  - `returningTotalPrice = subtotalPrice + taxesAndFees + returningBaggageFees + returningUpgradeFees`

- **Total:** `totalPrice = departingTotalPrice + returningTotalPrice`

**2. Booking Creation:**
- Generate confirmation message: UUID (12 characters)
- Create Booking record with calculated fees
- Create nested PassengerInfo record
- Create nested PaymentInfo record
- Return booking details with masked card number (last 4 digits only)

**3. Database Operations:**
- No transaction management (potential data consistency issue)
- Seat availability not updated after booking (potential overbooking issue)

---

## 5. Cities Endpoints

### 5.1 Get Available Cities - Lấy danh sách thành phố

**Endpoint:** `GET /api/cities`

**Authentication:** Không yêu cầu (Public endpoint)

**Request Parameters:** None

**Example Request:**
```
GET /api/cities
```

**Success Response:**
- **Status Code:** 200 OK
- **Response Body:**
```json
{
  "fromCities": [
    "New York",
    "London",
    "Paris",
    "Tokyo"
  ],
  "toCities": [
    "London",
    "Paris",
    "Tokyo",
    "New York"
  ]
}
```

**Error Response:**
- **Status Code:** 500 Internal Server Error
```json
{
  "error": "Failed to fetch cities"
}
```

**Business Logic:**
1. Query all flights with select fromCity and toCity
2. Use distinct to remove duplicates
3. Extract unique cities into two arrays:
   - fromCities: All unique departure cities
   - toCities: All unique arrival cities
4. Return object with both arrays

---

## 6. Summary of All Endpoints

| # | Endpoint | Method | Authentication | Description |
|---|----------|--------|----------------|-------------|
| 1 | `/api/auth/signup` | POST | None | Đăng ký tài khoản mới |
| 2 | `/api/auth/[...nextauth]` | GET, POST | None | NextAuth authentication (Sign in/Sign out/Session) |
| 3 | `/api/flights` | GET | None | Tìm kiếm chuyến bay |
| 4 | `/api/seats/[flightId]` | GET | None | Lấy danh sách ghế theo flight ID |
| 5 | `/api/booking` | POST | None | Tạo booking mới (support guest booking) |
| 6 | `/api/cities` | GET | None | Lấy danh sách thành phố có sẵn |

---

## 7. Authentication Summary

### Authentication Methods Supported:
1. **Credentials (Email/Password)**
   - Sign up: `/api/auth/signup`
   - Sign in: NextAuth credentials provider

2. **Google OAuth**
   - Sign in: NextAuth Google provider
   - Requires: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### Session Management:
- Strategy: JWT
- Session stored in HTTP-only cookie
- Session includes: user id, email, username

### Protected Endpoints:
- **None** - All endpoints are currently public
- No endpoints require authentication
- Guest booking is supported (userId = null)

---

## 8. Common Error Responses

### 400 Bad Request
- Missing required fields
- Invalid data format
- Validation failed

### 401 Unauthorized
- Invalid credentials (sign in)
- Session expired (if implemented)

### 404 Not Found
- Resource not found (not currently implemented)

### 500 Internal Server Error
- Database connection error
- Unexpected server error
- Generic error fallback

---

## 9. Security Considerations

### Current Issues:
1. **No Authentication Required:** All endpoints are public
2. **No Rate Limiting:** No protection against API abuse
3. **No Input Sanitization:** User inputs not sanitized
4. **Card Number Storage:** Stored in plain text (not encrypted)
5. **No HTTPS Enforcement:** No SSL/TLS requirement
6. **No CORS Configuration:** Default Next.js CORS policy
7. **No Request Size Limit:** Potential DoS vulnerability

### Recommendations:
1. Implement authentication for sensitive endpoints
2. Add rate limiting (e.g., express-rate-limit)
3. Implement input sanitization (e.g., validator.js)
4. Encrypt card numbers (e.g., crypto-js)
5. Enforce HTTPS in production
6. Configure CORS properly
7. Add request size limits
8. Implement API key authentication for external access
9. Add audit logging for sensitive operations
10. Implement CSRF protection

---

## 10. Testing Examples

### Example 1: Complete Booking Flow

```bash
# 1. Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "agreeTerms": true
  }'

# 2. Sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=test@example.com&password=password123"

# 3. Search flights
curl "http://localhost:3000/api/flights?fromCity=New York&toCity=London&startDate=2024-01-15&adults=1&type=false"

# 4. Get seats
curl "http://localhost:3000/api/seats/0089b898-88d4-4e9e-ac26-e1c929279077"

# 5. Create booking
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "departingFlightId": "0089b898-88d4-4e9e-ac26-e1c929279077",
    "departingSeat": "10A",
    "passengerInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-15",
      "email": "john@example.com",
      "phone": "12345678901",
      "checkedBags": 1
    },
    "paymentInfo": {
      "paymentType": "Visa",
      "nameOnCard": "John Doe",
      "cardNumber": "4111111111111111",
      "ccv": "123",
      "expireDate": "2025-12-31"
    }
  }'
```

### Example 2: Guest Booking Flow

```bash
# 1. Search flights (no authentication)
curl "http://localhost:3000/api/flights?fromCity=New York&toCity=London&startDate=2024-01-15&adults=1&type=false"

# 2. Get seats (no authentication)
curl "http://localhost:3000/api/seats/0089b898-88d4-4e9e-ac26-e1c929279077"

# 3. Create booking (no userId - guest booking)
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "userId": null,
    "departingFlightId": "0089b898-88d4-4e9e-ac26-e1c929279077",
    "departingSeat": "10A",
    "passengerInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-15",
      "email": "john@example.com",
      "phone": "12345678901",
      "checkedBags": 1
    },
    "paymentInfo": {
      "paymentType": "Visa",
      "nameOnCard": "John Doe",
      "cardNumber": "4111111111111111",
      "ccv": "123",
      "expireDate": "2025-12-31"
    }
  }'
```

---

## 11. Missing Endpoints (Not Implemented)

Based on the codebase analysis, the following endpoints are referenced in the UI but not implemented:

1. **GET /api/hotels** - Hotel search (returns 404)
2. **GET /api/packages** - Package deals (returns 404)
3. **GET /api/trips** - User booking history (returns 404)
4. **POST /api/auth/forgot-password** - Password reset (not implemented)
5. **GET /api/bookings/[id]** - Get booking by ID (not implemented)
6. **DELETE /api/bookings/[id]** - Cancel booking (not implemented)
7. **GET /api/users/[id]/bookings** - Get user bookings (not implemented)
8. **POST /api/bookings/[id]/share** - Share itinerary (not implemented as API)
