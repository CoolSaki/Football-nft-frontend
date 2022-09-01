import React, { useEffect, useState } from 'react'
import { PlayerCardData as PlayerItems } from '@root/constants'
import { useTranslation } from 'react-i18next'
import { NumberFormat } from '@utils/NumberFormat'
import SearchBar from '@components/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import {
  getPlayerDetails,
  resetPlayerDetails,
} from '@root/apis/playerCoins/playerCoinsSlice'
import classNames from 'classnames'

interface Props {
  playerData: any
}

const Supporters: React.FC<Props> = ({ playerData }) => {
  const { t } = useTranslation()
  const [unverifiedPlayer, setUnverifiedPlayer] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const { getPlayerDetailsSuccessData } = playerCoinData
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
      setUnverifiedPlayer(false)
    } else if (getPlayerDetailsSuccessData) {
      setUnverifiedPlayer(true)
    }
    if (getPlayerDetailsSuccessData) {
      setIsLoading(false)
    }
  }, [getPlayerDetailsSuccessData])

  return (
    <div className="fixed-content">
      <div
        className={classNames('all-players-loading', isLoading ? '' : 'hidden')}
      >
        <div className="spinner__circle">
          <div className="spinner__circle-gradient"></div>
          <div className="spinner__circle-inner"></div>
        </div>
      </div>
      {!isLoading && !unverifiedPlayer && (
        <SearchBar
          onEdit={() => console.log('')}
          onClose={() => console.log('')}
        />
      )}
      {!isLoading && unverifiedPlayer ? (
        <div className="alert-wrapper">
          <div className="heading-title unverified-alert">
            {t('coin_not_launched_yet')}
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="list-header">
            <div>{t('address')}</div>
            <div>{t('amount Staked')}</div>
          </div>
        )
      )}
      {!isLoading &&
        !unverifiedPlayer &&
        PlayerItems.map((item, index) => (
          <div key={index} className="nft-item">
            <div className="nft-address-section">
              <div>0x3486d8df...</div>
            </div>
            <div className="nft-price-section">
              <div>{NumberFormat(item.price)}</div>
              <div className="nft-price">${NumberFormat(item.price)}</div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Supporters
