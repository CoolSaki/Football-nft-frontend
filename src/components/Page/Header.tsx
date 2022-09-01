import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'

import { AddressFormat } from '@root/utils/AddressFormat'
import SearchInput from '@components/Form/SearchInput'
import { AppLogo, Container } from '..'
import { RootState } from '@root/store/rootReducers'
import Logo from '@assets/images/logo-min.png'
import { isMobile } from '@utils/helpers'
import '@assets/css/layout/Header.css'
import { useWeb3React } from '@web3-react/core'
import DialogBox from '@components/DialogBox'
import { getNotification } from '@root/apis/onboarding/authenticationSlice'
import NewsLetter from '@pages/Landing/NewsLetter'

interface Props {
  className?: string
  navigationStatus: boolean
  headerClassName?: string
}

const Header: React.FC<Props> = ({
  className,
  navigationStatus,
  headerClassName,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [isSearchEnabled, setSearchEnabled] = useState(false)
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { isLoggedOut } = authenticationData

  const { account } = useWeb3React()

  const handleGoBack = () => {
    if (pathname === '/all-players' || pathname === '/nfts') {
      navigate('/')
    } else {
      navigate(-1)
    }
  }

  let loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')

  if (
    localStorage.getItem('wallet') === 'Trust' ||
    localStorage.getItem('wallet') === 'WalletConnect'
  ) {
    if (account) {
      localStorage.setItem('loginInfo', account ?? '')
      console.log('trust wallet address', localStorage.getItem('loginInfo'))
    }
  }

  // if (!loginInfo && !loginId) {
  //   localStorage.removeItem('accessToken')
  // }

  if (loginInfo !== null) {
    loginInfo = AddressFormat(loginInfo, 10)
  }
  // if (loginId !== null) {
  //   loginId = AddressFormat(loginId, 10)
  // }
  const handleClose = () => {
    setSearchEnabled(false)
  }

  const handleSearch = () => {
    setSearchEnabled(true)
  }

  const openSettings = () => {
    navigate('/notifications_settings')
  }

  return (
    <header>
      <Container>
        {pathname === '/' || pathname === '/staking' ? (
          <div
            className={classnames(
              'header',
              // navigationStatus ? '' : 'navigation-status',
              headerClassName,
            )}
          >
            <Link to="/notifications" style={{ pointerEvents: 'none' }}>
              <NotificationsOutlinedIcon className="icon-color main-menu-btn" />
            </Link>
            <ArrowBackIcon className="sub-menu-btn" />
            {loginInfo || loginId ? (
              <div className="wallet-address">
                {loginId ? (
                  <h6 className="header-title">{loginId}</h6>
                ) : (
                  <h6 className="header-title">
                    {t('wallet')} ({loginInfo})
                  </h6>
                )}
              </div>
            ) : (
              <AppLogo className={classnames(className)} />
            )}
            <Link to="/menu">
              <DehazeOutlinedIcon className="icon-color main-menu-btn" />
            </Link>
          </div>
        ) : pathname === '/notifications' ? (
          <div
            className={classnames(
              'header',
              authenticationData.userName || loginId ? 'user-header' : '',
            )}
          >
            <ArrowBackIcon
              className="icon-color"
              onClick={() => handleGoBack()}
            />
            {Boolean(loginInfo) || Boolean(loginId) ? (
              <div className="wallet-address">
                <h6 className="header-title">
                  {t('wallet')} ({loginInfo || loginId})
                </h6>
              </div>
            ) : (
              <Link to="/">
                <img loading="lazy" src={Logo} alt="" className="logo-img" />
              </Link>
            )}
            <SettingsIcon
              className="icon-color"
              onClick={() => openSettings()}
            />
          </div>
        ) : pathname === '/language' || pathname === '/menu' ? (
          <div className="header menu-language-background">
            <a onClick={handleGoBack}>
              <ArrowBackIcon className="icon-color" />
            </a>
            {!isSearchEnabled &&
              ((Boolean(loginInfo) || Boolean(loginId)) && !isLoggedOut ? (
                <div className="wallet-address">
                  {loginInfo ? (
                    <h6 className="header-title">
                      {t('wallet')} ({loginInfo})
                    </h6>
                  ) : (
                    <h6 className="header-title">{loginId}</h6>
                  )}
                </div>
              ) : (
                <div className={classnames('logo', className)}>
                  <Link to="/">
                    <img
                      loading="lazy"
                      src={Logo}
                      alt=""
                      className="logo-img"
                    />
                  </Link>
                </div>
              ))}
            {!isSearchEnabled &&
              (pathname !== '/menu' ? (
                <Link to="/menu">
                  <DehazeOutlinedIcon className="icon-color main-menu-btn" />
                </Link>
              ) : (
                <CloseIcon className="icon-color" onClick={handleGoBack} />
              ))}
          </div>
        ) : (
          <div className="header">
            <a onClick={handleGoBack}>
              <ArrowBackIcon className="icon-color" />
            </a>
            {Boolean(loginInfo) || Boolean(loginId) ? (
              <div className="wallet-address">
                {loginInfo ? (
                  <h6 className="header-title">
                    {t('wallet')} ({loginInfo})
                  </h6>
                ) : (
                  <h6 className="header-title">{loginId}</h6>
                )}
              </div>
            ) : (
              <div className={classnames('logo', className)}>
                <Link to="/">
                  <img loading="lazy" src={Logo} alt="" className="logo-img" />
                </Link>
              </div>
            )}
            <Link to="/menu">
              <DehazeOutlinedIcon className="icon-color main-menu-btn" />
            </Link>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
