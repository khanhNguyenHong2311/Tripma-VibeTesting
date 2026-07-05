# API Contracts - Tripma Flight Booking

Format: Vertical field-value layout; repository AS-IS documentation

---

## API-FLIGHTS-SEARCH — Search Flights

API ID	API-FLIGHTS-SEARCH
API Name	Search Flights
Related Use Case IDs	UC-01
Method	GET
Path	/api/flights
Description	Search for flights based on departure city, arrival city, dates, and passenger count. Returns departing and returning flights (if round-trip).
Authentication	Public
Authorization	None
Business Rules / Validation Constraints	"BR-SEARCH-001 — Tổng hành khách = adults + minors
BR-SEARCH-002 — Chuyến bay phải có ít nhất 1 ghế available mới được tìm thấy
BR-SEARCH-003 — Số ghế available của chuyến bay phải >= tổng hành khách
BR-SEARCH-004 — Chuyến đi chỉ tìm trong khoảng: startDate <= Date < startDate + 24h
BR-SEARCH-005 — Chuyến về chỉ tìm trong khoảng: endDate <= Date < endDate + 24h
BR-SEARCH-006 — Chuyến về chỉ được tìm khi type = round-trip và có endDate
BR-SEARCH-007 — Chuyến về phải có fromCity và toCity đảo ngược so với chuyến đi
BR-SEARCH-008 — Không có validation cho input parameters — thiếu fromCity/toCity/date không báo lỗi"
Request Header(s)	"• headers.Content-Type
  Type: string; Format: MIME type; Required: No; Nullable: No
  Default: None
  Allowed values: application/json
  Validation: Not required for GET request.
  Trigger: Optional.
  Description: Declares the request body format.
  Example: application/json"
Query Parameter(s)	"• query.fromCity
  Type: string; Required: No; Nullable: No
  Validation: None (no validation in current implementation).
  Trigger: Flight search request.
  Description: Departure city name.
  Example: "New York"

• query.toCity
  Type: string; Required: No; Nullable: No
  Validation: None (no validation in current implementation).
  Trigger: Flight search request.
  Description: Arrival city name.
  Example: "London"

• query.startDate
  Type: string; Format: date; Required: No; Nullable: No
  Validation: None (no validation in current implementation).
  Trigger: Flight search request.
  Description: Departure date.
  Example: "2024-08-15"

• query.endDate
  Type: string; Format: date; Required: No; Nullable: No
  Validation: None (no validation in current implementation).
  Trigger: Flight search request for round-trip.
  Description: Return date.
  Example: "2024-08-20"

• query.type
  Type: boolean; Required: No; Nullable: No
  Validation: None (no validation in current implementation).
  Trigger: Flight search request.
  Description: Trip type (true for round-trip, false for one-way).
  Example: true

• query.adults
  Type: integer; Required: No; Nullable: No
  Validation: None (no validation in current implementation).
  Trigger: Flight search request.
  Description: Number of adult passengers.
  Example: 2

• query.minors
  Type: integer; Required: No; Nullable: No
  Validation: None (no validation in current implementation).
  Trigger: Flight search request.
  Description: Number of minor passengers.
  Example: 0"
Request Body	None
Success Response — HTTP 200	"• success
  Type: boolean; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Indicates successful retrieval.
  Example: true

• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Human-readable success message.
  Example: Tìm kiếm chuyến bay thành công

• data.departingFlights
  Type: array<object>; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Array of departing flights matching criteria.
  Example: []

• data.departingFlights[].flightId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Flight identifier.
  Example: "uuid"

• data.departingFlights[].fromCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Departure city name.
  Example: "New York"

• data.departingFlights[].toCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Arrival city name.
  Example: "London"

• data.departingFlights[].type
  Type: boolean; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Flight type (true for round-trip).
  Example: true

• data.departingFlights[].imgPath
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Path to flight image.
  Example: "/path/to/image"

• data.departingFlights[].subtotalPrice
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Base price of the flight.
  Example: 500

• data.departingFlights[].taxesAndFees
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Taxes and fees amount.
  Example: 50

• data.departingFlights[].airlineName
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Name of the airline.
  Example: "Airline Name"

• data.departingFlights[].duration
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Flight duration.
  Example: "7h 30m"

• data.departingFlights[].fromToTime
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Departure and arrival time.
  Example: "10:00 - 17:30"

• data.departingFlights[].date
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Flight date and time.
  Example: "2024-08-15T10:00:00Z"

• data.departingFlights[].availableSeats
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Number of available seats.
  Example: 150

• data.departingFlights[].stopsNumber
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Number of stops.
  Example: 0

• data.departingFlights[].stopsInfo
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search.
  Description: Stop information.
  Example: "Direct"

• data.arrivingFlights
  Type: array<object>; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Array of returning flights matching criteria (empty if one-way).
  Example: []

• data.arrivingFlights[].flightId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Flight identifier.
  Example: "uuid"

• data.arrivingFlights[].fromCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Departure city name.
  Example: "London"

• data.arrivingFlights[].toCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Arrival city name.
  Example: "New York"

• data.arrivingFlights[].type
  Type: boolean; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Flight type (true for round-trip).
  Example: true

• data.arrivingFlights[].imgPath
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Path to flight image.
  Example: "/path/to/image"

• data.arrivingFlights[].subtotalPrice
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Base price of the flight.
  Example: 500

• data.arrivingFlights[].taxesAndFees
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Taxes and fees amount.
  Example: 50

• data.arrivingFlights[].airlineName
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Name of the airline.
  Example: "Airline Name"

• data.arrivingFlights[].duration
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Flight duration.
  Example: "7h 30m"

• data.arrivingFlights[].fromToTime
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Departure and arrival time.
  Example: "10:00 - 17:30"

• data.arrivingFlights[].date
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Flight date and time.
  Example: "2024-08-20T10:00:00Z"

• data.arrivingFlights[].availableSeats
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Number of available seats.
  Example: 150

• data.arrivingFlights[].stopsNumber
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Number of stops.
  Example: 0

• data.arrivingFlights[].stopsInfo
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful search with round-trip.
  Description: Stop information.
  Example: "Direct"
"
Error Response — HTTP 500	"• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Internal server error.
  Description: Error message.
  Example: "Internal Server Error"
  Note: The error envelope also contains success=false and may contain an error field."
Notes	"Source: app/api/flights/route.js Repository status: Flight search is implemented and functional. Evidence: app/page.js; app/flights/page.js; app/api/flights/route.js.
Repository status: Implemented and functional.
Evidence: app/api/flights/route.js::GET"

---

## API-CITIES-LIST — Get Available Cities

API ID	API-CITIES-LIST
API Name	Get Available Cities
Related Use Case IDs	UC-09
Method	GET
Path	/api/cities
Description	Retrieve lists of available departure and arrival cities from all flights in the database.
Authentication	Public
Authorization	None
Business Rules / Validation Constraints	"BR-CITY-001 — Danh sách thành phố lấy từ tất cả fromCity và toCity trong bảng Flight
BR-CITY-002 — Không trả về thành phố trùng lặp
BR-CITY-003 — Trả về 2 danh sách riêng: fromCities và toCities"
Request Header(s)	"• headers.Content-Type
  Type: string; Format: MIME type; Required: No; Nullable: No
  Default: None
  Allowed values: application/json
  Validation: Not required for GET request.
  Trigger: Optional.
  Description: Declares the request body format.
  Example: application/json"
Request Body	None
Success Response — HTTP 200	"• success
  Type: boolean; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Indicates successful retrieval.
  Example: true

• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Human-readable success message.
  Example: Lấy danh sách thành phố thành công

• data.fromCities
  Type: array<object>; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Array of unique departure city names.
  Example: []

• data.fromCities[]
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Departure city name.
  Example: "New York"

• data.toCities
  Type: array<object>; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Array of unique arrival city names.
  Example: []

• data.toCities[]
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Arrival city name.
  Example: "London""
Error Response — HTTP 500	"• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Internal server error.
  Description: Error message.
  Example: "Failed to fetch cities"
  Note: The error envelope also contains success=false and may contain an error field."
Notes	"Source: app/api/cities/route.js
Repository status: Implemented and functional.
Evidence: app/api/cities/route.js::GET"

---

## API-SEATS-LIST — Get Available Seats

API ID	API-SEATS-LIST
API Name	Get Available Seats
Related Use Case IDs	UC-04
Method	GET
Path	/api/seats/[flightId]
Description	Retrieve available seats for a specific flight, categorized by seat type (Economy and Business).
Authentication	Public
Authorization	None
Business Rules / Validation Constraints	"BR-SEAT-001 — Chỉ hiển thị ghế có available = true
BR-SEAT-002 — Ghế được sắp xếp theo seatNumber tăng dần
BR-SEAT-003 — Ghế được phân loại thành 2 nhóm: Economy và Business"
Request Header(s)	"• headers.Content-Type
  Type: string; Format: MIME type; Required: No; Nullable: No
  Default: None
  Allowed values: application/json
  Validation: Not required for GET request.
  Trigger: Optional.
  Description: Declares the request body format.
  Example: application/json"
Path Parameter(s)	"• path.flightId
  Type: string; Required: Yes; Nullable: No
  Validation: Must be a valid flight identifier.
  Trigger: Seat retrieval request.
  Description: Flight identifier.
  Example: "uuid""
Request Body	None
Success Response — HTTP 200	"• success
  Type: boolean; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Indicates successful retrieval.
  Example: true

• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Human-readable success message.
  Example: Lấy danh sách ghế thành công

• data.businessSeats
  Type: array<object>; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Array of available Business class seats.
  Example: []

• data.businessSeats[].seatId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat identifier.
  Example: "uuid"

• data.businessSeats[].flightId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Flight identifier.
  Example: "uuid"

• data.businessSeats[].seatNumber
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat number.
  Example: "1A"

• data.businessSeats[].type
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat type.
  Example: "Business"

• data.businessSeats[].available
  Type: boolean; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat availability status.
  Example: true

• data.businessSeats[].price
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat price.
  Example: 200

• data.economySeats
  Type: array<object>; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Array of available Economy class seats.
  Example: []

• data.economySeats[].seatId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat identifier.
  Example: "uuid"

• data.economySeats[].flightId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Flight identifier.
  Example: "uuid"

• data.economySeats[].seatNumber
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat number.
  Example: "10A"

• data.economySeats[].type
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat type.
  Example: "Economy"

• data.economySeats[].available
  Type: boolean; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat availability status.
  Example: true

• data.economySeats[].price
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful retrieval.
  Description: Seat price.
  Example: 100"
Error Response — HTTP 500	"• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Internal server error.
  Description: Error message.
  Example: "Internal Server Error"
  Note: The error envelope also contains success=false and may contain an error field."
Notes	"Source: app/api/seats/[flightId]/route.js
Repository status: Implemented and functional.
Evidence: app/api/seats/[flightId]/route.js::GET"

---

## API-BOOKING-CREATE — Create Booking

API ID	API-BOOKING-CREATE
API Name	Create Booking
Related Use Case IDs	UC-05
Method	POST
Path	/api/booking
Description	Create a new booking with passenger and payment information. Supports both guest and authenticated bookings.
Authentication	Public
Authorization	None
Business Rules / Validation Constraints	"BR-BOOK-001 — Bắt buộc: departingFlightId, departingSeat, passengerInfo, paymentInfo
BR-BOOK-002 — Tùy chọn: returningFlightId, arrivingSeat (chỉ có với round-trip)
BR-BOOK-003 — userId có thể null — cho phép đặt vé không cần đăng nhập (guest booking)
BR-BOOK-004 — Nếu có userId thì user phải tồn tại trong hệ thống
BR-BOOK-005 — Chuyến bay phải tồn tại trong hệ thống mới được đặt
BR-BOOK-006 — Mã xác nhận booking được generate tự động bằng UUID 12 ký tự
BR-PRICE-001 — Phí hành lý chuyến đi = baggageFees của chuyến bay × số hành lý checked
BR-PRICE-002 — Upgrade fee = giá ghế Business nếu chọn ghế Business, ngược lại = 0
BR-PRICE-003 — Tổng giá 1 chuyến = subtotalPrice + taxesAndFees + baggageFees + upgradeFees
BR-PRICE-004 — Tổng booking = tổng chuyến đi + tổng chuyến về (nếu round-trip)
BR-PRICE-005 — Tổng booking = tổng chuyến đi nếu one-way
BR-PASS-001 — Bắt buộc: firstName, lastName, dateOfBirth, email, phone, checkedBags
BR-PASS-002 — Tùy chọn: middleName, suffix, redressNumber, knownTravelerNumber
BR-PASS-003 — Email hành khách phải đúng format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
BR-PASS-004 — Số điện thoại phải đúng 11 chữ số: /^\d{11}$/
BR-PASS-005 — Ngày sinh phải trước ngày hiện tại
BR-PAY-001 — Bắt buộc: paymentType, nameOnCard, cardNumber, ccv, expireDate
BR-PAY-002 — Hiện chỉ hỗ trợ paymentType = "Visa" (hardcoded)
BR-PAY-003 — Số thẻ phải đúng 16 chữ số: /^\d{16}$/
BR-PAY-004 — CCV phải đúng 3 chữ số: /^\d{3}$/
BR-PAY-005 — Ngày hết hạn thẻ phải sau ngày hiện tại"
Request Header(s)	"• headers.Content-Type
  Type: string; Format: MIME type; Required: Yes; Nullable: No
  Default: application/json
  Allowed values: application/json
  Validation: Request body must be JSON.
  Trigger: Every request containing a JSON body.
  Description: Declares the request body format.
  Example: application/json"
Request Body	"• userId
  Type: string; Format: UUID; Required: No; Nullable: Yes
  Validation: If provided, must exist in database.
  Trigger: Authenticated booking.
  Description: User ID for authenticated booking (null for guest booking).
  Example: "uuid"

• departingFlightId
  Type: string; Format: UUID; Required: Yes; Nullable: No
  Validation: Must exist in database.
  Trigger: Booking request.
  Description: ID of the departing flight.
  Example: "uuid"

• returningFlightId
  Type: string; Format: UUID; Required: No; Nullable: Yes
  Validation: If provided, must exist in database.
  Trigger: Round-trip booking.
  Description: ID of the returning flight (optional for one-way).
  Example: "uuid"

• departingSeat
  Type: string; Format: string; Required: Yes; Nullable: No
  Validation: Must be a valid seat number.
  Trigger: Booking request.
  Description: Seat number for departing flight.
  Example: "10A"

• arrivingSeat
  Type: string; Format: string; Required: No; Nullable: Yes
  Validation: Must be a valid seat number if provided.
  Trigger: Round-trip booking.
  Description: Seat number for returning flight (optional for one-way).
  Example: "5A"

• passengerInfo.firstName
  Type: string; Format: string; Required: Yes; Nullable: No
  Validation: Must be non-empty.
  Trigger: Booking request.
  Description: Passenger's first name.
  Example: "John"

• passengerInfo.lastName
  Type: string; Format: string; Required: Yes; Nullable: No
  Validation: Must be non-empty.
  Trigger: Booking request.
  Description: Passenger's last name.
  Example: "Doe"

• passengerInfo.dateOfBirth
  Type: string; Format: date; Required: Yes; Nullable: No
  Validation: Must be before current date.
  Trigger: Booking request.
  Description: Passenger's date of birth.
  Example: "1990-01-01"

• passengerInfo.email
  Type: string; Format: email; Required: Yes; Nullable: No
  Validation: Must match /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  Trigger: Booking request.
  Description: Passenger's email address.
  Example: "john@example.com"

• passengerInfo.phone
  Type: string; Format: string; Required: Yes; Nullable: No
  Validation: Must be exactly 11 digits: /^\d{11}$/
  Trigger: Booking request.
  Description: Passenger's phone number.
  Example: "12345678901"

• passengerInfo.checkedBags
  Type: number; Format: integer; Required: Yes; Nullable: No
  Validation: Must be provided.
  Trigger: Booking request.
  Description: Number of checked bags.
  Example: 2

• passengerInfo.middleName
  Type: string; Format: string; Required: No; Nullable: Yes
  Validation: Optional.
  Trigger: Booking request.
  Description: Passenger's middle name.
  Example: "William"

• passengerInfo.suffix
  Type: string; Format: string; Required: No; Nullable: Yes
  Validation: Optional.
  Trigger: Booking request.
  Description: Passenger's name suffix.
  Example: "Jr"

• passengerInfo.redressNumber
  Type: string; Format: string; Required: No; Nullable: Yes
  Validation: Optional.
  Trigger: Booking request.
  Description: Passenger's redress number.
  Example: "123456789"

• passengerInfo.knownTravelerNumber
  Type: string; Format: string; Required: No; Nullable: Yes
  Validation: Optional.
  Trigger: Booking request.
  Description: Passenger's known traveler number.
  Example: "987654321"

• paymentInfo.paymentType
  Type: string; Format: string; Required: Yes; Nullable: No
  Allowed values: Visa
  Validation: Must be "Visa" (hardcoded).
  Trigger: Booking request.
  Description: Payment type.
  Example: "Visa"

• paymentInfo.nameOnCard
  Type: string; Format: string; Required: Yes; Nullable: No
  Validation: Must be non-empty.
  Trigger: Booking request.
  Description: Name on card.
  Example: "John Doe"

• paymentInfo.cardNumber
  Type: string; Format: string; Required: Yes; Nullable: No
  Validation: Must be exactly 16 digits: /^\d{16}$/
  Trigger: Booking request.
  Description: Card number.
  Example: "1234567890123456"

• paymentInfo.ccv
  Type: string; Format: string; Required: Yes; Nullable: No
  Validation: Must be exactly 3 digits: /^\d{3}$/
  Trigger: Booking request.
  Description: Card CCV.
  Example: "123"

• paymentInfo.expireDate
  Type: string; Format: date; Required: Yes; Nullable: No
  Validation: Must be after current date.
  Trigger: Booking request.
  Description: Card expiration date.
  Example: "2025-12-31""
Success Response — HTTP 201	"• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Creation success message.
  Example: "Booking created successfully"

• data.bookingId
  Type: string; Format: UUID; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: ID of the created booking.
  Example: "uuid"

• data.departingFlight.flightId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Flight identifier.
  Example: "uuid"

• data.departingFlight.fromCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Departure city name.
  Example: "New York"

• data.departingFlight.toCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Arrival city name.
  Example: "London"

• data.returningFlight.flightId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful round-trip booking creation.
  Description: Flight identifier.
  Example: "uuid"

• data.returningFlight.fromCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful round-trip booking creation.
  Description: Departure city name.
  Example: "London"

• data.returningFlight.toCity
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful round-trip booking creation.
  Description: Arrival city name.
  Example: "New York"

• data.passengerInfo.firstName
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Passenger's first name.
  Example: "John"

• data.passengerInfo.checkedBags
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Number of checked bags.
  Example: 2

• data.paymentInfo.paymentType
  Type: string; Required: Yes; Nullable: No
  Allowed values: Visa
  Trigger: Successful booking creation.
  Description: Payment type.
  Example: "Visa"

• data.paymentInfo.nameOnCard
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Name on card.
  Example: "John Doe"

• data.paymentInfo.cardNumber
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Masked card number (last 4 digits).
  Example: "3456"

• data.paymentInfo.ccv
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Card CCV.
  Example: "123"

• data.paymentInfo.expireDate
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Card expiration date.
  Example: "2025-12-31"

• data.departingSeat.seatId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Seat identifier.
  Example: "uuid"

• data.departingSeat.seatNumber
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Seat number.
  Example: "10A"

• data.departingSeat.type
  Type: string; Required: Yes; Nullable: No
  Allowed values: Economy; Business
  Trigger: Successful booking creation.
  Description: Seat type.
  Example: "Economy"

• data.departingSeat.price
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Seat price.
  Example: 100

• data.arrivingSeat.seatId
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful round-trip booking creation.
  Description: Seat identifier.
  Example: "uuid"

• data.arrivingSeat.seatNumber
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful round-trip booking creation.
  Description: Seat number.
  Example: "5A"

• data.arrivingSeat.type
  Type: string; Required: Yes; Nullable: No
  Allowed values: Economy; Business
  Trigger: Successful round-trip booking creation.
  Description: Seat type.
  Example: "Economy"

• data.arrivingSeat.price
  Type: number; Required: Yes; Nullable: No
  Trigger: Successful round-trip booking creation.
  Description: Seat price.
  Example: 100

• data.confirmationMessage
  Type: string; Format: string; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: 12-character UUID confirmation code.
  Example: "a1b2c3d4e5f6"

• data.baggageFees
  Type: number; Format: decimal; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Total baggage fees for both flights.
  Example: 50

• data.upgradeFees
  Type: number; Format: decimal; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Total upgrade fees for both flights.
  Example: 200

• data.total
  Type: number; Format: decimal; Required: Yes; Nullable: No
  Trigger: Successful booking creation.
  Description: Total booking price.
  Example: 750"
Error Response — HTTP 400	"• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Missing required fields, invalid user ID, invalid passenger info, or invalid payment info.
  Description: Error message.
  Example: "Missing required fields"
  Note: The error envelope also contains success=false and may contain an error field."
Error Response — HTTP 500	"• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Internal server error.
  Description: Error message.
  Example: "Internal server error"
  Note: The error envelope also contains success=false and may contain an error field."
Notes	"Source: app/api/booking/route.js Security issue: Card number is stored in plain text in database. Repository status: Implemented and functional. Evidence: app/api/booking/route.js::POST"

---

## API-AUTH-SIGNUP — User Sign Up

API ID	API-AUTH-SIGNUP
API Name	User Sign Up
Related Use Case IDs	UC-07
Method	POST
Path	/api/auth/signup
Description	Register a new user account with email and password.
Authentication	Public
Authorization	None
Business Rules / Validation Constraints	"BR-AUTH-001 — Email là bắt buộc, không được để trống
BR-AUTH-002 — Email phải chứa ký tự ""@""
BR-AUTH-003 — Password là bắt buộc, không được để trống
BR-AUTH-004 — Password phải có tối thiểu 8 ký tự (MIN_PASSWORD_LENGTH = 8)
BR-AUTH-005 — Người dùng phải đồng ý điều khoản sử dụng (agreeTerms = true)
BR-AUTH-006 — Email phải là duy nhất trong hệ thống, không được trùng với email đã đăng ký
BR-AUTH-007 — Password được hash bằng bcrypt với SALT_ROUNDS = 10 trước khi lưu
BR-AUTH-008 — Username được tự động generate: {email_prefix}_{timestamp}"
Request Header(s)	"• headers.Content-Type
  Type: string; Format: MIME type; Required: Yes; Nullable: No
  Default: application/json
  Allowed values: application/json
  Validation: Request body must be JSON.
  Trigger: Every request containing a JSON body.
  Description: Declares the request body format.
  Example: application/json"
Request Body	"• email
  Type: string; Format: email; Required: Yes; Nullable: No
  Validation: Must be non-empty and contain ""@"" symbol.
  Trigger: Sign up request.
  Description: User's email address.
  Example: ""user@example.com""

• password
  Type: string; Format: password; Required: Yes; Nullable: No
  Validation: Must be at least 8 characters long.
  Trigger: Sign up request.
  Description: User's password.
  Example: ""P@ssw0rd123""

• agreeTerms
  Type: boolean; Format: boolean; Required: Yes; Nullable: No
  Validation: Must be true.
  Trigger: Sign up request.
  Description: User's agreement to terms and conditions.
  Example: true"
Success Response — HTTP 200	"• message
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful registration.
  Description: Success message.
  Example: ""Signup successful"""
Error Response — HTTP 400	"• error
  Type: string; Required: Yes; Nullable: No
  Trigger: Missing email/password, invalid email, password too short, terms not agreed, or email already exists.
  Description: Error message.
  Example: ""Email is already in use"""
Error Response — HTTP 500	"• error
  Type: string; Required: Yes; Nullable: No
  Trigger: Internal server error.
  Description: Error message.
  Example: ""An error occurred during signup"""
Notes	"Source: app/api/auth/signup/route.js
Repository status: Implemented and functional.
Default location is hardcoded to ""Cairo"", ""Egypt"".
Evidence: app/api/auth/signup/route.js::POST"

---

## API-AUTH-SIGNIN — User Sign In

API ID	API-AUTH-SIGNIN
API Name	User Sign In
Related Use Case IDs	UC-08
Method	POST
Path	/api/auth/[...nextauth]
Description	Authenticate user with email/password credentials or Google OAuth. Issues JWT session token.
Authentication	Public
Authorization	None
Business Rules / Validation Constraints	"BR-SIGNIN-001 — Email là bắt buộc, không được để trống
BR-SIGNIN-002 — Email phải chứa ký tự ""@""
BR-SIGNIN-003 — Password là bắt buộc, không được để trống
BR-SIGNIN-004 — Password phải có tối thiểu 8 ký tự (MIN_PASSWORD_LENGTH = 8)
BR-SIGNIN-005 — Password được verify bằng bcrypt compare với hash trong database
BR-SIGNIN-006 — Session strategy sử dụng JWT
BR-SIGNIN-007 — JWT token chứa: id, email, username
BR-SIGNIN-008 — Session object chứa: user.id, user.email, user.username
BR-SIGNIN-009 — Google OAuth provider được cấu hình với GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET
BR-SIGNIN-010 — Google OAuth sử dụng PrismaAdapter để tạo/update user"
Request Header(s)	"• headers.Content-Type
  Type: string; Format: MIME type; Required: Yes; Nullable: No
  Default: application/json
  Allowed values: application/json
  Validation: Request body must be JSON.
  Trigger: Every request containing a JSON body.
  Description: Declares the request body format.
  Example: application/json"
Request Body	"• email
  Type: string; Format: email; Required: Yes; Nullable: No
  Validation: Must be non-empty and contain ""@"" symbol.
  Trigger: Sign in request.
  Description: User's email address.
  Example: ""user@example.com""

• password
  Type: string; Format: password; Required: Yes; Nullable: No
  Validation: Must be at least 8 characters long.
  Trigger: Sign in request.
  Description: User's password.
  Example: ""P@ssw0rd123"""
Success Response — HTTP 200	"• user.id
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful sign in.
  Description: Authenticated user identifier.
  Example: ""uuid""

• user.email
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful sign in.
  Description: Authenticated user's email.
  Example: ""user@example.com""

• user.username
  Type: string; Required: Yes; Nullable: No
  Trigger: Successful sign in.
  Description: Authenticated user's username.
  Example: ""user_1234567890""

• expires
  Type: string; Format: date-time; Required: Yes; Nullable: No
  Trigger: Successful sign in.
  Description: Session expiration date-time.
  Example: ""2024-01-01T00:00:00.000Z"""
Error Response — HTTP 401	"• error
  Type: string; Required: Yes; Nullable: No
  Trigger: Invalid credentials (email not found or password incorrect).
  Description: Error message.
  Example: ""Invalid email or password"""
Error Response — HTTP 500	"• error
  Type: string; Required: Yes; Nullable: No
  Trigger: Internal server error.
  Description: Error message.
  Example: ""Internal Server Error"""
Notes	"Source: app/api/auth/[...nextauth]/route.js
Repository status: Implemented and functional.
Uses NextAuth.js with CredentialsProvider and GoogleProvider.
Evidence: app/api/auth/[...nextauth]/route.js::POST"

---

## Summary

**Total API Endpoints:** 6

**Implemented Endpoints:** 6
- API-FLIGHTS-SEARCH: GET /api/flights
- API-CITIES-LIST: GET /api/cities
- API-SEATS-LIST: GET /api/seats/[flightId]
- API-BOOKING-CREATE: POST /api/booking
- API-AUTH-SIGNUP: POST /api/auth/signup
- API-AUTH-SIGNIN: POST /api/auth/[...nextauth]

**Not Implemented Endpoints:** 0

**Authentication:**
- Public endpoints: 6 (all endpoints are public, no authentication required)

**Security Notes:**
- Card number stored in plain text in database (API-BOOKING-CREATE)
- No rate limiting implemented
- No CSRF protection implemented
