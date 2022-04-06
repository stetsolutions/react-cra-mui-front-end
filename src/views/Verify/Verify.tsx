import { useSnackbar } from 'notistack'
import { useCallback, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { verify } from '../../services/api/auth'
import CustomError from '../../types/CustomError'

function Verify () {
  const history = useHistory()
  const search = useLocation().search
  const { enqueueSnackbar } = useSnackbar()

  const userId = new URLSearchParams(search).get('userId')
  const token = new URLSearchParams(search).get('token')

  const handleFetch = useCallback(async () => {
    try {
      await verify(userId!, token!)

      const user = localStorage.getItem('user')

      if (user) {
        const parsed = JSON.parse(user)
        parsed.verified = true
        localStorage.setItem('user', JSON.stringify(parsed))
      }

      enqueueSnackbar('Request verified: please sign in', {
        autoHideDuration: 3000,
        variant: 'success'
      })
    } catch (error) {
      if ((error as CustomError).statusCode === 404) {
        enqueueSnackbar('Request expired: Please try again', {
          autoHideDuration: 3000,
          variant: 'error'
        })
      } else {
        enqueueSnackbar(`${(error as CustomError).message}`, {
          autoHideDuration: 3000,
          variant: 'error'
        })
      }
    }

    history.push('/access')
  }, [enqueueSnackbar, history, token, userId])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return null
}

export default Verify
