# API Contracts - Tripma Flight Booking

Format: Vertical field-value layout; repository AS-IS documentation

---

## API-FLIGHTS-SEARCH — Search Flights

**API ID:** API-FLIGHTS-SEARCH  
**API Name:** Search Flights  
**Related Use Case IDs:** UC-01  
**Method:** GET  
**Path:** /api/flights  
**Description:** Search for flights based on departure city, arrival city, dates, and passenger count. Returns departing and returning flights (if round-trip).  
**Authentication:** Public  
**Authorization:** None  

**Business Rules / Validation Constraints:**
- BR-SEARCH-001 — Tổng hành khách = adults + minors
- BR-SEARCH-002 — Chuyến bay phải có ít nhất 1 ghế available mới được tìm thấy
- BR-SEARCH-003 — Số ghế available của chuyến bay phải >= tổng hành khách
- BR-SEARCH-004 — Chuyến đi chỉ tìm trong khoảng: startDate <= Date < startDate + 24h
- BR-SEARCH-005 — Chuyến về chỉ tìm trong khoảng: endDate <= Date < endDate + 24h
- BR-SEARCH-006 — Chuyến về chỉ được tìm khi type = round-trip và có endDate
- BR-SEARCH-007 — Chuyến về phải có fromCity và toCity đảo ngược so với chuyến đi
- BR-SEARCH-008 — Không có validation cho input parameters — thiếu fromCity/toCity/date không báo lỗi

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: No; Nullable: No
  - Default: None
  - Allowed values: application/json
  - Validation: Not required for GET request.
  - Trigger: Optional.
  - Description: Declares the request body format.
  - Example: application/json

**Request Query Parameters:**
- fromCity
  - Type: string; Format: string; Required: No; Nullable: Yes
  - Validation: No validation applied.
  - Trigger: Search request.
  - Description: Departure city name.
  - Example: "New York"

- toCity
  - Type: string; Format: string; Required: No; Nullable: Yes
  - Validation: No validation applied.
  - Trigger: Search request.
  - Description: Arrival city name.
  - Example: "London"

- startDate
  - Type: string; Format: date; Required: No; Nullable: Yes
  - Validation: No validation applied.
  - Trigger: Search request.
  - Description: Departure date.
  - Example: "2024-08-15"

- endDate
  - Type: string; Format: date; Required: No; Nullable: Yes
  - Validation: No validation applied.
  - Trigger: Search request for round-trip.
  - Description: Return date for round-trip flights.
  - Example: "2024-08-20"

- adults
  - Type: number; Format: integer; Required: No; Nullable: Yes
  - Validation: Defaults to 0 if not provided.
  - Trigger: Search request.
  - Description: Number of adult passengers.
  - Example: 2

- minors
  - Type: number; Format: integer; Required: No; Nullable: Yes
  - Validation: Defaults to 0 if not provided.
  - Trigger: Search request.
  - Description: Number of minor passengers.
  - Example: 1

- type
  - Type: string; Format: boolean; Required: No; Nullable: Yes
  - Validation: Must be "true" or "false" as string.
  - Trigger: Search request.
  - Description: Trip type - true for round-trip, false for one-way.
  - Example: "true"

**Success Response — HTTP 200:**
- departingFlights
  - Type: array; Required: Yes; Nullable: No
  - Trigger: Successful search.
  - Description: Array of departing flights matching criteria.
  - Example:
    ```json
    [
      {
        "flightId": "uuid",
        "fromCity": "New York",
        "toCity": "London",
        "type": true,
        "imgPath": "/path/to/image",
        "subtotalPrice": 500,
        "taxesAndFees": 50,
        "airlineName": "Airline Name",
        "duration": "7h 30m",
        "fromToTime": "10:00 - 17:30",
        "date": "2024-08-15T10:00:00Z",
        "availableSeats": 150,
        "stopsNumber": 0,
        "stopsInfo": "Direct"
      }
    ]
    ```

- arrivingFlights
  - Type: array; Required: Yes; Nullable: No
  - Trigger: Successful search with round-trip.
  - Description: Array of returning flights matching criteria (empty if one-way).
  - Example:
    ```json
    [
      {
        "flightId": "uuid",
        "fromCity": "London",
        "toCity": "New York",
        "type": true,
        "imgPath": "/path/to/image",
        "subtotalPrice": 500,
        "taxesAndFees": 50,
        "airlineName": "Airline Name",
        "duration": "7h 30m",
        "fromToTime": "10:00 - 17:30",
        "date": "2024-08-20T10:00:00Z",
        "availableSeats": 150,
        "stopsNumber": 0,
        "stopsInfo": "Direct"
      }
    ]
    ```

**Error Response — HTTP 500:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Internal Server Error"

**Notes:**
Source: app/api/flights/route.js  
Repository status: Implemented and functional.  
Evidence: app/api/flights/route.js::GET

---

## API-CITIES-LIST — Get Available Cities

**API ID:** API-CITIES-LIST  
**API Name:** Get Available Cities  
**Related Use Case IDs:** UC-09  
**Method:** GET  
**Path:** /api/cities  
**Description:** Retrieve lists of available departure and arrival cities from all flights in the database.  
**Authentication:** Public  
**Authorization:** None  

**Business Rules / Validation Constraints:**
- BR-CITY-001 — Danh sách thành phố lấy từ tất cả fromCity và toCity trong bảng Flight
- BR-CITY-002 — Không trả về thành phố trùng lặp
- BR-CITY-003 — Trả về 2 danh sách riêng: fromCities và toCities

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: No; Nullable: No
  - Default: None
  - Allowed values: application/json
  - Validation: Not required for GET request.
  - Trigger: Optional.
  - Description: Declares the request body format.
  - Example: application/json

**Request Body:** None

**Success Response — HTTP 200:**
- fromCities
  - Type: array; Required: Yes; Nullable: No
  - Trigger: Successful retrieval.
  - Description: Array of unique departure city names.
  - Example:
    ```json
    ["New York", "London", "Paris", "Tokyo"]
    ```

- toCities
  - Type: array; Required: Yes; Nullable: No
  - Trigger: Successful retrieval.
  - Description: Array of unique arrival city names.
  - Example:
    ```json
    ["New York", "London", "Paris", "Tokyo"]
    ```

**Error Response — HTTP 500:**
- error
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Failed to fetch cities"

**Notes:**
Source: app/api/cities/route.js  
Repository status: Implemented and functional.  
Evidence: app/api/cities/route.js::GET

---

## API-SEATS-LIST — Get Available Seats

**API ID:** API-SEATS-LIST  
**API Name:** Get Available Seats  
**Related Use Case IDs:** UC-04  
**Method:** GET  
**Path:** /api/seats/[flightId]  
**Description:** Retrieve available seats for a specific flight, categorized by seat type (Economy and Business).  
**Authentication:** Public  
**Authorization:** None  

**Business Rules / Validation Constraints:**
- BR-SEAT-001 — Chỉ hiển thị ghế có available = true
- BR-SEAT-002 — Ghế được sắp xếp theo seatNumber tăng dần
- BR-SEAT-003 — Ghế được phân loại thành 2 nhóm: Economy và Business

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: No; Nullable: No
  - Default: None
  - Allowed values: application/json
  - Validation: Not required for GET request.
  - Trigger: Optional.
  - Description: Declares the request body format.
  - Example: application/json

**Request Path Parameters:**
- flightId
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Validation: Must be a valid flight ID.
  - Trigger: Seat retrieval request.
  - Description: ID of the flight to retrieve seats for.
  - Example: "0089b898-88d4-4e9e-ac26-e1c929279077"

**Request Body:** None

**Success Response — HTTP 200:**
- businessSeats
  - Type: array; Required: Yes; Nullable: No
  - Trigger: Successful retrieval.
  - Description: Array of available Business class seats.
  - Example:
    ```json
    [
      {
        "seatId": "uuid",
        "flightId": "uuid",
        "seatNumber": "1A",
        "type": "Business",
        "available": true,
        "price": 200
      }
    ]
    ```

- economySeats
  - Type: array; Required: Yes; Nullable: No
  - Trigger: Successful retrieval.
  - Description: Array of available Economy class seats.
  - Example:
    ```json
    [
      {
        "seatId": "uuid",
        "flightId": "uuid",
        "seatNumber": "10A",
        "type": "Economy",
        "available": true,
        "price": 100
      }
    ]
    ```

**Error Response — HTTP 500:**
- error
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Internal Server Error"

**Notes:**
Source: app/api/seats/[flightId]/route.js  
Repository status: Implemented and functional.  
Evidence: app/api/seats/[flightId]/route.js::GET

---

## API-BOOKING-CREATE — Create Booking

**API ID:** API-BOOKING-CREATE  
**API Name:** Create Booking  
**Related Use Case IDs:** UC-05  
**Method:** POST  
**Path:** /api/booking  
**Description:** Create a new booking with passenger and payment information. Supports both guest and authenticated bookings.  
**Authentication:** Public  
**Authorization:** None  

**Business Rules / Validation Constraints:**
- BR-BOOK-001 — Bắt buộc: departingFlightId, departingSeat, passengerInfo, paymentInfo
- BR-BOOK-002 — Tùy chọn: returningFlightId, arrivingSeat (chỉ có với round-trip)
- BR-BOOK-003 — userId có thể null — cho phép đặt vé không cần đăng nhập (guest booking)
- BR-BOOK-004 — Nếu có userId thì user phải tồn tại trong hệ thống
- BR-BOOK-005 — Chuyến bay phải tồn tại trong hệ thống mới được đặt
- BR-BOOK-006 — Mã xác nhận booking được generate tự động bằng UUID 12 ký tự
- BR-PRICE-001 — Phí hành lý chuyến đi = baggageFees của chuyến bay × số hành lý checked
- BR-PRICE-002 — Upgrade fee = giá ghế Business nếu chọn ghế Business, ngược lại = 0
- BR-PRICE-003 — Tổng giá 1 chuyến = subtotalPrice + taxesAndFees + baggageFees + upgradeFees
- BR-PRICE-004 — Tổng booking = tổng chuyến đi + tổng chuyến về (nếu round-trip)
- BR-PRICE-005 — Tổng booking = tổng chuyến đi nếu one-way
- BR-PASS-001 — Bắt buộc: firstName, lastName, dateOfBirth, email, phone, checkedBags
- BR-PASS-002 — Tùy chọn: middleName, suffix, redressNumber, knownTravelerNumber
- BR-PASS-003 — Email hành khách phải đúng format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- BR-PASS-004 — Số điện thoại phải đúng 11 chữ số: /^\d{11}$/
- BR-PASS-005 — Ngày sinh phải trước ngày hiện tại
- BR-PAY-001 — Bắt buộc: paymentType, nameOnCard, cardNumber, ccv, expireDate
- BR-PAY-002 — Hiện chỉ hỗ trợ paymentType = "Visa" (hardcoded)
- BR-PAY-003 — Số thẻ phải đúng 16 chữ số: /^\d{16}$/
- BR-PAY-004 — CCV phải đúng 3 chữ số: /^\d{3}$/
- BR-PAY-005 — Ngày hết hạn thẻ phải sau ngày hiện tại

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: Yes; Nullable: No
  - Default: application/json
  - Allowed values: application/json
  - Validation: Request body must be JSON.
  - Trigger: Every request containing a JSON body.
  - Description: Declares the request body format.
  - Example: application/json

**Request Body:**
- userId
  - Type: string; Format: UUID; Required: No; Nullable: Yes
  - Validation: If provided, must exist in database.
  - Trigger: Authenticated booking.
  - Description: User ID for authenticated booking (null for guest booking).
  - Example: "uuid"

- departingFlightId
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Validation: Must exist in database.
  - Trigger: Booking request.
  - Description: ID of the departing flight.
  - Example: "uuid"

- returningFlightId
  - Type: string; Format: UUID; Required: No; Nullable: Yes
  - Validation: If provided, must exist in database.
  - Trigger: Round-trip booking.
  - Description: ID of the returning flight (optional for one-way).
  - Example: "uuid"

- departingSeat
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be a valid seat number.
  - Trigger: Booking request.
  - Description: Seat number for departing flight.
  - Example: "10A"

- arrivingSeat
  - Type: string; Format: string; Required: No; Nullable: Yes
  - Validation: Must be a valid seat number if provided.
  - Trigger: Round-trip booking.
  - Description: Seat number for returning flight (optional for one-way).
  - Example: "5A"

- passengerInfo
  - Type: object; Required: Yes; Nullable: No
  - Validation: Must contain required fields.
  - Trigger: Booking request.
  - Description: Passenger information object.
  - Example:
    ```json
    {
      "firstName": "John",
      "middleName": "William",
      "lastName": "Doe",
      "suffix": "Jr",
      "dateOfBirth": "1990-01-01",
      "email": "john@example.com",
      "phone": "12345678901",
      "checkedBags": 2,
      "redressNumber": "123456789",
      "knownTravelerNumber": "987654321"
    }
    ```

- passengerInfo.firstName
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be non-empty.
  - Trigger: Booking request.
  - Description: Passenger's first name.
  - Example: "John"

- passengerInfo.lastName
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be non-empty.
  - Trigger: Booking request.
  - Description: Passenger's last name.
  - Example: "Doe"

- passengerInfo.dateOfBirth
  - Type: string; Format: date; Required: Yes; Nullable: No
  - Validation: Must be before current date.
  - Trigger: Booking request.
  - Description: Passenger's date of birth.
  - Example: "1990-01-01"

- passengerInfo.email
  - Type: string; Format: email; Required: Yes; Nullable: No
  - Validation: Must match /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  - Trigger: Booking request.
  - Description: Passenger's email address.
  - Example: "john@example.com"

- passengerInfo.phone
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be exactly 11 digits: /^\d{11}$/
  - Trigger: Booking request.
  - Description: Passenger's phone number.
  - Example: "12345678901"

- passengerInfo.checkedBags
  - Type: number; Format: integer; Required: Yes; Nullable: No
  - Validation: Must be provided.
  - Trigger: Booking request.
  - Description: Number of checked bags.
  - Example: 2

- passengerInfo.middleName
  - Type: string; Format: string; Required: No; Nullable: Yes
  - Validation: Optional.
  - Trigger: Booking request.
  - Description: Passenger's middle name.
  - Example: "William"

- passengerInfo.suffix
  - Type: string; Format: string; Required: No; Nullable: Yes
  - Validation: Optional.
  - Trigger: Booking request.
  - Description: Passenger's name suffix.
  - Example: "Jr"

- passengerInfo.redressNumber
  - Type: string; Format: string; Required: No; Nullable: Yes
  - Validation: Optional.
  - Trigger: Booking request.
  - Description: Passenger's redress number.
  - Example: "123456789"

- passengerInfo.knownTravelerNumber
  - Type: string; Format: string; Required: No; Nullable: Yes
  - Validation: Optional.
  - Trigger: Booking request.
  - Description: Passenger's known traveler number.
  - Example: "987654321"

- paymentInfo
  - Type: object; Required: Yes; Nullable: No
  - Validation: Must contain required fields.
  - Trigger: Booking request.
  - Description: Payment information object.
  - Example:
    ```json
    {
      "paymentType": "Visa",
      "nameOnCard": "John Doe",
      "cardNumber": "1234567890123456",
      "ccv": "123",
      "expireDate": "2025-12-31"
    }
    ```

- paymentInfo.paymentType
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be "Visa" (hardcoded).
  - Trigger: Booking request.
  - Description: Payment type.
  - Example: "Visa"

- paymentInfo.nameOnCard
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be non-empty.
  - Trigger: Booking request.
  - Description: Name on card.
  - Example: "John Doe"

- paymentInfo.cardNumber
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be exactly 16 digits: /^\d{16}$/
  - Trigger: Booking request.
  - Description: Card number.
  - Example: "1234567890123456"

- paymentInfo.ccv
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Validation: Must be exactly 3 digits: /^\d{3}$/
  - Trigger: Booking request.
  - Description: Card CCV.
  - Example: "123"

- paymentInfo.expireDate
  - Type: string; Format: date; Required: Yes; Nullable: No
  - Validation: Must be after current date.
  - Trigger: Booking request.
  - Description: Card expiration date.
  - Example: "2025-12-31"

**Success Response — HTTP 201:**
- bookingId
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: ID of the created booking.
  - Example: "uuid"

- departingFlight
  - Type: object; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: Departing flight details.
  - Example:
    ```json
    {
      "flightId": "uuid",
      "fromCity": "New York",
      "toCity": "London",
      ...
    }
    ```

- returningFlight
  - Type: object; Required: No; Nullable: Yes
  - Trigger: Successful round-trip booking creation.
  - Description: Returning flight details (null if one-way).
  - Example:
    ```json
    {
      "flightId": "uuid",
      "fromCity": "London",
      "toCity": "New York",
      ...
    }
    ```

- passengerInfo
  - Type: object; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: Passenger info summary.
  - Example:
    ```json
    {
      "firstName": "John",
      "checkedBags": 2
    }
    ```

- paymentInfo
  - Type: object; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: Payment info summary (card number masked).
  - Example:
    ```json
    {
      "paymentType": "Visa",
      "nameOnCard": "John Doe",
      "cardNumber": "3456",
      "ccv": "123",
      "expireDate": "2025-12-31"
    }
    ```

- departingSeat
  - Type: object; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: Departing seat details.
  - Example:
    ```json
    {
      "seatId": "uuid",
      "seatNumber": "10A",
      "type": "Economy",
      "price": 100
    }
    ```

- arrivingSeat
  - Type: object; Required: No; Nullable: Yes
  - Trigger: Successful round-trip booking creation.
  - Description: Arriving seat details (null if one-way).
  - Example:
    ```json
    {
      "seatId": "uuid",
      "seatNumber": "5A",
      "type": "Economy",
      "price": 100
    }
    ```

- confirmationMessage
  - Type: string; Format: string; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: 12-character UUID confirmation code.
  - Example: "a1b2c3d4e5f6"

- baggageFees
  - Type: number; Format: decimal; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: Total baggage fees for both flights.
  - Example: 50

- upgradeFees
  - Type: number; Format: decimal; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: Total upgrade fees for both flights.
  - Example: 200

- total
  - Type: number; Format: decimal; Required: Yes; Nullable: No
  - Trigger: Successful booking creation.
  - Description: Total booking price.
  - Example: 750

**Error Response — HTTP 400:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Missing required fields, invalid user ID, invalid passenger info, or invalid payment info.
  - Description: Error message.
  - Example: "Missing required fields"

**Error Response — HTTP 500:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Internal server error"

**Notes:**
Source: app/api/booking/route.js  
Repository status: Implemented and functional.  
Security issue: Card number is stored in plain text in database.  
Evidence: app/api/booking/route.js::POST

---

## API-AUTH-SIGNUP — User Sign Up

**API ID:** API-AUTH-SIGNUP  
**API Name:** User Sign Up  
**Related Use Case IDs:** UC-07  
**Method:** POST  
**Path:** /api/auth/signup  
**Description:** Register a new user account with email and password.  
**Authentication:** Public  
**Authorization:** None  

**Business Rules / Validation Constraints:**
- BR-AUTH-001 — Email là bắt buộc, không được để trống
- BR-AUTH-002 — Email phải chứa ký tự "@"
- BR-AUTH-003 — Password là bắt buộc, không được để trống
- BR-AUTH-004 — Password phải có tối thiểu 8 ký tự (MIN_PASSWORD_LENGTH = 8)
- BR-AUTH-005 — Người dùng phải đồng ý điều khoản sử dụng (agreeTerms = true)
- BR-AUTH-006 — Email phải là duy nhất trong hệ thống, không được trùng với email đã đăng ký
- BR-AUTH-007 — Password được hash bằng bcrypt với SALT_ROUNDS = 10 trước khi lưu
- BR-AUTH-008 — Username được tự động generate: {email_prefix}_{timestamp}

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: Yes; Nullable: No
  - Default: application/json
  - Allowed values: application/json
  - Validation: Request body must be JSON.
  - Trigger: Every request containing a JSON body.
  - Description: Declares the request body format.
  - Example: application/json

**Request Body:**
- email
  - Type: string; Format: email; Required: Yes; Nullable: No
  - Validation: Must be non-empty and contain "@" symbol.
  - Trigger: Sign up request.
  - Description: User's email address.
  - Example: "user@example.com"

- password
  - Type: string; Format: password; Required: Yes; Nullable: No
  - Validation: Must be at least 8 characters long.
  - Trigger: Sign up request.
  - Description: User's password.
  - Example: "P@ssw0rd123"

- agreeTerms
  - Type: boolean; Format: boolean; Required: Yes; Nullable: No
  - Validation: Must be true.
  - Trigger: Sign up request.
  - Description: User's agreement to terms and conditions.
  - Example: true

**Success Response — HTTP 200:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Successful registration.
  - Description: Success message.
  - Example: "Signup successful"

**Error Response — HTTP 400:**
- error
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Missing email/password, invalid email, password too short, terms not agreed, or email already exists.
  - Description: Error message.
  - Example: "Email is already in use"

**Error Response — HTTP 500:**
- error
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "An error occurred during signup"

**Notes:**
Source: app/api/auth/signup/route.js  
Repository status: Implemented and functional.  
Default location is hardcoded to "Cairo", "Egypt".  
Evidence: app/api/auth/signup/route.js::POST

---

## API-AUTH-SIGNIN — User Sign In

**API ID:** API-AUTH-SIGNIN  
**API Name:** User Sign In  
**Related Use Case IDs:** UC-08  
**Method:** POST  
**Path:** /api/auth/[...nextauth]  
**Description:** Authenticate user with email/password credentials or Google OAuth. Issues JWT session token.  
**Authentication:** Public  
**Authorization:** None  

**Business Rules / Validation Constraints:**
- BR-SIGNIN-001 — Email là bắt buộc, không được để trống
- BR-SIGNIN-002 — Email phải chứa ký tự "@"
- BR-SIGNIN-003 — Password là bắt buộc, không được để trống
- BR-SIGNIN-004 — Password phải có tối thiểu 8 ký tự (MIN_PASSWORD_LENGTH = 8)
- BR-SIGNIN-005 — Password được verify bằng bcrypt compare với hash trong database
- BR-SIGNIN-006 — Session strategy sử dụng JWT
- BR-SIGNIN-007 — JWT token chứa: id, email, username
- BR-SIGNIN-008 — Session object chứa: user.id, user.email, user.username
- BR-SIGNIN-009 — Google OAuth provider được cấu hình với GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET
- BR-SIGNIN-010 — Google OAuth sử dụng PrismaAdapter để tạo/update user

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: Yes; Nullable: No
  - Default: application/json
  - Allowed values: application/json
  - Validation: Request body must be JSON.
  - Trigger: Every request containing a JSON body.
  - Description: Declares the request body format.
  - Example: application/json

**Request Body (Credentials Provider):**
- email
  - Type: string; Format: email; Required: Yes; Nullable: No
  - Validation: Must be non-empty and contain "@" symbol.
  - Trigger: Sign in request.
  - Description: User's email address.
  - Example: "user@example.com"

- password
  - Type: string; Format: password; Required: Yes; Nullable: No
  - Validation: Must be at least 8 characters long.
  - Trigger: Sign in request.
  - Description: User's password.
  - Example: "P@ssw0rd123"

**Request Body (Google OAuth):**
Handled by NextAuth Google Provider redirect flow.

**Success Response — HTTP 200 (Credentials):**
Session object with JWT token set in cookie.

**Success Response — HTTP 302 (Google OAuth):**
Redirect to Google OAuth consent screen.

**Error Response — HTTP 401:**
- error
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Invalid credentials (email not found or password incorrect).
  - Description: Error message.
  - Example: "Invalid email or password"

**Error Response — HTTP 500:**
- error
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Internal Server Error"

**Notes:**
Source: app/api/auth/[...nextauth]/route.js  
Repository status: Implemented and functional.  
Uses NextAuth.js with CredentialsProvider and GoogleProvider.  
Evidence: app/api/auth/[...nextauth]/route.js::POST

---

## API-BOOKING-SHARE — Share Itinerary

**API ID:** API-BOOKING-SHARE  
**API Name:** Share Itinerary  
**Related Use Case IDs:** UC-12  
**Method:** POST  
**Path:** /api/bookings/[id]/share  
**Description:** Share booking itinerary with another user via email.  
**Authentication:** Required  
**Authorization:** Bearer Token (JWT)  

**Business Rules / Validation Constraints:**
- BR-SHARE-001 — Email phải đúng format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- BR-SHARE-002 — Share record sẽ link bookingId với recipient email
- BR-SHARE-003 — Itinerary email được gửi đến recipient
- BR-SHARE-004 — Chức năng này chưa được implement (không có API endpoint)

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: Yes; Nullable: No
  - Default: application/json
  - Allowed values: application/json
  - Validation: Request body must be JSON.
  - Trigger: Every request containing a JSON body.
  - Description: Declares the request body format.
  - Example: application/json

- headers.Authorization
  - Type: string; Format: Bearer token; Required: Yes; Nullable: No
  - Default: None
  - Allowed values: Bearer {JWT token}
  - Validation: Must be valid JWT token.
  - Trigger: Every request.
  - Description: JWT authentication token.
  - Example: Bearer eyJhbGciOiJIUzI1NiIs...

**Request Path Parameters:**
- id
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Validation: Must be a valid booking ID.
  - Trigger: Share request.
  - Description: ID of the booking to share.
  - Example: "uuid"

**Request Body:**
- email
  - Type: string; Format: email; Required: Yes; Nullable: No
  - Validation: Must match /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  - Trigger: Share request.
  - Description: Recipient email address.
  - Example: "recipient@example.com"

**Success Response — HTTP 200:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Successful share.
  - Description: Success message.
  - Example: "Itinerary shared successfully"

- shareId
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Trigger: Successful share.
  - Description: ID of the created share record.
  - Example: "uuid"

**Error Response — HTTP 400:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Invalid email format.
  - Description: Error message.
  - Example: "Invalid email format"

**Error Response — HTTP 401:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Unauthorized access.
  - Description: Error message.
  - Example: "Unauthorized"

**Error Response — HTTP 404:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Booking not found.
  - Description: Error message.
  - Example: "Booking not found"

**Error Response — HTTP 500:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Internal Server Error"

**Notes:**
Source: Not implemented  
Repository status: NOT IMPLEMENTED - No API route exists.  
ShareItinerary model exists in schema but no API route.  
Evidence: prisma/schema.prisma (ShareItinerary model exists)

---

## API-USER-BOOKINGS — Get User Booking History

**API ID:** API-USER-BOOKINGS  
**API Name:** Get User Booking History  
**Related Use Case IDs:** UC-13  
**Method:** GET  
**Path:** /api/users/[id]/bookings  
**Description:** Retrieve booking history for a specific user.  
**Authentication:** Required  
**Authorization:** Bearer Token (JWT)  

**Business Rules / Validation Constraints:**
- BR-HISTORY-001 — Bookings được filter theo userId
- BR-HISTORY-002 — Mỗi booking bao gồm: flight details, passenger info, payment info
- BR-HISTORY-003 — Cho phép filter bookings theo date
- BR-HISTORY-004 — Chức năng này chưa được implement (không có API endpoint)

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: No; Nullable: No
  - Default: None
  - Allowed values: application/json
  - Validation: Not required for GET request.
  - Trigger: Optional.
  - Description: Declares the request body format.
  - Example: application/json

- headers.Authorization
  - Type: string; Format: Bearer token; Required: Yes; Nullable: No
  - Default: None
  - Allowed values: Bearer {JWT token}
  - Validation: Must be valid JWT token.
  - Trigger: Every request.
  - Description: JWT authentication token.
  - Example: Bearer eyJhbGciOiJIUzI1NiIs...

**Request Path Parameters:**
- id
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Validation: Must be a valid user ID.
  - Trigger: Booking history request.
  - Description: ID of the user to retrieve bookings for.
  - Example: "uuid"

**Request Query Parameters:**
- startDate
  - Type: string; Format: date; Required: No; Nullable: Yes
  - Validation: Optional date filter.
  - Trigger: Booking history request with date filter.
  - Description: Filter bookings from this date onwards.
  - Example: "2024-01-01"

- endDate
  - Type: string; Format: date; Required: No; Nullable: Yes
  - Validation: Optional date filter.
  - Trigger: Booking history request with date filter.
  - Description: Filter bookings up to this date.
  - Example: "2024-12-31"

**Request Body:** None

**Success Response — HTTP 200:**
- bookings
  - Type: array; Required: Yes; Nullable: No
  - Trigger: Successful retrieval.
  - Description: Array of user bookings.
  - Example:
    ```json
    [
      {
        "bookingId": "uuid",
        "confirmationMessage": "a1b2c3d4e5f6",
        "total": 750,
        "createdAt": "2024-08-15T10:00:00Z",
        "departingFlight": {
          "flightId": "uuid",
          "fromCity": "New York",
          "toCity": "London",
          "date": "2024-08-15T10:00:00Z"
        },
        "returningFlight": {
          "flightId": "uuid",
          "fromCity": "London",
          "toCity": "New York",
          "date": "2024-08-20T10:00:00Z"
        },
        "passengerInfo": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "paymentInfo": {
          "paymentType": "Visa",
          "cardNumber": "3456"
        }
      }
    ]
    ```

**Error Response — HTTP 401:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Unauthorized access.
  - Description: Error message.
  - Example: "Unauthorized"

**Error Response — HTTP 404:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: User not found.
  - Description: Error message.
  - Example: "User not found"

**Error Response — HTTP 500:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Internal Server Error"

**Notes:**
Source: Not implemented  
Repository status: NOT IMPLEMENTED - No API route exists.  
Your Trips link exists in navbar but page is not functional.  
Evidence: components/Header/navbar.js (Your Trips link exists)

---

## API-BOOKING-CANCEL — Cancel Booking

**API ID:** API-BOOKING-CANCEL  
**API Name:** Cancel Booking  
**Related Use Case IDs:** UC-14  
**Method:** DELETE  
**Path:** /api/bookings/[id]  
**Description:** Cancel an existing booking and process refund if applicable.  
**Authentication:** Required  
**Authorization:** Bearer Token (JWT)  

**Business Rules / Validation Constraints:**
- BR-CANCEL-001 — Booking status được update thành cancelled
- BR-CANCEL-002 — Refund được xử lý dựa trên cancellation policy (chưa implement)
- BR-CANCEL-003 — Cancellation phải được thực hiện trước deadline (chưa implement)
- BR-CANCEL-004 — Chức năng này chưa được implement (không có API endpoint)

**Request Header(s):**
- headers.Content-Type
  - Type: string; Format: MIME type; Required: No; Nullable: No
  - Default: None
  - Allowed values: application/json
  - Validation: Not required for DELETE request.
  - Trigger: Optional.
  - Description: Declares the request body format.
  - Example: application/json

- headers.Authorization
  - Type: string; Format: Bearer token; Required: Yes; Nullable: No
  - Default: None
  - Allowed values: Bearer {JWT token}
  - Validation: Must be valid JWT token.
  - Trigger: Every request.
  - Description: JWT authentication token.
  - Example: Bearer eyJhbGciOiJIUzI1NiIs...

**Request Path Parameters:**
- id
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Validation: Must be a valid booking ID.
  - Trigger: Cancel request.
  - Description: ID of the booking to cancel.
  - Example: "uuid"

**Request Body:** None

**Success Response — HTTP 200:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Successful cancellation.
  - Description: Success message.
  - Example: "Booking cancelled successfully"

- bookingId
  - Type: string; Format: UUID; Required: Yes; Nullable: No
  - Trigger: Successful cancellation.
  - Description: ID of the cancelled booking.
  - Example: "uuid"

- refundAmount
  - Type: number; Format: decimal; Required: No; Nullable: Yes
  - Trigger: Successful cancellation with refund.
  - Description: Refund amount if applicable.
  - Example: 750

**Error Response — HTTP 400:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Booking already cancelled or cancellation deadline passed.
  - Description: Error message.
  - Example: "Booking already cancelled"

**Error Response — HTTP 401:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Unauthorized access.
  - Description: Error message.
  - Example: "Unauthorized"

**Error Response — HTTP 404:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Booking not found.
  - Description: Error message.
  - Example: "Booking not found"

**Error Response — HTTP 500:**
- message
  - Type: string; Required: Yes; Nullable: No
  - Trigger: Internal server error.
  - Description: Error message.
  - Example: "Internal Server Error"

**Notes:**
Source: Not implemented  
Repository status: NOT IMPLEMENTED - No API route exists.  
No cancel booking functionality found in codebase.  
Evidence: No cancel booking API route exists in app/api/

---

## Summary

**Total API Endpoints:** 9

**Implemented Endpoints:** 6
- API-FLIGHTS-SEARCH: GET /api/flights
- API-CITIES-LIST: GET /api/cities
- API-SEATS-LIST: GET /api/seats/[flightId]
- API-BOOKING-CREATE: POST /api/booking
- API-AUTH-SIGNUP: POST /api/auth/signup
- API-AUTH-SIGNIN: POST /api/auth/[...nextauth]

**Not Implemented Endpoints:** 3
- API-BOOKING-SHARE: POST /api/bookings/[id]/share
- API-USER-BOOKINGS: GET /api/users/[id]/bookings
- API-BOOKING-CANCEL: DELETE /api/bookings/[id]

**Authentication:**
- Public endpoints: 6 (all endpoints are public, no authentication required)

**Security Notes:**
- Card number stored in plain text in database (API-BOOKING-CREATE)
- No rate limiting implemented
- No CSRF protection implemented
