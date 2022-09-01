import React, { useEffect, useState } from 'react'
import TabGroup from '@components/TabGroup'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PlayerCardData as PlayerItems, PLAYER_STATUS } from '@root/constants'
import { NumberFormat } from '@utils/NumberFormat'
import SearchBar from '@components/SearchBar'
import { isMobile, sleep } from '@utils/helpers'
import ArrowUp from '@components/Svg/ArrowUp'
import ArrowDown from '@components/Svg/ArrowDown'
import '@assets/css/pages/PlayerList.css'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import {
  fetchAllPlayers,
  fetchListPlayers,
  resetAllPlayers,
} from '@root/apis/playerCoins/playerCoinsSlice'
import { fetchPlayersStats } from '@root/apis/playerStats/playerStatsSlice'
import { useNavigate } from 'react-router'
import classNames from 'classnames'
import { truncateDecimals } from '@utils/helpers'
import TooltipLabel from '@components/TooltipLabel'
import maticIcon from '@assets/images/matic-token-icon.png'
import dollarIcon from '@assets/images/dollar_mecarreira.png'
interface FiltersData {
  limit?: string
  offset?: string
  sorted_by?: string
  q?: string
  reverse?: string
}

let playerListInterval: any = null

const PlayerListForm: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('all')
  const [searchedTerm, setSearchedTerm] = useState<string | undefined>('')
  const [mobileFixedHeightTable, setMobileFixedHeightTable] = useState(false)
  const [loading, setLoading] = useState(true)
  const [field, setField] = useState('MARKET_CAP')
  const [allPlayers, setAllPlayers] = useState<any>([])

  const [sortAsc, setSortAsc] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<FiltersData>({
    sorted_by: 'market_cap',
    reverse: 'True',
  })
  const [paginationSet, setPaginationSet] = useState<number[]>([])
  const [noDataFound, setNoDataFound] = useState<boolean>(false)
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const playerStatsData = useSelector((state: RootState) => state.playerstats)

  const {
    playersListData,
    isLoading,
    totalPlayersCount = 0,
    nextPlayerListUrl,
    previousPlayerListUrl,
  } = playerCoinData

  const { fetchPlayerStatsData } = playerStatsData
  const [prevData, setPrevData] = useState<any>([])
  const [changeRate, setChangeRate] = useState(0)
  const [usdPrice, setUsdPrice] = useState(0)

  useEffect(() => {
    const playersTableDataTemp = [...playersListData]
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

    setPrevData(allPlayers)
    setAllPlayers(playersTableDataTemp)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [fetchPlayerStatsData])

  useEffect(() => {
    window.scrollTo(0, 0)
    handleFetchAllPlayers()
    return () => {
      clearInterval(playerListInterval)
      dispatch(resetAllPlayers())
    }
  }, [])

  // useEffect(() => {
  //   console.log({ totalPlayersCount })
  //   if (totalPlayersCount > 0) {
  //     const limit = Math.ceil(totalPlayersCount / 10)
  //     const pages = Array.from({ length: limit }, (_, i) => i + 1)
  //     setPaginationSet(pages)
  //   }
  // }, [totalPlayersCount])

  useEffect(() => {
    if (appliedFilters.limit || appliedFilters.offset) {
      setAllPlayers([...allPlayers, ...playersListData])
    } else {
      setAllPlayers(playersListData)
    }
    clearInterval(playerListInterval)
    playerListInterval = setInterval(() => {
      handleGetPriceStats(playersListData)
    }, 10000)
    console.log('someFound1--', { playersListData, searchedTerm })

    if (playersListData.length === 0 && searchedTerm) {
      console.log('itsTruing')
      // setTimeout(() => {
      setNoDataFound(true)
      // }, 2000)
    } else if (playersListData.length > 0 && searchedTerm) {
      console.log('someFound')
      setNoDataFound(false)
      // setLoading(false)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    console.log('boov--', playersListData)
  }, [playersListData])

  useEffect(() => {
    console.log({ appliedFilters })
    setLoading(true)
    if (
      appliedFilters?.limit ||
      appliedFilters?.offset ||
      appliedFilters?.sorted_by ||
      appliedFilters?.q
    ) {
      console.log('PRTEST11')
      dispatch(fetchListPlayers(appliedFilters))
    }
    if (appliedFilters?.q) {
      setMobileFixedHeightTable(true)
    } else {
      setMobileFixedHeightTable(false)
    }
  }, [appliedFilters])

  const handleGetTab = (tab: string) => {
    setActiveTab(tab)
  }

  const handleClickHeader = (column: string) => {
    // givenname/ market_cap/ matic_price/ usd_price /change
    setAllPlayers([])
    setField(column)
    setSortAsc(!sortAsc)
    if (column === 'NAME') {
      const request = {
        sorted_by: 'givenname',
        reverse: sortAsc ? 'True' : 'False',
      }
      // setAppliedFilters({ ...appliedFilters, ...request })
      setAppliedFilters(request)
    } else if (column === 'MARKET_CAP') {
      const request = {
        sorted_by: 'market_cap',
        reverse: sortAsc ? 'True' : 'False',
      }
      // setAppliedFilters({ ...appliedFilters, ...request })
      setAppliedFilters(request)
    } else if (column === 'PRICE') {
      const request = {
        sorted_by: 'matic',
        reverse: sortAsc ? 'True' : 'False',
      }
      // setAppliedFilters({ ...appliedFilters, ...request })
      setAppliedFilters(request)
    } else if (column === '24H_CHANGE') {
      const request = {
        sorted_by: '24h_change',
        reverse: sortAsc ? 'True' : 'False',
      }
      // setAppliedFilters({ ...appliedFilters, ...request })
      setAppliedFilters(request)
    }
  }

  const handleGetPriceStats = (playersData: any) => {
    const playersSet: number[] = playersData
      .filter((player: { playerstatusid: { id: number } }) => {
        return player.playerstatusid.id === PLAYER_STATUS.ISSUED
      })
      .map((item: any) => item.id)
    if (playersSet.length > 0) {
      dispatch(fetchPlayersStats(playersSet))
    }
  }

  const handleFetchAllPlayers = async () => {
    console.log('PRTEST22')
    dispatch(fetchListPlayers(appliedFilters))
    if (totalPlayersCount > 0) {
      const limit = Math.ceil(totalPlayersCount / 10)
      const pages = Array.from({ length: limit }, (_, i) => i + 1)
      setPaginationSet(pages)
    }
  }

  const showFullProfile = (item: any) => {
    const player = item.detailpageurl //card.name.toLocaleLowerCase().replaceAll(' ', '-')
    navigate(`/player/${player}`, {
      state: { id: item.profileLink, detaultPageUrl: item.detailpageurl },
      // replace: true,
    })
  }

  const getUrlParams = (url: string, param1: string, param2: string) => {
    const url_string = url
    const newUrl = new URL(url_string)
    const obj: any = new Object()
    obj[param1] = newUrl.searchParams.get(param1)
    obj[param2] = newUrl.searchParams.get(param2)
    return obj
  }

  const handleJumpToPage = (head: string) => {
    // event.preventDefault()
    if (head === 'back') {
      const paginationParams = getUrlParams(
        previousPlayerListUrl,
        'limit',
        'offset',
      )
      setAppliedFilters({ ...appliedFilters, ...paginationParams })
    } else {
      const paginationParams = getUrlParams(
        nextPlayerListUrl,
        'limit',
        'offset',
      )
      setAppliedFilters({ ...appliedFilters, ...paginationParams })
    }
  }

  const handleGoToPage = (event: any, data: any) => {
    event.preventDefault()
    const paginationParams = {
      limit: '10',
      offset: ((data - 1) * 10).toString(),
    }
    setAppliedFilters({ ...appliedFilters, ...paginationParams })
  }

  const handleMobileSort = (field: string) => {
    handleClickHeader(field)
    setField(field)
  }

  const handleCloseSearch = (val: boolean | undefined) => {
    setAllPlayers([])
    const request = {
      limit: '10',
      offset: '0',
    }
    setAppliedFilters(request)
  }

  const handleSearch = (value: string | undefined) => {
    setAllPlayers([])
    let request = {}
    setSearchedTerm(value)
    if (value) {
      request = {
        limit: '10',
        offset: '0',
        q: value,
      }
    } else {
      request = {
        limit: '10',
        offset: '0',
      }
    }
    // setAppliedFilters({ ...appliedFilters, ...request })
    setAppliedFilters(request)
  }

  const getPercentageChange = (oldNumber: number, newNumber: number) => {
    const decreaseValue = oldNumber - newNumber
    const percentChange = (decreaseValue / oldNumber) * 100
    if (!isNaN(percentChange)) {
      return percentChange.toFixed(2)
    }
    return '00.00'
  }

  const getUsdFromMatic = (maticValue: number, rate: number) => {
    let currency = null

    currency = maticValue * rate

    if (!isNaN(currency)) {
      return truncateDecimals(currency, 4)
    }
    return '00.0000'
  }

  const getCoinMarketCap = (market_cap: number) => {
    if (!isNaN(market_cap)) {
      return truncateDecimals(market_cap, 4)
    }
    return '00.0000'
  }

  return (
    <section className="player-list-container">
      <>
        <div className="tab-bar-container">
          <TabGroup
            defaultTab={activeTab}
            tabSet={['all', 'new', 'pro', 'talent']}
            getSwitchedTab={handleGetTab}
          />
        </div>
        {isMobile() ? (
          <div
            className={classNames(
              'fixed-content dlg-content',
              mobileFixedHeightTable ? 'dlg-content-height' : '',
            )}
          >
            <SearchBar
              onEdit={handleSearch}
              isFilterDisabled={true}
              containerClass="mobile-player-search p-0"
              onClose={handleCloseSearch}
            />
            <div className="list-header">
              <div
                className={
                  field === 'NAME' ? 'button-hover capitalize' : 'capitalize'
                }
                // onClick={() => setField('NAME')}
                onClick={() => handleMobileSort('NAME')}
              >
                {t('name')}
              </div>
              <div
                className={
                  field === 'MARKET_CAP'
                    ? 'button-hover capitalize'
                    : 'capitalize'
                }
                // onClick={() => setField('MARKET_CAP')}
                onClick={() => handleClickHeader('MARKET_CAP')}
              >
                {t('market cap')}
              </div>
              <div
                className={
                  field === 'PRICE' ? 'button-hover capitalize' : 'capitalize'
                }
                // onClick={() => setField('PRICE')}
                onClick={() => handleClickHeader('PRICE')}
              >
                {t('price')}
              </div>
              <div
                className={
                  field === '24H_CHANGE'
                    ? 'button-hover capitalize'
                    : 'capitalize'
                }
                // onClick={() => setField('24H_CHANGE')}
                onClick={() => handleClickHeader('24H_CHANGE')}
              >
                {t('24h change')}
              </div>
              {sortAsc ? (
                <ArrowUp
                  onClick={() => {
                    handleClickHeader(field)
                  }}
                />
              ) : (
                <ArrowDown
                  onClick={() => {
                    handleClickHeader(field)
                  }}
                />
              )}
            </div>
            {allPlayers.length > 0 && (
              <>
                <div className="players-table-container">
                  <InfiniteScroll
                    dataLength={allPlayers.length} //This is important field to render the next data
                    next={() => handleJumpToPage('forth')}
                    hasMore={true}
                    loader={
                      nextPlayerListUrl ? (
                        <h4>{t('loading')}...</h4>
                      ) : (
                        <h4>{t('end of results')}</h4>
                      )
                    }
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>{t('end of results')}</b>
                      </p>
                    }
                  >
                    {allPlayers.map((item: any, index: any) => (
                      <div
                        key={index}
                        className="nft-item"
                        onClick={() => showFullProfile(item)}
                      >
                        <div className="nft-image-section">
                          <div className="image-border">
                            <img
                              src={item.playerpicture || item.img}
                              alt=""
                              className="nft-image"
                            />
                          </div>
                          <div className="nft-name">{item.name}</div>
                        </div>
                        <div className="nft-price-section">
                          <div
                            className={classNames(
                              'nft-price-section',
                              'number-color',
                              'matic-value',
                              'matic-figure',
                              !prevData[index]?.matic ||
                                prevData[index]?.matic === item.matic
                                ? ''
                                : item.matic > prevData[index].matic
                                ? 'profit'
                                : 'loss',
                            )}
                          >
                            {item.matic}
                          </div>
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </>
            )}
            {loading && (
              <div
                className="nft-item no-data"
                style={{ border: '1px solid gold' }}
              >
                <div
                  className={classNames(
                    'all-players-loading',
                    noDataFound ? 'hidden' : '',
                    // isLoading ? '' : 'hidden',
                  )}
                >
                  <div className="spinner__circle">
                    <div className="spinner__circle-gradient"></div>
                    <div className="spinner__circle-inner"></div>
                  </div>
                </div>
                <div
                  className={classNames(
                    'nft-price-section',
                    isLoading || loading ? 'hidden' : '',
                  )}
                >
                  {totalPlayersCount === 0 && !loading ? (
                    <div className="nft-price">{t('no data found')}</div>
                  ) : null}
                  {/* <div className="nft-price">{t('no data found')}</div> */}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="desktop-content">
            <SearchBar
              isFilterDisabled={true}
              onEdit={handleSearch}
              onClose={handleCloseSearch}
            />
            <div className="list-header">
              <div onClick={() => handleClickHeader('NAME')}>
                {t('name')}
                {field === 'NAME' && (sortAsc ? <ArrowUp /> : <ArrowDown />)}
              </div>
              <div onClick={() => handleClickHeader('MARKET_CAP')}>
                {t('market cap')}
                {field === 'MARKET_CAP' &&
                  (sortAsc ? <ArrowUp /> : <ArrowDown />)}
              </div>
              <div onClick={() => handleClickHeader('PRICE')}>
                {t('price')}
                {field === 'PRICE' && (sortAsc ? <ArrowUp /> : <ArrowDown />)}
              </div>
              <div onClick={() => handleClickHeader('24H_CHANGE')}>
                {t('24h change')}
                {field === '24H_CHANGE' &&
                  (sortAsc ? <ArrowUp /> : <ArrowDown />)}
              </div>
            </div>
            {allPlayers.length > 0 && (
              <>
                <div className="players-table-container">
                  <InfiniteScroll
                    dataLength={allPlayers.length} //This is important field to render the next data
                    next={() => handleJumpToPage('forth')}
                    hasMore={true}
                    loader={
                      nextPlayerListUrl ? (
                        <h4>{t('loading')}...</h4>
                      ) : (
                        <h4>{t('end of results')}</h4>
                      )
                    }
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>{t('end of results')}</b>
                      </p>
                    }
                  >
                    {allPlayers.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="nft-item"
                        onClick={() => showFullProfile(item)}
                      >
                        <div
                          className="nft-image-section"
                          style={{ width: '200px' }}
                        >
                          <div className="image-border">
                            <img
                              src={item.playerpicture || item.img}
                              alt=""
                              className="nft-image"
                            />
                          </div>
                          <div className="nft-name">{item.name}</div>
                        </div>
                        <div
                          style={{ width: '80px' }}
                          className={classNames(
                            'nft-marketcap-section',
                            'number-color',
                            'text-center',
                            !prevData[index]?.matic ||
                              prevData[index]?.matic === item.matic
                              ? ''
                              : getCoinMarketCap(item.market_cap) >
                                getCoinMarketCap(prevData[index].market_cap)
                              ? 'profit'
                              : 'loss',
                          )}
                        >
                          {getCoinMarketCap(item.market_cap)}
                        </div>
                        <div
                          style={{ width: '100px' }}
                          className={classNames(
                            'nft-price-section',
                            'matic-value',
                            'matic-figure',
                            'player-table-matic',
                          )}
                        >
                          <div className="currency-binder">
                            <TooltipLabel title="MATIC">
                              <img src={maticIcon} alt="" />
                            </TooltipLabel>
                            <TooltipLabel title="$">
                              <img src={dollarIcon} alt="" />
                            </TooltipLabel>
                          </div>
                          <div className="currency-binder">
                            <span
                              className={classNames(
                                'number-color',
                                !prevData[index]?.matic ||
                                  prevData[index]?.matic === item.matic
                                  ? ''
                                  : item.matic > prevData[index].matic
                                  ? 'profit'
                                  : 'loss',
                              )}
                            >
                              {item.matic}
                            </span>
                            <span
                              className={classNames(
                                'number-color',
                                !prevData[index]?.matic ||
                                  prevData[index]?.matic === item.matic
                                  ? ''
                                  : item.matic > prevData[index].matic
                                  ? 'profit'
                                  : 'loss',
                              )}
                            >
                              {getUsdFromMatic(
                                item.matic,
                                item.exchangeRateUSD.rate,
                              )}
                            </span>
                          </div>
                        </div>
                        <div
                          className="nft-24hChange-section"
                          style={{ width: '75px' }}
                        >
                          <div
                            className={classNames(
                              'number-color',
                              prevData[index] &&
                                (!prevData[index]['24h_change'] &&
                                !prevData[index].matic
                                  ? ''
                                  : getPercentageChange(
                                      item['24h_change'],
                                      item['matic'],
                                    ) >
                                    getPercentageChange(
                                      prevData[index]['24h_change'],
                                      prevData[index]['matic'],
                                    )
                                  ? 'profit'
                                  : 'loss'),
                            )}
                          >
                            {prevData[index] &&
                              (!prevData[index]['24h_change'] &&
                              !prevData[index].matic ? (
                                ''
                              ) : getPercentageChange(
                                  item['24h_change'],
                                  item['matic'],
                                ) >
                                getPercentageChange(
                                  prevData[index]['24h_change'],
                                  prevData[index]['matic'],
                                ) ? (
                                <ArrowUp />
                              ) : (
                                <ArrowDown />
                              ))}
                            {getPercentageChange(
                              item['24h_change'],
                              item['matic'],
                            ) + '%'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </>
            )}

            {(loading || noDataFound) && (
              <div
                className="nft-item no-data"
                style={{ border: '1px solid red' }}
              >
                <div
                  className={classNames(
                    'all-players-loading',
                    noDataFound ? 'hidden' : '',
                    // isLoading ? '' : 'hidden',
                  )}
                >
                  <div className="spinner__circle">
                    <div className="spinner__circle-gradient"></div>
                    <div className="spinner__circle-inner"></div>
                  </div>
                </div>
                <div
                  className={classNames(
                    'nft-price-section',
                    isLoading || loading ? 'hidden' : '',
                  )}
                >
                  {noDataFound ? (
                    <div className="nft-price">{t('no data found')}</div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </section>
  )
}

export default PlayerListForm
