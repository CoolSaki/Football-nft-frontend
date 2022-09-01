import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Card from '@components/Card/PlayerCard'
import ComingSoon from '@components/Card/ComingSoon'
import DialogBox from '@components/DialogBox'
import SellNftForm from '@pages/PurchaseNft/SellNft/SellNftForm'
import BuyNftForm from '@pages/PurchaseNft/BuyNft/BuyNftForm'
import { RootState } from '@root/store/rootReducers'
import {
  setActiveTab,
  showSignupForm,
} from '@root/apis/onboarding/authenticationSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import { isMobile } from '@utils/helpers'
import { ConnectContext } from '@root/WalletConnectProvider'
import TabGroup from '@components/TabGroup'
import {
  setPurchaseMode,
  setPurchaseShow,
} from '@root/apis/purchase/purchaseSlice'
import {
  fetchAllPlayers,
  // fetchPlayersStats,
} from '@root/apis/playerCoins/playerCoinsSlice'
import PaginationCarousel from '@components/PaginationCarousel'
import { fetchPlayersStats } from '@root/apis/playerStats/playerStatsSlice'
import { DummyCardData, PLAYER_STATUS } from '@root/constants'

interface PlayerOffset {
  start: number
  end: number
}

let playerStatsInterval: any = null

const NewLaunchesNFT: React.FC = () => {
  const items: JSX.Element[] = []
  const purchaseData = useSelector((state: RootState) => state.purchases)
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.authentication.userName,
  )
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const playerStatsData = useSelector((state: RootState) => state.playerstats)

  const { playersTableData } = playerCoinData

  const { fetchPlayerStatsData } = playerStatsData

  const [showPopupForm, setShowPopupForm] = useState(false)
  const [loggedInId, setLoggedInId] = useState('')
  const [isCarouselLoading, setIsCarouselLoading] = useState(false)
  const [allPlayers, setAllPlayers] = useState<any>([])
  const [playerData, setPlayerData] = useState([])
  // const [startOffset, setStartOffset] = useState(0)
  // const [endOffset, setEndOffset] = useState(4)
  const [playerOffset, setPlayerOffset] = useState({ start: 0, end: 4 })
  const [isLoaded, setIsLoaded] = useState(true)
  const [itemIndex, setItemIndex] = useState(0)

  const { connectStatus } = useContext(ConnectContext)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const prevCountRef = useRef<any>()
  const location: any = useLocation()
  const loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')

  allPlayers.map((item: any, index: any) => {
    items.push(
      <Card
        card={item}
        key={index + 2}
        onBuy={() => handlePurchaseOpen('buy', item)}
        onSell={() => handlePurchaseOpen('sell', item)}
      />,
    )
    if (index === 1) {
      items.push(<ComingSoon card={DummyCardData} key={0} />)
      // items.push(<ComingSoon card={DummyCardData} key={1} />)
    }
  })
  if (items.length < 2) {
    items.push(<ComingSoon card={DummyCardData} key={0} />)
    // items.push(<ComingSoon card={DummyCardData} key={1} />)
  }

  const handleSubmit = async (val?: boolean) => {
    setShowPopupForm(false)
    const loginId = await localStorage.getItem('loginId')
    if (loginId) {
      setLoggedInId(loginId)
    }
  }

  const handleGetPriceStats = (playersData: any, offset: PlayerOffset) => {
    if (isCarouselLoading) {
      setIsCarouselLoading(false)
    }
    const playersSet: number[] = playersData
      .slice(offset.start, offset.end)
      .filter((player: { playerstatusid: { id: number } }) => {
        return player.playerstatusid.id === PLAYER_STATUS.ISSUED
      })
      .map((item: any) => item.id)
    if (playersSet.length > 0) {
      dispatch(fetchPlayersStats(playersSet))
    }
  }

  const fetchSignupForm = () => {
    dispatch(setActiveTab('register'))
    if (isMobile()) {
      navigate('/signup')
    } else {
      dispatch(showSignupForm())
    }
  }

  const handlePurchaseOpen = (value: string, data?: any) => {
    if (!loginInfo && !loginId) {
      if (isMobile()) {
        navigate('/signup')
      } else {
        dispatch(showSignupForm())
      }
      return
    }
    dispatch(setPurchaseMode(value.toUpperCase()))
    if (data) {
      setPlayerData(data)
    }
    if (isMobile()) {
      navigate('/' + value.toLowerCase() + '-nft', {
        state: { profileData: location?.state?.profileData || data },
      })
    } else {
      dispatch(setPurchaseShow(true))
    }
  }

  const handlePurchaseClose = () => {
    dispatch(setPurchaseMode(''))
    dispatch(setPurchaseShow(false))
  }

  const createTestPlayers = () => {
    const playersTableDataTemp = [...playersTableData]
    for (let i = 0; i < fetchPlayerStatsData.length; i++) {
      for (let j = 0; j < playersTableDataTemp.length; j++) {
        if (
          playersTableDataTemp[j].id.toString() ===
          fetchPlayerStatsData[i].id.toString()
        ) {
          playersTableDataTemp[j] = {
            ...playersTableDataTemp[j],
            ...fetchPlayerStatsData[i],
          }
        }
      }
    }
    setAllPlayers(playersTableDataTemp)
    clearInterval(playerStatsInterval)
    playerStatsInterval = setInterval(() => {
      handleGetPriceStats(playersTableDataTemp, playerOffset)
    }, 5000)
  }

  useEffect(() => {
    const newPlayers: any = []
    const playersTableDataTemp = [...playersTableData]
    for (let i = 0; i < fetchPlayerStatsData.length; i++) {
      for (let j = 0; j < playersTableDataTemp.length; j++) {
        if (
          playersTableDataTemp[j].id.toString() ===
          fetchPlayerStatsData[i].id.toString()
        ) {
          playersTableDataTemp[j] = {
            ...playersTableDataTemp[j],
            ...fetchPlayerStatsData[i],
          }
        }
      }
    }
    setAllPlayers(playersTableDataTemp)
  }, [fetchPlayerStatsData])

  // const myFunction = () => {
  //   console.log('MYFUNCRUn', allPlayers)
  //   console.log('MYFUNCRUn2', prevAllPlayersRef.current)
  //   allPlayers.map((item: any, index: any) => {
  //     console.log('kkoo--', allPlayers)
  //     return items.push(
  //       <Card
  //         card={item}
  //         key={index}
  //         onBuy={() => handlePurchaseOpen('buy', item)}
  //         onSell={() => handlePurchaseOpen('sell', item)}
  //       />,
  //     )
  //   })

  //   // if (isLoaded) {
  //   //   handleGetPriceStats(allPlayers)
  //   // }
  //   // setIsLoaded(false)
  //   // playerStatsInterval = setInterval(() => {
  //   //   handleGetPriceStats(allPlayers)
  //   // }, 10000)
  // }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllPlayers({ featured: 'True' }))
    // dispatch(fetchAllPlayers(null))
    window.history.replaceState(null, 'Buy', '/')
    return () => {
      clearInterval(playerStatsInterval)
    }
  }, [])

  const handleCarouselCallback = useCallback(
    (value: number, direction: string) => {
      setItemIndex(value)
      if (true) {
        if (direction === 'forth') {
          if (value && value < 7) {
            setIsCarouselLoading(true)
            setPlayerOffset({
              start: playerOffset.start + 1,
              end: playerOffset.end + 1,
            })
          }
        } else if (direction === 'back') {
          setIsCarouselLoading(true)
          setPlayerOffset({
            start: playerOffset.start - 1,
            end: playerOffset.end - 1,
          })
        }
      }
    },
    [playerOffset],
  )

  useEffect(() => {
    // if (playerOffset.start !== 0) {
    clearInterval(playerStatsInterval)
    // }
    playerStatsInterval = setInterval(() => {
      handleGetPriceStats(allPlayers, playerOffset)
    }, 5000)
  }, [playerOffset])

  const getUrlParams = (url: string, param1: string, param2: string) => {
    const url_string = url
    const newUrl = new URL(url_string)
    const obj: any = new Object()
    obj[param1] = newUrl.searchParams.get(param1)
    obj[param2] = newUrl.searchParams.get(param2)
    return obj
  }
  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  useEffect(() => {
    prevCountRef.current = playerCoinData
    if (playerCoinData.playersTableData.length > 0) {
      createTestPlayers()
    }
  }, [playerCoinData])

  useEffect(() => {
    if (purchaseData?.showPurchaseForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [purchaseData?.showPurchaseForm])

  return (
    <div className="new-launches-nft-content">
      {purchaseData?.showPurchaseForm ? (
        <DialogBox
          isOpen={purchaseData?.purchaseAction}
          onClose={handlePurchaseClose}
          contentClass=""
          closeBtnClass="close-purchase"
        >
          <TabGroup
            defaultTab={t(purchaseData?.purchaseAction.toLowerCase())}
            // tabSet={['BUY', 'SELL']}
            tabSet={[t('buy').toUpperCase(), t('sell').toUpperCase()]}
            getSwitchedTab={handlePurchaseOpen}
          />
          {purchaseData?.purchaseAction === 'SELL' ? (
            <SellNftForm
              playerData={playerData}
              onClosePopup={handlePurchaseClose}
            />
          ) : (
            <BuyNftForm
              playerData={playerData}
              onClosePopup={handlePurchaseClose}
            />
          )}
        </DialogBox>
      ) : null}
      <div className="new-launch-title">
        <div className="new-nft-title">
          {t('buy_title') + ' '}{' '}
          <span className="theme-color">{t('player coins')}</span>{' '}
          {' ' + t('favorite player')}
        </div>
        <div className="new-nft-content pg-lg">
          <span className="theme-color">{t('player coins') + ' '}</span>
          {t('buy player')}
        </div>
      </div>
      <div className="button-line">
        {Boolean(loginInfo) || Boolean(loginId) ? (
          <div className="button-box-min"></div>
        ) : !isUserAuthenticated || !connectStatus ? (
          <div className="button-box" onClick={() => fetchSignupForm()}>
            {t('sign up')}
          </div>
        ) : null}
      </div>
      <div className="blog-title new-launches-title h-2">
        {t('new launches')}
      </div>
      <div className="carousel">
        {allPlayers.length > 0 && items.length > 0 ? (
          <PaginationCarousel
            items={items}
            isPlayersCoinCarousel
            carouselCallBack={handleCarouselCallback}
            activeIndex={itemIndex}
          />
        ) : (
          <div className="new-nft-loading">
            <div className="spinner__circle">
              <div className="spinner__circle-gradient"></div>
              <div className="spinner__circle-inner"></div>
            </div>
          </div>
        )}
      </div>
      {/* <div
        className={classNames(
          'carousel-loading',
          !isCarouselLoading ? 'hidden' : '',
        )}
      >
        <div className="spinner__circle">
          <div className="spinner__circle-gradient"></div>
          <div className="spinner__circle-inner"></div>
        </div>
      </div> */}
      <div className="new-nft-content">
        {getTranslation('fav player not in list')}
      </div>
      <div className="more-view-cover">
        <a onClick={() => navigate('/all-players')} className="more-view">
          {t('view all')}
        </a>
      </div>
    </div>
  )
}

export default NewLaunchesNFT
