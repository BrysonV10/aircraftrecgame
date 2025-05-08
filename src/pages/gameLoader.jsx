import React from 'react'
import { Box, Paper, Typography, Button } from '@mui/material'

export default function GameLoader({ user, show, onReady }) {
  const nickname = user?.displayName || ''

  if (!show) return null

  return (
    <Box
      component="div"
      sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 500ms ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {nickname ? `Welcome, ${nickname}!` : 'Welcome!'}
        </Typography>
        <Typography variant="subtitle1" mb={3}>
          Are you ready to play?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onReady}
        >
          Let’s Go!
        </Button>
      </Paper>
    </Box>
  )
}
