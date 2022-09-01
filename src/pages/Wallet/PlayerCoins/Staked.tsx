import { AppLayout } from '@components/index'
import { useEffect } from 'react'
import StakedForm from './StakedForm'

const Staked = () => {
  useEffect(() => {
    window.history.replaceState(null, 'Buy', '/')
  }, [])

  return (
    <AppLayout footerStatus="footer-status">
      <StakedForm />
    </AppLayout>
  )
}

export default Staked
