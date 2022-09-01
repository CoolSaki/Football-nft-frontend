import { useState } from 'react'
import ArrowDown from '@components/Svg/ArrowDown'
import { useTranslation } from 'react-i18next'

const NftList = () => {
  const { t } = useTranslation()
  const [selectedPoll, setSelectedPoll] = useState(-1)
  const handleClick = (e: number) => {
    setSelectedPoll(e)
  }
  return (
    <>
      <div className="fullwidth NftList-poll-root">
        <div
          className="NftList-poll-container NftList-poll-closed-container"
          onClick={() => handleClick(0)}
        >
          <div className="NftList-poll-header">
            {t('what colour lamborghini should i buy next?')}
          </div>
          {selectedPoll === 0 && (
            <div className="NftList-poll-body">
              <div className="NftList-poll-item">
                <div>Verde Mantis({t('green')})</div>
                <div>52%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Rossa Mars({t('red')})</div>
                <div>42%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Bianco Isi({t('white')})</div>
                <div>38%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Giallo Orion({t('yellow')})</div>
                <div>12%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Nero Aldebaran({t('black')})</div>
                <div>28%</div>
              </div>
            </div>
          )}
          <div className="NftList-poll-footer">
            <div>{t('ends')} June 8, 11:57 PM</div>
            <div>
              <span>10K {t('votes')}</span>
              <span className="arrow-down">
                <ArrowDown />
              </span>
            </div>
          </div>
        </div>
        <div
          className="NftList-poll-container NftList-poll-closed-container"
          onClick={() => handleClick(1)}
        >
          <div className="NftList-poll-header">
            {t('how many goals will i')}
          </div>
          {selectedPoll === 1 && (
            <div className="NftList-poll-body">
              <div className="NftList-poll-item">
                <div>Verde Mantis(green)</div>
                <div>52%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Rossa Mars(red)</div>
                <div>42%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Bianco Isi(white)</div>
                <div>38%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Giallo Orion(yellow)</div>
                <div>12%</div>
              </div>
              <div className="NftList-poll-item">
                <div>Nero Aldebaran(black)</div>
                <div>28%</div>
              </div>
            </div>
          )}
          <div className="NftList-poll-footer">
            <div>{t('ends')} June 8, 11:57 PM</div>
            <div>
              <span>10Kee {t('votes')}</span>
              <span className="arrow-down">
                <ArrowDown />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NftList
