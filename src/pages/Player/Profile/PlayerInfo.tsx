import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NumberFormat } from '@root/utils/NumberFormat'
import { IPlayerCard as CardProps } from '@root/types'
import SubmitButton from '@components/SubmitButton'
import { useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import classnames from 'classnames'
import maticIcon from '@assets/images/matic-token-icon.png'
import TooltipLabel from '@components/TooltipLabel'
import { truncateDecimals } from '@utils/helpers'
import toast from 'react-hot-toast'
import HotToaster from '@components/HotToaster'
interface Props {
  card: any //CardProps
  disabledPlayer?: any
  onBuy: any
  onStake: any
  onSell: any
  onChartView: any
  isPlayerNotLaunched: boolean
}

const refObj = {
  '24h_change': '',
  coin_issued: '',
  holders: '',
  id: '',
  matic: '',
}

const PlayerInfo: React.FC<Props> = ({
  card,
  disabledPlayer,
  onBuy,
  onStake,
  onSell,
  onChartView,
  isPlayerNotLaunched,
}) => {
  const { t } = useTranslation()
  const changeCountRef = useRef<any>(refObj)
  const playerStatsData = useSelector((state: RootState) => state.playerstats)
  const { fetchPlayerStatsRateData } = playerStatsData

  // const getUsdFromMatic = (maticValue: number) => {
  //   const currency = (maticValue * fetchPlayerStatsRateData.rate).toFixed(2)
  //   if (!isNaN(parseFloat(currency))) {
  //     return currency
  //   }
  //   return '00.00'
  // }
  function usePrevious(value: any) {
    const ref = useRef<any>(refObj)
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const prevAmount = usePrevious(card)

  const getUsdFromMatic = (maticValue: number) => {
    let currency = null
    if (fetchPlayerStatsRateData) {
      currency = maticValue * fetchPlayerStatsRateData.rate
    } else {
      currency = maticValue * card?.exchangeRateUSD?.rate
    }
    if (!isNaN(currency)) {
      return truncateDecimals(currency, 4)
    }
    return '00.0000'
  }

  useEffect(() => {
    changeCountRef.current = card
  }, [card])

  const getMarketValue = (totalCoins: number) => {
    const usd: any = getUsdFromMatic(card.matic)
    return truncateDecimals(totalCoins * parseFloat(usd), 4)
  }

  const showMessage = () => {
    toast.error(t('player coin is not launched'))
  }

  return (
    <>
      <HotToaster />
      <div className="player-card">
        <div className="fixed-content">
          <div className="img">
            <img
              src={card.playerpicture || card.img}
              alt=""
              className="img-radius"
            />
            <div
              className="chart-view-button"
              onClick={disabledPlayer ? showMessage : onChartView}
            ></div>
          </div>
          <div className="name">{card.name}</div>
          <div className="player-cost">
            <div className="matic-wrapper details">
              <span
                className={classnames(
                  'player-cost-stats',
                  // changeCountRef?.current['matic'] < card['matic']
                  //   ? 'profit'
                  //   : 'loss',
                  !prevAmount?.matic || prevAmount?.matic === card.matic
                    ? ''
                    : card.matic > prevAmount.matic
                    ? 'profit'
                    : 'loss',
                )}
              >
                {disabledPlayer ? '0.00' : truncateDecimals(card.matic, 7)}
              </span>
              <TooltipLabel title="MATIC">
                <img src={maticIcon} alt="" />
              </TooltipLabel>
            </div>
            <span>&nbsp;</span>
            <span
              className={classnames(
                'player-cost-stats',
                // changeCountRef?.current['matic'] < card['matic']
                //   ? 'profit'
                //   : 'loss',
                !prevAmount?.matic || prevAmount?.matic === card.matic
                  ? ''
                  : card.matic > prevAmount.matic
                  ? 'profit'
                  : 'loss',
              )}
            >
              ${disabledPlayer ? '0.00' : getUsdFromMatic(card.matic)}
            </span>
          </div>
          <div className="player-stake">
            <span>{t('your stake')}: </span>
            <span className="green-color">0.00</span>
          </div>
          <div className="divide"></div>
          <div className="profile-info capitalize">
            <div>{t('coins in circulation')}:</div>
            <div
              // className="player-info-stats"
              className={classnames(
                'player-info-stats',
                // changeCountRef?.current['coin_issued'] < card['coin_issued']
                //   ? 'profit'
                //   : 'loss',
                !prevAmount?.coin_issued ||
                  prevAmount?.coin_issued === card.coin_issued
                  ? ''
                  : card.coin_issued > prevAmount.coin_issued
                  ? 'profit'
                  : 'loss',
              )}
            >
              {card.coin_issued && !isPlayerNotLaunched
                ? NumberFormat(card.coin_issued)
                : 0}
            </div>
          </div>
          <div className="profile-info">
            <div>{t('mecarreira market value')}:</div>
            {/* <div>${price usd * coins issued}</div> */}
            <div
              // className="player-info-stats"
              className={classnames(
                'player-info-stats',
                // changeCountRef?.current['coin_issued'] < card['coin_issued']
                //   ? 'profit'
                //   : 'loss',
                !prevAmount?.coin_issued ||
                  prevAmount?.coin_issued === card.coin_issued
                  ? ''
                  : getMarketValue(card.coin_issued) >
                    getMarketValue(prevAmount.coin_issued)
                  ? 'profit'
                  : 'loss',
              )}
            >
              {card?.coin_issued && !isPlayerNotLaunched
                ? `$${getMarketValue(card.coin_issued)}`
                : 0}
            </div>
          </div>
          <div className="changed-price">
            <div>{t('coin issue date')}:</div>
            <div className="player-info-stats">
              {card?.playercontractsubscriptionstart && !isPlayerNotLaunched
                ? card?.playercontractsubscriptionstart
                : t('not launched')}
            </div>
          </div>
          <div className="profile-info">
            <div>{t('nft’s issued')}:</div>
            <div className="player-info-stats">
              {(card?.nftIssued && !isPlayerNotLaunched) || 0}
            </div>
          </div>
          <div className="button-line">
            <SubmitButton
              isDisabled={false}
              title={t('buy')}
              className={classnames(
                'button-box',
                disabledPlayer ? 'btn-disabled' : '',
              )}
              onPress={disabledPlayer ? showMessage : onBuy}
            />
            <SubmitButton
              isDisabled={false}
              title={t('stake coin')}
              className="button-box btn-disabled"
              onPress={
                disabledPlayer
                  ? showMessage
                  : () => {
                      console.log('')
                    }
              }
            />
            <SubmitButton
              isDisabled={false}
              title={t('sell')}
              className={classnames(
                'button-box',
                disabledPlayer ? 'btn-disabled' : '',
              )}
              onPress={disabledPlayer ? showMessage : onSell}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayerInfo
