/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'

import { AppLayout } from '@components/index'
import AboutContent from './AboutContent'
import DialogBox from '@components/DialogBox'
import OnboardingForm from '@pages/Onboarding/OnboardingForm'
import { RootState } from '@root/store/rootReducers'
import { useDispatch, useSelector } from 'react-redux'
import {
  showPlayerDashboardForm,
  showSignupForm,
  showWalletForm,
  loadNft,
  setActiveTab,
} from '@root/apis/onboarding/authenticationSlice'
import { isMobile } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'
import WalletForm from '@pages/Wallet/WalletForm'
import NewLaunchesNFT from './NewLaunchesNFT'
import LatestCreateNFT from './LatestCreateNFT'
import Intro from './Intro'
import Bottom from './Bottom'
import '@assets/css/pages/Landing.css'
import PlayerDashboardForm from '@pages/PlayerDashboard/PlayerDashboardForm'
import {
  getAllPlayers,
  resetPlayerData,
} from '@root/apis/playerCoins/playerCoinsSlice'
import Tutorials from './Tutorials'
import NewsLetter from './NewsLetter'
import HeaderTicker from './HeaderTicker'

const About: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthorized = useSelector(
    (state: RootState) => state.authentication.isAccessToken,
  )
  const [loggedInId, setLoggedInId] = useState('')
  const loginId = localStorage.getItem('accessToken')

  const handleSubmit = async () => {
    handleClose()
    const loginId = await localStorage.getItem('loginId')
    if (loginId) {
      setLoggedInId(loginId)
    }
  }

  // useEffect(() => {
  //   dispatch(getAllPlayers)
  // }, [])

  const nftVisible = useSelector(
    (state: RootState) => state.authentication.nftVisible,
  )

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
        dispatch(setActiveTab('login'))
      } else if (showWalletPopup) {
        dispatch(showWalletForm())
      } else if (showPlayerDashboardPopup) {
        dispatch(resetPlayerData())
        dispatch(showPlayerDashboardForm())
      }
    }
  }

  useEffect(() => {
    document.querySelector('title')!.innerText =
      'Home of the Football Metaverse'
    document
      .querySelector("meta[name='description']")!
      .setAttribute(
        'content',
        'Buy player coins and get special access, great features and unique opportunities!',
      )
    dispatch(loadNft())
  }, [])

  useEffect(() => {
    if (showSignupPopup || showWalletPopup || showPlayerDashboardPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [showSignupPopup, showWalletPopup, showPlayerDashboardPopup])

  // location.reload()

  return (
    <AppLayout className="home">
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
      {showPlayerDashboardPopup ? (
        <DialogBox isOpen={showPlayerDashboardPopup} onClose={handleClose}>
          <PlayerDashboardForm />
        </DialogBox>
      ) : null}
      <section className="header-ticker-section">
        <HeaderTicker />
      </section>
      <section className="new-launches-nft">
        <NewLaunchesNFT />
      </section>
      {nftVisible ? (
        <section className="latest-create-nft">
          <LatestCreateNFT />
        </section>
      ) : (
        ''
      )}
      <section id="#" className="intro-section">
        <Intro />
      </section>
      <section className="about-section">
        <AboutContent />
      </section>
      <section className="tutorials-section">
        <Tutorials />
      </section>
      <section className="news-letter">
        <NewsLetter />
      </section>
      <section className="bottom-section">
        <Bottom />
      </section>
    </AppLayout>
  )
}

export default About
