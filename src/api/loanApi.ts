import type { LoanCalculationRequest, LoanCalculationResponse } from '../types/loan'

const baseUrl = import.meta.env.VITE_API_BASE_URL || ''

export async function calculateLoan(
  payload: LoanCalculationRequest,
): Promise<LoanCalculationResponse> {
  const url = `${baseUrl}/api/loans/calculate`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  // Backend returns BigDecimal values; JSON parse will yield numbers (assuming Jackson configured)
  const data = (await response.json()) as LoanCalculationResponse
  return data
}


