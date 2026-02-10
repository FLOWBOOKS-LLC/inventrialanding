export interface BlogCategory {
  name: string;
  count: number;
}

export const blogCategories: BlogCategory[] = [
  { name: "All", count: 48 },
  { name: "Product Updates", count: 12 },
  { name: "Industry Insights", count: 18 },
  { name: "Best Practices", count: 10 },
  { name: "Case Studies", count: 8 }
];
