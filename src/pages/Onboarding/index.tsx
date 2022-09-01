import React, { useEffect } from 'react'
import { AppLayout } from '@components/index'
import OnboardingForm from './OnboardingForm'
import { useNavigate } from 'react-router-dom'

const Onboarding: React.FC = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    window.history.replaceState(null, 'Buy', '/')
  }, [])

  return (
    <AppLayout
      headerStatus="header-status"
      headerClass="home"
      footerStatus="footer-status"
    >
      <OnboardingForm onClose={handleClose} />
    </AppLayout>
  )
}

export default Onboarding
