/* eslint-disable prettier/prettier */
import PlayerInfo from './PlayerInfo'
import { DemoPlayers,  PLAYER_STATUS } from '@root/constants'
import { isMobile } from '@utils/helpers'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NewNFTs from './NewNFTs'
import VotingPolls from './VotingPolls'
import Giveaways from './Giveaways'
import InstagramFeed from './InstagramFeed'
import { useEffect, useState } from 'react'
import PlayerChart from './PlayerChart'
import { RootState } from '@root/store/rootReducers'
import DialogBox from '@components/DialogBox'
import SellNftForm from '@pages/PurchaseNft/SellNft/SellNftForm'
import BuyNftForm from '@pages/PurchaseNft/BuyNft/BuyNftForm'
import {
  setPurchaseMode,
  setPurchaseShow,
} from '@root/apis/purchase/purchaseSlice'
import TabGroup from '@components/TabGroup'
import {
  getPlayerDetails,
  resetPlayerDetails,
} from '@root/apis/playerCoins/playerCoinsSlice'
import classNames from 'classnames'
import { fetchPlayersStats } from '@root/apis/playerStats/playerStatsSlice'
import NftCard from '@components/Card/NftCard'
import { profile } from 'console'
import { resetSentEmailVerification, showSignupForm } from '@root/apis/onboarding/authenticationSlice'
import OnboardingForm from '@pages/Onboarding/OnboardingForm'

let playerProfileInterval: any = null
let customItems: JSX.Element[] = []


const Profile = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location: any = useLocation()
  const dispatch = useDispatch()
  const [chartView, setChartView] = useState(false)
  const [disabledPlayer, setDisabledPlayer] = useState(true)
  const [profileData, setProfileData] = useState(null)
  const purchaseData = useSelector((state: RootState) => state.purchases)
  const loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')

  const showSignupPopup = useSelector(
    (state: RootState) => state.authentication.isSignupFormVisible,
  )

  const handleClose = () => {
    dispatch(showSignupForm())
    dispatch(resetSentEmailVerification())
  }

  const handleSubmit = async (val?: boolean) => {
    dispatch(showSignupForm())
    const loginId = await localStorage.getItem('loginId')
    if (loginId) {
      navigate('/')
    }
  }

  const handlePurchaseOpen = (value: string) => {
    if (!loginInfo && !loginId) {
      if (isMobile()) {
        navigate('/signup')
      } else {
        dispatch(showSignupForm())
      }
      return
    }
    dispatch(setPurchaseMode(value.toUpperCase()))
    if (isMobile()) {
      navigate('/' + value.toLowerCase() + '-nft', { state: { profileData } })
    } else {
      dispatch(setPurchaseShow(true))
    }
  }

  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const {
    getPlayerDetailsSuccessData,
    getPlayerDetailsErrorMsg,
  } = playerCoinData

  const playerStatsData = useSelector((state: RootState) => state.playerstats)
  const { fetchPlayerStatsData } = playerStatsData

  const handlePurchaseClose = () => {
    dispatch(setPurchaseMode(''))
    dispatch(setPurchaseShow(false))
  }

  useEffect(() => {
    if (purchaseData?.showPurchaseForm) {
      document.body.style.overflow = 'hidden'
      document.body.style.marginRight = '15px'
      document.body.getElementsByClassName('modal-content')[0].className =
        'modal-content modal-position-adjust'
      clearInterval(playerProfileInterval)
    } else {
      document.body.style.overflow = ''
      document.body.style.marginRight = '0px'
      if (getPlayerDetailsSuccessData?.playerstatusid?.id >=4) {
        playerProfileInterval = setInterval(() => {
          handleGetPriceStats([getPlayerDetailsSuccessData.id])
        }, 5000)
      }
    }
  }, [purchaseData?.showPurchaseForm])

  const createTestPlayers = () => {
    const playerProfileData = {
      ...getPlayerDetailsSuccessData,
      ...fetchPlayerStatsData[0],
    }
    console.log({ playerProfileData })
    if (Object.keys(playerProfileData).length > 0) {
      setProfileData(playerProfileData)
    }
  }

  const handleGetPriceStats = (playersData: any) => {
    dispatch(fetchPlayersStats(playersData))
  }

  useEffect(() => {
    if (
      getPlayerDetailsSuccessData &&
      getPlayerDetailsSuccessData.name &&
      getPlayerDetailsSuccessData.playerstatusid.id === PLAYER_STATUS.ISSUED
    ) {
      setDisabledPlayer(false)
      handleGetPriceStats([getPlayerDetailsSuccessData.id])
      clearInterval(playerProfileInterval)
      if (getPlayerDetailsSuccessData?.playerstatusid?.id >=4) {
        playerProfileInterval = setInterval(() => {
          handleGetPriceStats([getPlayerDetailsSuccessData.id])
        }, 5000)
      } 
      getCustomCardData()
    } else {
      console.log('no_getPlayerDetailsSuccessData')
      createTestPlayers()
    }
    console.log({ getPlayerDetailsSuccessData })
  }, [getPlayerDetailsSuccessData])

  useEffect(() => {
    console.log({ fetchPlayerStatsData })
    if (fetchPlayerStatsData.length > 0) {
      createTestPlayers()
    }
  }, [fetchPlayerStatsData])

  useEffect(() => {
    const locationUrl = window.location.href
    const urlPlayer = locationUrl.split('/')
    if (urlPlayer[urlPlayer.length - 1]) {
      dispatch(getPlayerDetails(urlPlayer[urlPlayer.length - 1]))
    }
    return () => {
      console.log('unmounted-profile')
      dispatch(resetPlayerDetails())
      clearInterval(playerProfileInterval)
    }
  }, [])

  const getCustomCardData = () => {
    if ([3, 4].includes(getPlayerDetailsSuccessData?.id)) {
      const index = DemoPlayers.findIndex(
        player => player.id === getPlayerDetailsSuccessData?.id,
      )
      customItems = []
      DemoPlayers[index].nfts.map((item: any, index: number) => {
        customItems.push(
          <NftCard
            nft={item}
            isNavigate={true}
            isBidEnabled={!item.isWin}
            key={index}
            isWin={item.isWin}
          />,
        )
      })
      return customItems
    }
  }

  return (
    <section className="fullwidth">
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
      {purchaseData?.showPurchaseForm ? (
        <DialogBox
          isOpen={purchaseData?.purchaseAction}
          onClose={() => handlePurchaseClose()}
          contentClass=""
          closeBtnClass="close-purchase"
        >
          <TabGroup
            defaultTab={purchaseData?.purchaseAction}
            tabSet={[t('buy').toUpperCase(), t('sell').toUpperCase()]}
            getSwitchedTab={handlePurchaseOpen}
          />
          {purchaseData?.purchaseAction === 'SELL' ? (
            <SellNftForm playerData={profileData} onClosePopup={handlePurchaseClose} />
          ) : (
            <BuyNftForm playerData={profileData} onClosePopup={handlePurchaseClose} />
          )}
        </DialogBox>
      ) : null}
      {chartView ? (
        <PlayerChart onCardView={() => setChartView(false)} profileData={profileData} />
      ) : profileData ? (
        <PlayerInfo
          isPlayerNotLaunched = {getPlayerDetailsSuccessData?.playerstatusid?.id < 4 }
          card={profileData}
          disabledPlayer={disabledPlayer}
          onBuy={() => handlePurchaseOpen('buy')}
          onStake={() => handlePurchaseOpen('stake')}
          onSell={() => handlePurchaseOpen('sell')}
          onChartView={() => setChartView(true)}
        />
      ) : (
        <div className="new-nft-loading">
          <div className="spinner__circle">
            <div className="spinner__circle-gradient"></div>
            <div className="spinner__circle-inner"></div>
          </div>
          <div
            className={classNames(
              'input-feedback text-center otp-error mt-20',
              !getPlayerDetailsErrorMsg ? 'hidden' : '',
            )}
          >
            {getPlayerDetailsErrorMsg}
          </div>
        </div>
      )}
      {[3, 4].includes(getPlayerDetailsSuccessData?.id) ? (
        <NewNFTs items={customItems} />
      ) : null}
      {disabledPlayer && (
        <div className="fullwidth not-launched-section">
          <div className="alert-wrapper">
            <div className="heading-title unverified-alert">
              {t('player_not_verified')}
            </div>
          </div>
        </div>
      )}
      {!disabledPlayer && <VotingPolls />}
      {!disabledPlayer && <Giveaways playerStatusId={getPlayerDetailsSuccessData?.playerstatusid?.id} />}
      {/* {!disabledPlayer && <InstagramFeed />} */}
    </section>
  )
}

export default Profile
