export const mockReportsData = {
  customerGrowth: [
    { month: 'Jul', customers: 245, newCustomers: 12 },
    { month: 'Aug', customers: 267, newCustomers: 22 },
    { month: 'Sep', customers: 289, newCustomers: 22 },
    { month: 'Oct', customers: 315, newCustomers: 26 },
    { month: 'Nov', customers: 342, newCustomers: 27 },
    { month: 'Dec', customers: 368, newCustomers: 26 },
    { month: 'Jan', customers: 395, newCustomers: 27 }
  ],
  customerSegments: [
    { segment: 'Enterprise', count: 45, percentage: 35, value: 450000 },
    { segment: 'SMB', count: 78, percentage: 45, value: 285000 },
    { segment: 'Startup', count: 32, percentage: 20, value: 95000 }
  ],
  performanceMetrics: {
    conversionRate: 24.5,
    avgDealSize: 32500,
    salesCycle: 45,
    customerSatisfaction: 4.7,
    churnRate: 3.2,
    ltv: 125000
  },
  topPerformers: [
    { name: 'Sarah Johnson', deals: 12, revenue: 285000 },
    { name: 'Michael Chen', deals: 9, revenue: 195000 },
    { name: 'Emily Rodriguez', deals: 8, revenue: 165000 }
  ]
};