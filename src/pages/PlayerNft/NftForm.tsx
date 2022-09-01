import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import BottomPopup from '@components/BottomPopup'
import Send from './Send'
import Confirmed from './Confirmed'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import { useTranslation } from 'react-i18next'
import Stake from './Stake'
import classNames from 'classnames'
interface Props {
  onClick: () => void
}

const NftForm: React.FC<Props> = ({ onClick }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const location: any = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  let countDown: any = null

  const handleSubmit = (data: any) => {
    setShowPopup(false)
    // setIsConfirmed(true)
  }

  const gotoPlayer = () => {
    const player = location?.state?.nft.detailpageurl
    navigate(`/player/${player}`, {
      state: {
        id: location?.state?.nft.playerId,
        detaultPageUrl: location?.state?.nft.detailpageurl,
      },
    })
  }

  const countDownDate = new Date('Jan 5, 2024 15:37:25').getTime()
  const [state, setState] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

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

  useEffect(() => {
    initCountDown()
    return () => {
      clearInterval(countDown)
    }
  }, [])

  // useEffect(() => {
  //   if (showPopup) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = ''
  //   }
  // }, [showPopup])

  return (
    <div className="nft-container flex-middle">
      <div>
        <div className="nft-image-cover">
          <img
            loading="lazy"
            src={location.state.nft.img.default}
            alt=""
            className="nft-image"
          />
        </div>
        <div style={{ width: 327, margin: 'auto' }}>
          <div className="nft-info">
            <div className="nft-info-title">
              {location.state.nft.title} #{location.state.nft.number}
            </div>
            <div className="nft-info-by" onClick={() => gotoPlayer()}>
              {t('by')}: <a>{location.state.nft.name}</a>
            </div>
          </div>
          <div className="nft-separate-line"></div>

          {/* <div className="nft-owner">
            <span>{t('owner')}:</span>
            <br />
            <div>{location.state.nft.owner}</div>
          </div>
          <div className="nft-mint-date">
            <span>{t('mint date')}:</span>
            <br />
            <div>{location.state.nft.mintDate}</div>
          </div> */}

          <div className="fullwidth">
            <div className="nft-bid-info-header">
              <div>{t('ending in')}</div>
              {!location.state.nft.isWin && <div>{t('current Bid')}</div>}
            </div>
            <div
              className={classNames(
                'nft-bid-info-body',
                location?.state?.nft?.isWin ? 'yellow-color' : '',
              )}
            >
              <div>
                {state.hours}h : {state.minutes}m : {state.seconds}s
              </div>
              {!location.state.nft.isWin && <div>2.54</div>}
            </div>
          </div>

          <div className="nft-separate-line mb-20"></div>
          {location?.state?.nft?.isWin ? (
            <button
              className="nft-btn bg-yellow-color"
              onClick={() => {
                setShowPopup(true)
              }}
            >
              {t('stake')}
            </button>
          ) : (
            <>
              <button
                className="nft-btn"
                onClick={() => {
                  setShowPopup(true)
                }}
              >
                {t('place bid')}
              </button>
              <button className="nft-btn btn-disabled">{t('show bids')}</button>
            </>
          )}
          {/* <div className="fullwidth flex-right">
            <ArrowCircleDownIcon
              className="nft-arrow-down"
              onClick={onClick}
            ></ArrowCircleDownIcon>
          </div> */}
          <BottomPopup
            mode={location?.state?.nft?.isWin ? 'stake' : 'nft'}
            isOpen={showPopup}
          >
            {showPopup ? (
              <>
                {location?.state?.nft?.isWin ? (
                  <Stake
                    onSubmit={handleSubmit}
                    onClose={() => {
                      setShowPopup(false)
                    }}
                  />
                ) : (
                  <Send
                    onSubmit={handleSubmit}
                    onClose={() => {
                      setShowPopup(false)
                    }}
                  />
                )}
              </>
            ) : null}
          </BottomPopup>
          <BottomPopup mode="nft" isOpen={isConfirmed}>
            {isConfirmed ? (
              <Confirmed
                onClose={() => {
                  setIsConfirmed(false)
                }}
              />
            ) : null}
          </BottomPopup>
        </div>
      </div>
    </div>
  )
}

export default NftForm
