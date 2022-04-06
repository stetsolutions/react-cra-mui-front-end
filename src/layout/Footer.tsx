import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'

import { useLayoutContext } from '../contexts/Layout'

function Footer () {
  const { isDisplayed } = useLayoutContext()
  const { pathname } = useLocation()

  return (
    <footer>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          display: isDisplayed(pathname) ? 'none' : 'flex',
          p: 2
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Typography align='center' variant='body2'>
                &copy; Copyright 2021, STET Solutions Inc. All Rights Reserved -
                v0.1.0
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
