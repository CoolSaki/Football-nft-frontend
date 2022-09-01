/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { AppLayout } from '@components/index'
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
import TabGroup from '@components/TabGroup'
import SearchBar from '@components/SearchBar'
import NewBid from './NewBid'
import WinNft from './WinNft'
import All from './All'
import '@assets/css/pages/NftList.css'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const NftBid: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('new bids')

  const handleGetTab = (tab: string) => {
    setActiveTab(tab)
  }

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

  const handleSearch = (value: string | undefined) => {
    console.log('searchKeys---', value)
  }

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
    document.querySelector('title')!.innerText = 'Exclusive Player Coin NFTs'
    document
      .querySelector("meta[name='description']")!
      .setAttribute(
        'content',
        'Find your NFT amonst all NFTs that are only available through Player Coins',
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
      <section className="nft-list-container">
        <div className="tab-bar-container">
          <TabGroup
            defaultTab={activeTab}
            tabSet={['new bids', 'win nft’s', 'all']}
            getSwitchedTab={handleGetTab}
          />
        </div>
        <div className="search-bar-container">
          <SearchBar onEdit={handleSearch} onClose={() => console.log('')} />
        </div>
        {activeTab === 'new bids' && <NewBid />}
        {activeTab === 'win nft’s' && <WinNft />}
        {activeTab === 'all' && <All />}
      </section>
    </AppLayout>
  )
}

export default NftBid
