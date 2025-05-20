import { type UserRow, generateMockData } from "./mockData";

const MOCK_DATA = generateMockData(123);

export const mockFetchRows = (
  page: number,
  pageSize: number
): Promise<{ rows: UserRow[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * pageSize;
      const end = start + pageSize;
      resolve({
        rows: MOCK_DATA.slice(start, end),
        total: MOCK_DATA.length,
      });
    }, 800);
  });
};

export const mockFetchAllRows = async (): Promise<UserRow[]> => {
  const total = 1000;
  return Array.from({ length: total }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));
};