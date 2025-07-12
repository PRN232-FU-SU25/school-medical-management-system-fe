import * as XLSX from 'xlsx';
import __helpers from '@/helpers';

export const formatNumberWithCommas = (value: number) => {
  let isNegative = false;

  if (value < 0) {
    isNegative = true;
    value = Math.abs(value);
  }

  let n = value.toString();
  const pattern = /(\d+)(\d{3})/;
  while (pattern.test(n)) {
    n = n.replace(pattern, '$1.$2');
  }

  return isNegative ? '-' + n : n;
};

// Hàm export file excel
export const exportToExcel = (
  data: Record<string, any>,
  fileName: string,
  headers: Record<string, string>
) => {
  const formattedData = data.map((item) => {
    const newItem = {};
    for (const key in headers) {
      if (item[key] !== undefined) {
        newItem[headers[key]] = item[key];
      }
    }
    return newItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  worksheet['!cols'] = Object.keys(headers).map((key) => {
    const maxLength = Math.max(
      headers[key].length,
      ...formattedData.map((item) =>
        item[headers[key]] ? item[headers[key]].toString().length : 0
      )
    );
    return { wch: maxLength + 2 };
  });

  formattedData.forEach((item, index) => {
    const rowIndex = index + 1;
    const contractValueAddress = `H${rowIndex + 1}`;

    if (worksheet[contractValueAddress]) {
      worksheet[contractValueAddress].z = '#,##0';
    }
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

  const now = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const formattedDate = new Intl.DateTimeFormat('vi-VN', dateOptions)
    .format(now)
    .replace(/\//g, '')
    .replace(/-/g, '')
    .replace(',', '')
    .replace(/ /g, '-');

  XLSX.writeFile(workbook, `${fileName}_${formattedDate}.xlsx`);
};

export function setItemWithExpiration<T>(
  key: string,
  value: T,
  expirationTime: number
): void {
  const now = new Date();
  const item = {
    value,
    expiration: now.getTime() + expirationTime
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiration<T>(key: string): T | null {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr) as { value: T; expiration: number };
    const now = new Date();

    if (now.getTime() > item.expiration) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu từ localStorage:', error);
    return null;
  }
}
