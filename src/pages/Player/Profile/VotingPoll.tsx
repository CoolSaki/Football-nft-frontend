import ArrowDown from '@components/Svg/ArrowDown'
import { red } from '@mui/material/colors'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  index: number
  selectedIndex: number
  featureQuestion?: string
  onClick: (v: number) => any
}

const VotingPoll: React.FC<Props> = ({
  index,
  selectedIndex,
  featureQuestion = '',
  onClick,
}) => {
  const { t } = useTranslation()

  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  return (
    <div
      className="fullwidth"
      onClick={() => {
        onClick(index)
      }}
    >
      <div
        className={classNames(
          'poll-container poll-closed-container relative-poll-container',
          index === selectedIndex ? 'expanded' : '',
        )}
      >
        <div className="poll-header">
          {featureQuestion
            ? getTranslation(featureQuestion)
            : t('what colour lamborghini should i buy next?')}
        </div>
        {index === selectedIndex && (
          <div className="poll-body">
            <div className="poll-item">
              <div>Verde Mantis({t('green')})</div>
              <div>52%</div>
            </div>
            <div className="poll-item">
              <div>Rossa Mars({t('red')})</div>
              <div>42%</div>
            </div>
            <div className="poll-item">
              <div>Bianco Isi({t('white')})</div>
              <div>38%</div>
            </div>
            <div className="poll-item">
              <div>Giallo Orion({t('yellow')})</div>
              <div>12%</div>
            </div>
            <div className="poll-item">
              <div>Nero Aldebaran({t('black')})</div>
              <div>28%</div>
            </div>
          </div>
        )}
        <div className="poll-footer vote-fixed-footer">
          <div>{t('ends')} June 8, 11:57 PM</div>
          <div className="vote-wrapper">
            <span>10K {t('votes')}</span>
            <span className="arrow-down">
              <ArrowDown />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VotingPoll
