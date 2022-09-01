import React, { useEffect } from 'react'
import { AppLayout } from '@components/index'
import PlayerDashboardForm from './PlayerDashboardForm'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const PlayerDashboard: React.FC = () => {
  useEffect(() => {
    // window.history.replaceState(null, 'Buy', '/')
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <AppLayout
      headerStatus="header-status"
      headerClass="home"
      footerStatus="footer-status"
    >
      <PlayerDashboardForm />
    </AppLayout>
  )
}

export default PlayerDashboard
