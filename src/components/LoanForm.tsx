import { useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import {
  Percent,
  Schedule,
  Calculate,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material'
import type { LoanCalculationRequest } from '../types/loan'

interface LoanFormProps {
  onSubmit: (payload: LoanCalculationRequest) => void
  disabled?: boolean
}

export default function LoanForm({ onSubmit, disabled }: LoanFormProps) {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [termInMonths, setTermInMonths] = useState('')
  const [interestRateType, setInterestRateType] = useState<'FIXED' | 'VARIABLE'>('FIXED')
  const [errors, setErrors] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors(null)

    const parsed: LoanCalculationRequest = {
      amount: Number(amount),
      interestRate: Number(interestRate),
      termInMonths: Number(termInMonths),
      interestRateType: interestRateType,
    }

    if (!isFinite(parsed.amount) || parsed.amount <= 0) {
      setErrors('Iznos mora biti veći od 0')
      return
    }
    if (!isFinite(parsed.interestRate) || parsed.interestRate < 0) {
      setErrors('Kamatna stopa mora biti 0 ili veća')
      return
    }
    if (!Number.isInteger(parsed.termInMonths) || parsed.termInMonths < 1 || parsed.termInMonths > 600) {
      setErrors('Rok mora biti cijeli broj između 1 i 600 mjeseci')
      return
    }

    onSubmit(parsed)
  }

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: 'fit-content',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            💰 Kalkulator kredita
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Unesite podatke o kreditu da biste izračunali mjesečne rate i vidjeli plan otplate
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Iznos kredita"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="npr. 250000"
                required
                disabled={disabled}
                helperText="Unesite ukupan iznos kredita"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kamatna stopa"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="npr. 5.5"
                required
                disabled={disabled}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Percent />
                    </InputAdornment>
                  ),
                }}
                helperText="Godišnja kamatna stopa u procentima"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rok otplate"
                type="number"
                value={termInMonths}
                onChange={(e) => setTermInMonths(e.target.value)}
                placeholder="npr. 360"
                required
                disabled={disabled}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Schedule />
                    </InputAdornment>
                  ),
                }}
                helperText="Rok otplate u mjesecima (1-600)"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Tip kamatne stope</InputLabel>
                <Select
                  value={interestRateType}
                  label="Tip kamatne stope"
                  onChange={(e) => setInterestRateType(e.target.value as 'FIXED' | 'VARIABLE')}
                  disabled={disabled}
                  startAdornment={
                    <InputAdornment position="start">
                      {interestRateType === 'FIXED' ? <TrendingUp /> : <TrendingDown />}
                    </InputAdornment>
                  }
                >
                  <MenuItem value="FIXED">Fiksna stopa</MenuItem>
                  <MenuItem value="VARIABLE">Promjenjiva stopa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {errors && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error">{errors}</Alert>
            </Box>
          )}

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={disabled}
              startIcon={disabled ? <CircularProgress size={20} /> : <Calculate />}
              sx={{ 
                minWidth: 200,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {disabled ? 'Računam...' : 'Izračunaj kredit'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}


