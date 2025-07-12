# School Medical Management System Frontend

Phần mềm quản lý y tế học đường cho phòng y tế của 01 trường học.

- Trang chủ giới thiệu thông tin trường học, tài liệu về sức khỏe học đường, blog chia sẻ kinh nghiệm, ...
- Chức năng cho phép phụ huynh khai báo hồ sơ sức khỏe của học sinh: dị ứng, bệnh mãn tính, tiền sử điều trị, thị lực, thính lực, tiêm chủng, ...
- Chức năng cho phép phụ huynh gửi thuốc cho trường để nhân viên y tế cho học sinh uống.
- Chức năng cho phép nhân viên y tế ghi nhận và xử lý sự kiện y tế (tai nạn, sốt, té ngã, dịch bệnh, ...) trong trường.
- Quản lý thuốc và các vật tư y tế trong quá trình xử lý các sự kiện y tế.
- Quản lý quá trình tiêm chủng tại trường
  << Gửi phiếu thông báo đồng ý tiêm chủng cho phụ huynh xác nhận --> Chuẩn bị danh sách học sinh tiêm --> Tiêm chủng và ghi nhận kết quả --> Theo dõi sau tiêm >>
- Quản lý quá trình kiểm tra y tế định kỳ tại trường học
  << Gửi phiếu thông báo kiểm tra y tế các nội dung kiểm tra cho phụ huynh xác nhận --> Chuẩn bị danh sách học sinh kiểm tra --> Thực hiện kiểm tra và ghi nhận kết quả --> Gửi kết quả cho phụ huynh và lập lịch hẹn tư vấn riêng nếu có dấu hiệu bất thường >>
- Quản lý hồ sơ người dùng, lịch sử kiểm tra y tế.
- Dashboard & Report.

## Technologies Used

- Js Library - [React](https://react.dev/)
- Build Tool - [ViteJS](https://vite.dev/)
- Language - [TypeScript](https://www.typescriptlang.org)
- State Management - [Redux](https://redux.js.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- Async state management - [Tanstack Query aka React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/school-medical-management-system-frontend.git
cd school-medical-management-system-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL

Create a **.env** file in the root directory and copy from **.env.example** to point to your backend API.

### 4. Run the application

```bash
npm run dev
```

The frontend application will be accessible at http://localhost:5173.
