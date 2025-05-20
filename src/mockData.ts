// mockData.ts
export interface UserRow {
  id: number;
  name: string;
  email: string;
}

export const generateMockData = (count: number): UserRow[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));
};
