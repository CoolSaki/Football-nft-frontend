import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RootState } from '@root/store/rootReducers'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { DummyCardData, PLAYER_STATUS } from '@root/constants'
import { fetchPlayersStats } from '@root/apis/playerStats/playerStatsSlice'
import PaginationCarousel from '@components/PaginationCarousel'
import Card from '@components/Card/PlayerCard'
import {
  setPurchaseMode,
  setPurchaseShow,
} from '@root/apis/purchase/purchaseSlice'
import { isMobile } from 'web3modal'
import { useLocation, useNavigate } from 'react-router'
import ComingSoon from '@components/Card/ComingSoon'
import { fetchDraftPlayers } from '@root/apis/playerCoins/playerCoinsSlice'
import { showSignupForm } from '@root/apis/onboarding/authenticationSlice'

let draftedPlayersInterval: any = null
interface PlayerOffset {
  start: number
  end: number
}

interface Props {
  playerStatusId: number | string
}

const Giveaways: React.FC<Props> = ({ playerStatusId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location: any = useLocation()
  const prevCountRef = useRef<any>()
  const [allPlayers, setAllPlayers] = useState<any>([])
  const [itemIndex, setItemIndex] = useState(0)
  const [noDraftedPlayers, setNoDraftedPlayers] = useState(false)
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const playerStatsData = useSelector((state: RootState) => state.playerstats)
  const { fetchPlayerStatsData } = playerStatsData
  const { playersDraftsData } = playerCoinData
  const [isCarouselLoading, setIsCarouselLoading] = useState(false)
  const [playerData, setPlayerData] = useState([])
  const [playerOffset, setPlayerOffset] = useState({ start: 0, end: 4 })
  const items: JSX.Element[] = []
  const loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')

  useEffect(() => {
    console.log({ playerStatusId })
  }, [playerStatusId])

  allPlayers.map((item: any, index: any) => {
    items.push(
      <Card
        isPlayerDetails
        card={item}
        key={index + 2}
        onBuy={() => handlePurchaseOpen('buy', item)}
        onSell={() => handlePurchaseOpen('sell', item)}
      />,
    )
    // if (index === 1) {
    //   items.push(<ComingSoon card={DummyCardData} key={0} />)
    //   items.push(<ComingSoon card={DummyCardData} key={1} />)
    // }
  })
  // if (items.length < 2) {
  //   items.push(<ComingSoon card={DummyCardData} key={0} />)
  //   items.push(<ComingSoon card={DummyCardData} key={1} />)
  // }

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

  const createTestPlayers = () => {
    const playersDraftsDataTemp = [...playersDraftsData]
    for (let i = 0; i < fetchPlayerStatsData.length; i++) {
      for (let j = 0; j < playersDraftsDataTemp.length; j++) {
        if (
          playersDraftsDataTemp[j].id.toString() ===
          fetchPlayerStatsData[i].id.toString()
        ) {
          playersDraftsDataTemp[j] = {
            ...playersDraftsDataTemp[j],
            ...fetchPlayerStatsData[i],
          }
        }
      }
    }
    setAllPlayers(playersDraftsDataTemp)
    clearInterval(draftedPlayersInterval)
    draftedPlayersInterval = setInterval(() => {
      handleGetPriceStats(playersDraftsDataTemp, playerOffset)
    }, 10000)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (playerStatusId === 4) {
      dispatch(fetchDraftPlayers({}))
      setTimeout(() => {
        if (allPlayers.length === 0) {
          setNoDraftedPlayers(true)
        }
      }, 7000)
    }
    // dispatch(fetchDraftPlayers(null))
    // window.history.replaceState(null, 'Buy', '/')
    return () => {
      clearInterval(draftedPlayersInterval)
    }
  }, [])

  useEffect(() => {
    prevCountRef.current = playerCoinData
    if (playerCoinData.playersDraftsData.length > 0 && playerStatusId === 4) {
      createTestPlayers()
    }
  }, [playerCoinData])

  useEffect(() => {
    const newPlayers: any = []
    const playersDraftsDataTemp = [...playersDraftsData]
    for (let i = 0; i < fetchPlayerStatsData.length; i++) {
      for (let j = 0; j < playersDraftsDataTemp.length; j++) {
        if (
          playersDraftsDataTemp[j].id.toString() ===
          fetchPlayerStatsData[i].id.toString()
        ) {
          playersDraftsDataTemp[j] = {
            ...playersDraftsDataTemp[j],
            ...fetchPlayerStatsData[i],
          }
        }
      }
    }
    setAllPlayers(playersDraftsDataTemp)
  }, [fetchPlayerStatsData])

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

  return (
    <div className="giveaways center-carousel">
      {/* <div className="blog-title">{t('giveaways')}</div>
      <div className="flex-center">
        <div className="blog-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </div>
      </div>
      <div className="flex-center">
        <div className="blog-image"></div>
      </div>
      <div className="flex-center">
        <div className="blog-button">{t('enter')}</div>
      </div> */}
      {playerStatusId === 4 ? (
        <div className="carousel-binder">
          <div className="blog-title new-launches-title h-2">
            {t('my active drafts')}
          </div>
          <div className="carousel mt-40">
            {allPlayers.length > 0 && items.length > 0 ? (
              <PaginationCarousel
                items={items.splice(0, 6)}
                isPlayersCoinCarousel
                carouselCallBack={handleCarouselCallback}
                activeIndex={itemIndex}
              />
            ) : noDraftedPlayers ? (
              <div className="no-draft-msg-wrapper">
                <span className="blog-title bottom-title h-2">
                  {t('no_players_drafted')}
                </span>
              </div>
            ) : (
              <div className="new-nft-loading">
                <div className="spinner__circle">
                  <div className="spinner__circle-gradient"></div>
                  <div className="spinner__circle-inner"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="alert-wrapper">
          <div className="heading-title unverified-alert">
            {t('player coin is not launched')}
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Giveaways)
