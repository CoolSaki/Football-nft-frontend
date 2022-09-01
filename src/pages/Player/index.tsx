/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { AppLayout } from '@components/index'
import PlayerForm from './PlayerForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@root/store/rootReducers'
import { isMobile } from '@utils/helpers'
import {
  showPlayerDashboardForm,
  showSignupForm,
  showWalletForm,
} from '@root/apis/onboarding/authenticationSlice'
import DialogBox from '@components/DialogBox'
import OnboardingForm from '@pages/Onboarding/OnboardingForm'
import WalletForm from '@pages/Wallet/WalletForm'
import PlayerDashboardForm from '@pages/PlayerDashboard/PlayerDashboardForm'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const Player: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    handleClose()
  }

  const showSignupPopup = useSelector(
    (state: RootState) => state.authentication.isSignupFormVisible,
  )

  const showWalletPopup = useSelector(
    (state: RootState) => state.authentication.isWalletFormVisible,
  )

  const showPlayerDashboardPopup = useSelector(
    (state: RootState) => state.authentication.isPlayerDashboardFormVisible,
  )

  const handleClose = () => {
    if (isMobile()) {
      navigate('/')
    } else {
      if (showSignupPopup) {
        dispatch(showSignupForm())
      } else if (showWalletPopup) {
        dispatch(showWalletForm())
      } else if (showPlayerDashboardPopup) {
        dispatch(showPlayerDashboardForm())
      }
    }
  }

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
    const locationUrl = window.location.href
    const urlPlayer = locationUrl.split('/')
    document.querySelector('title')!.innerText =
      urlPlayer[urlPlayer.length - 1] + ' Player Coin'
    document
      .querySelector("meta[name='description']")!
      .setAttribute(
        'content',
        'Exclusive access with Player Coin to digital assets of Player Name',
      )
  }, [])

  useEffect(() => {
    if (showSignupPopup || showWalletPopup || showPlayerDashboardPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [showSignupPopup, showWalletPopup, showPlayerDashboardPopup])

  return (
    <AppLayout headerStatus="header-status" headerClass="home">
      {showSignupPopup && (
        <DialogBox isOpen={showSignupPopup} onClose={handleClose}>
          <OnboardingForm onSubmit={handleSubmit} onClose={handleClose} />
        </DialogBox>
      )}
      {showWalletPopup && (
        <DialogBox isOpen={showWalletPopup} onClose={handleClose}>
          <WalletForm />
        </DialogBox>
      )}
      {showPlayerDashboardPopup && (
        <DialogBox isOpen={showPlayerDashboardPopup} onClose={handleClose}>
          <PlayerDashboardForm />
        </DialogBox>
      )}
      <PlayerForm />
    </AppLayout>
  )
}

export default Player
