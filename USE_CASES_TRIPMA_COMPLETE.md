# Use Cases - Tripma Flight Booking

Format: Vertical field-value layout; repository AS-IS documentation

---

## UC-01 — Search Flights

**Use Case ID:** UC-01  
**Use Case Name:** Search Flights  
**Description:** As a visitor, I want to search for flights by entering departure city, arrival city, dates, and passenger count so that I can view available flights for booking.  
**Actor(s):** Visitor  
**Priority:** High  
**Trigger:** The visitor opens the homepage and enters search criteria.  

**Pre-Condition(s):**
- PRE-1: The frontend homepage route / is accessible.
- PRE-2: The backend and database are available.
- PRE-3: GET /api/cities returns available cities.

**Post-Condition(s):**
- POST-1: On success, search parameters are saved in localStorage.
- POST-2: Available flights are displayed on the flights page.
- POST-3: On failure, an error message is shown.

**Basic Flow:**
1. The visitor opens the homepage.
2. The frontend displays search form with from/to city dropdowns.
3. The visitor selects from city.
4. The visitor selects to city.
5. The visitor selects departure date.
6. The visitor selects return date (optional for round-trip).
7. The visitor selects number of adults.
8. The visitor selects number of minors.
9. The visitor selects trip type (one-way/round-trip).
10. The visitor clicks Search flights button.
11. The frontend validates all required fields.
12. The frontend sends GET /api/flights with query parameters.
13. The backend filters flights by fromCity, toCity, type, and date range.
14. The backend filters flights where available seats >= total passengers.
15. If round-trip, the backend queries returning flights.
16. The backend returns departingFlights and arrivingFlights arrays.
17. The frontend displays flight results on /flights page.

**Alternative Flow:**
- AF-1: Apply filters
  - 10a. Visitor applies price/time/airline filters.
  - 10b. Frontend filters displayed results.
- AF-2: Clear filters
  - 10a1. Visitor clears filters.
  - 10b1. Frontend resets to original results.
- AF-3: Change search criteria
  - 5a. Visitor modifies any search field.
  - 5b. Frontend updates search parameters.

**Exception Flow:**
- EF-1: No flights available
  - 16a. If no flights match criteria, backend returns empty arrays.
  - 16b. Frontend displays No flights found message.
- EF-2: Invalid input
  - 11a. If validation fails, frontend shows field-level error and does not call API.
- EF-3: Network error
  - 12a. If request fails, frontend displays error message.

**Business Rules:**
- BR-SEARCH-001 — Tổng hành khách = adults + minors
- BR-SEARCH-002 — Chuyến bay phải có ít nhất 1 ghế available mới được tìm thấy
- BR-SEARCH-003 — Số ghế available của chuyến bay phải >= tổng hành khách
- BR-SEARCH-004 — Chuyến đi chỉ tìm trong khoảng: startDate <= Date < startDate + 24h
- BR-SEARCH-005 — Chuyến về chỉ tìm trong khoảng: endDate <= Date < endDate + 24h
- BR-SEARCH-006 — Chuyến về chỉ được tìm khi type = round-trip và có endDate
- BR-SEARCH-007 — Chuyến về phải có fromCity và toCity đảo ngược so với chuyến đi
- BR-SEARCH-008 — Không có validation cho input parameters — thiếu fromCity/toCity/date không báo lỗi

**Related UI:** Homepage (/); Flights page (/flights); Search form component  
**Related API IDs:** API-FLIGHTS-SEARCH  
**Notes:** Repository status: Flight search is implemented and functional. Evidence: app/page.js; app/flights/page.js; app/api/flights/route.js.

---

## UC-02 — Select Flight

**Use Case ID:** UC-02  
**Use Case Name:** Select Flight  
**Description:** As a visitor, I want to select departing and returning flights from search results so that I can proceed to booking.  
**Actor(s):** Visitor  
**Priority:** High  
**Trigger:** The visitor views flight search results and clicks on a flight card.  

**Pre-Condition(s):**
- PRE-1: Flight search results are displayed.
- PRE-2: Selected flights state is initialized.

**Post-Condition(s):**
- POST-1: On success, selected flights are saved to localStorage.
- POST-2: Visitor is redirected to passenger info page.
- POST-3: On failure, selection is not saved.

**Basic Flow:**
1. The visitor views available flights.
2. The visitor clicks on a departing flight card.
3. The frontend highlights the selected flight.
4. If round-trip, the visitor clicks on a returning flight card.
5. The frontend highlights the selected returning flight.
6. The visitor clicks Continue button.
7. The frontend saves selected flights to localStorage.
8. The frontend redirects to /booking passenger page.

**Alternative Flow:**
- AF-1: Change departing flight
  - 3a. Visitor clicks on a different departing flight.
  - 3b. Frontend updates selection and highlights new flight.
- AF-2: Change returning flight
  - 4a. Visitor clicks on a different returning flight.
  - 4b. Frontend updates selection and highlights new flight.
- AF-3: Cancel selection
  - 6a. Visitor clicks Cancel or navigates away.
  - 6b. Frontend clears selection and remains on flights page.

**Exception Flow:**
- EF-1: Flight no longer available
  - 7a. If flight was booked by another user, selection may fail.
  - 7b. Frontend shows Flight no longer available message.
- EF-2: Session timeout
  - 7a. If localStorage is cleared, selection is lost.
  - 7b. Frontend redirects to homepage.

**Business Rules:**
- BR-SELECT-001 — Chỉ được chọn 1 chuyến bay đi tại một thời điểm
- BR-SELECT-002 — Nếu là round-trip, phải chọn cả chuyến đi và chuyến về
- BR-SELECT-003 — Chuyến bay được chọn được lưu trong localStorage
- BR-SELECT-004 — Chuyến bay được highlight khi được chọn

**Related UI:** Flights page (/flights); Flight card component  
**Related API IDs:** GET /api/flights  
**Notes:** Repository status: Flight selection is implemented. Evidence: app/flights/page.js; components/Flights/flightcard.js.

---

## UC-03 — Enter Passenger Info

**Use Case ID:** UC-03  
**Use Case Name:** Enter Passenger Info  
**Description:** As a visitor, I want to enter passenger information so that the system can create the booking record.  
**Actor(s):** Visitor  
**Priority:** High  
**Trigger:** The visitor is redirected to passenger info page after selecting flights.  

**Pre-Condition(s):**
- PRE-1: Selected flights are saved in localStorage.
- PRE-2: Passenger info page is accessible.

**Post-Condition(s):**
- POST-1: On success, passenger info is saved to state.
- POST-2: Visitor is redirected to seat selection page.
- POST-3: On failure, validation errors are shown.

**Basic Flow:**
1. The visitor opens passenger info page.
2. The frontend displays passenger form.
3. The visitor enters first name.
4. The visitor enters last name.
5. The visitor enters date of birth.
6. The visitor enters email.
7. The visitor enters phone number.
8. The visitor enters number of checked bags.
9. The visitor enters optional fields (middle name, suffix, redress number, known traveler number).
10. The visitor may check Same as passenger for contact info.
11. The frontend validates all required fields.
12. The visitor clicks Select seats button.
13. The frontend saves passenger info to state.
14. The frontend redirects to seat selection page.

**Alternative Flow:**
- AF-1: Same as passenger
  - 10a. Visitor checks Same as passenger checkbox.
  - 10b. Frontend auto-fills contact fields with passenger info.
- AF-2: Modify contact info
  - 10a1. Visitor modifies auto-filled contact fields.
  - 10b1. Frontend updates fields.
- AF-3: Optional fields
  - 9a. Visitor leaves optional fields empty.
  - 9b. Frontend allows submission with null values.

**Exception Flow:**
- EF-1: Invalid email format
  - 11a. If email format is invalid, frontend shows validation error.
- EF-2: Invalid phone format
  - 11a. If phone is not 11 digits, frontend shows validation error.
- EF-3: Date of birth in future
  - 11a. If date of birth is in future, frontend shows validation error.
- EF-4: Missing required fields
  - 11a. If required fields are empty, frontend disables Select seats button.

**Business Rules:**
- BR-PASS-001 — Bắt buộc: firstName, lastName, dateOfBirth, email, phone, checkedBags
- BR-PASS-002 — Tùy chọn: middleName, suffix, redressNumber, knownTravelerNumber
- BR-PASS-003 — Email hành khách phải đúng format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- BR-PASS-004 — Số điện thoại phải đúng 11 chữ số: /^\d{11}$/
- BR-PASS-005 — Ngày sinh phải trước ngày hiện tại
- BR-PASS-006 — Button "Select seats" chỉ enabled khi tất cả thông tin hành khách hợp lệ

**Related UI:** Passenger page (/booking); PassengerInfo component  
**Related API IDs:** GET /api/flights  
**Notes:** Repository status: Passenger info entry is implemented. Evidence: app/booking/passenger.js; components/Passenger/passengerinfo.js.

---

## UC-04 — Select Seats

**Use Case ID:** UC-04  
**Use Case Name:** Select Seats  
**Description:** As a visitor, I want to select seats for my flights so that I can complete the booking.  
**Actor(s):** Visitor  
**Priority:** High  
**Trigger:** The visitor is redirected to seat selection page after entering passenger info.  

**Pre-Condition(s):**
- PRE-1: Passenger info is saved in state.
- PRE-2: Selected flights are saved in localStorage.

**Post-Condition(s):**
- POST-1: On success, selected seats are saved to state.
- POST-2: Visitor is redirected to payment page.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The visitor opens seat selection page.
2. The frontend calls GET /api/seats/[flightId] for departing flight.
3. The backend returns available seats for the flight.
4. The frontend displays seat map with Economy and Business sections.
5. The visitor clicks on a departing seat.
6. The frontend highlights the selected seat.
7. If round-trip, the visitor clicks on a returning seat.
8. The frontend highlights the selected returning seat.
9. If visitor selects Business seat from Economy, frontend shows upgrade popup.
10. The visitor confirms upgrade or cancels.
11. The visitor clicks Continue button.
12. The frontend saves selected seats to state.
13. The frontend redirects to payment page.

**Alternative Flow:**
- AF-1: Change seat selection
  - 5a. Visitor clicks on a different seat.
  - 5b. Frontend updates selection and highlights new seat.
- AF-2: Upgrade to Business
  - 9a. Visitor selects Business seat from Economy.
  - 9b. Frontend shows upgrade popup with price difference.
  - 9c. Visitor confirms upgrade.
  - 9d. Frontend updates seat selection to Business.
- AF-3: Cancel upgrade
  - 10a. Visitor cancels upgrade in popup.
  - 10b. Frontend keeps Economy seat selection.

**Exception Flow:**
- EF-1: No seats available
  - 3a. If no seats are available, backend returns empty arrays.
  - 3b. Frontend shows No seats available message.
- EF-2: Seat already booked
  - 5a. If seat was booked by another user, selection may fail.
  - 5b. Frontend shows Seat unavailable message.
- EF-3: Network error
  - 2a. If request fails, frontend shows error message.

**Business Rules:**
- BR-SEAT-001 — Chỉ hiển thị ghế có available = true
- BR-SEAT-002 — Ghế được sắp xếp theo seatNumber tăng dần
- BR-SEAT-003 — Ghế được phân loại thành 2 nhóm: Economy và Business
- BR-SEAT-004 — Ghế chỉ có 2 loại: Economy hoặc Business
- BR-SEAT-005 — Khi chuyển từ Economy sang Business phải hiện popup xác nhận upgrade
- BR-SEAT-006 — Khi chọn ghế cùng loại (Economy→Economy hoặc Business→Business) thì cập nhật luôn không cần popup
- BR-SEAT-007 — Phí upgrade = giá Business - giá Economy
- BR-SEAT-008 — Người dùng có thể hủy upgrade và giữ nguyên ghế Economy cũ
- BR-SEAT-009 — Round-trip bắt buộc phải chọn ghế cho cả chuyến đi lẫn chuyến về

**Related UI:** Seat selection page (/booking/selectseats); Seats component  
**Related API IDs:** GET /api/seats/[flightId]  
**Notes:** Repository status: Seat selection is implemented with upgrade popup. Evidence: app/booking/selectseats.js; components/Seats/seats.js.

---

## UC-05 — Make Payment

**Use Case ID:** UC-05  
**Use Case Name:** Make Payment  
**Description:** As a visitor, I want to enter payment information and confirm booking so that the system creates the booking record.  
**Actor(s):** Visitor  
**Priority:** High  
**Trigger:** The visitor is redirected to payment page after selecting seats.  

**Pre-Condition(s):**
- PRE-1: Selected seats are saved in state.
- PRE-2: Passenger info is saved in state.
- PRE-3: Selected flights are saved in localStorage.

**Post-Condition(s):**
- POST-1: On success, booking is created in database.
- POST-2: Booking info is saved to localStorage.
- POST-3: Visitor is redirected to success page.
- POST-4: On failure, error message is shown.

**Basic Flow:**
1. The visitor opens payment page.
2. The frontend displays payment form.
3. The visitor enters cardholder name.
4. The visitor enters card number (16 digits).
5. The visitor enters CCV (3 digits).
6. The visitor enters expiration date.
7. The frontend validates card information.
8. If guest, visitor may enter email/password to create account.
9. Visitor may check Save card and create account.
10. The visitor clicks Confirm and pay button.
11. The frontend shows processing popup.
12. The frontend sends POST /api/booking with booking data.
13. The backend validates all required fields.
14. The backend validates passenger info (email, phone, date of birth).
15. The backend validates payment info (card number, CCV, expire date).
16. The backend calculates total price (subtotal + taxes + baggage fees + upgrade fees).
17. The backend creates booking record in database.
18. The backend creates passenger info record.
19. The backend creates payment info record.
20. The backend returns booking confirmation with confirmation code.
21. The frontend saves booking info to localStorage.
22. The frontend redirects to success page.

**Alternative Flow:**
- AF-1: Invalid card number
  - 7a. If card number is not 16 digits, frontend shows validation error.
- AF-2: Invalid CCV
  - 7a. If CCV is not 3 digits, frontend shows validation error.
- AF-3: Expired card
  - 7a. If expiration date is in past, frontend shows validation error.
- AF-4: Create account during booking
  - 8a. Visitor enters email and password.
  - 8b. Frontend validates credentials.
  - 8c. Frontend calls POST /api/auth/signup.
  - 8d. User account is created before booking.

**Exception Flow:**
- EF-1: Invalid card details
  - 15a. If card validation fails, backend returns 400 error.
  - 15b. Frontend shows Invalid card details error.
- EF-2: Payment declined
  - 17a. If payment processing fails, backend returns error.
  - 17b. Frontend shows Payment declined error.
- EF-3: User not found
  - 14a. If userId is provided but user doesn't exist, backend returns 400 error.
  - 14b. Frontend shows Invalid user error.
- EF-4: Network error
  - 12a. If request fails, frontend shows error message.

**Business Rules:**
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
- BR-PAY-001 — Bắt buộc: paymentType, nameOnCard, cardNumber, ccv, expireDate
- BR-PAY-002 — Hiện chỉ hỗ trợ paymentType = "Visa" (hardcoded)
- BR-PAY-003 — Số thẻ phải đúng 16 chữ số: /^\d{16}$/
- BR-PAY-004 — CCV phải đúng 3 chữ số: /^\d{3}$/
- BR-PAY-005 — Ngày hết hạn thẻ phải sau ngày hiện tại
- BR-PAY-006 — Button "Confirm and pay" chỉ enabled khi tất cả fields hợp lệ
- BR-PAY-007 — Tạo tài khoản khi thanh toán chỉ hợp lệ khi có cả email và password

**Related UI:** Payment page (/booking/payment); Payment form component  
**Related API IDs:** POST /api/booking; POST /api/auth/signup  
**Notes:** Repository status: Payment processing is implemented but card number is stored in plain text (security issue). Evidence: app/booking/payment.js; app/api/booking/route.js.

---

## UC-06 — View Booking Confirmation

**Use Case ID:** UC-06  
**Use Case Name:** View Booking Confirmation  
**Description:** As a visitor, I want to view booking confirmation with details so that I can review my booking.  
**Actor(s):** Visitor  
**Priority:** Medium  
**Trigger:** The visitor is redirected to success page after successful booking.  

**Pre-Condition(s):**
- PRE-1: Booking is successfully created.
- PRE-2: Booking info is saved in localStorage.

**Post-Condition(s):**
- POST-1: On success, booking confirmation is displayed.
- POST-2: Visitor can share itinerary.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The visitor opens success page.
2. The frontend displays confirmation page.
3. The frontend shows confirmation code.
4. The frontend displays flight summary.
5. The frontend displays price breakdown.
6. The visitor views trip details.
7. The visitor may click Share itinerary.
8. The visitor enters email to share.
9. The frontend sends share request.
10. The visitor views hotel suggestions.
11. The visitor may click on hotel link.

**Alternative Flow:**
- AF-1: Share itinerary
  - 7a. Visitor enters email to share itinerary.
  - 7b. Frontend validates email format.
  - 7c. Frontend sends share request.
  - 7d. System sends itinerary email.
- AF-2: View hotel suggestions
  - 10a. Visitor scrolls to hotel suggestions section.
  - 10b. Visitor clicks on hotel link.
  - 10c. Frontend redirects to hotel page.

**Exception Flow:**
- EF-1: Confirmation not found
  - 2a. If booking info is not in localStorage, frontend shows error.
- EF-2: Network error
  - 9a. If share request fails, frontend shows error message.

**Business Rules:**
- BR-CONFIRM-001 — Hiển thị confirmation code (12 ký tự UUID)
- BR-CONFIRM-002 — Hiển thị flight summary (fromCity, toCity, date, time)
- BR-CONFIRM-003 — Hiển thị price breakdown (subtotal, taxes, baggage, upgrade)
- BR-CONFIRM-004 — Cho phép share itinerary qua email
- BR-CONFIRM-005 — Hiển thị hotel suggestions cho cross-selling

**Related UI:** Success page (/successbooking); Confirmation component  
**Related API IDs:** GET /api/bookings/[id] (not implemented)  
**Notes:** Repository status: Booking confirmation page is implemented but share itinerary API is not implemented. Evidence: app/successbooking/page.js.

---

## UC-07 — Sign Up

**Use Case ID:** UC-07  
**Use Case Name:** Sign Up  
**Description:** As a visitor, I want to register with email and password so that I can create an account and sign in.  
**Actor(s):** Visitor  
**Priority:** High  
**Trigger:** The visitor opens sign up modal from navbar.  

**Pre-Condition(s):**
- PRE-1: The frontend sign up modal is accessible.
- PRE-2: The backend and database are available.

**Post-Condition(s):**
- POST-1: On success, a new user record is stored with generated username and bcrypt password hash.
- POST-2: Visitor is redirected to homepage.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The visitor clicks Sign In button in navbar.
2. The frontend opens authentication modal.
3. The visitor switches to Sign Up tab.
4. The visitor enters email.
5. The visitor enters password (min 8 characters).
6. The visitor agrees to terms and conditions.
7. The visitor clicks Sign up button.
8. The frontend validates email format.
9. The frontend validates password length.
10. The frontend checks if terms are agreed.
11. The frontend sends POST /api/auth/signup.
12. The backend validates required fields.
13. The backend checks if email already exists.
14. The backend generates username from email prefix and timestamp.
15. The backend hashes password with bcrypt (10 salt rounds).
16. The backend creates user record with hardcoded city=Cairo, country=Egypt.
17. The backend returns success message.
18. The frontend shows success message.

**Alternative Flow:**
- AF-1: Invalid email
  - 8a. If email format is invalid, frontend shows validation error.
- AF-2: Password too short
  - 9a. If password is less than 8 characters, frontend shows validation error.
- AF-3: Terms not agreed
  - 10a. If terms are not agreed, frontend disables sign up button.

**Exception Flow:**
- EF-1: Email already exists
  - 13a. If email already exists, backend returns 400 error.
  - 13b. Frontend shows Email is already in use error.
- EF-2: Network error
  - 11a. If request fails, frontend shows error message.

**Business Rules:**
- BR-AUTH-001 — Email là bắt buộc, không được để trống
- BR-AUTH-002 — Email phải chứa ký tự "@"
- BR-AUTH-003 — Password là bắt buộc, không được để trống
- BR-AUTH-004 — Password phải có tối thiểu 8 ký tự (MIN_PASSWORD_LENGTH = 8, dù code comment ghi 10)
- BR-AUTH-005 — Người dùng phải đồng ý điều khoản sử dụng (agreeTerms = true)
- BR-AUTH-006 — Email phải là duy nhất trong hệ thống, không được trùng với email đã đăng ký
- BR-AUTH-007 — Password được hash bằng bcrypt với SALT_ROUNDS = 10 trước khi lưu
- BR-AUTH-008 — Username được tự động generate: {email_prefix}_{timestamp}

**Related UI:** Sign up modal; Authentication component  
**Related API IDs:** POST /api/auth/signup  
**Notes:** Repository status: Sign up is implemented but default location is hardcoded. Evidence: components/Authentication/authenticate.js; app/api/auth/signup/route.js.

---

## UC-08 — Sign In

**Use Case ID:** UC-08  
**Use Case Name:** Sign In  
**Description:** As a visitor, I want to sign in with email/password or Google so that I can access authenticated features.  
**Actor(s):** Visitor  
**Priority:** High  
**Trigger:** The visitor opens sign in modal from navbar.  

**Pre-Condition(s):**
- PRE-1: The frontend sign in modal is accessible.
- PRE-2: The backend and database are available.
- PRE-3: NextAuth is configured.

**Post-Condition(s):**
- POST-1: On success, JWT session is created.
- POST-2: Session cookie is set.
- POST-3: Visitor is redirected to homepage.
- POST-4: On failure, error message is shown.

**Basic Flow:**
1. The visitor clicks Sign In button in navbar.
2. The frontend opens authentication modal.
3. The visitor enters email.
4. The visitor enters password.
5. The visitor clicks Sign in button.
6. The frontend validates email format.
7. The frontend validates password length.
8. The frontend calls NextAuth credentials provider.
9. The backend verifies user exists by email.
10. The backend compares password hash with bcrypt.
11. The backend creates JWT session.
12. The backend sets session cookie.
13. The frontend redirects to homepage.

**Alternative Flow:**
- AF-1: Sign in with Google
  - 5a. Visitor clicks Sign in with Google button.
  - 5b. Frontend redirects to Google OAuth consent screen.
  - 5c. Visitor authorizes Google account.
  - 5d. Google redirects to callback URL.
  - 5e. NextAuth creates/updates user via Prisma Adapter.
  - 5f. NextAuth creates JWT session.
  - 5g. Frontend redirects to homepage.

**Exception Flow:**
- EF-1: Invalid credentials
  - 10a. If password doesn't match, backend throws error.
  - 10b. Frontend shows Invalid email or password error.
- EF-2: User not found
  - 9a. If user doesn't exist, backend throws error.
  - 9b. Frontend shows Invalid email or password error.
- EF-3: Network error
  - 8a. If request fails, frontend shows error message.

**Business Rules:**
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

**Related UI:** Sign in modal; Authentication component  
**Related API IDs:** POST /api/auth/[...nextauth]  
**Notes:** Repository status: Sign in with credentials and Google OAuth is implemented. Evidence: app/api/auth/[...nextauth]/route.js; components/Authentication/authenticate.js.

---

## UC-09 — View Available Cities

**Use Case ID:** UC-09  
**Use Case Name:** View Available Cities  
**Description:** As a visitor, I want to view available cities so that I can select departure and arrival cities for flight search.  
**Actor(s):** Visitor  
**Priority:** Low  
**Trigger:** The visitor opens homepage.  

**Pre-Condition(s):**
- PRE-1: The frontend homepage is accessible.
- PRE-2: The backend and database are available.

**Post-Condition(s):**
- POST-1: On success, city dropdowns are populated.
- POST-2: Visitor can select cities.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The visitor opens homepage.
2. The frontend calls GET /api/cities.
3. The backend queries all flights with distinct fromCity and toCity.
4. The backend extracts unique cities into fromCities and toCities arrays.
5. The backend returns cities object.
6. The frontend populates from city dropdown.
7. The frontend populates to city dropdown.
8. The visitor selects from city.
9. The visitor selects to city.

**Alternative Flow:**
- AF-1: Type in city field
  - 8a. Visitor types in city field.
  - 8b. Frontend filters city list.
  - 8c. Visitor selects city from filtered list.

**Exception Flow:**
- EF-1: Network error
  - 2a. If request fails, frontend shows error message.
- EF-2: No cities available
  - 4a. If no flights exist, arrays are empty.
  - 4b. Frontend shows empty dropdowns.

**Business Rules:**
- BR-CITY-001 — Danh sách thành phố lấy từ tất cả fromCity và toCity trong bảng Flight
- BR-CITY-002 — Không trả về thành phố trùng lặp
- BR-CITY-003 — Trả về 2 danh sách riêng: fromCities và toCities

**Related UI:** Homepage (/); Search form component  
**Related API IDs:** GET /api/cities  
**Notes:** Repository status: View available cities is implemented. Evidence: app/page.js; app/api/cities/route.js.

---

## UC-10 — View Flight Deals

**Use Case ID:** UC-10  
**Use Case Name:** View Flight Deals  
**Description:** As a visitor, I want to view flight deals so that I can discover special offers.  
**Actor(s):** Visitor  
**Priority:** Low  
**Trigger:** The visitor opens homepage.  

**Pre-Condition(s):**
- PRE-1: The frontend homepage is accessible.
- PRE-2: Flight deals data is available.

**Post-Condition(s):**
- POST-1: On success, flight deals are displayed.
- POST-2: Visitor can click to book.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The visitor opens homepage.
2. The frontend displays flight deals section.
3. The frontend shows deal images.
4. The frontend shows deal prices.
5. The frontend shows deal descriptions.
6. The visitor clicks on a deal.
7. The frontend redirects to flights page with pre-filled search parameters.

**Alternative Flow:**
- AF-1: Scroll through deals
  - 2a. Visitor scrolls through deals section.
  - 2b. Frontend loads more deals if available.

**Exception Flow:**
- EF-1: Network error
  - 2a. If data fetch fails, frontend shows error message.
- EF-2: No deals available
  - 2a. If no deals exist, frontend shows No deals available message.

**Business Rules:**
- BR-DEALS-001 — Hiển thị deal image, price, và description
- BR-DEALS-002 — Click vào deal sẽ pre-fill search parameters và redirect đến flights page
- BR-DEALS-003 — Data là static (không có API riêng)

**Related UI:** Homepage (/); Flight deals component  
**Related API IDs:** GET /api/flights (for deal flights)  
**Notes:** Repository status: View flight deals is implemented in UI but data is static (no dedicated API). Evidence: app/page.js.

---

## UC-11 — View Unique Places

**Use Case ID:** UC-11  
**Use Case Name:** View Unique Places  
**Description:** As a visitor, I want to view unique places so that I can discover travel destinations.  
**Actor(s):** Visitor  
**Priority:** Low  
**Trigger:** The visitor opens homepage.  

**Pre-Condition(s):**
- PRE-1: The frontend homepage is accessible.
- PRE-2: Unique places data is available.

**Post-Condition(s):**
- POST-1: On success, unique places are displayed.
- POST-2: Visitor can click to book.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The visitor opens homepage.
2. The frontend displays unique places section.
3. The frontend shows place images.
4. The frontend shows place prices.
5. The frontend shows place descriptions.
6. The frontend shows place motivations.
7. The visitor clicks on a place.
8. The frontend redirects to flights page with pre-filled search parameters.

**Alternative Flow:**
- AF-1: Scroll through places
  - 2a. Visitor scrolls through places section.
  - 2b. Frontend loads more places if available.

**Exception Flow:**
- EF-1: Network error
  - 2a. If data fetch fails, frontend shows error message.
- EF-2: No places available
  - 2a. If no places exist, frontend shows No places available message.

**Business Rules:**
- BR-PLACES-001 — Hiển thị place image, price, description, và motivation
- BR-PLACES-002 — Click vào place sẽ pre-fill search parameters và redirect đến flights page
- BR-PLACES-003 — Data là static (không có API riêng)

**Related UI:** Homepage (/); Unique places component  
**Related API IDs:** GET /api/flights (for place flights)  
**Notes:** Repository status: View unique places is implemented in UI but data is static (no dedicated API). Evidence: app/page.js.

---

## UC-12 — Share Itinerary

**Use Case ID:** UC-12  
**Use Case Name:** Share Itinerary  
**Description:** As an authenticated user, I want to share my booking itinerary with others via email so that they can view my travel plans.  
**Actor(s):** Authenticated User  
**Priority:** Medium  
**Trigger:** The user is on success page after booking.  

**Pre-Condition(s):**
- PRE-1: Booking is successfully created.
- PRE-2: User is authenticated.

**Post-Condition(s):**
- POST-1: On success, itinerary is shared via email.
- POST-2: Share record is created in database.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The user opens success page.
2. The user clicks Share itinerary button.
3. The user enters email address.
4. The frontend validates email format.
5. The user clicks Send button.
6. The frontend sends share request.
7. The backend creates share record in database.
8. The backend sends itinerary email.
9. The frontend shows success message.

**Alternative Flow:**
- AF-1: Invalid email
  - 4a. If email format is invalid, frontend shows validation error.

**Exception Flow:**
- EF-1: Network error
  - 6a. If request fails, frontend shows error message.
- EF-2: Email send failed
  - 8a. If email sending fails, backend returns error.
  - 8b. Frontend shows Failed to send email error.

**Business Rules:**
- BR-SHARE-001 — Email phải đúng format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- BR-SHARE-002 — Share record sẽ link bookingId với recipient email
- BR-SHARE-003 — Itinerary email được gửi đến recipient
- BR-SHARE-004 — Chức năng này chưa được implement (không có API endpoint)

**Related UI:** Success page (/successbooking); Share itinerary component  
**Related API IDs:** POST /api/bookings/[id]/share (not implemented)  
**Notes:** Repository status: Share itinerary is not implemented (no API endpoint exists). Evidence: ShareItinerary model exists in schema but no API route.

---

## UC-13 — View Booking History

**Use Case ID:** UC-13  
**Use Case Name:** View Booking History  
**Description:** As an authenticated user, I want to view my booking history so that I can manage my past bookings.  
**Actor(s):** Authenticated User  
**Priority:** Medium  
**Trigger:** The user clicks Your Trips in navbar.  

**Pre-Condition(s):**
- PRE-1: User is logged in.
- PRE-2: User has bookings in database.

**Post-Condition(s):**
- POST-1: On success, booking history is displayed.
- POST-2: User can view booking details.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The user clicks Your Trips in navbar.
2. The frontend calls GET /api/users/[id]/bookings.
3. The backend queries bookings by userId.
4. The backend returns bookings array.
5. The frontend displays booking history.
6. The user views past bookings.
7. The user clicks on a booking.
8. The frontend displays booking details.

**Alternative Flow:**
- AF-1: Filter bookings
  - 5a. User filters bookings by date.
  - 5b. Frontend filters displayed results.
  - 5c. User clears filters.
  - 5d. Frontend shows all bookings.

**Exception Flow:**
- EF-1: No bookings found
  - 4a. If user has no bookings, backend returns empty array.
  - 4b. Frontend shows No bookings found message.
- EF-2: Network error
  - 2a. If request fails, frontend shows error message.
- EF-3: Not authenticated
  - 2a. If user is not authenticated, frontend redirects to sign in page.

**Business Rules:**
- BR-HISTORY-001 — Bookings được filter theo userId
- BR-HISTORY-002 — Mỗi booking bao gồm: flight details, passenger info, payment info
- BR-HISTORY-003 — Cho phép filter bookings theo date
- BR-HISTORY-004 — Chức năng này chưa được implement (không có API endpoint)

**Related UI:** Your Trips page (/packages); Booking history component  
**Related API IDs:** GET /api/users/[id]/bookings (not implemented)  
**Notes:** Repository status: View booking history is not implemented (no API endpoint exists). Your Trips link exists in navbar but page is not functional. Evidence: components/Header/navbar.js.

---

## UC-14 — Cancel Booking

**Use Case ID:** UC-14  
**Use Case Name:** Cancel Booking  
**Description:** As an authenticated user, I want to cancel my booking so that I can get a refund if applicable.  
**Actor(s):** Authenticated User  
**Priority:** Medium  
**Trigger:** The user views booking details.  

**Pre-Condition(s):**
- PRE-1: User is logged in.
- PRE-2: User has a booking to cancel.

**Post-Condition(s):**
- POST-1: On success, booking is cancelled.
- POST-2: Refund is processed if applicable.
- POST-3: On failure, error message is shown.

**Basic Flow:**
1. The user views booking details.
2. The user clicks Cancel booking button.
3. The frontend shows confirmation dialog.
4. The user confirms cancellation.
5. The frontend calls DELETE /api/bookings/[id].
6. The backend updates booking status to cancelled.
7. The backend processes refund if applicable.
8. The backend returns success message.
9. The frontend shows cancellation confirmation.

**Alternative Flow:**
- AF-1: Cancel cancellation
  - 4a. User cancels cancellation in dialog.
  - 4b. Frontend closes dialog.
  - 4c. User remains on booking details page.

**Exception Flow:**
- EF-1: Booking already cancelled
  - 6a. If booking is already cancelled, backend returns error.
  - 6b. Frontend shows Booking already cancelled message.
- EF-2: Cancellation deadline passed
  - 6a. If cancellation deadline has passed, backend returns error.
  - 6b. Frontend shows Cannot cancel booking message.
- EF-3: Network error
  - 5a. If request fails, frontend shows error message.

**Business Rules:**
- BR-CANCEL-001 — Booking status được update thành cancelled
- BR-CANCEL-002 — Refund được xử lý dựa trên cancellation policy (chưa implement)
- BR-CANCEL-003 — Cancellation phải được thực hiện trước deadline (chưa implement)
- BR-CANCEL-004 — Chức năng này chưa được implement (không có API endpoint)

**Related UI:** Booking details page; Cancel booking component  
**Related API IDs:** DELETE /api/bookings/[id] (not implemented)  
**Notes:** Repository status: Cancel booking is not implemented (no API endpoint exists). Evidence: No cancel booking functionality found in codebase.

---

## Summary

**Total Use Cases:** 14

**Implemented Use Cases:** 11
- UC-01: Search Flights
- UC-02: Select Flight
- UC-03: Enter Passenger Info
- UC-04: Select Seats
- UC-05: Make Payment
- UC-06: View Booking Confirmation
- UC-07: Sign Up
- UC-08: Sign In
- UC-09: View Available Cities
- UC-10: View Flight Deals
- UC-11: View Unique Places

**Not Implemented Use Cases:** 3
- UC-12: Share Itinerary (API not implemented)
- UC-13: View Booking History (API not implemented)
- UC-14: Cancel Booking (API not implemented)

**Actors:**
- Visitor: 11 use cases (UC-01 to UC-11)
- Authenticated User: 3 use cases (UC-12 to UC-14)

**Total Business Rules:** 60+
- BR-SEARCH-001 to BR-SEARCH-008 (8 rules)
- BR-SELECT-001 to BR-SELECT-004 (4 rules)
- BR-PASS-001 to BR-PASS-006 (6 rules)
- BR-SEAT-001 to BR-SEAT-009 (9 rules)
- BR-BOOK-001 to BR-BOOK-006 (6 rules)
- BR-PRICE-001 to BR-PRICE-005 (5 rules)
- BR-PAY-001 to BR-PAY-007 (7 rules)
- BR-CONFIRM-001 to BR-CONFIRM-005 (5 rules)
- BR-AUTH-001 to BR-AUTH-008 (8 rules)
- BR-SIGNIN-001 to BR-SIGNIN-010 (10 rules)
- BR-CITY-001 to BR-CITY-003 (3 rules)
- BR-DEALS-001 to BR-DEALS-003 (3 rules)
- BR-PLACES-001 to BR-PLACES-003 (3 rules)
- BR-SHARE-001 to BR-SHARE-004 (4 rules)
- BR-HISTORY-001 to BR-HISTORY-004 (4 rules)
- BR-CANCEL-001 to BR-CANCEL-004 (4 rules)
