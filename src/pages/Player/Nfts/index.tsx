import React, { useEffect, useState } from 'react'
import {
  DemoPlayers,
  NftCardData as NftItems,
  TABULET_MAX_WIDTH,
} from '@root/constants'
import NftCard from '../../../components/Card/NftCard'
import { RootState } from '@root/store/rootReducers'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import SearchBar from '@components/SearchBar'
import {
  getPlayerDetails,
  resetPlayerDetails,
} from '@root/apis/playerCoins/playerCoinsSlice'

interface Props {
  playerData: any
}

const Nfts: React.FC<Props> = ({ playerData }) => {
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const { getPlayerDetailsSuccessData } = playerCoinData

  const [nftData, setNftData] = useState<any>([])
  const [unverifiedPlayer, setUnverifiedPlayer] = useState<boolean>(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    const locationUrl = window.location.href
    const urlPlayer = locationUrl.split('/')
    if (urlPlayer[urlPlayer.length - 1]) {
      dispatch(getPlayerDetails(urlPlayer[urlPlayer.length - 1]))
    }
    return () => {
      console.log('unmounted-profile')
      dispatch(resetPlayerDetails())
    }
  }, [])

  useEffect(() => {
    if (
      getPlayerDetailsSuccessData?.id === 3 ||
      getPlayerDetailsSuccessData?.id === 4
    ) {
      const temp = DemoPlayers.findIndex(
        item => item.id === getPlayerDetailsSuccessData.id,
      )
      setNftData(DemoPlayers[temp]?.nfts)
    } else if (getPlayerDetailsSuccessData) {
      setUnverifiedPlayer(true)
    }
  }, [getPlayerDetailsSuccessData])

  return (
    <>
      <div className="search-bar-container">
        {(nftData.length > 0 || !unverifiedPlayer) && (
          <SearchBar
            onEdit={() => console.log('')}
            onClose={() => console.log('')}
          />
        )}
      </div>
      {unverifiedPlayer ? (
        <div className="fixed-content">
          <div className="alert-wrapper">
            <div className="heading-title unverified-alert">
              {t('no_nft_launched_yet')}
            </div>
          </div>
        </div>
      ) : window.innerWidth <= TABULET_MAX_WIDTH ? (
        <div className="fixed-content">
          <div className="nft-line">
            <div className="nft-column nft-grid-wrapper">
              {/* {NftItems.map((item, index) => {
                return (
                  index % 2 === 0 && (
                    <NftCard nft={item} key={index} isNavigate={true} />
                  )
                )
              })} */}
              {nftData.length > 0 ? (
                nftData.map((item: any, index: number) => {
                  return (
                    // index % 4 === 0 && (
                    <NftCard
                      className="m-0"
                      nft={item}
                      key={index}
                      isNavigate={true}
                    />
                    // )
                  )
                })
              ) : (
                <div className={classNames('balance-progress')}>
                  <div
                    className={classNames(
                      'loading-spinner-container mb-40 mt-40',
                      'show',
                    )}
                  >
                    <div className="loading-spinner">
                      <div className="spinner__circle">
                        <div className="spinner__circle-gradient"></div>
                        <div className="spinner__circle-inner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="nft-column">
              {NftItems.map((item, index) => {
                return (
                  index % 2 === 1 && (
                    <NftCard nft={item} key={index} isNavigate={true} />
                  )
                )
              })}
            </div> */}
          </div>
        </div>
      ) : (
        <div className="nft-line nft-line-ex">
          <div className="nft-column">
            {nftData.length > 0 ? (
              nftData.map((item: any, index: number) => {
                return (
                  // index % 4 === 0 && (
                  <NftCard
                    className="m-0"
                    nft={item}
                    key={index}
                    isNavigate={true}
                  />
                  // )
                )
              })
            ) : (
              <div className={classNames('balance-progress')}>
                <div
                  className={classNames(
                    'loading-spinner-container mb-40 mt-40',
                    'show',
                  )}
                >
                  <div className="loading-spinner">
                    <div className="spinner__circle">
                      <div className="spinner__circle-gradient"></div>
                      <div className="spinner__circle-inner"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className="nft-column">
            {NftItems.map((item, index) => {
              return (
                index % 4 === 1 && (
                  <NftCard nft={item} key={index} isNavigate={true} />
                )
              )
            })}
          </div>
          <div className="nft-column">
            {NftItems.map((item, index) => {
              return (
                index % 4 === 2 && (
                  <NftCard nft={item} key={index} isNavigate={true} />
                )
              )
            })}
          </div>
          <div className="nft-column">
            {NftItems.map((item, index) => {
              return (
                index % 4 === 3 && (
                  <NftCard nft={item} key={index} isNavigate={true} />
                )
              )
            })}
          </div> */}
        </div>
      )}
    </>
  )
}

export default Nfts
