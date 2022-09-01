import React, { useState, useEffect, useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NumberFormat } from '@root/utils/NumberFormat'
import { IPlayerCard as CardProps } from '@root/types'
import { useNavigate } from 'react-router-dom'
import { setPurchasePlayerId } from '@root/apis/purchase/purchaseSlice'
import classnames from 'classnames'
import '@assets/css/components/PlayerCard.css'
import maticIcon from '@assets/images/matic-token-icon.png'
import dollarIcon from '@assets/images/dollar_mecarreira.png'
import { RootState } from '@root/store/rootReducers'
import { truncateDecimals } from '@utils/helpers'
import TooltipLabel from '@components/TooltipLabel'
interface Props {
  card: CardProps
  isPlayerDetails?: boolean
  onBuy: any
  onSell: any
}

const refObj = {
  '24h_change': '',
  coin_issued: '',
  holders: '',
  id: '',
  matic: undefined,
}

const Card: React.FC<Props> = ({
  card,
  onBuy,
  onSell,
  isPlayerDetails = false,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profileHovered, setProfileHovered] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)

  function usePrevious(value: any) {
    const ref = useRef<any>(refObj)
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const prevAmount = usePrevious(card)

  const handleClick = () => {
    const player = card.detailpageurl //card.name.toLocaleLowerCase().replaceAll(' ', '-')
    if (!isPlayerDetails) {
      navigate(`player/${player}`, {
        state: { id: card.profileLink, detaultPageUrl: card.detailpageurl },
      })
    } else {
      navigate(`/player/${player}`, {
        state: { id: card.profileLink, detaultPageUrl: card.detailpageurl },
      })
      location.reload()
    }
  }

  const playerStatsData = useSelector((state: RootState) => state.playerstats)
  const { fetchPlayerStatsRateData } = playerStatsData

  const handleBuy = (e: any) => {
    e.stopPropagation()
    const profileLink = `player/${card.id}`
    dispatch(setPurchasePlayerId(profileLink))
    onBuy()
  }

  const handleSell = (e: any) => {
    e.stopPropagation()
    const profileLink = `player/${card.id}`
    dispatch(setPurchasePlayerId(profileLink))
    onSell()
  }

  const handleProfileHover = (value: boolean) => (evt: any) => {
    setProfileHovered(value)
  }

  const handleButtonHover = (value: boolean) => (evt: any) => {
    setButtonHovered(value)
  }

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

  return (
    <>
      <div
        className="card"
        onClick={handleClick}
        onMouseEnter={handleProfileHover(true)}
        onMouseLeave={handleProfileHover(false)}
      >
        <div
          className="inside-card"
          onMouseEnter={handleProfileHover(true)}
          onMouseLeave={handleProfileHover(false)}
        >
          <div className="matic-wrapper">
            <div
              className={classnames(
                'number-color',
                'matic-value',
                'matic-figure',
                !prevAmount?.matic || prevAmount?.matic === card.matic
                  ? ''
                  : card.matic > prevAmount.matic
                  ? 'profit'
                  : 'loss',
              )}
            >
              {truncateDecimals(card.matic, 7) || '00.00'}
            </div>
            <TooltipLabel title="MATIC">
              <img src={maticIcon} alt="" />
            </TooltipLabel>
          </div>
          <div className="matic-wrapper">
            <div
              className={classnames(
                'number-color',
                'pt-5',
                'usd-price',
                !prevAmount?.matic || prevAmount?.matic === card.matic
                  ? ''
                  : getUsdFromMatic(card.matic) >
                    getUsdFromMatic(prevAmount.matic)
                  ? 'profit'
                  : 'loss',
              )}
            >
              ${getUsdFromMatic(card.matic)}
            </div>
            {/* <TooltipLabel title="$">
              <img src={dollarIcon} alt="" />
            </TooltipLabel> */}
          </div>
        </div>
        <div
          className="time capitalize m-0"
          onMouseEnter={handleProfileHover(true)}
          onMouseLeave={handleProfileHover(false)}
        >
          &nbsp;
        </div>
        <div
          onMouseEnter={handleProfileHover(true)}
          onMouseLeave={handleProfileHover(false)}
        >
          <div
            className={classnames(
              'img',
              profileHovered && !buttonHovered ? 'profile-hovered-img' : '',
            )}
          >
            <img
              src={card.playerpicture || card.img}
              alt=""
              className="img-radius cache-img"
            />
          </div>
          <div
            className={classnames(
              'name player-title-name',
              profileHovered ? 'player-name-active' : '',
            )}
          >
            {card.name}
          </div>
          <div className="link">
            <div
              className={classnames(
                'link-icon',
                profileHovered && !buttonHovered ? 'link-icon-hovered' : '',
              )}
            ></div>
          </div>
          <div className="divide mt-10"></div>
          <div className="changed-price">
            <div>{t('price change 24h')}</div>
            <div
              className={classnames(
                'number-color',
                // !prevAmount['24h_change'] && !prevAmount.matic
                //   ? ''
                //   : getPercentageChange(
                //       card['24h_change'],
                //       card['matic'],
                //       'current',
                //     ) >
                //     getPercentageChange(
                //       prevAmount['24h_change'],
                //       prevAmount['matic'],
                //       'prev',
                //     )
                //   ? 'profit'
                //   : 'loss',
                !prevAmount?.matic || prevAmount?.matic === card.matic
                  ? ''
                  : getPercentageChange(
                      card['24h_change'],
                      card['matic'],
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
              {getPercentageChange(
                card['24h_change'],
                card['matic'],
                'current',
              ) + '%'}
            </div>
          </div>
          <div className="coin-issued">
            <div>{t('coin issued')}</div>
            <div
              className={classnames(
                'number-color',
                !prevAmount?.coin_issued ||
                  prevAmount?.coin_issued === card.coin_issued
                  ? ''
                  : card.coin_issued > prevAmount.coin_issued
                  ? 'profit'
                  : 'loss',
              )}
            >
              {/* {NumberFormat(card.coin_issued)} */}
              {card.coin_issued}
            </div>
          </div>
          <div className="holders">
            <div>{t('holders')}</div>
            <div
              className={classnames(
                'number-color',
                !prevAmount?.holders || prevAmount?.holders === card.holders
                  ? ''
                  : card.holders > prevAmount.holders
                  ? 'profit'
                  : 'loss',
              )}
            >
              {/* {NumberFormat(card.holders)} */}
              {card.holders}
            </div>
          </div>
        </div>
        <div className="bottom-part">
          <div
            className="buy"
            onClick={handleBuy}
            onMouseEnter={handleButtonHover(true)}
            onMouseLeave={handleButtonHover(false)}
          >
            {t('buy')}
          </div>
          <div
            className="sell"
            onClick={handleSell}
            onMouseEnter={handleButtonHover(true)}
            onMouseLeave={handleButtonHover(false)}
          >
            {t('sell')}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Card)
