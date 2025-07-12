// @ts-nocheck
import { genderInit } from '@/pages/workspace-page/employee/helper/data';

// Common util for employee
export function convertToDateFromAPI(dateString) {
  const dateParts = dateString.split('/');

  if (dateParts.length === 3) {
    const day = dateParts[0];
    const month = dateParts[1] - 1;
    const year = dateParts[2];

    const date = new Date(year, month, day);

    if (isNaN(date)) {
      return 'Invalid date';
    }

    const formattedDay = date.getDate().toString().padStart(2, '0');
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }

  return 'Invalid format';
}

export function convertDateToBackendFormat(dateString) {
  const [day, month, year] = dateString.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function convertToMMDDYYYY(dateStr: string): string {
  const [day, month, year] = dateStr.split('/');
  return `${month}/${day}/${year}`;
}
export function parseDateFromAPI(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${month}/${day}/${year}`);
}

export const getGenderDisplay = (value: string) => {
  const gender = genderInit.find((g) => g.value === value);
  return gender ? gender.display : 'Chưa chọn';
};
export function getErrorMessages(error) {
  if (error && error.issues) {
    return error.issues.map((issue) => issue.message).join('\n');
  }
  return 'Có lỗi xảy ra, vui lòng thử lại sau.';
}
