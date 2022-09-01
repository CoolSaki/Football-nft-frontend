import React, { useState } from 'react'

import Carousel from '@components/Carousel'
import { NftCardData } from '@root/constants'
import VotingPoll from './VotingPoll'
import { useTranslation } from 'react-i18next'

const VotingPolls: React.FC = () => {
  const { t } = useTranslation()
  const items: JSX.Element[] = []
  const [selectedIndex, setSelectedIndex] = useState(-1)
  NftCardData.map((item, index) =>
    items.push(
      <VotingPoll
        index={index}
        featureQuestion={item.question}
        selectedIndex={selectedIndex}
        onClick={index => {
          setSelectedIndex(index === selectedIndex ? -1 : index)
        }}
      />,
    ),
  )

  return (
    <div className="fullwidth voting-polls">
      <div className="flex-center">
        <div className="open-polls">
          <div className="blog-title">{t('open voting polls')}</div>
          <div className="poll-container">
            <div className="poll-header">
              {t('what colour lamborghini should i buy next?')}
            </div>
            <div className="poll-body">
              <div className="poll-item">
                <div>Verde Mantis({t('green')})</div>
                <div className="green-color capitalize">{t('vote')}</div>
              </div>
              <div className="poll-item">
                <div>Rossa Mars({t('red')})</div>
                <div className="green-color capitalize">{t('vote')}</div>
              </div>
              <div className="poll-item">
                <div>Bianco Isi({t('white')})</div>
                <div className="green-color capitalize">{t('vote')}</div>
              </div>
              <div className="poll-item">
                <div>Giallo Orion({t('yellow')})</div>
                <div className="green-color capitalize">{t('vote')}</div>
              </div>
              <div className="poll-item">
                <div>Nero Aldebaran({t('black')})</div>
                <div className="green-color capitalize">{t('vote')}</div>
              </div>
            </div>
            <div className="poll-footer">
              <div>{t('ends')} June 8, 11:57 PM</div>
              <div>10K {t('votes')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="fullwidth">
        <div className="blog-title">{t('closed voting polls')}</div>
        <div className="flex-center">
          <div className="carousel">
            <Carousel items={items} responsiveWideMode={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VotingPolls
