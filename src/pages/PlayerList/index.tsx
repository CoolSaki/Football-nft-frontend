/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { AppLayout } from '@components/index'
import PlayerListForm from './PlayerListForm'
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
  // const playerCoinData = useSelector((state: RootState) => state.playercoins)
  // const {isLoading} = playerCoinData
  // useEffect(() => {
  //   console.log('jnmo---', playerCoinData)
  // }, [playerCoinData])

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
    if (showSignupPopup || showWalletPopup || showPlayerDashboardPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [showSignupPopup, showWalletPopup, showPlayerDashboardPopup])

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
    document.querySelector('title')!.innerText = 'All Player Coins'
    document
      .querySelector("meta[name='description']")!
      .setAttribute(
        'content',
        'Search your preferred Player Coin and start your Metaverse journey',
      )
  }, [])

  return (
    <AppLayout headerClass="home">
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
      <PlayerListForm />
    </AppLayout>
  )
}

export default Player
