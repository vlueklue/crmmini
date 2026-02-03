export const mockSalesOpportunities = [
  {
    id: 1,
    title: 'Enterprise Software License',
    customer: 'Tech Solutions Inc',
    value: 45000,
    stage: 'negotiation',
    probability: 80,
    closeDate: '2026-02-15',
    status: 'in-progress'
  },
  {
    id: 2,
    title: 'Digital Marketing Campaign',
    customer: 'Digital Marketing Pro',
    value: 25000,
    stage: 'proposal',
    probability: 60,
    closeDate: '2026-02-28',
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Consulting Services Contract',
    customer: 'Business Consulting Group',
    value: 75000,
    stage: 'closed-won',
    probability: 100,
    closeDate: '2026-01-20',
    status: 'won'
  },
  {
    id: 4,
    title: 'Cloud Migration Project',
    customer: 'Enterprise Solutions',
    value: 120000,
    stage: 'qualification',
    probability: 40,
    closeDate: '2026-03-15',
    status: 'in-progress'
  },
  {
    id: 5,
    title: 'Mobile App Development',
    customer: 'Innovation Startup',
    value: 35000,
    stage: 'closed-lost',
    probability: 0,
    closeDate: '2026-01-10',
    status: 'lost'
  }
];

export const mockRevenueData = [
  { month: 'Jul', revenue: 85000, target: 90000 },
  { month: 'Ago', revenue: 92000, target: 95000 },
  { month: 'Sep', revenue: 78000, target: 85000 },
  { month: 'Oct', revenue: 105000, target: 100000 },
  { month: 'Nov', revenue: 118000, target: 110000 },
  { month: 'Dic', revenue: 134000, target: 125000 },
  { month: 'Ene', revenue: 142000, target: 135000 }
];

export const mockPipelineStages = [
  { stage: 'Lead', count: 15, value: 180000 },
  { stage: 'Qualified', count: 8, value: 320000 },
  { stage: 'Proposal', count: 5, value: 285000 },
  { stage: 'Negotiation', count: 3, value: 195000 },
  { stage: 'Closed Won', count: 2, value: 95000 }
];

export const mockSalesData = [
  { month: 'Ene', sales: 12000 },
  { month: 'Feb', sales: 19000 },
  { month: 'Mar', sales: 15000 },
  { month: 'Abr', sales: 25000 },
  { month: 'May', sales: 22000 },
  { month: 'Jun', sales: 30000 }
];