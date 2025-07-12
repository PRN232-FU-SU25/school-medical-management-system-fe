import { z } from 'zod';

// Common validation for employee

export const nonemptyValidation = (message: string) =>
  z.string().nonempty({ message });

export const stringValidation = (
  min: number,
  minMessage: string,
  max: number,
  maxMessage: string,
  emptyMessage: string
) =>
  z
    .string()
    .min(min, minMessage)
    .max(max, maxMessage)
    .nonempty({ message: emptyMessage });

export const baseSchema = z
  .object({
    firstName: stringValidation(
      2,
      'Tên phải có tối thiểu 2 kí tự',
      50,
      'Tên không được dài hơn 50 kí tự',
      'Tên không được để trống'
    ),
    lastName: stringValidation(
      2,
      'Họ phải có tối thiểu 2 kí tự',
      50,
      'Họ không được dài hơn 50 kí tự',
      'Họ không được để trống'
    ),
    email: z
      .string()
      .email({ message: 'Email không hợp lệ' })
      .nonempty({ message: 'Email không được để trống' }),
    departmentId: z
      .number({ message: 'Phòng ban không được để trống' })
      .min(1, { message: 'Phòng ban không hợp lệ' }),
    dateOfBirth: nonemptyValidation('Vui lòng chọn ngày sinh'),
    gender: z
      .number()
      .refine((val) => val === 0 || val === 1 || val === 2 || val === 3, {
        message: 'Giới tính không hợp lệ'
      }),
    identityCard: z.string(),
    password: stringValidation(
      6,
      'Mật khẩu phải có tối thiểu 6 kí tự',
      255,
      'Mật khẩu không được dài hơn 255 kí tự',
      'Mật khẩu không được để trống'
    ),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Xác nhận mật khẩu không được để trống' }),
    phoneNumber: stringValidation(
      10,
      'Số điện thoại phải có tối thiểu 10 số',
      11,
      'Số điện thoại không được dài hơn 11 số',
      'Số điện thoại không được để trống'
    ),

    userName: stringValidation(
      3,
      'Tên đăng nhập phải có tối thiểu 3 kí tự',
      20,
      'Tên đăng nhập không được dài hơn 20 kí tự',
      'Tên đăng nhập không được để trống'
    ),
    avatar: z.string().optional(),
    userType: z
      .number({ message: 'Loại người dùng không được để trống' })
      .min(1, { message: 'Loại người dùng không hợp lệ' })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không trùng khớp',
        path: ['confirmPassword']
      });
    }
  });
