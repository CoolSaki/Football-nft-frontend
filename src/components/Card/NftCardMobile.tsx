import React, { useState, useEffect } from 'react'
import { INftCard } from '@root/types'
import { useTranslation } from 'react-i18next'
import '@assets/css/components/NftCard.css'
import { useNavigate } from 'react-router-dom'
import BidPopup from '@components/BidPopup'
import BidForm from '@components/BidForm'
import { useDispatch } from 'react-redux'

interface Props {
  nft: any //INftCard
  isBidEnabled?: boolean | null
  showOwnerInfo?: boolean | null
  isNavigate?: boolean | null
  isAll?: boolean | null
  isWin?: boolean | null
}

const NftCardMobile: React.FC<Props> = ({
  nft,
  isBidEnabled,
  showOwnerInfo,
  isNavigate,
  isAll,
  isWin,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let countDown: any = null
  const navigate = useNavigate()
  const countDownDate = new Date('Jan 5, 2024 15:37:25').getTime()
  const [state, setState] = useState({
    day: '00',
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
      const day = ~~(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(countDown)
        updateState({
          day: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
      } else {
        updateState({
          day,
          hours,
          minutes,
          seconds,
        })
      }
    }, 1000)
  }

  const handleClick = () => {
    if (!isNavigate) return
    const uri = nft.name.replaceAll(' ', '')
    // navigate(`nft/${uri}`, { state: { nft: nft } })
    navigate(`/player/${nft.detailpageurl}/nft/${nft.title_url}`, {
      state: { nft: nft },
    })
  }

  useEffect(() => {
    initCountDown()
    return () => {
      clearInterval(countDown)
    }
  }, [])

  const handleBidClick = () => {
    setIsBid(true)
  }

  return (
    <div className="nft-card">
      <div className="nft" onClick={handleClick}>
        <div className="nft-image-cover">
          <img
            loading="lazy"
            src={nft.img.default}
            alt=""
            className="nft-image"
          />
          {(isBidEnabled || isWin) && (
            <div className="fullwidth">
              <div className="nft-bid-info-body">
                <div
                  style={{ backgroundColor: isWin ? '#f3b127e5' : '#6bc909e5' }}
                >
                  {state.day}d : {state.hours}h : {state.minutes}m :{' '}
                  {state.seconds}s
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="second-part">
        <div className="nft-name">{nft.name}</div>
        <div className="nft-title">{nft.title}</div>

        {isAll && <div className="nft-number">#{nft.number}</div>}
        {isBidEnabled && <div className="nft-bid-now">{t('bid now')}</div>}
      </div>
      <BidPopup isOpen={isBid}>
        {isBid ? (
          <BidForm
            onSubmit={handleConfirm}
            onClose={() => setIsBid(false)}
          ></BidForm>
        ) : null}
      </BidPopup>
    </div>
  )
}

export default NftCardMobile
