import type { LoanCalculationRequest, LoanCalculationResponse } from '../types/loan'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://kreditnikalkulator.eu-central-1.elasticbeanstalk.com'

export async function calculateLoan(
  payload: LoanCalculationRequest,
): Promise<LoanCalculationResponse> {
  const url = `${baseUrl}/api/loans/calculate`
  console.log('Making request to:', url)
  console.log('Payload:', payload)
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  })
  
  console.log('Response status:', response.status)
  console.log('Response headers:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  // Backend returns BigDecimal values; JSON parse will yield numbers (assuming Jackson configured)
  const data = (await response.json()) as LoanCalculationResponse
  return data
}


