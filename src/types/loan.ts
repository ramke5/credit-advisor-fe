export interface LoanCalculationRequest {
  amount: number;
  interestRate: number; // annual percentage, e.g., 5.5
  termInMonths: number;
  interestRateType: 'FIXED' | 'VARIABLE';
}

export interface AmortizationScheduleEntry {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface LoanCalculationResponse extends LoanCalculationRequest {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  amortizationSchedule: AmortizationScheduleEntry[];
}


