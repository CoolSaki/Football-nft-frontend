import React, { useState, memo, useEffect } from 'react'

import { IPlayerCard as CardProps } from '@root/types'
import { useNavigate } from 'react-router-dom'

import LinkIcon from '@mui/icons-material/Link'
import classnames from 'classnames'
import '@assets/css/components/PlayerCard.css'
import '@assets/css/components/ComingSoon.css'
import { useTranslation } from 'react-i18next'

interface Props {
  card: CardProps
}

const ComingSoon: React.FC<Props> = ({ card }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [profileHovered, setProfileHovered] = useState(false)
  let countDown: any = null
  const countDownDate = new Date('August 4, 2022 12:00:00').getTime()
  const [state, setState] = useState({
    days: '00',
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
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(countDown)
        updateState({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
      } else {
        updateState({
          days,
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

  return (
    <>
      <div className="card coming-soon-card">
        <div className="coming-soon-blur">
          <div className="time capitalize m-0">&nbsp;</div>
          <div>
            <div
              className={classnames(
                'img',
                profileHovered ? 'profile-hovered-img' : '',
              )}
            >
              <img
                src={card.playerpicture || card.img}
                alt=""
                className="img-radius cache-img"
              />
            </div>

            <div className="name player-title-name">{card.name}</div>
            <div className="link">
              <div className="link-icon">
                <LinkIcon />
              </div>
              <div className="link-text">{t('link to profile')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="coming-soon h-3">{t('coming soon')}</div>
      <div className="coming-soon-time-card">
        <div className="timer">
          <div className="heading">{t('days')}</div>
          <div className="time">
            {~~state.days < 10 && 0}
            {state.days}
          </div>
        </div>
        :
        <div className="timer">
          <div className="heading">{t('hours')}</div>
          <div className="time">
            {~~state.hours < 10 && 0}
            {state.hours}
          </div>
        </div>
        :
        <div className="timer">
          <div className="heading">{t('mins')}</div>
          <div className="time">
            {~~state.minutes < 10 && 0}
            {state.minutes}
          </div>
        </div>
        :
        <div className="timer">
          <div className="heading">{t('secs')}</div>
          <div className="time">
            {~~state.seconds < 10 && 0}
            {state.seconds}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ComingSoon)
