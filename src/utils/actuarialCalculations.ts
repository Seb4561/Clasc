import {
  historicalMinWage,
  TECHNICAL_INTEREST_RATE,
  WEEKS_PER_MONTH,
  getLastDayOfMonth,
  formatCurrency,
  calculateWeeksBetween,
  getMonthlyFactor
} from './actuarialData';

interface CalculationResult {
  baseAmount: number;
  weeksMissing: number;
  weeklyBase: number;
  firstPaymentDate: Date;
  secondPaymentDate: Date;
  firstPaymentAmount: number;
  secondPaymentAmount: number;
}

export function calculateActuarialDebt(
  startDate: Date,
  endDate: Date,
  salary: number
): CalculationResult {
  // 1. Calculate missing weeks
  const weeksMissing = calculateWeeksBetween(startDate, endDate);

  // 2. Calculate weekly base
  const weeklyBase = salary / WEEKS_PER_MONTH;

  // 3. Calculate base amount
  const baseAmount = weeksMissing * weeklyBase;

  // 4. Get payment dates (last day of current and next month)
  const now = new Date();
  const firstPaymentDate = getLastDayOfMonth(now);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const secondPaymentDate = getLastDayOfMonth(nextMonth);

  // 5. Calculate accumulated factors
  let firstPaymentFactor = 1;
  let secondPaymentFactor = 1;

  // Start from January of the year following the end date
  let currentDate = new Date(endDate.getFullYear() + 1, 0, 1);

  while (currentDate <= firstPaymentDate) {
    const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    firstPaymentFactor *= getMonthlyFactor(yearMonth);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // Reset for second payment calculation
  currentDate = new Date(endDate.getFullYear() + 1, 0, 1);
  while (currentDate <= secondPaymentDate) {
    const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    secondPaymentFactor *= getMonthlyFactor(yearMonth);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // 6. Calculate final amounts
  const firstPaymentAmount = baseAmount * firstPaymentFactor;
  const secondPaymentAmount = baseAmount * secondPaymentFactor;

  return {
    baseAmount,
    weeksMissing,
    weeklyBase,
    firstPaymentDate,
    secondPaymentDate,
    firstPaymentAmount,
    secondPaymentAmount
  };
}

export function validateCalculationInputs(
  startDate: string,
  endDate: string,
  salary: string
): string[] {
  const errors: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const salaryNum = Number(salary);

  if (end < start) {
    errors.push("La fecha final debe ser posterior a la fecha inicial");
  }

  if (isNaN(salaryNum) || salaryNum <= 0) {
    errors.push("El salario debe ser un número positivo");
  }

  if (start > new Date()) {
    errors.push("La fecha inicial no puede ser futura");
  }

  return errors;
}