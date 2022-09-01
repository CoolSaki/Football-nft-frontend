import React, { useState, useEffect } from 'react'
import SubmitButton from '@components/SubmitButton'
import { INftCard } from '@root/types'
import { useTranslation } from 'react-i18next'
import '@assets/css/components/NftCard.css'
import { useNavigate } from 'react-router-dom'
import BidPopup from '@components/BidPopup'
import BidForm from '@components/BidForm'
import { showWalletForm } from '@root/apis/onboarding/authenticationSlice'
import { useDispatch } from 'react-redux'
import BidButton from '@components/BidButton'
import classNames from 'classnames'
import StakeForm from '@components/StakeForm'

interface Props {
  nft?: any //INftCard
  isBidEnabled?: boolean | null
  showOwnerInfo?: boolean | null
  isNavigate?: boolean | null
  isWalletNavigate?: boolean | null
  isWin?: boolean | null
  className?: string
}

const NftCard: React.FC<Props> = ({
  nft,
  isBidEnabled,
  showOwnerInfo,
  isNavigate,
  isWin,
  className = '',
  isWalletNavigate,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let countDown: any = null
  const navigate = useNavigate()
  const countDownDate = new Date('Jan 5, 2024 15:37:25').getTime()
  const [state, setState] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  const [isBid, setIsBid] = useState(false)

  const handleConfirm = () => {
    setIsBid(false)
  }
  const updateState = (data: any) => {
    setState(state => ({ ...state, ...data }))
  }

  const initCountDown = () => {
    countDown = setInterval(function () {
      const now = new Date().getTime()
      const distance = countDownDate - now
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(countDown)
        updateState({
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
      } else {
        updateState({
          hours,
          minutes,
          seconds,
        })
      }
    }, 1000)
  }
  // JULIAN'S CODE-------------------
  // const handleClick = () => {
  //   console.log('pureNft---', nft)
  //   if (!isNavigate && !isWalletNavigate) return
  //   const uri = nft.name.replaceAll(' ', '')
  //   if (isWalletNavigate) {
  //     dispatch(showWalletForm())
  //     navigate(`/player/neymar-jr/nft/${uri}`, { state: { nft: nft } })
  //   }
  //   isNavigate && navigate(`nft/${uri}`, { state: { nft: nft } })
  // }

  // AKSHAY's CODE-------------------

  const handleClick = () => {
    console.log('pureNft---', nft)
    if (!isNavigate && !isWalletNavigate) return
    const uri = nft.name.replaceAll(' ', '')
    const player = nft.detailpageurl //card.name.toLocaleLowerCase().replaceAll(' ', '-')
    if (isWalletNavigate) {
      dispatch(showWalletForm())
      // https://dev.mecarreira.com/player/michael-sample/nft/MichaelSample
      navigate(`/player/${nft.detailpageurl}/nft/${nft.title_url}`, {
        state: { nft: nft },
      })
    }
    // isNavigate && navigate(`nft/${uri}`, { state: { nft: nft } })
    if (!isBid) {
      // navigate(`/player/${player}`, {
      //   state: { id: nft.playerId, detaultPageUrl: nft.detailpageurl },
      //   replace: true,
      // })
      // navigate(`/player/nft/${uri}`, { state: { nft: nft } })

      navigate(`/player/${nft.detailpageurl}/nft/${nft.title_url}`, {
        state: { nft: nft },
      })
    }
  }

  useEffect(() => {
    initCountDown()
    return () => {
      clearInterval(countDown)
    }
  }, [])

  const goToPlayerDetails = (event: any) => {
    event.stopPropagation()
    const player = nft.detailpageurl
    navigate(`/player/${player}`, {
      state: { id: nft.playerId, detaultPageUrl: nft.detailpageurl },
      replace: true,
    })
  }

  const handleBid = (event: any) => {
    event.stopPropagation()
    setIsBid(true)
  }
  return (
    <div className={classNames('nft-card', className)} onClick={handleClick}>
      <div className="nft">
        <div className="nft-image-cover">
          <img
            loading="lazy"
            src={nft.img.default}
            alt=""
            className="nft-image"
          />
        </div>
      </div>
      <div className="second-part">
        {(isBidEnabled || isWin) && (
          <div className="fullwidth">
            <div className="nft-bid-info-header">
              <div>{t('ending in')}</div>
              {!isWin && <div>{t('current Bid')}</div>}
            </div>
            <div
              className={classNames(
                'nft-bid-info-body',
                isWin && 'yellow-color',
              )}
            >
              <div>
                {state.hours}h : {state.minutes}m : {state.seconds}s
              </div>
              {!isWin && <div>2.54</div>}
            </div>
          </div>
        )}
        <div className="nft-name">{nft.name}</div>
        <div className="nft-title title-white">{nft.title}</div>
        <div className="nft-number">#{nft.number}</div>
        {isBidEnabled && (
          <BidButton
            isDisabled={false}
            isLoading={false}
            title={t('place bid')}
            className="nft-bid-button"
            onPress={(event: any) => handleBid(event)}
          />
        )}
        {isWin && (
          <BidButton
            isDisabled={false}
            isLoading={false}
            title={t('stake to win')}
            className="nft-bid-button nft-stake-button"
            // onPress={() => setIsBid(true)}
            onPress={(event: any) => handleBid(event)}
          />
        )}
        {showOwnerInfo && (
          <>
            <div className="nft-owner">
              <div>{t('owner')}:</div>
              <div>{nft.owner}</div>
            </div>
            <div className="nft-mint-date">
              <div>t{'min date'}:</div>
              <div>{nft.mintDate}</div>
            </div>
          </>
        )}
      </div>
      <BidPopup isOpen={isBid}>
        {isBid ? (
          <>
            {isBidEnabled ? (
              <BidForm
                onSubmit={handleConfirm}
                onClose={() => setIsBid(false)}
              ></BidForm>
            ) : (
              <StakeForm
                onSubmit={handleConfirm}
                onClose={() => setIsBid(false)}
              ></StakeForm>
            )}
          </>
        ) : null}
      </BidPopup>
    </div>
  )
}

export default NftCard
