// Historical Colombian minimum wages by year (2003-2025)
export const historicalMinWage: { [key: string]: number } = {
  '2003': 332000,
  '2004': 358000,
  '2005': 381500,
  '2006': 408000,
  '2007': 433700,
  '2008': 461500,
  '2009': 496900,
  '2010': 515000,
  '2011': 535600,
  '2012': 566700,
  '2013': 589500,
  '2014': 616000,
  '2015': 644350,
  '2016': 689455,
  '2017': 737717,
  '2018': 781242,
  '2019': 828116,
  '2020': 877803,
  '2021': 908526,
  '2022': 1000000,
  '2023': 1160000,
  '2024': 1300000,
  '2025': 1300000  // Using 2024's value as placeholder
};

// Monthly IPC data (example values - should be updated with real data)
export const ipcData: { [key: string]: number } = {
  '2003-01': 0.008,
  '2003-02': 0.007,
  // ... Add historical IPC data
  '2025-04': 0.006,
  '2025-05': 0.006
};

// Technical interest rate (3.5% annual)
export const TECHNICAL_INTEREST_RATE = 0.035;

// Weeks in a month (average)
export const WEEKS_PER_MONTH = 4.33;

// Function to get the last day of a month
export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Function to format currency
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

// Function to calculate weeks between dates
export function calculateWeeksBetween(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
}

// Function to get monthly factor
export function getMonthlyFactor(yearMonth: string): number {
  const ipc = ipcData[yearMonth] || 0;
  return 1 + ipc + (TECHNICAL_INTEREST_RATE / 12);
}