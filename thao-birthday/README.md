# Sinh nhật của Thảo ♡

Trang sinh nhật tiếng Việt với bánh kem hoạt ảnh, thổi nến, pháo giấy, ba món quà tương tác, thư tình, điều ước lưu trong trình duyệt và nhạc sinh nhật được tổng hợp bằng Web Audio.

## Chạy ngay

```sh
npm start
```

Mở http://localhost:3000. Không cần cài thư viện. Có thể đổi cổng qua biến môi trường `PORT`.

Nội dung ở `dist/index.html`, thiết kế ở `dist/style.css`, tương tác ở `dist/app.js`. Thay lời chúc, tên hoặc nội dung lá thư trực tiếp trong các tệp này.

Nhạc chỉ bắt đầu sau khi bấm nút. Điều ước được lưu bằng localStorage trên thiết bị hiện tại; không được gửi đến máy chủ. Trang hỗ trợ bàn phím, màn hình nhỏ và tùy chọn giảm chuyển động của hệ điều hành. Phông chữ tải từ Google Fonts, có phông dự phòng khi ngoại tuyến.

## Cloudflare Workers

Đã cấu hình Workers Static Assets trong `wrangler.jsonc`. Chỉ thư mục `dist` được tải lên.

```sh
npm run deploy:temporary
```

Khi chưa đăng nhập, Cloudflare cung cấp một bản tạm chạy 60 phút và đường dẫn nhận quyền sở hữu. Mở đường dẫn nhận quyền sở hữu để giữ bản triển khai lâu dài trong tài khoản Cloudflare của bạn.

Nếu đã đăng nhập Wrangler, dùng `npm run deploy` để triển khai hoặc cập nhật trực tiếp trong tài khoản đó.
