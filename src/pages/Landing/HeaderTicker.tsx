import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import { fetchTickerBanner } from '@root/apis/playerCoins/playerCoinsSlice'
import { fetchPlayersStats } from '@root/apis/playerStats/playerStatsSlice'
import { PLAYER_STATUS } from '@root/constants'
import { truncateDecimals } from '@utils/helpers'
import classnames from 'classnames'
import ArrowDown from '@assets/images/percentage-down.png'
import ArrowUp from '@assets/images/percentage-up.png'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { any } from 'prop-types'
import { HorizontalTicker } from 'react-infinite-ticker'

let playerStatsInterval: any = null

interface Props {
  player: any
  previousPlayer: any
}

const HeaderTickerPlayer: React.FC<Props> = ({ player, previousPlayer }) => {
  const playerStatsData = useSelector((state: RootState) => state.playerstats)
  const { fetchPlayerStatsRateData } = playerStatsData
  const { t } = useTranslation()
  const navigate = useNavigate()

  const refObj = {
    '24h_change': '',
    coin_issued: '',
    holders: '',
    id: '',
    matic: undefined,
  }

  const getUsdFromMatic = (player: any) => {
    let currency = null
    if (fetchPlayerStatsRateData) {
      currency = player.matic * fetchPlayerStatsRateData.rate
    } else {
      currency = player.matic * player?.exchangeRateUSD?.rate
    }
    if (!isNaN(currency)) {
      return truncateDecimals(currency, 4)
    }
    return '00.0000'
  }

  function getPercentageChange(
    oldNumber: number,
    newNumber: number,
    time: string,
  ) {
    const decreaseValue = oldNumber - newNumber
    const percentChange = (decreaseValue / oldNumber) * 100
    if (!isNaN(percentChange)) {
      return percentChange.toFixed(2)
    }
    return '00.00'
  }

  function usePrevious(value: any) {
    const ref = useRef<any>(refObj)
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  // const prevAmount = usePrevious(player)
  const prevAmount = previousPlayer

  const handleClick = () => {
    const playerUrl = player.detailpageurl //card.name.toLocaleLowerCase().replaceAll(' ', '-')
    navigate(`player/${playerUrl}`, {
      state: { id: player.profileLink, detaultPageUrl: player.detailpageurl },
    })
  }

  return (
    <div onClick={handleClick}>
      <div className="img">
        <img
          src={player.playerpicture || player.img}
          alt=""
          className="img-radius cache-img"
        />
      </div>
      <div className="player-info">
        <div className="player-name">{player.name}</div>
        {player.playerstatusid.id === PLAYER_STATUS.COMINGSOON ? (
          <div className="green-color text-left">{t('coming soon')}</div>
        ) : (
          <div className="player-price-wrapper">
            <div className="player-price">
              {truncateDecimals(player.matic, 7) || '00.00'} / $
              {getUsdFromMatic(player)}
            </div>
            <div className="player-price-change">
              {!prevAmount?.matic || prevAmount?.matic === player.matic ? (
                <img
                  src={ArrowUp}
                  alt=""
                  // className={!prevAmount?.matic ? 'transparent' : ''}
                />
              ) : getPercentageChange(
                  player['24h_change'],
                  player['matic'],
                  'current',
                ) >
                getPercentageChange(
                  prevAmount['24h_change'],
                  prevAmount['matic'],
                  'prev',
                ) ? (
                <img src={ArrowUp} alt="" />
              ) : (
                <img src={ArrowDown} alt="" />
              )}
              <div
                className={classnames(
                  'number-color',
                  !prevAmount?.matic || prevAmount?.matic === player.matic
                    ? 'profit'
                    : getPercentageChange(
                        player['24h_change'],
                        player['matic'],
                        'current',
                      ) >
                      getPercentageChange(
                        prevAmount['24h_change'],
                        prevAmount['matic'],
                        'prev',
                      )
                    ? 'profit'
                    : 'loss',
                )}
              >
                {prevAmount?.matic === player.matic
                  ? '0.00%'
                  : getPercentageChange(
                      player['24h_change'],
                      player['matic'],
                      'current',
                    ) + '%'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const HeaderTicker: React.FC = () => {
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const playerStatsData = useSelector((state: RootState) => state.playerstats)

  const { playersBannerData } = playerCoinData

  const { fetchPlayerStatsData } = playerStatsData

  const [isCarouselLoading, setIsCarouselLoading] = useState(false)
  const [allPlayers, setAllPlayers] = useState<any>([])
  const [allPreviousPlayers, setAllPreviousPlayers] = useState<any>([])

  const dispatch = useDispatch()
  const prevCountRef = useRef<any>()
  const [inc, setInc] = useState(0)

  const handleGetPriceStats = (playersData: any) => {
    if (isCarouselLoading) {
      setIsCarouselLoading(false)
    }
    const playersSet: number[] = playersData
      .filter((player: { playerstatusid: { id: number } }) => {
        return player.playerstatusid.id === PLAYER_STATUS.ISSUED
      })
      .map((item: any) => item.id)
    if (playersSet.length > 0) {
      dispatch(fetchPlayersStats(playersSet))
    }
  }

  const createTestPlayers = () => {
    const playersBannerDataTemp = [...playersBannerData]
    for (let i = 0; i < fetchPlayerStatsData.length; i++) {
      for (let j = 0; j < playersBannerDataTemp.length; j++) {
        if (
          playersBannerDataTemp[j].id.toString() ===
          fetchPlayerStatsData[i].id.toString()
        ) {
          playersBannerDataTemp[j] = {
            ...playersBannerDataTemp[j],
            ...fetchPlayerStatsData[i],
          }
        }
      }
    }
    console.log({ playersBannerDataTemp })
    if (playersBannerDataTemp.length > 0) {
      const players: any[] = []
      for (let i = 0; i < 12; i++) {
        players[i] =
          playersBannerDataTemp[(i % 12) % playersBannerDataTemp.length]
      }
      console.log('111players', players)

      setAllPlayers([...players])
    }
    clearInterval(playerStatsInterval)
    playerStatsInterval = setTimeout(() => {
      handleGetPriceStats(playersBannerDataTemp)
    }, 5000)
  }

  useEffect(() => {
    if (inc <= 1) {
      console.log(
        { fetchPlayerStatsData },
        'playersBannerData',
        playersBannerData,
      )
      const playersBannerDataTemp = [...playersBannerData]
      for (let i = 0; i < fetchPlayerStatsData.length; i++) {
        for (let j = 0; j < playersBannerDataTemp.length; j++) {
          if (
            playersBannerDataTemp[j].id.toString() ===
            fetchPlayerStatsData[i].id.toString()
          ) {
            playersBannerDataTemp[j] = {
              ...playersBannerDataTemp[j],
              ...fetchPlayerStatsData[i],
            }
          }
        }
      }
      console.log('playersBannerDataTemp', inc, { playersBannerDataTemp })
      setInc(inc + 1)
      const players: any[] = []
      if (allPlayers.length > 0 && playersBannerDataTemp.length > 0) {
        for (let i = 0; i < 12; i++) {
          players[i] = allPlayers[(i % 12) % allPlayers.length]
        }
        console.log('lplayers', players)
        setAllPreviousPlayers([...players])
      }
      if (playersBannerDataTemp.length > 0) {
        for (let i = 0; i < 12; i++) {
          players[i] =
            playersBannerDataTemp[(i % 12) % playersBannerDataTemp.length]
        }
        setAllPlayers([...players])
      }
    }
  }, [fetchPlayerStatsData])

  useEffect(() => {
    dispatch(fetchTickerBanner({}))
    return () => {
      clearInterval(playerStatsInterval)
    }
  }, [])

  useEffect(() => {
    prevCountRef.current = playerCoinData
    if (playerCoinData.playersBannerData.length > 0) {
      createTestPlayers()
    }
  }, [playerCoinData])

  return (
    <>
      {allPlayers.length > 0 && (
        <HorizontalTicker duration={100000}>
          <div className="header-ticker-bar">
            <div className="header-ticker-container">
              {allPlayers.map((player: any, index: number) => (
                <HeaderTickerPlayer
                  player={player}
                  key={index}
                  previousPlayer={allPreviousPlayers[index]}
                />
              ))}
            </div>
          </div>
        </HorizontalTicker>
      )}
    </>
  )
}

export default HeaderTicker
