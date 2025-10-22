import { useState } from 'react'
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Typography, 
  Box, 
  Alert
} from '@mui/material'
import LoanForm from './components/LoanForm'
import Results from './components/Results'
import { calculateLoan } from './api/loanApi'
import type { LoanCalculationRequest, LoanCalculationResponse } from './types/loan'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#f8fafc',
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
        html: {
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          minHeight: '100vh',
        },
        '#root': {
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
      },
    },
  },
})

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<LoanCalculationResponse | null>(null)

  async function onSubmit(payload: LoanCalculationRequest) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await calculateLoan(payload)
      setResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1), transparent 50%)',
          },
        }}
      >
        
        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                mb: 2,
              }}
            >
              🏦 Savjetnik za kredite
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(241, 245, 249, 0.9)',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              Izračunajte mjesečne rate kredita i istražite opcije otplate
            </Typography>
          </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ pb: 4 }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1.5fr' },
            gap: 4,
            justifyContent: 'center'
          }}>
            {/* Left Column - Form */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ position: 'sticky', top: 20, width: '100%' }}>
                <LoanForm onSubmit={onSubmit} disabled={loading} />
                
                {error && (
                  <Box sx={{ mt: 3 }}>
                    <Alert severity="error">{error}</Alert>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Right Column - Results */}
            <Box>
              {result && (
                <Box>
                  <Results data={result} />
                </Box>
              )}
            </Box>
          </Box>
        </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
