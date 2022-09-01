import React, { useEffect, useState, useContext } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { ConnectContext } from '@root/WalletConnectProvider'
import Home from '@assets/icons/icon/home.png'
import SigninIcon from '@assets/icons/icon/signin.svg'
import Players from '@assets/icons/icon/players.svg'
import NFT from '@assets/icons/icon/nft.svg'
import SigninInActive from '@assets/icons/icon/wallet.svg'
import NFTsActive from '@assets/icons/icon/nftsActive.svg'
import { RootState } from '@root/store/rootReducers'
import FooterNav from './FooterNav'
import { useNavigate } from 'react-router-dom'
import { isMobile } from '@utils/helpers'
import {
  showPlayerDashboardForm,
  showSignupForm,
  showWalletForm,
} from '@root/apis/onboarding/authenticationSlice'
import '@assets/css/layout/Footer.css'
import MyCoin from '@assets/icons/icon/my_coin.svg'
import { Link } from 'react-router-dom'
import { getPlayerData } from '@root/apis/playerCoins/playerCoinsSlice'

interface Props {
  className?: string
  navigationStatus: boolean
}

const Footer: React.FC<Props> = ({ className, navigationStatus }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [playerStyle, setPlayerStyle] = useState('')
  const [nftsStyle, setNftsStyle] = useState('')
  // const [signinStyle, setSigninStyle] = useState('footer-active-signin')
  const [signinStyle, setSigninStyle] = useState('')
  const [PlayersImg, setPlayersImg] = useState(Players)
  const [NFTsImg, setNFTsImg] = useState(NFT)
  const [SigninIconImg, setSigninIconImg] = useState(SigninIcon)
  const [SignText, setSignText] = useState('sign in')
  const loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')
  const [myCoinStyle, setMyCoinStyle] = useState('')
  const [MyCoinImg, setMyCoinImg] = useState(MyCoin)
  const [showMyCoin, setShowMyCoin] = useState(false)
  const [walletLogined, setWalletLogined] = useState(false)

  const { connect } = useContext(ConnectContext)
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { isLoggedOut, stateAccessToken } = authenticationData

  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const { allPlayersData } = playerCoinData
  const authToken = localStorage.getItem('accessToken')
  const location = useLocation()

  // useEffect(() => {
  //   if (authToken) {
  //     dispatch(getPlayerData())
  //   }
  // }, [])

  useEffect(() => {
    if (allPlayersData.length > 0) {
      setShowMyCoin(true)
    }
  }, [allPlayersData])

  useEffect(() => {
    if (authToken) {
      dispatch(getPlayerData())
    }
    if (loginInfo !== null || loginId !== null) {
      setSigninStyle('footer-inactive-signin')
      setSigninIconImg(SigninInActive)
      setSignText('wallet')
      setWalletLogined(true)
    } else {
      setSigninStyle('footer-active-signin')
    }
    if (loginId) {
      setSigninStyle('footer-inactive-signin')
    }

    if (!loginInfo && isLoggedOut) {
      setShowMyCoin(false)
    }

    if (!loginInfo && !loginId) {
      setSignText('sign in')
      setShowMyCoin(false)
      setWalletLogined(false)
      setSigninIconImg(SigninIcon)
    } else {
      setShowMyCoin(true)
    }
  }, [loginInfo, loginId, isLoggedOut, stateAccessToken])

  useEffect(() => {
    if (authenticationData.userName) {
      setSignText('wallet')
      setWalletLogined(true)
      setSigninIconImg(SigninInActive)
    } else {
      if (!loginInfo) {
        console.log('**no user found**')
        setSignText('sign in')
        setWalletLogined(false)
        setSigninIconImg(SigninIcon)
      }
    }
  }, [authenticationData])

  const onClickPlayer = () => {
    if (location.pathname !== '/all-players') {
      navigate('/all-players')
    }
  }

  const onClickMyCoin = () => {
    // if (isMobile()) {
    //   navigate('/player-dashboard')
    // } else {
    //   dispatch(showPlayerDashboardForm())
    // }
    navigate('/player-dashboard')
  }

  const onClickNFTs = () => {
    setNFTsImg(NFT)
    if (location.pathname !== '/nfts') {
      navigate('/nfts')
    }
  }

  const onClickSignin = () => {
    if (!loginId && walletLogined === false) {
      // setPlayerStyle('')
      // setNftsStyle('')
      // setSigninStyle('footer-active-signin')
      // setPlayersImg(Players)
      // setNFTsImg(NFT)
      // setSigninIconImg(SigninIcon)
      // connect()
      // setSignText('wallet')
      if (isMobile()) {
        navigate('/signup')
      } else {
        dispatch(showSignupForm())
      }
    } else {
      if (isMobile()) {
        navigate('/wallet')
      } else {
        dispatch(showWalletForm())
      }
    }
  }

  return (
    <footer
      className={classnames(
        'footer',
        className,
        navigationStatus ? '' : 'navigation-status',
      )}
    >
      <div className="footer-wrapper">
        <div className="home-icon">
          <Link to="/">
            <img loading="lazy" src={Home} alt="" className="home-img" />
          </Link>
        </div>
        <div className="footer-nav">
          <FooterNav
            onClickPlayer={onClickPlayer}
            onClickMyCoin={onClickMyCoin}
            onClickNFTs={onClickNFTs}
            onClickSignin={onClickSignin}
            playerStyle={playerStyle}
            nftsStyle={nftsStyle}
            signinStyle={signinStyle}
            PlayersImg={PlayersImg}
            NFTsImg={NFTsImg}
            SigninIconImg={SigninIconImg}
            SignText={t(SignText)}
            myCoinStyle={myCoinStyle}
            MyCoinImg={MyCoinImg}
            showMyCoin={showMyCoin}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
