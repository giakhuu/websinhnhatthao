# websinhnhatthao

Một trang sinh nhật tương tác dành riêng cho Thảo, với bánh kem hoạt ảnh, thổi nến, pháo giấy, ba món quà bất ngờ, thư tình, điều ước và nhạc sinh nhật.

**GitHub Pages:** [giakhuu.github.io/websinhnhatthao](https://giakhuu.github.io/websinhnhatthao/)

![Giao diện trang sinh nhật](thao-birthday/preview.png)

## Chạy trên máy

Cần Node.js. Không cần cài thư viện.

```sh
cd thao-birthday
npm start
```

Mở [localhost:3000](http://localhost:3000).

## Chỉnh sửa

- `thao-birthday/dist/index.html`: tên, lời chúc và lá thư.
- `thao-birthday/dist/style.css`: màu sắc, bố cục và hoạt ảnh.
- `thao-birthday/dist/app.js`: tương tác, nhạc, thổi nến và điều ước.

Nhạc chỉ bật khi người xem bấm nút. Điều ước chỉ lưu trong trình duyệt, có thể xóa và không gửi đến máy chủ. Trang thích ứng với điện thoại và hỗ trợ tùy chọn giảm chuyển động.

## Triển khai GitHub Pages

Workflow tại `.github/workflows/pages.yml` kiểm tra JavaScript và triển khai thư mục `thao-birthday/dist` mỗi khi có thay đổi trên nhánh `main`. Có thể chạy thủ công tại **Actions → Deploy birthday website → Run workflow**.

Trong **Settings → Pages → Build and deployment**, nguồn triển khai cần là **GitHub Actions**.
