import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Divider,
  Button,
} from '@mui/material'
import {
  TrendingUp,
  Schedule,
  ExpandMore,
  ExpandLess,
  Paid,
} from '@mui/icons-material'
import type { LoanCalculationResponse } from '../types/loan'

interface ResultsProps {
  data: LoanCalculationResponse
}

export default function Results({ data }: ResultsProps) {
  const [showSchedule, setShowSchedule] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bs-BA', {
      style: 'currency',
      currency: 'BAM',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getMonthName = (monthNumber: number) => {
    const currentDate = new Date()
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthNumber, 1)
    const monthNames = [
      'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni',
      'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
    ]
    const month = targetDate.getMonth()
    return monthNames[month]
  }

  const getYear = (monthNumber: number) => {
    const currentDate = new Date()
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthNumber, 1)
    return targetDate.getFullYear()
  }

  const interestPercentage = ((data.totalInterest / data.totalPaid) * 100).toFixed(1)

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        📊 Rezultati analize kredita
      </Typography>

      {/* Summary Cards - Responsive Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        <Box>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%', 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
              },
            }}
          >
            <CardContent sx={{ color: 'white', textAlign: 'center', p: 2 }}>
              <Paid sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, mb: 1, color: '#60a5fa' }} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Mjesečna rata
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}>
                {formatCurrency(data.monthlyPayment)}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%', 
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
              },
            }}
          >
            <CardContent sx={{ color: 'white', textAlign: 'center', p: 2 }}>
              <TrendingUp sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, mb: 1, color: '#a78bfa' }} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Ukupne kamate
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}>
                {formatCurrency(data.totalInterest)}
              </Typography>
              <Chip 
                label={`${interestPercentage}% od ukupnog`} 
                size="small" 
                sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}
              />
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%', 
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 165, 233, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(14, 165, 233, 0.3)',
                border: '1px solid rgba(14, 165, 233, 0.4)',
              },
            }}
          >
            <CardContent sx={{ color: 'white', textAlign: 'center', p: 2 }}>
              <Schedule sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, mb: 1, color: '#22d3ee' }} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Ukupno plaćeno
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}>
                {formatCurrency(data.totalPaid)}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%', 
              background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 116, 139, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(100, 116, 139, 0.3)',
                border: '1px solid rgba(100, 116, 139, 0.4)',
              },
            }}
          >
            <CardContent sx={{ color: 'white', textAlign: 'center', p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Detalji kredita
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                Iznos: {formatCurrency(data.amount)}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                Stopa: {data.interestRate}% ({data.interestRateType === 'FIXED' ? 'Fiksna' : 'Promjenjiva'})
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                Rok: {data.termInMonths} mjeseci
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>


      {/* Amortization Schedule */}
      <Card 
        elevation={0} 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              📋 Plan otplate
            </Typography>
            <Button
              onClick={() => setShowSchedule(!showSchedule)}
              color="primary"
              startIcon={showSchedule ? <ExpandLess /> : <ExpandMore />}
              sx={{ 
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                px: { xs: 1, sm: 2 }
              }}
            >
              {showSchedule ? 'Sakrij' : 'Prikaži'} plan
            </Button>
          </Box>

          <Collapse in={showSchedule}>
            <Divider sx={{ mb: 2 }} />
            <TableContainer 
              component={Paper} 
              sx={{ 
                maxHeight: { xs: 300, sm: 400 },
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                      fontWeight: 'bold',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#cbd5e1',
                    }}>
                      Broj
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                      fontWeight: 'bold',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#cbd5e1',
                    }}>
                      Mjesec
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                      fontWeight: 'bold',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#cbd5e1',
                    }}>
                      Godina
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                      fontWeight: 'bold',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#cbd5e1',
                    }}>
                      Glavnica
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                      fontWeight: 'bold',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#cbd5e1',
                    }}>
                      Kamate
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                      fontWeight: 'bold',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#cbd5e1',
                    }}>
                      Mjesečna rata
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                      fontWeight: 'bold',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#cbd5e1',
                    }}>
                      Preostalo
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.amortizationSchedule?.map((row, index) => (
                    <TableRow 
                      key={row.month}
                      sx={{ 
                        '&:nth-of-type(odd)': { backgroundColor: 'rgba(255, 255, 255, 0.02)' },
                        '&:hover': { 
                          backgroundColor: 'rgba(59, 130, 246, 0.05)',
                          borderLeft: '2px solid rgba(59, 130, 246, 0.5)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <TableCell sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        color: '#94a3b8',
                      }}>
                        <Chip 
                          label={row.month} 
                          size="small" 
                          sx={{ 
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            background: index < 12 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                            color: index < 12 ? '#60a5fa' : '#94a3b8',
                            border: index < 12 ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(100, 116, 139, 0.3)',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#94a3b8' }}>
                          {getMonthName(row.month)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#94a3b8' }}>
                          {getYear(row.month)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#60a5fa' }}>
                          {formatCurrency(row.principal)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#a78bfa' }}>
                          {formatCurrency(row.interest)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      }}>
                        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#22d3ee' }}>
                          {formatCurrency(row.principal + row.interest)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      }}>
                        <Typography variant="body2" fontWeight="medium" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#cbd5e1' }}>
                          {formatCurrency(row.remainingBalance)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  )
}


