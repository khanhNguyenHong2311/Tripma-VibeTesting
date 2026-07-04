# Tổng Hợp Luật Nghiệp Vụ - Tripma Flight Booking

## 3.1. Tìm kiếm chuyến bay (Nguồn: /api/flights)

| ID | Luật nghiệp vụ |
|---|---|
| BR-SEARCH-001 | Tổng hành khách = adults + minors |
| BR-SEARCH-002 | Chuyến bay phải có ít nhất 1 ghế available mới được tìm thấy |
| BR-SEARCH-003 | Số ghế available của chuyến bay phải >= tổng hành khách |
| BR-SEARCH-004 | Chuyến đi chỉ tìm trong khoảng: startDate <= Date < startDate + 24h |
| BR-SEARCH-005 | Chuyến về chỉ tìm trong khoảng: endDate <= Date < endDate + 24h |
| BR-SEARCH-006 | Chuyến về chỉ được tìm khi type = round-trip và có endDate |
| BR-SEARCH-007 | Chuyến về phải có fromCity và toCity đảo ngược so với chuyến đi |
| BR-SEARCH-008 | Không có validation cho input parameters — thiếu fromCity/toCity/date không báo lỗi |

---

## 3.2. Chọn chuyến bay (Nguồn: select flight UI)

| ID | Luật nghiệp vụ |
|---|---|
| BR-SELECT-001 | Chỉ được chọn 1 chuyến bay đi tại một thời điểm |
| BR-SELECT-002 | Nếu là round-trip, phải chọn cả chuyến đi và chuyến về |
| BR-SELECT-003 | Chuyến bay được chọn được lưu trong localStorage |
| BR-SELECT-004 | Chuyến bay được highlight khi được chọn |

---

## 3.3. Lấy ghế ngồi (Nguồn: /api/seats/[flightId])

| ID | Luật nghiệp vụ |
|---|---|
| BR-SEAT-001 | Chỉ hiển thị ghế có available = true |
| BR-SEAT-002 | Ghế được sắp xếp theo seatNumber tăng dần |
| BR-SEAT-003 | Ghế được phân loại thành 2 nhóm: Economy và Business |

---

## 3.4. Chọn ghế (Nguồn: selectseats.js)

| ID | Luật nghiệp vụ |
|---|---|
| BR-SEAT-004 | Ghế chỉ có 2 loại: Economy hoặc Business |
| BR-SEAT-005 | Khi chuyển từ Economy sang Business phải hiện popup xác nhận upgrade |
| BR-SEAT-006 | Khi chọn ghế cùng loại (Economy→Economy hoặc Business→Business) thì cập nhật luôn không cần popup |
| BR-SEAT-007 | Phí upgrade = giá Business - giá Economy |
| BR-SEAT-008 | Người dùng có thể hủy upgrade và giữ nguyên ghế Economy cũ |
| BR-SEAT-009 | Round-trip bắt buộc phải chọn ghế cho cả chuyến đi lẫn chuyến về |

---

## 3.5. Thông tin hành khách (Nguồn: /api/booking)

| ID | Luật nghiệp vụ |
|---|---|
| BR-PASS-001 | Bắt buộc: firstName, lastName, dateOfBirth, email, phone, checkedBags |
| BR-PASS-002 | Tùy chọn: middleName, suffix, redressNumber, knownTravelerNumber |
| BR-PASS-003 | Email hành khách phải đúng format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ |
| BR-PASS-004 | Số điện thoại phải đúng 11 chữ số: /^\d{11}$/ |
| BR-PASS-005 | Ngày sinh phải trước ngày hiện tại |
| BR-PASS-006 | Button "Select seats" chỉ enabled khi tất cả thông tin hành khách hợp lệ |

---

## 3.6. Đặt vé (Nguồn: /api/booking)

| ID | Luật nghiệp vụ |
|---|---|
| BR-BOOK-001 | Bắt buộc: departingFlightId, departingSeat, passengerInfo, paymentInfo |
| BR-BOOK-002 | Tùy chọn: returningFlightId, arrivingSeat (chỉ có với round-trip) |
| BR-BOOK-003 | userId có thể null — cho phép đặt vé không cần đăng nhập (guest booking) |
| BR-BOOK-004 | Nếu có userId thì user phải tồn tại trong hệ thống |
| BR-BOOK-005 | Chuyến bay phải tồn tại trong hệ thống mới được đặt |
| BR-BOOK-006 | Mã xác nhận booking được generate tự động bằng UUID 12 ký tự |

---

## 3.7. Tính giá (Nguồn: /api/booking)

| ID | Luật nghiệp vụ |
|---|---|
| BR-PRICE-001 | Phí hành lý chuyến đi = baggageFees của chuyến bay × số hành lý checked |
| BR-PRICE-002 | Upgrade fee = giá ghế Business nếu chọn ghế Business, ngược lại = 0 |
| BR-PRICE-003 | Tổng giá 1 chuyến = subtotalPrice + taxesAndFees + baggageFees + upgradeFees |
| BR-PRICE-004 | Tổng booking = tổng chuyến đi + tổng chuyến về (nếu round-trip) |
| BR-PRICE-005 | Tổng booking = tổng chuyến đi nếu one-way |

---

## 3.8. Thanh toán (Nguồn: /api/booking)

| ID | Luật nghiệp vụ |
|---|---|
| BR-PAY-001 | Bắt buộc: paymentType, nameOnCard, cardNumber, ccv, expireDate |
| BR-PAY-002 | Hiện chỉ hỗ trợ paymentType = "Visa" (hardcoded) |
| BR-PAY-003 | Số thẻ phải đúng 16 chữ số: /^\d{16}$/ |
| BR-PAY-004 | CCV phải đúng 3 chữ số: /^\d{3}$/ |
| BR-PAY-005 | Ngày hết hạn thẻ phải sau ngày hiện tại |
| BR-PAY-006 | Button "Confirm and pay" chỉ enabled khi tất cả fields hợp lệ |
| BR-PAY-007 | Tạo tài khoản khi thanh toán chỉ hợp lệ khi có cả email và password |

---

## 3.9. Xác nhận đặt vé (Nguồn: successbooking page)

| ID | Luật nghiệp vụ |
|---|---|
| BR-CONFIRM-001 | Hiển thị confirmation code (12 ký tự UUID) |
| BR-CONFIRM-002 | Hiển thị flight summary (fromCity, toCity, date, time) |
| BR-CONFIRM-003 | Hiển thị price breakdown (subtotal, taxes, baggage, upgrade) |
| BR-CONFIRM-004 | Cho phép share itinerary qua email |
| BR-CONFIRM-005 | Hiển thị hotel suggestions cho cross-selling |

---

## 3.10. Đăng ký tài khoản (Nguồn: /api/auth/signup)

| ID | Luật nghiệp vụ |
|---|---|
| BR-AUTH-001 | Email là bắt buộc, không được để trống |
| BR-AUTH-002 | Email phải chứa ký tự "@" |
| BR-AUTH-003 | Password là bắt buộc, không được để trống |
| BR-AUTH-004 | Password phải có tối thiểu 8 ký tự (MIN_PASSWORD_LENGTH = 8, dù code comment ghi 10) |
| BR-AUTH-005 | Người dùng phải đồng ý điều khoản sử dụng (agreeTerms = true) |
| BR-AUTH-006 | Email phải là duy nhất trong hệ thống, không được trùng với email đã đăng ký |
| BR-AUTH-007 | Password được hash bằng bcrypt với SALT_ROUNDS = 10 trước khi lưu |
| BR-AUTH-008 | Username được tự động generate: {email_prefix}_{timestamp} |

---

## 3.11. Đăng nhập (Nguồn: /api/auth/[...nextauth])

| ID | Luật nghiệp vụ |
|---|---|
| BR-SIGNIN-001 | Email là bắt buộc, không được để trống |
| BR-SIGNIN-002 | Email phải chứa ký tự "@" |
| BR-SIGNIN-003 | Password là bắt buộc, không được để trống |
| BR-SIGNIN-004 | Password phải có tối thiểu 8 ký tự (MIN_PASSWORD_LENGTH = 8) |
| BR-SIGNIN-005 | Password được verify bằng bcrypt compare với hash trong database |
| BR-SIGNIN-006 | Session strategy sử dụng JWT |
| BR-SIGNIN-007 | JWT token chứa: id, email, username |
| BR-SIGNIN-008 | Session object chứa: user.id, user.email, user.username |
| BR-SIGNIN-009 | Google OAuth provider được cấu hình với GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET |
| BR-SIGNIN-010 | Google OAuth sử dụng PrismaAdapter để tạo/update user |

---

## 3.12. Lấy danh sách thành phố (Nguồn: /api/cities)

| ID | Luật nghiệp vụ |
|---|---|
| BR-CITY-001 | Danh sách thành phố lấy từ tất cả fromCity và toCity trong bảng Flight |
| BR-CITY-002 | Không trả về thành phố trùng lặp |
| BR-CITY-003 | Trả về 2 danh sách riêng: fromCities và toCities |

---

## 3.13. Xem flight deals (Nguồn: homepage UI)

| ID | Luật nghiệp vụ |
|---|---|
| BR-DEALS-001 | Hiển thị deal image, price, và description |
| BR-DEALS-002 | Click vào deal sẽ pre-fill search parameters và redirect đến flights page |
| BR-DEALS-003 | Data là static (không có API riêng) |

---

## 3.14. Xem unique places (Nguồn: homepage UI)

| ID | Luật nghiệp vụ |
|---|---|
| BR-PLACES-001 | Hiển thị place image, price, description, và motivation |
| BR-PLACES-002 | Click vào place sẽ pre-fill search parameters và redirect đến flights page |
| BR-PLACES-003 | Data là static (không có API riêng) |

---

## 3.15. Share itinerary (Nguồn: successbooking page - chưa implement)

| ID | Luật nghiệp vụ |
|---|---|
| BR-SHARE-001 | Email phải đúng format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ |
| BR-SHARE-002 | Share record sẽ link bookingId với recipient email |
| BR-SHARE-003 | Itinerary email được gửi đến recipient |
| BR-SHARE-004 | Chức năng này chưa được implement (không có API endpoint) |

---

## 3.16. Xem lịch sử đặt vé (Nguồn: /packages - chưa implement)

| ID | Luật nghiệp vụ |
|---|---|
| BR-HISTORY-001 | Bookings được filter theo userId |
| BR-HISTORY-002 | Mỗi booking bao gồm: flight details, passenger info, payment info |
| BR-HISTORY-003 | Cho phép filter bookings theo date |
| BR-HISTORY-004 | Chức năng này chưa được implement (không có API endpoint) |

---

## 3.17. Hủy đặt vé (Nguồn: chưa implement)

| ID | Luật nghiệp vụ |
|---|---|
| BR-CANCEL-001 | Booking status được update thành cancelled |
| BR-CANCEL-002 | Refund được xử lý dựa trên cancellation policy (chưa implement) |
| BR-CANCEL-003 | Cancellation phải được thực hiện trước deadline (chưa implement) |
| BR-CANCEL-004 | Chức năng này chưa được implement (không có API endpoint) |

---

## Tổng Kết

**Tổng số luật nghiệp vụ:** 60

**Theo nhóm chức năng:**
- Tìm kiếm chuyến bay: 8 luật
- Chọn chuyến bay: 4 luật
- Ghế ngồi: 6 luật (3 lấy + 3 chọn)
- Thông tin hành khách: 6 luật
- Đặt vé: 6 luật
- Tính giá: 5 luật
- Thanh toán: 7 luật
- Xác nhận đặt vé: 5 luật
- Đăng ký tài khoản: 8 luật
- Đăng nhập: 10 luật
- Danh sách thành phố: 3 luật
- Flight deals: 3 luật
- Unique places: 3 luật
- Share itinerary: 4 luật
- Lịch sử đặt vé: 4 luật
- Hủy đặt vé: 4 luật

**Trạng thái implement:**
- Đã implement: 47 luật (BR-SEARCH, BR-SELECT, BR-SEAT, BR-PASS, BR-BOOK, BR-PRICE, BR-PAY, BR-CONFIRM, BR-AUTH, BR-SIGNIN, BR-CITY, BR-DEALS, BR-PLACES)
- Chưa implement: 13 luật (BR-SHARE, BR-HISTORY, BR-CANCEL - các luật liên quan đến chức năng chưa có API)
