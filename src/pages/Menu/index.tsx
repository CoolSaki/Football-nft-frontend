import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import { ConnectContext } from '@root/WalletConnectProvider'
import { AppLayout } from '@components/index'
import MenuItem from '@components/Page/Navigation/MenuItem'
import SocialGroup from '@components/Page/Navigation/SocialGroup'
import ContactUs from '@components/Page/Navigation/ContactUs'
import { MenuItems } from '@root/constants'
import DialogBox from '@components/DialogBox'
import OnboardingForm from '@pages/Onboarding/OnboardingForm'
import {
  loginWithWallet,
  logout,
  resetSentEmailVerification,
  resetWallet,
  showSignupForm,
  signout,
} from '@root/apis/onboarding/authenticationSlice'
import { asyncLocalStorage, isMobile } from '@utils/helpers'
import { RootState } from '@root/store/rootReducers'
import { useNavigate } from 'react-router'
import '@assets/css/layout/Menu.css'
import { resetPlayerData } from '@root/apis/playerCoins/playerCoinsSlice'
import WalletModal from '@components/WalletModal'
import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const Menu: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [optionsMenu, setOptionsMenu] = useState(MenuItems)
  const [loggedInId, setLoggedInId] = useState('')
  const dispatch = useDispatch()
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const showSignupPopup = useSelector(
    (state: RootState) => state.authentication.isSignupFormVisible,
  )

  console.log({ authenticationData })
  const { connectStatus, connect, disconnect } = useContext(ConnectContext)

  const loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')

  useEffect(() => {
    if ((!loginInfo && !loginId) || (loginInfo && !loginId)) {
      const menuTemp = MenuItems.filter(
        item => !['change password'].includes(item.title),
      )
      setOptionsMenu(menuTemp)
    }
    window.history.replaceState(null, 'Buy', '/')
  }, [loginInfo, loginId])

  const handleClose = () => {
    dispatch(showSignupForm())
    dispatch(resetSentEmailVerification())
  }

  const handleSubmit = async (val?: boolean) => {
    dispatch(showSignupForm())
    const loginId = await localStorage.getItem('loginId')
    if (loginId) {
      setLoggedInId(loginId)
      navigate('/')
    }
  }

  const handleShowLogin = () => {
    if (isMobile()) {
      navigate('/signup')
    } else {
      dispatch(showSignupForm())
    }
  }

  const handleLogout = async () => {
    asyncLocalStorage.getItem('refreshToken').then(token => {
      const reqParams = {
        refresh_token: token,
      }
      dispatch(resetPlayerData())
      dispatch(resetWallet())
      dispatch(logout(reqParams))
      setTimeout(() => {
        navigate('/')
      }, 1000)
    })
  }

  const handleConnect = () => {
    setWalletConnected(!walletConnected) //just for redraw
  }

  const handleDisconnect = async () => {
    disconnect()
    dispatch(signout())
    navigate('/')
  }

  return (
    <AppLayout className="menu" footerStatus="footer-status">
      <DialogBox
        isOpen={showSignupPopup}
        onClose={handleClose}
        closeBtnClass="close-menu-login"
      >
        <OnboardingForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          isOnMenu={true}
        />
      </DialogBox>
      <WalletModal
        isOpen={showWalletModal}
        onClick={handleConnect}
        onClose={() => setShowWalletModal(false)}
      />
      {connectStatus || Boolean(loginInfo) ? (
        <div
          className={`button-box ${
            Boolean(loginInfo) ? 'grey-color grey-border-color' : ''
          }`}
          onClick={handleDisconnect}
        >
          {t('sign out')}
        </div>
      ) : (
        <div
          className={classnames(
            'button-box',
            authenticationData.userName ? 'hidden' : '',
          )}
          onClick={() => setShowWalletModal(true)}
        >
          {t('connect wallet')}
        </div>
      )}
      {loginId || authenticationData.userName ? (
        <div className="button-box" onClick={handleLogout}>
          {t('log out')}
        </div>
      ) : (
        !Boolean(loginInfo) && (
          <div className="button-box" onClick={handleShowLogin}>
            {t('sign up / sign in')}
          </div>
        )
      )}
      <div className="menu-items">
        {optionsMenu.map((item, index) => (
          <MenuItem item={item} key={index} index={index} isMenu={true} />
        ))}
      </div>
      <div className="bottom-line"></div>
      <ContactUs />
      <div className="bottom-line"></div>
      <SocialGroup />
    </AppLayout>
  )
}

export default Menu
