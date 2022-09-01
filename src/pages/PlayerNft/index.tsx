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
  setCurTab,
} from '@root/apis/onboarding/authenticationSlice'
import DialogBox from '@components/DialogBox'
import OnboardingForm from '@pages/Onboarding/OnboardingForm'
import WalletForm from '@pages/Wallet/WalletForm'
import PlayerDashboardForm from '@pages/PlayerDashboard/PlayerDashboardForm'
import NftForm from './NftForm'
import NftDetail from './NftDetail'
import TabGroup from '@components/TabGroup'
import '@assets/css/pages/PlayerNft.css'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const PlayerNft: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('nft’s')

  let oldScrollY = 0
  const controlDirection = () => {
    if (oldScrollY > 0) {
      if (window.scrollY > oldScrollY && !toggle) {
        console.log(window.scrollY, oldScrollY)
        oldScrollY = window.scrollY
        setToggle(true)
        oldScrollY = 0
      }
    }
    oldScrollY = window.scrollY
  }
  const wheel = (e: any) => {
    console.log(e.deltaY)
    if (!isMobile() && e.deltaY < 0 && toggle) {
      oldScrollY = 0
      setToggle(false)
    } else if (!isMobile() && e.deltaY > 0 && !toggle) {
      oldScrollY = 0
      setToggle(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlDirection)
    TagManager.initialize(tagManagerArgs)
    document.querySelector('title')!.innerText = 'Nft of meCarreira'
    window.scrollTo(0, 0)
    return () => {
      window.removeEventListener('scroll', controlDirection)
    }
  }, [])

  const handleGetTab = (tab: string) => {
    setActiveTab(tab)
    dispatch(setCurTab({ curTab: tab }))
    const fullUrl = window.location.href
    const url = fullUrl.split('/')
    navigate(`/${url[3]}/${url[4]}`)
  }

  const handleSubmit = async () => {
    handleClose()
  }
  const [toggle, setToggle] = useState(false)

  const showSignupPopup = useSelector(
    (state: RootState) => state.authentication.isSignupFormVisible,
  )

  const showWalletPopup = useSelector(
    (state: RootState) => state.authentication.isWalletFormVisible,
  )

  const showPlayerDashboardPopup = useSelector(
    (state: RootState) => state.authentication.isPlayerDashboardFormVisible,
  )

  const handleToggle = () => {
    setToggle(toggle => !toggle)
  }
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
      <div onWheel={e => wheel(e)}>
        <div className="tab-bar-container"></div>
        <NftForm onClick={handleToggle} />
        <NftDetail onClick={handleToggle} />
      </div>
    </AppLayout>
  )
}

export default PlayerNft
